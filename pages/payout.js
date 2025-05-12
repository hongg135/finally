// pages/payout.js
import { useState, useEffect } from 'react';

export default function PayoutPage() {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [note, setNote] = useState('');
  const [log, setLog] = useState([]);

  const fetchPayouts = async () => {
    const res = await fetch('/api/payouts');
    const json = await res.json();
    setLog(json.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/payouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, account, note })
    });
    const json = await res.json();
    if (json.success) {
      setAmount('');
      setAccount('');
      setNote('');
      fetchPayouts();
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>模擬出金系統</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="金額" value={amount} onChange={e => setAmount(e.target.value)} /><br />
        <input placeholder="收款帳號" value={account} onChange={e => setAccount(e.target.value)} /><br />
        <input placeholder="備註" value={note} onChange={e => setNote(e.target.value)} /><br />
        <button type="submit">模擬出金</button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>出金紀錄</h2>
      <pre style={{ background: '#eee', padding: '1rem' }}>
        {JSON.stringify(log, null, 2)}
      </pre>
    </div>
  );
}
