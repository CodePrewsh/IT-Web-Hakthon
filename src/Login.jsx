import { useState } from 'react';

export default function Login({ onLogin }) {
  const [vid, setVid]  = useState('VENDOR_007');
  const [pass, setPass] = useState('');
  const [err, setErr]   = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!vid.trim()) { setErr('Please enter your vendor ID.'); return; }
    onLogin(vid.trim());
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-icon">
            <div className="login-icon-sq" />
          </div>
          <div className="login-title">Vendor sign in</div>
          <div className="login-sub">TokenSentinel vending platform</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Vendor ID</label>
            <input
              className="form-input mono"
              value={vid}
              onChange={e => setVid(e.target.value)}
              placeholder="VENDOR_007"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Device fingerprint</label>
            <input
              className="form-input mono readonly"
              value="device-known-001 (auto-detected)"
              readOnly
            />
          </div>
          {err && (
            <p style={{ fontSize: 11, color: 'var(--red)', marginBottom: 10 }}>{err}</p>
          )}
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
        <p className="login-footer">Session is monitored for security</p>
      </div>
    </div>
  );
}
