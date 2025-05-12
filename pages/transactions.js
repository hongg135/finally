// pages/transactions.js
import { useEffect, useState } from 'react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    const res = await fetch('/api/transactions');
    const json = await res.json();
    setTransactions(json.data);
  };

  const clearData = async () => {
    await fetch('/api/transactions', { method: 'DELETE' });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>模擬交易記錄</h1>
      <button onClick={clearData}>清空交易資料</button>

      <pre style={{ marginTop: '2rem', background: '#f0f0f0', padding: '1rem' }}>
        {JSON.stringify(transactions, null, 2)}
      </pre>
    </div>
  );
}
