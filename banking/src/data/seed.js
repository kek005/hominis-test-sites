// Deterministic seed data for Meridian Bank.

export const DEMO_USER = { email: 'demo@hominis.test', password: 'password', name: 'Jordan Avery' }

export const ACCOUNTS = [
  { id: 'chk-001', name: 'Everyday Checking', type: 'Checking', number: '•••• 4821', balance: 4280.55 },
  { id: 'sav-002', name: 'High-Yield Savings', type: 'Savings', number: '•••• 7390', balance: 18650.0 },
  { id: 'crd-003', name: 'Platinum Credit Card', type: 'Credit', number: '•••• 1102', balance: -642.18 },
]

export const TRANSACTIONS = {
  'chk-001': [
    { id: 't1', date: '2026-05-27', desc: 'Whole Foods Market', category: 'Groceries', amount: -86.42 },
    { id: 't2', date: '2026-05-26', desc: 'Payroll — Northwind Inc', category: 'Income', amount: 3120.0 },
    { id: 't3', date: '2026-05-25', desc: 'Shell Gas Station', category: 'Transport', amount: -54.1 },
    { id: 't4', date: '2026-05-24', desc: 'Netflix', category: 'Subscriptions', amount: -15.99 },
    { id: 't5', date: '2026-05-23', desc: 'Transfer to Savings', category: 'Transfer', amount: -500.0 },
    { id: 't6', date: '2026-05-22', desc: 'Blue Bottle Coffee', category: 'Dining', amount: -6.75 },
    { id: 't7', date: '2026-05-21', desc: 'Amazon', category: 'Shopping', amount: -129.34 },
    { id: 't8', date: '2026-05-20', desc: 'City Water & Power', category: 'Utilities', amount: -98.12 },
    { id: 't9', date: '2026-05-19', desc: 'Venmo from Sam', category: 'Income', amount: 40.0 },
    { id: 't10', date: '2026-05-18', desc: 'Trader Joe’s', category: 'Groceries', amount: -62.18 },
    { id: 't11', date: '2026-05-16', desc: 'Uber', category: 'Transport', amount: -23.5 },
    { id: 't12', date: '2026-05-15', desc: 'Spotify', category: 'Subscriptions', amount: -10.99 },
  ],
  'sav-002': [
    { id: 's1', date: '2026-05-23', desc: 'Transfer from Checking', category: 'Transfer', amount: 500.0 },
    { id: 's2', date: '2026-05-01', desc: 'Interest payment', category: 'Income', amount: 31.2 },
    { id: 's3', date: '2026-04-23', desc: 'Transfer from Checking', category: 'Transfer', amount: 500.0 },
    { id: 's4', date: '2026-04-01', desc: 'Interest payment', category: 'Income', amount: 29.85 },
  ],
  'crd-003': [
    { id: 'c1', date: '2026-05-27', desc: 'Delta Air Lines', category: 'Travel', amount: -312.4 },
    { id: 'c2', date: '2026-05-24', desc: 'Apple Store', category: 'Shopping', amount: -199.0 },
    { id: 'c3', date: '2026-05-20', desc: 'Statement payment', category: 'Payment', amount: 450.0 },
    { id: 'c4', date: '2026-05-12', desc: 'The Cheesecake Factory', category: 'Dining', amount: -78.22 },
    { id: 'c5', date: '2026-05-05', desc: 'Best Buy', category: 'Shopping', amount: -302.56 },
  ],
}

export const STATEMENTS = [
  { id: 'stmt-2026-04', period: 'April 2026', account: 'Everyday Checking', closing: 4112.31 },
  { id: 'stmt-2026-03', period: 'March 2026', account: 'Everyday Checking', closing: 3890.07 },
  { id: 'stmt-2026-02', period: 'February 2026', account: 'Everyday Checking', closing: 4521.66 },
  { id: 'stmt-2026-04-sav', period: 'April 2026', account: 'High-Yield Savings', closing: 17620.15 },
  { id: 'stmt-2026-03-sav', period: 'March 2026', account: 'High-Yield Savings', closing: 17090.3 },
]
