import { useState } from 'react';
import { makeToken, scoreColor } from './data';

export default function VendorPortal({ vendorId, isLocked, onToken }) {
  const [meter,  setMeter]  = useState('MTR_4821');
  const [amount, setAmount] = useState('200');
  const [customer, setCustomer] = useState('T. Dlamini');
  const [lastToken, setLastToken] = useState(null);
  const [loading, setLoading]     = useState(false);

  function handleGenerate(e) {
    e.preventDefault();
    if (!meter || !amount) return;
    setLoading(true);
    setTimeout(() => {
      const tx = makeToken(vendorId, meter, amount, 'device-known-001');
      setLastToken(tx);
      onToken(tx);
      setLoading(false);
    }, 600);
  }

  const score = lastToken ? lastToken.score : 0.08;

  return (
    <div className="content">
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="page-title">Request a token</div>
          <div className="page-sub">Generate a HMAC-signed prepaid electricity token</div>
        </div>
        <div className={`badge ${score >= 0.85 ? 'badge-fraud' : score >= 0.5 ? 'badge-watch' : 'badge-safe'}`}
          style={{ padding: '6px 12px', fontSize: 12, gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: scoreColor(score), display: 'inline-block' }} />
          Score {score.toFixed(2)}
        </div>
      </div>

      {isLocked ? (
        <div className="lockout-state">
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔴</div>
          <div className="lockout-title">ACCOUNT FROZEN — FRAUDULENT ACTIVITY DETECTED</div>
          <div className="lockout-sub">
            Fraud score 0.92 exceeded the security threshold at 02:14:07 SAST.<br />
            All token generation has been suspended automatically.<br />
            Contact your system administrator to unlock your account.
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card">
            <div className="card-title">Token details</div>
            <form onSubmit={handleGenerate}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Meter number</label>
                  <input className="form-input mono" value={meter} onChange={e => setMeter(e.target.value)} placeholder="MTR_4821" />
                </div>
                <div className="form-group">
                  <label className="form-label">Amount (R)</label>
                  <input className="form-input" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="200" min="10" />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Customer name</label>
                  <input className="form-input" value={customer} onChange={e => setCustomer(e.target.value)} placeholder="T. Dlamini" />
                </div>
                <div className="form-group">
                  <label className="form-label">Token type</label>
                  <input className="form-input readonly" value="Standard STS" readOnly />
                </div>
              </div>

              <div className="form-section">Security info (auto-filled)</div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Device ID</label>
                  <input className="form-input mono readonly" value="device-known-001" readOnly />
                </div>
                <div className="form-group">
                  <label className="form-label">Timestamp</label>
                  <input className="form-input mono readonly" value={new Date().toLocaleTimeString('en-ZA')} readOnly />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Vendor ID</label>
                  <input className="form-input mono readonly" value={vendorId} readOnly />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input className="form-input readonly" value="Johannesburg, GP" readOnly />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Generating...' : 'Generate token'}
              </button>
            </form>
          </div>

          <div>
            <div className="card" style={{ marginBottom: 14 }}>
              <div className="card-title">Session info</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  ['Vendor ID', vendorId],
                  ['Status', 'Active'],
                  ['Tokens today', '8'],
                  ['Daily limit', '50'],
                ].map(([k, v]) => (
                  <div key={k} className="metric">
                    <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k}</div>
                    <div style={{ fontFamily: k === 'Vendor ID' ? 'var(--font-mono)' : '', fontSize: 13, fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {lastToken ? (
              <div className="token-output">
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                  Token generated — accepted
                </div>
                <div className="token-hash">{lastToken.token}</div>
                <div className="token-tags">
                  <span className="badge badge-teal">HMAC signed</span>
                  <span className="badge badge-teal">Audit logged</span>
                  <span className="badge badge-safe">Score: {lastToken.score.toFixed(2)}</span>
                  <span className="badge badge-info">{Math.round(parseInt(amount) / 4)} kWh</span>
                </div>
              </div>
            ) : (
              <div className="card" style={{ background: 'var(--gray-light)', border: 'none' }}>
                <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-faint)', fontSize: 12 }}>
                  <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.4 }}>⚡</div>
                  No token generated yet.<br />Fill in the form and click generate.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
