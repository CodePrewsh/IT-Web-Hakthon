import { useState } from 'react';
import './index.css';
import Nav from './Nav';
import Login from './Login';
import VendorPortal from './VendorPortal';
import SIEMDashboard from './SIEMDashboard';
import AuditTrail from './AuditTrail';
import { now } from './data';

export default function App() {
  const [page, setPage]         = useState('login');
  const [vendorId, setVendorId] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [trail, setTrail]       = useState([]);

  function handleLogin(vid) { setVendorId(vid); setPage('portal'); }
  function handleToken(tx)  { setTrail(prev => [tx, ...prev]); }

  function handleLockout() {
    setIsLocked(true);
    const fraudRows = Array.from({ length: 8 }, (_, i) => ({
      id: 100 + i,
      time: now(),
      vendor: 'VENDOR_007',
      meter: 'MTR_' + Math.floor(Math.random() * 9000 + 1000),
      amount: 'R200',
      hmac: Math.random().toString(36).slice(2, 10) + ':FRAUD',
      device: 'device-known-001',
      score: parseFloat((0.85 + Math.random() * 0.1).toFixed(2)),
      status: 'fraud',
    }));
    setTrail(prev => [...fraudRows, ...prev]);
  }

  function handleSetPage(p) {
    if (p === 'login') { setVendorId(''); setIsLocked(false); setTrail([]); }
    setPage(p);
  }

  return (
    <>
      <Nav page={page} setPage={handleSetPage} vendorId={vendorId} isLocked={isLocked} />
      {page === 'login'  && <Login onLogin={handleLogin} />}
      {page === 'portal' && vendorId && <VendorPortal vendorId={vendorId} isLocked={isLocked} onToken={handleToken} />}
      {page === 'siem'   && vendorId && <SIEMDashboard trail={trail} isLocked={isLocked} onLockout={handleLockout} />}
      {page === 'audit'  && vendorId && <AuditTrail trail={trail} />}
    </>
  );
}
