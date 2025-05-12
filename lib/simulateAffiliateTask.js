// lib/simulateAffiliateTask.js
import { generateMockUserContext } from './mockUserContext';
import { v4 as uuidv4 } from 'uuid';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import path from 'path';

/**
 * 模擬聯盟任務行為（點擊與轉換）
 * @returns {Object} 模擬任務資料
 */
export function simulateAffiliateTask() {
  const user = generateMockUserContext();

  const taskId = uuidv4();
  const timestamp = new Date().toISOString();
  const affiliateId = `aff-${faker.string.alphanumeric(6)}`;
  const commission = parseFloat((Math.random() * 15 + 1).toFixed(2)); // 隨機佣金

  const record = {
    taskId,
    timestamp,
    affiliateId,
    commission,
    ...user,
  };

  // 寫入紀錄到本地檔案（模擬資料庫）
  const filePath = path.join(process.cwd(), 'affiliate_tasks.json');
  let history = [];

  if (existsSync(filePath)) {
    history = JSON.parse(readFileSync(filePath, 'utf-8'));
  }

  history.push(record);
  writeFileSync(filePath, JSON.stringify(history, null, 2));

  return record;
}
