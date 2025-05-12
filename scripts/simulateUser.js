// scripts/simulateUser.js

// 引入必要的套件與函式
const { faker } = require('@faker-js/faker'); // 用於產生隨機用戶資料
const UserAgent = require('user-agents'); // 用來產生隨機裝置資訊（瀏覽器類型）
const geoip = require('geoip-lite'); // 用來根據 IP 推估地區位置
const { v4: uuidv4 } = require('uuid'); // 用來產生唯一的 Session ID
const fetch = require('node-fetch'); // 模擬送出 HTTP 請求，記錄到後端

// 產生隨機 IP（IPv4 格式）
function getRandomIP() {
  return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
}

// 模擬一筆訪問行為
function simulateVisit({ region = 'US', productId = 'demo-product' }) {
  const ip = getRandomIP(); // 隨機 IP
  const geo = geoip.lookup(ip) || { city: 'Unknown', country: region }; // 嘗試解析 IP 所在地
  const userAgent = new UserAgent(); // 隨機裝置用戶代理字串

  const sessionId = uuidv4(); // 每筆請求唯一 Session ID
  const visitData = {
    sessionId,
    productId,
    ip,
    geo,
    userAgent: userAgent.toString(),
    timestamp: Date.now()
  };

  console.log('🔍 模擬訪問紀錄:', visitData);

  // 發送到後端 API，可自訂 URL 或改為寫入資料庫
  return fetch('http://localhost:3000/api/transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(visitData)
  }).then(res => res.json()).catch(console.error);
}

// 導出函式給外部使用
module.exports = { simulateVisit };
