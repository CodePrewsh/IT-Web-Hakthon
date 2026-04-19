import { useState } from 'react';
import { INITIAL_TRAIL, scoreColor } from './data';

export default function AuditTrail({ trail }) {
  const [filter, setFilter] = useState('all');
  const [vendor, setVendor] = useState('all');

  const allRows = [...INITIAL_TRAIL, ...trail].sort((a, b) => b.id - a.id);
  const filtered = allRows.filter(r => {
    if (filter !== 'all' && r.status !== filter) return false;
    if (vendor !== 'all' && r.vendor !== vendor) return false;
    return true;
  });

  const fraudCount  = allRows.filter(r => r.status === 'fraud').length;
  const watchCount  = allRows.filter(r => r.status === 'watch').length;
  const normalCount = allRows.filter(r => r.status === 'normal').length;

  const rowClass = r => {
    if (r.status === 'fraud') return 'row-fraud';
    if (r.status === 'watch') return 'row-watch';
    return '';
  };

  const badgeClass = s => {
    if (s === 'fraud')  return 'badge-fraud';
    if (s === 'watch')  return 'badge-watch';
    return 'badge-safe';
  };

  const vendors = [...new Set(allRows.map(r => r.vendor))];

  return (
    <div className="content">
      <div className="page-header">
        <div className="page-title">Audit trail</div>
        <div className="page-sub">Immutable transaction log — every token traceable, signed, permanent</div>
      </div>

      <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <div className="metric">
          <div className="metric-val">{allRows.length}</div>
          <div className="metric-label">Total tokens</div>
        </div>
        <div className="metric">
          <div className="metric-val" style={{ color: 'var(--red)' }}>{fraudCount}</div>
          <div className="metric-label">Fraud flagged</div>
        </div>
        <div className="metric">
          <div className="metric-val" style={{ color: 'var(--amber)' }}>{watchCount}</div>
          <div className="metric-label">Watch flagged</div>
        </div>
        <div className="metric">
          <div className="metric-val" style={{ color: 'var(--green)' }}>{normalCount}</div>
          <div className="metric-label">Normal</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
          <div className="card-title" style={{ margin: 0 }}>Transaction log</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <select
              className="form-input"
              style={{ height: 32, width: 'auto', fontSize: 12, padding: '0 10px' }}
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="fraud">Fraud only</option>
              <option value="watch">Watch only</option>
              <option value="normal">Normal only</option>
            </select>
            <select
              className="form-input"
              style={{ height: 32, width: 'auto', fontSize: 12, padding: '0 10px' }}
              value={vendor}
              onChange={e => setVendor(e.target.value)}
            >
              <option value="all">All vendors</option>
              {vendors.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="ts-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Vendor</th>
                <th>Meter</th>
                <th>Amount</th>
                <th>HMAC signature</th>
                <th>Device</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-faint)', padding: 24 }}>No transactions match the filter</td></tr>
              ) : filtered.map(r => (
                <tr key={r.id} className={rowClass(r)}>
                  <td className="mono" style={{ fontSize: 11 }}>{r.time}</td>
                  <td className="mono" style={{ fontSize: 11 }}>{r.vendor}</td>
                  <td className="mono" style={{ fontSize: 11 }}>{r.meter}</td>
                  <td style={{ fontWeight: 500 }}>{r.amount}</td>
                  <td className="mono" style={{ fontSize: 10, opacity: 0.8 }}>
                    {r.hmac}
                    {r.status === 'fraud' && <span style={{ marginLeft: 4, color: 'var(--red)', fontWeight: 600 }}>:FRAUD</span>}
                  </td>
                  <td className="mono" style={{ fontSize: 11 }}>{r.device}</td>
                  <td style={{ fontWeight: 600, color: scoreColor(r.score), fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                    {r.score.toFixed(2)}
                  </td>
                  <td>
                    <span className={`badge ${badgeClass(r.status)}`}>
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--teal-light)', border: '0.5px solid #5DCAA5' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ width: 10, height: 10, background: 'var(--teal)', borderRadius: '50%', marginTop: 3, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal-deep)', marginBottom: 6 }}>
              Cryptographic provenance — every token traceable
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--teal-dark)', wordBreak: 'break-all', lineHeight: 1.65, marginBottom: 8 }}>
              VENDOR_007 : MTR_9921 : 200 : 1717316047 : device-known-001 : <strong>a3f9c12e</strong>
            </div>
            <div style={{ fontSize: 11, color: 'var(--teal)', lineHeight: 1.6 }}>
              HMAC-SHA256 signed — vendor ID + meter + amount + timestamp + device fingerprint embedded in every signature. Cannot be forged. Cannot be deleted. Cannot be altered.
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--text-muted)' }}>
          "This is the exact record Eskom did not have. This is what R1.1 billion looks like when you can finally trace it."
        </p>
      </div>
    </div>
  );
}
