// lib/mockUserContext.js
import { faker } from '@faker-js/faker';
import UserAgent from 'user-agents';
import { v4 as uuidv4 } from 'uuid';

/**
 * 產生模擬使用者上下文資料
 * @returns {Object} 模擬的 user context
 */
export function generateMockUserContext() {
  const ip = faker.internet.ip(); // IPv4
  const ua = new UserAgent().toString(); // 常見裝置 UA
  const deviceId = uuidv4(); // 模擬裝置 ID
  const referrerList = [
    'https://google.com',
    'https://facebook.com',
    'https://t.co',
    'https://instagram.com',
    'https://youtube.com',
  ];
  const referrer = faker.helpers.arrayElement(referrerList);

  return {
    ip,
    ua,
    deviceId,
    referrer,
  };
}
