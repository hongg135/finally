// pages/api/risk.js
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'riskLog.json');

// 模擬 IP 分析與裝置指紋檢查
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { ip, deviceFingerprint } = req.body;

    if (!ip || !deviceFingerprint) {
      return res.status(400).json({ success: false, message: '缺少必要參數' });
    }

    // 模擬風險評分
    const riskScore = Math.random();  // 隨機生成風險分數 (0 - 1)

    const log = {
      id: Date.now(),
      ip,
      deviceFingerprint,
      riskScore,
      time: new Date().toISOString(),
    };

    // 讀取並寫入風險報告檔案
    const data = fs.existsSync(dbPath)
      ? JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
      : [];
    
    data.push(log);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    return res.status(200).json({ success: true, riskScore, log });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
