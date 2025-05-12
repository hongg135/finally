// pages/api/payouts.js
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'payouts.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = fs.existsSync(dbPath)
      ? JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
      : [];
    return res.status(200).json({ success: true, data });
  }

  if (req.method === 'POST') {
    const { amount, account, note } = req.body;
    if (!amount || !account) {
      return res.status(400).json({ success: false, message: '缺少必要參數' });
    }

    const data = fs.existsSync(dbPath)
      ? JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
      : [];

    const newPayout = {
      id: Date.now(),
      amount,
      account,
      note: note || '',
      time: new Date().toISOString()
    };

    data.push(newPayout);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    return res.status(200).json({ success: true, data: newPayout });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
