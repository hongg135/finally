// lib/riskEvaluator.js
import geoip from 'geoip-lite';
import { UAParser } from 'ua-parser-js';

/**
 * @param {Object} context - 模擬請求資訊
 * @param {string} context.ip - 使用者 IP
 * @param {string} context.ua - 使用者 User-Agent
 * @param {string} context.deviceId - 模擬裝置唯一 ID
 * @returns {number} 0~100 的風控分數，數值越高代表風控風險越高
 */
export function evaluateRisk({ ip, ua, deviceId }) {
  let score = 0;

  const geo = geoip.lookup(ip);
  if (!geo || !geo.country || !geo.city) score += 30;

  if (ua) {
    const parser = new UAParser(ua);
    const deviceType = parser.getDevice().type || 'desktop';
    if (deviceType === 'bot') score += 50;
  } else {
    score += 20;
  }

  if (!deviceId || deviceId.length < 10) score += 20;

  return Math.min(100, score);
}
