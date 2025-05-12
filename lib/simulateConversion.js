// lib/simulateConversion.js
import { simulateAffiliateTask } from './simulateAffiliateTask';
import { v4 as uuidv4 } from 'uuid';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import path from 'path';

export function simulateConversion() {
  const affiliateTask = simulateAffiliateTask();
  const transactionId = uuidv4();
  const timestamp = new Date(Date.now() + Math.random() * 100000).toISOString(); // 模擬延遲轉換
  const amount = parseFloat((Math.random() * 100 + 10).toFixed(2)); // 消費金額
  const commissionRate = 0.08 + Math.random() * 0.07; // 返佣比例 8%~15%
  const commission = parseFloat((amount * commissionRate).toFixed(2));

  const transaction = {
    transactionId,
    timestamp,
    amount,
    commission,
    source: affiliateTask.affiliateId,
    userAgent: affiliateTask.userAgent,
    location: affiliateTask.location,
    ip: affiliateTask.ip,
    referrer: affiliateTask.referrer,
  };

  const filePath = path.join(process.cwd(), 'transactions.json');
  let transactions = [];

  if (existsSync(filePath)) {
    transactions = JSON.parse(readFileSync(filePath, 'utf-8'));
  }

  transactions.push(transaction);
  writeFileSync(filePath, JSON.stringify(transactions, null, 2));

  return transaction;
}
