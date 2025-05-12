// pages/api/simulate.js
import { simulateConversion } from '../../lib/simulateConversion';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const result = simulateConversion();
    res.status(200).json({ success: true, data: result });
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
