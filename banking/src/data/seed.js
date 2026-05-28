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

export const PAYEES = [
  { id: 'pay1', name: 'City Water & Power', category: 'Utilities', account: '••• 8841' },
  { id: 'pay2', name: 'Summit Mortgage', category: 'Housing', account: '••• 2207' },
  { id: 'pay3', name: 'Verizon Wireless', category: 'Phone', account: '••• 5530' },
  { id: 'pay4', name: 'Acme Insurance', category: 'Insurance', account: '••• 1199' },
  { id: 'pay5', name: 'Northwind Card Services', category: 'Credit card', account: '••• 1102' },
]

export const SCHEDULED_PAYMENTS = [
  { id: 'sp1', payeeId: 'pay2', payee: 'Summit Mortgage', amount: 1840.0, date: '2026-06-01', frequency: 'Monthly' },
  { id: 'sp2', payeeId: 'pay3', payee: 'Verizon Wireless', amount: 85.0, date: '2026-06-05', frequency: 'Monthly' },
]

export const CARDS = [
  { id: 'card1', name: 'Everyday Debit', accountId: 'chk-001', number: '•••• •••• •••• 4821', expiry: '08/28', type: 'Visa Debit', frozen: false, monthlyLimit: 3000, spentThisMonth: 1240.55, color: '#2563eb' },
  { id: 'card2', name: 'Platinum Credit', accountId: 'crd-003', number: '•••• •••• •••• 1102', expiry: '03/27', type: 'Visa Credit', frozen: false, monthlyLimit: 5000, spentThisMonth: 892.18, color: '#0f172a' },
]

export const BUDGETS = [
  { category: 'Groceries', limit: 600, spent: 412.6 },
  { category: 'Dining', limit: 300, spent: 184.97 },
  { category: 'Transport', limit: 200, spent: 131.1 },
  { category: 'Shopping', limit: 400, spent: 631.9 },
  { category: 'Utilities', limit: 250, spent: 196.24 },
  { category: 'Subscriptions', limit: 80, spent: 53.97 },
]

export const PROFILE = {
  name: 'Jordan Avery',
  email: 'demo@hominis.test',
  phone: '(415) 555-0142',
  address: '24 Cloud Lane, Seattle, WA 98101',
  twoFactor: true,
  paperless: true,
  alerts: { largeTransactions: true, lowBalance: true, marketing: false },
}
