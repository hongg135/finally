// pages/simulate.js
import { useState } from 'react';

export default function SimulatePage() {
  const [result, setResult] = useState(null);

  const handleSimulate = async () => {
    const res = await fetch('/api/simulate', { method: 'POST' });
    const data = await res.json();
    setResult(data.data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>模擬轉換流程</h1>
      <button onClick={handleSimulate}>執行模擬消費轉換</button>

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h2>模擬結果</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
