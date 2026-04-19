export const VENDORS = [
  { id: 'VENDOR_001', name: 'Sipho Dube',      score: 0.08, status: 'safe',   tokens: 12, locked: false },
  { id: 'VENDOR_004', name: 'Naledi Mokoena',  score: 0.52, status: 'watch',  tokens: 31, locked: false },
  { id: 'VENDOR_007', name: 'Thabo Nkosi',     score: 0.08, status: 'safe',   tokens:  8, locked: false },
  { id: 'VENDOR_012', name: 'Zanele Khumalo',  score: 0.15, status: 'safe',   tokens: 19, locked: false },
  { id: 'VENDOR_019', name: 'Mpho Sithole',    score: 0.68, status: 'watch',  tokens: 44, locked: false },
];

export const INITIAL_EVENTS = [
  { time: '10:10:00', type: 'ok',    msg: 'VENDOR_001 — token generated — score 0.08 — normal' },
  { time: '10:10:22', type: 'ok',    msg: 'VENDOR_012 — token generated — score 0.15 — normal' },
  { time: '10:11:05', type: 'watch', msg: 'VENDOR_019 score elevated — 0.68 — added to watchlist' },
  { time: '10:11:44', type: 'watch', msg: 'VENDOR_004 score 0.52 — velocity above baseline' },
  { time: '10:12:00', type: 'ok',    msg: 'VENDOR_007 — token generated — score 0.08 — normal' },
];

export const INITIAL_TRAIL = [
  { id:1, time:'10:10:00', vendor:'VENDOR_001', meter:'MTR_4821', amount:'R200', hmac:'f9e8d7c6', device:'dev-001', score:0.08, status:'normal' },
  { id:2, time:'10:10:14', vendor:'VENDOR_012', meter:'MTR_2291', amount:'R100', hmac:'a1b2c3d4', device:'dev-003', score:0.15, status:'normal' },
  { id:3, time:'10:10:55', vendor:'VENDOR_019', meter:'MTR_8843', amount:'R200', hmac:'e2c7a19d', device:'dev-005', score:0.68, status:'watch'  },
  { id:4, time:'10:11:20', vendor:'VENDOR_004', meter:'MTR_1123', amount:'R50',  hmac:'f1d3b28c', device:'dev-002', score:0.52, status:'watch'  },
  { id:5, time:'10:12:00', vendor:'VENDOR_007', meter:'MTR_9921', amount:'R200', hmac:'a3f9c12e', device:'dev-004', score:0.08, status:'normal' },
];

export const CHART_DATA_NORMAL = [
  { t: '10:10', score: 0.08 }, { t: '10:11', score: 0.09 },
  { t: '10:12', score: 0.08 }, { t: '10:13', score: 0.10 },
  { t: '10:14', score: 0.08 }, { t: '10:15', score: 0.09 },
];

export const CHART_DATA_ATTACK = [
  { t: '10:10', score: 0.08 }, { t: '10:11', score: 0.09 },
  { t: '10:12', score: 0.10 }, { t: '10:13', score: 0.30 },
  { t: '10:13:30', score: 0.55 }, { t: '10:14', score: 0.78 },
  { t: '10:14:30', score: 0.88 }, { t: '10:14:45', score: 0.92 },
];

export function scoreColor(s) {
  if (s >= 0.85) return 'var(--red)';
  if (s >= 0.5)  return 'var(--amber)';
  return 'var(--green)';
}

export function scoreStatus(s) {
  if (s >= 0.85) return 'fraud';
  if (s >= 0.5)  return 'watch';
  return 'safe';
}

export function scoreBadgeClass(s) {
  if (s >= 0.85) return 'badge-fraud';
  if (s >= 0.5)  return 'badge-watch';
  return 'badge-safe';
}

export function now() {
  return new Date().toLocaleTimeString('en-ZA', { hour12: false });
}

let txCounter = 6;
export function makeToken(vendorId, meterId, amount, deviceId) {
  const ts = Date.now();
  const fake = Math.random().toString(36).slice(2, 10);
  return {
    id: ++txCounter,
    time: now(),
    vendor: vendorId,
    meter: meterId,
    amount: `R${amount}`,
    hmac: fake,
    device: deviceId || 'dev-004',
    score: 0.08,
    status: 'normal',
    token: `${vendorId}:${meterId}:${amount}:${ts}:${deviceId}:${fake}`,
  };
}
