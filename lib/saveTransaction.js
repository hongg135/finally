// lib/saveTransaction.js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'transactions.json');

export function saveTransaction(transaction) {
  let transactions = [];

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    transactions = JSON.parse(fileData);
  }

  transactions.push(transaction);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2));
}
