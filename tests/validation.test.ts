// Ground-truth id validation: the encoder must reject an amp/cab/effect id the
// device firmware does not have, instead of writing the caller's guess into a
// tone that loads as the wrong thing. Catalog source: tuntorius/mightier_amp.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { coerceParams, validatePreset } from '../src/qr-generator.ts'

test('a valid id on a confirmed device passes (plugpro amp 5 = Twin Reverb)', () => {
  const p = coerceParams({ device: 'plugpro', amp: { id: 5, gain: 60 } })
  assert.equal(p.amp.id, 5)
})

test('an invalid amp id on a confirmed device is rejected, with the valid list', () => {
  assert.throws(
    () => coerceParams({ device: 'plugpro', amp: { id: 99 } }),
    /amp id 99 is not valid for plugpro/,
  )
})

test('a device that models a single amp rejects any other amp id (8bt has only id 0)', () => {
  assert.doesNotThrow(() => coerceParams({ device: '8bt', amp: { id: 0 } }))
  assert.throws(() => coerceParams({ device: '8bt', amp: { id: 3 } }), /not valid for 8bt/)
})

test('R3: a missing device is rejected, NOT silently defaulted to plugpro', () => {
  assert.throws(() => coerceParams({ amp: { id: 5 } }), /device is required/)
})

test('an unknown device string is rejected', () => {
  assert.throws(() => coerceParams({ device: 'notadevice', amp: { id: 1 } }), /device is required/)
})

test('an out-of-range effect id is rejected on a confirmed device', () => {
  assert.throws(
    () => coerceParams({ device: 'plugpro', amp: { id: 5 }, delay: { id: 99, enabled: true } }),
    /delay id 99 is not valid/,
  )
})

test('assumed-confidence devices warn but do not throw (no ground truth to reject against)', () => {
  // 20btmk2 has no distinct source device; tables are inferred from Plug Pro.
  const r = validatePreset(coerceParams({ device: '20btmk2', amp: { id: 5 }, validate: false } as never))
  assert.equal(r.errors.length, 0)
  assert.ok(r.warnings.some(w => /assumed/.test(w)))
})

test('unknown-confidence devices are not id-validated (mightygo has no source table)', () => {
  const r = validatePreset({ device: 'mightygo', amp: { id: 0 } } as never)
  assert.equal(r.errors.length, 0)
  assert.ok(r.warnings.some(w => /unknown|unchecked/.test(w)))
})

test('validate:false bypasses the gate for raw encoding', () => {
  assert.doesNotThrow(() => coerceParams({ device: 'plugpro', amp: { id: 99 } }, { validate: false }))
})
