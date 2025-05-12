// scripts/index.js

const { simulateVisit } = require('./simulateUser');

// 模擬 5 次訪問，每次間隔 2 秒
async function runSimulation() {
  for (let i = 0; i < 5; i++) {
    await simulateVisit({ region: 'US', productId: 'mock-prod-123' });
    await new Promise(resolve => setTimeout(resolve, 2000)); // 延遲 2 秒
  }
}

runSimulation();

