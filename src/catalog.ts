// NUX MightyAmp ID catalog — the amp/cab/effect ids each device's firmware accepts.
//
// GROUND TRUTH, extracted from tuntorius/mightier_amp (MIT, (c) 2020-2021 Dian Iliev):
//   https://github.com/tuntorius/mightier_amp  —  lib/bluetooth/devices/effects/*
// This is the reference the encoder validates against so the model cannot ship an id the
// device does not have. `confidence` records how far ground truth reaches per device:
//   confirmed = QR id + tables verified against the source
//   assumed   = tables inferred (no distinct source device); ids NOT hard-validated
//   unknown   = no source device at all; no id validation possible
//
// AUTO-GENERATED from the source tables. Do not hand-edit; regenerate from mightier_amp.

export type Confidence = 'confirmed' | 'assumed' | 'unknown'
export interface DeviceCatalog {
  confidence: Confidence
  amp?:        Record<number, string>
  cabinet?:    Record<number, string>
  efx?:        Record<number, string>
  modulation?: Record<number, string>
  delay?:      Record<number, string>
  reverb?:     Record<number, string>
  ambience?:   Record<number, string>
  compressor?: Record<number, string>
  eq?:         Record<number, string>
}

export const NUX_CATALOG: Record<string, DeviceCatalog> = {
  "plugpro": {
    confidence: "confirmed",
    amp: { 1: "Jazz Clean", 2: "Deluxe Rvb", 3: "Bass Mate", 4: "Tweedy", 5: "Twin Reverb", 6: "Hiwire", 7: "Cali Crunch", 8: "Class A15", 9: "Class A30", 10: "Plexi 100", 11: "Plexi 45", 12: "Brit 800", 13: "1987x50", 14: "Slo 100", 15: "Fireman HBE", 16: "Dual Rect", 17: "DIE VH4", 18: "Vibro King", 19: "Budda", 20: "Mr. Z38", 21: "Super Rvb", 22: "Brit Blues", 23: "Match D30", 24: "Brit 2000", 25: "Uber HiGain", 26: "AGL", 27: "MLD", 28: "Optima Air", 29: "Stageman" },
    cabinet: { 1: "JZ120", 2: "DR112", 3: "TR212", 4: "HIWIRE412", 5: "CALI 112", 6: "A112", 7: "GB412", 8: "M1960AX", 9: "M1960AV", 10: "M1960TV", 11: "SLO412", 12: "FIREMAN 412", 13: "RECT 412", 14: "DIE412", 15: "MATCH212", 16: "UBER412", 17: "BS410", 18: "A212", 19: "M1960AHW", 20: "M1936", 21: "BUDDA112", 22: "Z212", 23: "SUPERVERB410", 24: "VIBROKING310", 25: "AGL_DB810", 26: "AMP_SV212", 27: "AMP_SV410", 28: "AMP_SV810", 29: "BASSGUY410", 30: "EDEN410", 31: "MKB410", 32: "G-HBIRD", 33: "G-J15", 34: "M-D45" },
    efx: { 1: "Distortion+", 2: "RC Boost", 3: "AC Boost", 4: "Dist One", 5: "T Screamer", 6: "Blues Drive", 7: "Morning Drive", 8: "Eat Dist", 9: "Red Dirt", 10: "Crunch", 11: "Muff Fuzz", 12: "Katana", 13: "ST Singer", 14: "Touch Wah" },
    modulation: { 1: "CE-1", 2: "CE-2", 3: "ST Chorus", 4: "Vibrato", 5: "Detune", 6: "Flanger", 7: "Phase 90", 8: "Phase 100", 9: "S.C.F.", 10: "U-Vibe", 11: "Tremolo", 12: "Rotary", 13: "SCH-1", 14: "Mono Octave" },
    delay: { 1: "Analog", 2: "Digital Delay", 3: "Modulation", 4: "Tape Echo", 5: "Pan Delay", 6: "Phi Delay" },
    reverb: { 1: "Room", 2: "Hall", 3: "Plate", 4: "Spring", 5: "Shimmer", 6: "Damp" },
    compressor: { 1: "Rose Comp", 2: "K Comp", 3: "Studio Comp" },
    eq: { 0: "Speaker EQ", 1: "6-Band", 3: "10-Band" },
  },
  "space": {
    confidence: "confirmed",
    amp: { 1: "Jazz Clean", 2: "Deluxe Rvb", 3: "Bass Mate", 4: "Tweedy", 5: "Twin Reverb", 6: "Hiwire", 7: "Cali Crunch", 8: "Class A15", 9: "Class A30", 10: "Plexi 100", 11: "Plexi 45", 12: "Brit 800", 13: "1987x50", 14: "Slo 100", 15: "Fireman HBE", 16: "Dual Rect", 17: "DIE VH4", 18: "Vibro King", 19: "Budda", 20: "Mr. Z38", 21: "Super Rvb", 22: "Brit Blues", 23: "Match D30", 24: "Brit 2000", 25: "Uber HiGain", 26: "AGL", 27: "MLD", 28: "Optima Air", 29: "Stageman" },
    cabinet: { 1: "JZ120", 2: "DR112", 3: "TR212", 4: "HIWIRE412", 5: "CALI 112", 6: "A112", 7: "GB412", 8: "M1960AX", 9: "M1960AV", 10: "M1960TV", 11: "SLO412", 12: "FIREMAN 412", 13: "RECT 412", 14: "DIE412", 15: "MATCH212", 16: "UBER412", 17: "BS410", 18: "A212", 19: "M1960AHW", 20: "M1936", 21: "BUDDA112", 22: "Z212", 23: "SUPERVERB410", 24: "VIBROKING310", 25: "AGL_DB810", 26: "AMP_SV212", 27: "AMP_SV410", 28: "AMP_SV810", 29: "BASSGUY410", 30: "EDEN410", 31: "MKB410", 32: "G-HBIRD", 33: "G-J15", 34: "M-D45" },
    efx: { 1: "Distortion+", 2: "RC Boost", 3: "AC Boost", 4: "Dist One", 5: "T Screamer", 6: "Blues Drive", 7: "Morning Drive", 8: "Eat Dist", 9: "Red Dirt", 10: "Crunch", 11: "Muff Fuzz", 12: "Katana", 13: "ST Singer", 14: "Touch Wah" },
    modulation: { 1: "CE-1", 2: "CE-2", 3: "ST Chorus", 4: "Vibrato", 5: "Detune", 6: "Flanger", 7: "Phase 90", 8: "Phase 100", 9: "S.C.F.", 10: "U-Vibe", 11: "Tremolo", 12: "Rotary", 13: "SCH-1", 14: "Mono Octave" },
    delay: { 1: "Analog", 2: "Digital Delay", 3: "Modulation", 4: "Tape Echo", 5: "Pan Delay", 6: "Phi Delay" },
    reverb: { 1: "Room", 2: "Hall", 3: "Plate", 4: "Spring", 5: "Shimmer", 6: "Damp" },
    compressor: { 1: "Rose Comp", 2: "K Comp", 3: "Studio Comp" },
    eq: { 0: "Speaker EQ", 1: "6-Band", 3: "10-Band" },
  },
  "litemk2": {
    confidence: "confirmed",
    efx: { 14: "Rose Comp", 15: "K Comp", 16: "Touch Wah", 17: "Tremolo", 18: "U-Vibe", 19: "PH 100" },
    delay: { 1: "Analog", 2: "Digital", 3: "Modulation", 4: "Tape Echo", 5: "Phi Delay" },
    reverb: { 1: "Room", 2: "Hall" },
  },
  "8btmk2": {
    confidence: "confirmed",
    efx: { 14: "Rose Comp", 15: "K Comp", 16: "Touch Wah", 17: "Tremolo", 18: "U-Vibe", 19: "PH 100" },
    delay: { 1: "Analog", 2: "Digital", 3: "Modulation", 4: "Tape Echo", 5: "Phi Delay" },
    reverb: { 1: "Room", 2: "Hall" },
  },
  "plugair_v1": {
    confidence: "confirmed",
    amp: { 0: "Twin Verb", 1: "JZ 120", 2: "Tweed Dlx", 3: "Plexi", 4: "Top Boost 30", 5: "Lead 100", 6: "Fireman", 7: "DIE VH4", 8: "Recto", 9: "Optima", 10: "Stageman", 11: "MLD", 12: "AGL" },
    cabinet: { 0: "V1960", 1: "A212", 2: "BS410", 3: "DR112", 4: "GB412", 5: "JZ120", 6: "TR212", 7: "V412", 8: "AGL DB810", 9: "AMP SV810", 10: "MKB 410", 11: "TRC 410", 12: "G HBird EG Magnetic", 13: "G J15 EG Magnetic", 14: "M D45 EG Magnetic", 15: "GIB J200 EG Magnetic", 16: "GIB J45 EG Magnetic", 17: "TL 314 EG Magnetic", 18: "M HD28 EG Magnetic" },
    efx: { 0: "Touch Wah", 1: "Uni Vibe", 2: "Tremolo", 3: "Phaser", 4: "Boost", 5: "T Screamer", 6: "Bass TS", 7: "3 Band EQ", 8: "Muff Fuzz", 9: "Crunch", 10: "Red Dist", 11: "Morning Drive", 12: "Dist One" },
    modulation: { 0: "Phaser", 1: "Chorus", 2: "ST Chorus", 3: "SCF", 4: "U-Vibe", 5: "Tremolo" },
    delay: { 0: "Analog Delay", 1: "Tape Echo", 2: "Mod Delay", 3: "Ping Pong" },
    reverb: { 0: "Room", 1: "Hall", 2: "Plate", 3: "Spring", 4: "Shimmer Reverb" },
  },
  "mightyair_v1": {
    confidence: "confirmed",
    amp: { 0: "Twin Verb", 1: "JZ 120", 2: "Tweed Dlx", 3: "Plexi", 4: "Top Boost 30", 5: "Lead 100", 6: "Fireman", 7: "DIE VH4", 8: "Recto", 9: "Optima", 10: "Stageman", 11: "MLD", 12: "AGL" },
    cabinet: { 0: "V1960", 1: "A212", 2: "BS410", 3: "DR112", 4: "GB412", 5: "JZ120", 6: "TR212", 7: "V412", 8: "AGL DB810", 9: "AMP SV810", 10: "MKB 410", 11: "TRC 410", 12: "G HBird EG Magnetic", 13: "G J15 EG Magnetic", 14: "M D45 EG Magnetic", 15: "GIB J200 EG Magnetic", 16: "GIB J45 EG Magnetic", 17: "TL 314 EG Magnetic", 18: "M HD28 EG Magnetic" },
    efx: { 0: "Touch Wah", 1: "Uni Vibe", 2: "Tremolo", 3: "Phaser", 4: "Boost", 5: "T Screamer", 6: "Bass TS", 7: "3 Band EQ", 8: "Muff Fuzz", 9: "Crunch", 10: "Red Dist", 11: "Morning Drive", 12: "Dist One" },
    modulation: { 0: "Phaser", 1: "Chorus", 2: "ST Chorus", 3: "SCF", 4: "U-Vibe", 5: "Tremolo" },
    delay: { 0: "Analog Delay", 1: "Tape Echo", 2: "Mod Delay", 3: "Ping Pong" },
    reverb: { 0: "Room", 1: "Hall", 2: "Plate", 3: "Spring", 4: "Shimmer Reverb" },
  },
  "plugair_v2": {
    confidence: "confirmed",
    amp: { 0: "Jazz Clean", 1: "Deluxe Rvb", 2: "Twin Rvb", 3: "Class A30", 4: "Brit 800", 5: "1987x50", 6: "Fireman HBE", 7: "Dual Rect", 8: "DIE VH4", 9: "AGL", 10: "Starlift", 11: "MLD", 12: "Stageman" },
    cabinet: { 0: "V1960", 1: "A212", 2: "BS410", 3: "DR112", 4: "GB412", 5: "JZ120", 6: "TR212", 7: "V412", 8: "AGL DB810", 9: "AMP SV810", 10: "MKB 410", 11: "TRC 410", 12: "G HBird EG Magnetic", 13: "G J15 EG Magnetic", 14: "M D45 EG Magnetic", 15: "GIB J200 EG Magnetic", 16: "GIB J45 EG Magnetic", 17: "TL 314 EG Magnetic", 18: "M HD28 EG Magnetic" },
    efx: { 3: "PH 100", 4: "ST Singer", 6: "Katana", 10: "Red Dirt", 13: "Rose Comp" },
    modulation: { 0: "Phaser", 1: "Chorus", 2: "ST Chorus", 3: "SCF", 4: "U-Vibe", 5: "Tremolo" },
    delay: { 0: "Analog Delay", 1: "Tape Echo", 2: "Mod Delay", 3: "Ping Pong" },
    reverb: { 0: "Room", 1: "Hall", 2: "Plate", 3: "Spring", 4: "Shimmer Reverb" },
  },
  "mightyair_v2": {
    confidence: "confirmed",
    amp: { 0: "Jazz Clean", 1: "Deluxe Rvb", 2: "Twin Rvb", 3: "Class A30", 4: "Brit 800", 5: "1987x50", 6: "Fireman HBE", 7: "Dual Rect", 8: "DIE VH4", 9: "AGL", 10: "Starlift", 11: "MLD", 12: "Stageman" },
    cabinet: { 0: "V1960", 1: "A212", 2: "BS410", 3: "DR112", 4: "GB412", 5: "JZ120", 6: "TR212", 7: "V412", 8: "AGL DB810", 9: "AMP SV810", 10: "MKB 410", 11: "TRC 410", 12: "G HBird EG Magnetic", 13: "G J15 EG Magnetic", 14: "M D45 EG Magnetic", 15: "GIB J200 EG Magnetic", 16: "GIB J45 EG Magnetic", 17: "TL 314 EG Magnetic", 18: "M HD28 EG Magnetic" },
    efx: { 3: "PH 100", 4: "ST Singer", 6: "Katana", 10: "Red Dirt", 13: "Rose Comp" },
    modulation: { 0: "Phaser", 1: "Chorus", 2: "ST Chorus", 3: "SCF", 4: "U-Vibe", 5: "Tremolo" },
    delay: { 0: "Analog Delay", 1: "Tape Echo", 2: "Mod Delay", 3: "Ping Pong" },
    reverb: { 0: "Room", 1: "Hall", 2: "Plate", 3: "Spring", 4: "Shimmer Reverb" },
  },
  "8bt": {
    confidence: "confirmed",
    amp: { 0: "Amplifier" },
    modulation: { 0: "Phaser", 1: "Chorus", 2: "Tremolo", 3: "Vibe" },
    delay: { 0: "Delay 1", 1: "Delay 2", 2: "Delay 3", 3: "Delay 4" },
    reverb: { 0: "Room", 1: "Hall", 2: "Plate", 3: "Spring" },
  },
  "2040bt": {
    confidence: "confirmed",
    amp: { 0: "Amplifier" },
    modulation: { 0: "Phaser", 1: "Chorus", 2: "Tremolo" },
    delay: { 0: "Analog Delay", 1: "Modulation", 2: "Digital Delay" },
    reverb: { 0: "Hall", 1: "Plate", 2: "Spring" },
  },
  "40bt": {
    confidence: "assumed",
    amp: { 0: "Amplifier" },
    modulation: { 0: "Phaser", 1: "Chorus", 2: "Tremolo" },
    delay: { 0: "Analog Delay", 1: "Modulation", 2: "Digital Delay" },
    reverb: { 0: "Hall", 1: "Plate", 2: "Spring" },
  },
  "lite": {
    confidence: "confirmed",
    amp: { 0: "Amplifier" },
    modulation: { 0: "Phaser", 1: "Chorus", 2: "Tremolo", 3: "Vibe" },
    ambience: { 0: "Delay 1", 1: "Delay 2", 2: "Delay 3", 3: "Delay 4", 10: "Room", 11: "Hall", 12: "Plate", 13: "Spring" },
  },
  "20btmk2": {
    confidence: "assumed",
    amp: { 1: "Jazz Clean", 2: "Deluxe Rvb", 3: "Bass Mate", 4: "Tweedy", 5: "Twin Reverb", 6: "Hiwire", 7: "Cali Crunch", 8: "Class A15", 9: "Class A30", 10: "Plexi 100", 11: "Plexi 45", 12: "Brit 800", 13: "1987x50", 14: "Slo 100", 15: "Fireman HBE", 16: "Dual Rect", 17: "DIE VH4", 18: "Vibro King", 19: "Budda", 20: "Mr. Z38", 21: "Super Rvb", 22: "Brit Blues", 23: "Match D30", 24: "Brit 2000", 25: "Uber HiGain", 26: "AGL", 27: "MLD", 28: "Optima Air", 29: "Stageman" },
    cabinet: { 1: "JZ120", 2: "DR112", 3: "TR212", 4: "HIWIRE412", 5: "CALI 112", 6: "A112", 7: "GB412", 8: "M1960AX", 9: "M1960AV", 10: "M1960TV", 11: "SLO412", 12: "FIREMAN 412", 13: "RECT 412", 14: "DIE412", 15: "MATCH212", 16: "UBER412", 17: "BS410", 18: "A212", 19: "M1960AHW", 20: "M1936", 21: "BUDDA112", 22: "Z212", 23: "SUPERVERB410", 24: "VIBROKING310", 25: "AGL_DB810", 26: "AMP_SV212", 27: "AMP_SV410", 28: "AMP_SV810", 29: "BASSGUY410", 30: "EDEN410", 31: "MKB410", 32: "G-HBIRD", 33: "G-J15", 34: "M-D45" },
    efx: { 1: "Distortion+", 2: "RC Boost", 3: "AC Boost", 4: "Dist One", 5: "T Screamer", 6: "Blues Drive", 7: "Morning Drive", 8: "Eat Dist", 9: "Red Dirt", 10: "Crunch", 11: "Muff Fuzz", 12: "Katana", 13: "ST Singer", 14: "Touch Wah" },
    modulation: { 1: "CE-1", 2: "CE-2", 3: "ST Chorus", 4: "Vibrato", 5: "Detune", 6: "Flanger", 7: "Phase 90", 8: "Phase 100", 9: "S.C.F.", 10: "U-Vibe", 11: "Tremolo", 12: "Rotary", 13: "SCH-1", 14: "Mono Octave" },
    delay: { 1: "Analog", 2: "Digital Delay", 3: "Modulation", 4: "Tape Echo", 5: "Pan Delay", 6: "Phi Delay" },
    reverb: { 1: "Room", 2: "Hall", 3: "Plate", 4: "Spring", 5: "Shimmer", 6: "Damp" },
    compressor: { 1: "Rose Comp", 2: "K Comp", 3: "Studio Comp" },
    eq: { 0: "Speaker EQ", 1: "6-Band", 3: "10-Band" },
  },
  "40btmk2": {
    confidence: "assumed",
    amp: { 1: "Jazz Clean", 2: "Deluxe Rvb", 3: "Bass Mate", 4: "Tweedy", 5: "Twin Reverb", 6: "Hiwire", 7: "Cali Crunch", 8: "Class A15", 9: "Class A30", 10: "Plexi 100", 11: "Plexi 45", 12: "Brit 800", 13: "1987x50", 14: "Slo 100", 15: "Fireman HBE", 16: "Dual Rect", 17: "DIE VH4", 18: "Vibro King", 19: "Budda", 20: "Mr. Z38", 21: "Super Rvb", 22: "Brit Blues", 23: "Match D30", 24: "Brit 2000", 25: "Uber HiGain", 26: "AGL", 27: "MLD", 28: "Optima Air", 29: "Stageman" },
    cabinet: { 1: "JZ120", 2: "DR112", 3: "TR212", 4: "HIWIRE412", 5: "CALI 112", 6: "A112", 7: "GB412", 8: "M1960AX", 9: "M1960AV", 10: "M1960TV", 11: "SLO412", 12: "FIREMAN 412", 13: "RECT 412", 14: "DIE412", 15: "MATCH212", 16: "UBER412", 17: "BS410", 18: "A212", 19: "M1960AHW", 20: "M1936", 21: "BUDDA112", 22: "Z212", 23: "SUPERVERB410", 24: "VIBROKING310", 25: "AGL_DB810", 26: "AMP_SV212", 27: "AMP_SV410", 28: "AMP_SV810", 29: "BASSGUY410", 30: "EDEN410", 31: "MKB410", 32: "G-HBIRD", 33: "G-J15", 34: "M-D45" },
    efx: { 1: "Distortion+", 2: "RC Boost", 3: "AC Boost", 4: "Dist One", 5: "T Screamer", 6: "Blues Drive", 7: "Morning Drive", 8: "Eat Dist", 9: "Red Dirt", 10: "Crunch", 11: "Muff Fuzz", 12: "Katana", 13: "ST Singer", 14: "Touch Wah" },
    modulation: { 1: "CE-1", 2: "CE-2", 3: "ST Chorus", 4: "Vibrato", 5: "Detune", 6: "Flanger", 7: "Phase 90", 8: "Phase 100", 9: "S.C.F.", 10: "U-Vibe", 11: "Tremolo", 12: "Rotary", 13: "SCH-1", 14: "Mono Octave" },
    delay: { 1: "Analog", 2: "Digital Delay", 3: "Modulation", 4: "Tape Echo", 5: "Pan Delay", 6: "Phi Delay" },
    reverb: { 1: "Room", 2: "Hall", 3: "Plate", 4: "Spring", 5: "Shimmer", 6: "Damp" },
    compressor: { 1: "Rose Comp", 2: "K Comp", 3: "Studio Comp" },
    eq: { 0: "Speaker EQ", 1: "6-Band", 3: "10-Band" },
  },
  "60btmk2": {
    confidence: "assumed",
    amp: { 1: "Jazz Clean", 2: "Deluxe Rvb", 3: "Bass Mate", 4: "Tweedy", 5: "Twin Reverb", 6: "Hiwire", 7: "Cali Crunch", 8: "Class A15", 9: "Class A30", 10: "Plexi 100", 11: "Plexi 45", 12: "Brit 800", 13: "1987x50", 14: "Slo 100", 15: "Fireman HBE", 16: "Dual Rect", 17: "DIE VH4", 18: "Vibro King", 19: "Budda", 20: "Mr. Z38", 21: "Super Rvb", 22: "Brit Blues", 23: "Match D30", 24: "Brit 2000", 25: "Uber HiGain", 26: "AGL", 27: "MLD", 28: "Optima Air", 29: "Stageman" },
    cabinet: { 1: "JZ120", 2: "DR112", 3: "TR212", 4: "HIWIRE412", 5: "CALI 112", 6: "A112", 7: "GB412", 8: "M1960AX", 9: "M1960AV", 10: "M1960TV", 11: "SLO412", 12: "FIREMAN 412", 13: "RECT 412", 14: "DIE412", 15: "MATCH212", 16: "UBER412", 17: "BS410", 18: "A212", 19: "M1960AHW", 20: "M1936", 21: "BUDDA112", 22: "Z212", 23: "SUPERVERB410", 24: "VIBROKING310", 25: "AGL_DB810", 26: "AMP_SV212", 27: "AMP_SV410", 28: "AMP_SV810", 29: "BASSGUY410", 30: "EDEN410", 31: "MKB410", 32: "G-HBIRD", 33: "G-J15", 34: "M-D45" },
    efx: { 1: "Distortion+", 2: "RC Boost", 3: "AC Boost", 4: "Dist One", 5: "T Screamer", 6: "Blues Drive", 7: "Morning Drive", 8: "Eat Dist", 9: "Red Dirt", 10: "Crunch", 11: "Muff Fuzz", 12: "Katana", 13: "ST Singer", 14: "Touch Wah" },
    modulation: { 1: "CE-1", 2: "CE-2", 3: "ST Chorus", 4: "Vibrato", 5: "Detune", 6: "Flanger", 7: "Phase 90", 8: "Phase 100", 9: "S.C.F.", 10: "U-Vibe", 11: "Tremolo", 12: "Rotary", 13: "SCH-1", 14: "Mono Octave" },
    delay: { 1: "Analog", 2: "Digital Delay", 3: "Modulation", 4: "Tape Echo", 5: "Pan Delay", 6: "Phi Delay" },
    reverb: { 1: "Room", 2: "Hall", 3: "Plate", 4: "Spring", 5: "Shimmer", 6: "Damp" },
    compressor: { 1: "Rose Comp", 2: "K Comp", 3: "Studio Comp" },
    eq: { 0: "Speaker EQ", 1: "6-Band", 3: "10-Band" },
  },
  "mightygo": {
    confidence: "unknown",
  },
}
