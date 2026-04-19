export default function Nav({ page, setPage, vendorId, isLocked }) {
  return (
    <nav className="ts-nav">
      <div className="ts-nav-logo">
        <div className="ts-nav-dot" />
        TokenSentinel
      </div>
      <div className="ts-nav-right">
        {vendorId && (
          <span style={{ fontSize: 11, color: 'var(--teal-mid)', fontFamily: 'var(--font-mono)' }}>
            {vendorId}
          </span>
        )}
        {vendorId && (
          <>
            <button
              className={`ts-nav-link ${page === 'portal' ? 'active' : ''}`}
              onClick={() => setPage('portal')}
            >Vendor portal</button>
            <button
              className={`ts-nav-link ${page === 'siem' ? 'active' : ''}`}
              onClick={() => setPage('siem')}
            >SIEM dashboard</button>
            <button
              className={`ts-nav-link ${page === 'audit' ? 'active' : ''}`}
              onClick={() => setPage('audit')}
            >Audit trail</button>
          </>
        )}
        <div className="ts-live">
          <div className="ts-live-pulse" />
          Live
        </div>
        {vendorId && (
          <button
            className="ts-nav-link"
            onClick={() => setPage('login')}
            style={{ color: 'var(--text-faint)' }}
          >Sign out</button>
        )}
      </div>
    </nav>
  );
}
