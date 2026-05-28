// Deterministic seed data for Assure insurance portal.

export const DEMO_USER = { email: 'demo@hominis.test', password: 'password', name: 'Morgan Hayes', member: 'AS-7741920' }

export const POLICY_TYPES = ['Auto', 'Home', 'Health', 'Life']

export const POLICIES = [
  {
    id: 'pol-auto', type: 'Auto', name: 'Auto — 2023 Tesla Model 3', number: 'AU-4471-220', status: 'Active',
    premium: 142.0, cadence: 'month', renews: '2026-09-01', icon: '🚗', color: '#0d9488',
    coverage: [['Liability', '$100k / $300k'], ['Collision', '$500 deductible'], ['Comprehensive', '$250 deductible'], ['Roadside', 'Included']],
  },
  {
    id: 'pol-home', type: 'Home', name: 'Homeowners — 24 Cloud Lane', number: 'HO-8830-115', status: 'Active',
    premium: 96.5, cadence: 'month', renews: '2026-11-15', icon: '🏠', color: '#0891b2',
    coverage: [['Dwelling', '$420,000'], ['Personal property', '$210,000'], ['Liability', '$300,000'], ['Deductible', '$1,000']],
  },
  {
    id: 'pol-health', type: 'Health', name: 'Health — Premier PPO', number: 'HL-2204-991', status: 'Active',
    premium: 312.0, cadence: 'month', renews: '2026-12-31', icon: '➕', color: '#0f766e',
    coverage: [['Plan', 'Premier PPO'], ['Deductible', '$1,500'], ['Out-of-pocket max', '$6,000'], ['Primary copay', '$25']],
  },
  {
    id: 'pol-life', type: 'Life', name: 'Term Life — 20 year', number: 'LF-5567-308', status: 'Active',
    premium: 38.0, cadence: 'month', renews: '2027-02-01', icon: '🌳', color: '#115e59',
    coverage: [['Benefit', '$500,000'], ['Term', '20 years'], ['Beneficiary', 'J. Hayes'], ['Type', 'Level term']],
  },
]

export const CLAIMS = [
  { id: 'CLM-30441', policyId: 'pol-auto', policyName: 'Auto — 2023 Tesla Model 3', type: 'Collision', date: '2026-05-04', amount: 2840, status: 'In review', desc: 'Rear bumper damage in a parking lot.' },
  { id: 'CLM-30210', policyId: 'pol-home', policyName: 'Homeowners — 24 Cloud Lane', type: 'Water damage', date: '2026-03-18', amount: 5200, status: 'Approved', desc: 'Burst pipe under kitchen sink.' },
  { id: 'CLM-29980', policyId: 'pol-health', policyName: 'Health — Premier PPO', type: 'Medical', date: '2026-02-02', amount: 640, status: 'Paid', desc: 'Outpatient procedure copay reimbursement.' },
]

export const PAYMENTS = [
  { id: 'pay1', date: '2026-05-01', desc: 'Monthly premium — all policies', amount: 588.5, method: 'Visa •••• 4242', status: 'Paid' },
  { id: 'pay2', date: '2026-04-01', desc: 'Monthly premium — all policies', amount: 588.5, method: 'Visa •••• 4242', status: 'Paid' },
  { id: 'pay3', date: '2026-03-01', desc: 'Monthly premium — all policies', amount: 572.0, method: 'Visa •••• 4242', status: 'Paid' },
]

export const DOCUMENTS = [
  { id: 'doc1', name: 'Auto policy declarations', policy: 'AU-4471-220', date: '2025-09-01', kind: 'Declarations' },
  { id: 'doc2', name: 'Homeowners policy booklet', policy: 'HO-8830-115', date: '2025-11-15', kind: 'Policy' },
  { id: 'doc3', name: 'Health plan summary of benefits', policy: 'HL-2204-991', date: '2026-01-01', kind: 'Summary' },
  { id: 'doc4', name: '2025 tax statement (1095)', policy: '—', date: '2026-01-31', kind: 'Tax' },
  { id: 'doc5', name: 'Auto ID card', policy: 'AU-4471-220', date: '2025-09-01', kind: 'ID card' },
]

export const QUOTE_TYPES = [
  { id: 'auto', label: 'Auto', icon: '🚗' },
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'renters', label: 'Renters', icon: '🔑' },
  { id: 'life', label: 'Life', icon: '🌳' },
  { id: 'pet', label: 'Pet', icon: '🐾' },
]
