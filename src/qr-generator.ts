/**
 * qr-generator.ts — NUX MightyAmp QR preset encoder
 *
 * Usage:
 *   npx @cordfuse/nux-qr-tool <params-json-file> [--output <dir>] [--app-name <name>] [--app-version <ver>]
 *
 * The JSON file must contain preset params plus metadata:
 *   { "artist": "...", "song": "...", "device": "plugpro", "amp": {...}, ... }
 *
 * Outputs a decorated PNG to <dir>/<artist>-<song>.png (default: CWD)
 * Prints the output path to stdout on success.
 */

import QRCode from 'qrcode'
import * as PImage from 'pureimage'
import * as OT from 'opentype.js'
import { gunzipSync } from 'node:zlib'
import { PassThrough } from 'node:stream'
import { Readable } from 'node:stream'
import { readFileSync, mkdirSync } from 'fs'
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { REGULAR_TTF_GZ_B64, BOLD_TTF_GZ_B64 } from './fonts.js'

// opentype.js ships a CJS `main` and an ESM `module`; the default export lands in
// a different place depending on whether we run under Node (CJS) or a Bun bundle.
const otParse: (buf: ArrayBuffer) => OT.Font =
  (OT as any).parse ?? (OT as any).default?.parse ?? (OT as any).default

const __dirname = dirname(fileURLToPath(import.meta.url))
// Read our own version from package.json on the npm/Node path. Inside a Bun-compiled
// standalone binary there is no package.json on disk, so fall back gracefully —
// callers (e.g. toneai-nux-cli) pass an explicit appVersion anyway.
function readVersion(): string {
  try { return JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8')).version }
  catch { return '' }
}
const VERSION: string = readVersion()

// ── Payload ───────────────────────────────────────────────────────────────────
//
// The payload encoder lives in payload.ts — pure logic, no Node, browser-safe. It is
// imported (not duplicated) so there is exactly ONE implementation of the byte format.
// A second copy would be a second set of bugs, and a wrong payload is a wrong tone
// that looks completely fine right up until it reaches the amp.
//
// Re-exported so existing consumers of this module keep working unchanged.
export {
  DEVICES, buildQRString, coerceParams, isProDevice,
  type DeviceType, type PresetParams,
} from './payload.js'
import { DEVICES, buildQRString, coerceParams, isProDevice, type DeviceType, type PresetParams } from './payload.js'


// ── Decoration ────────────────────────────────────────────────────────────────

const QR_SIZE   = 500
const PADDING   = 24
const HEADER_H  = 52
const FOOTER_H  = 68
const TOTAL_W   = QR_SIZE + PADDING * 2
const TOTAL_H   = QR_SIZE + HEADER_H + FOOTER_H
const BG        = '#0f0f0f'
const ACCENT    = '#e63946'
const TEXT_MAIN = '#ffffff'
const TEXT_SUB  = '#aaaaaa'

// ── Text rendering ────────────────────────────────────────────────────────────
// pureimage's own text engine drives opentype.js with kerning enabled, which
// throws on Liberation Sans's GPOS table. We instead draw glyph outlines
// ourselves with kerning disabled — robust for any font and free of native code.

type Align = 'left' | 'right' | 'center'
const GLYPH_OPTS = { kerning: false, hinting: false, features: { liga: false } } as const

function loadFont(b64: string): OT.Font {
  const bytes = gunzipSync(Buffer.from(b64, 'base64'))
  return otParse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength))
}
const FONT_REGULAR = loadFont(REGULAR_TTF_GZ_B64)
const FONT_BOLD = loadFont(BOLD_TTF_GZ_B64)

/**
 * Paint `text` onto a pureimage context using opentype outlines.
 * `y` is the vertical centre of the text (mimics canvas textBaseline:'middle').
 * `maxWidth`, when given, shrinks the size proportionally so the text fits.
 */
function drawText(
  ctx: any, font: OT.Font, text: string,
  x: number, y: number, sizePx: number, color: string,
  align: Align = 'left', maxWidth?: number,
): void {
  let size = sizePx
  if (maxWidth) {
    const w = font.getAdvanceWidth(text, size, GLYPH_OPTS)
    if (w > maxWidth) size = size * (maxWidth / w)
  }
  const advance = font.getAdvanceWidth(text, size, GLYPH_OPTS)
  let startX = x
  if (align === 'right') startX = x - advance
  else if (align === 'center') startX = x - advance / 2

  const scale = size / font.unitsPerEm
  const midShift = ((font.ascender + font.descender) / 2) * scale
  const path = font.getPath(text, startX, y + midShift, size, GLYPH_OPTS)

  ctx.beginPath()
  for (const c of path.commands) {
    if (c.type === 'M') ctx.moveTo(c.x, c.y)
    else if (c.type === 'L') ctx.lineTo(c.x, c.y)
    else if (c.type === 'C') ctx.bezierCurveTo(c.x1, c.y1, c.x2, c.y2, c.x, c.y)
    else if (c.type === 'Q') ctx.quadraticCurveTo(c.x1, c.y1, c.x, c.y)
    else if (c.type === 'Z') ctx.closePath()
  }
  ctx.fillStyle = color
  ctx.fill()
}

// Accent rule pre-blended onto BG at 0.4 alpha (pureimage has no globalAlpha).
const ACCENT_RULE = blend(ACCENT, BG, 0.4)
function blend(fg: string, bg: string, alpha: number): string {
  const f = hexToRgb(fg), b = hexToRgb(bg)
  const m = (i: number) => Math.round(f[i] * alpha + b[i] * (1 - alpha))
  return `#${[m(0), m(1), m(2)].map(v => v.toString(16).padStart(2, '0')).join('')}`
}
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

export async function decorateQR(
  qrPng: Buffer,
  artist: string,
  song: string,
  deviceId: string,
  deviceName: string,
  options?: { appName?: string; appVersion?: string },
): Promise<Buffer> {
  const appName = options?.appName ?? 'ToneAI'
  const appVersion = options?.appVersion ?? VERSION
  const hasEmbeddedName = isProDevice(deviceId as DeviceType)
  const innerW = TOTAL_W - PADDING * 2

  const img = PImage.make(TOTAL_W, TOTAL_H)
  const ctx = img.getContext('2d')

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, TOTAL_W, TOTAL_H)

  // Header
  drawText(ctx, FONT_BOLD, appName, PADDING, HEADER_H / 2, 15, ACCENT, 'left')
  drawText(ctx, FONT_REGULAR, `v${appVersion}`, TOTAL_W - PADDING, HEADER_H / 2, 13, TEXT_SUB, 'right')
  ctx.fillStyle = ACCENT_RULE
  ctx.fillRect(0, HEADER_H - 2, TOTAL_W, 2)

  // QR
  const qrBmp = await PImage.decodePNGFromStream(Readable.from(qrPng))
  ctx.drawImage(qrBmp, PADDING, HEADER_H, QR_SIZE, QR_SIZE)

  // Footer
  const footerTop = HEADER_H + QR_SIZE
  ctx.fillStyle = ACCENT_RULE
  ctx.fillRect(0, footerTop, TOTAL_W, 2)

  const cx = TOTAL_W / 2
  drawText(ctx, FONT_BOLD, `${artist} — ${song}`, cx, footerTop + FOOTER_H * 0.36, 15, TEXT_MAIN, 'center', innerW)
  const line2 = hasEmbeddedName ? `${deviceName}  ·  name embedded in QR` : deviceName
  drawText(ctx, FONT_REGULAR, line2, cx, footerTop + FOOTER_H * 0.70, 12, TEXT_SUB, 'center', innerW)

  const chunks: Buffer[] = []
  const sink = new PassThrough()
  sink.on('data', c => chunks.push(c as Buffer))
  await PImage.encodePNGToStream(img, sink)
  return Buffer.concat(chunks)
}

// ── Main ──────────────────────────────────────────────────────────────────────

function parseFlag(args: string[], ...flags: string[]): string | undefined {
  const idx = args.findIndex(a => flags.includes(a))
  return idx !== -1 ? args[idx + 1] : undefined
}

async function main() {
  const args = process.argv.slice(2)
  const flagNames = ['--output', '-o', '--app-name', '--app-version']
  const flagValueIdxs = new Set<number>()
  flagNames.forEach(f => { const i = args.indexOf(f); if (i !== -1) flagValueIdxs.add(i + 1) })

  const outDir = resolve(parseFlag(args, '--output', '-o') ?? process.cwd())
  const appName = parseFlag(args, '--app-name')
  const appVersion = parseFlag(args, '--app-version')
  const jsonPath = args.find((a, i) => !a.startsWith('-') && !flagValueIdxs.has(i))

  if (!jsonPath) {
    console.error('Usage: npx @cordfuse/nux-qr-tool <params-json-file> [--output <dir>] [--app-name <name>] [--app-version <ver>]')
    process.exit(1)
  }

  const raw = JSON.parse(readFileSync(resolve(jsonPath), 'utf8')) as Record<string, unknown>
  const params = coerceParams(raw)
  const device = DEVICES[params.device]
  if (!device) { console.error(`Unknown device: ${params.device}`); process.exit(1) }

  const qrString = buildQRString(params)
  const qrPng = await QRCode.toBuffer(qrString, {
    errorCorrectionLevel: 'H',
    width: 500,
    margin: 4,
    color: { dark: '#000000', light: '#ffffff' },
  }) as Buffer

  const decorated = await decorateQR(
    qrPng, params.artist, params.song, params.device, device.displayName,
    { ...(appName ? { appName } : {}), ...(appVersion ? { appVersion } : {}) },
  )

  const slug = `${params.artist}-${params.song}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)

  mkdirSync(outDir, { recursive: true })
  const outPath = join(outDir, `${slug}.png`)

  const { writeFileSync } = await import('fs')
  writeFileSync(outPath, decorated)
  console.log(outPath)
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url)
  || process.argv[1]?.endsWith('qr-generator.js')
  || process.argv[1]?.endsWith('nux-qr-tool')
if (isMain) main().catch(err => { console.error(err.message); process.exit(1) })
