// pages/api/transaction.js
import { saveTransaction } from '../../lib/saveTransaction';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, amount, transactionId } = req.body;

    if (!userId || !amount || !transactionId) {
      return res.status(400).json({ success: false, message: '缺少必要參數' });
    }

    try {
      await saveTransaction({ userId, amount, transactionId });
      return res.status(200).json({ success: true, message: '交易已儲存' });
    } catch (error) {
      return res.status(500).json({ success: false, message: '儲存交易時發生錯誤' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
