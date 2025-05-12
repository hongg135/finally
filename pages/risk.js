// pages/risk.js
import { useState } from 'react';

export default function RiskPage() {
  const [ip, setIp] = useState('');
  const [deviceFingerprint, setDeviceFingerprint] = useState('');
  const [riskResult, setRiskResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/risk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip, deviceFingerprint })
    });
    const json = await res.json();
    if (json.success) {
      setRiskResult(json);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>風險行為檢測</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="IP 地址"
          value={ip}
          onChange={e => setIp(e.target.value)}
        /><br />
        <input
          placeholder="裝置指紋"
          value={deviceFingerprint}
          onChange={e => setDeviceFingerprint(e.target.value)}
        /><br />
        <button type="submit">檢查風險</button>
      </form>

      {riskResult && (
        <div style={{ marginTop: '2rem' }}>
          <h2>風險分析結果</h2>
          <pre style={{ background: '#eee', padding: '1rem' }}>
            {JSON.stringify(riskResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
