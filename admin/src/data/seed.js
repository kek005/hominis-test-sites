// Deterministic seed data for Console Admin — 52 users generated without
// randomness so the table is identical on every reset.

export const DEMO_USER = { email: 'demo@hominis.test', password: 'password', name: 'Admin' }

export const ROLES = ['Owner', 'Admin', 'Editor', 'Viewer']
export const STATUSES = ['Active', 'Invited', 'Suspended']

const FIRST = ['Ava', 'Liam', 'Mia', 'Noah', 'Zoe', 'Ethan', 'Lily', 'Owen', 'Aria', 'Leo', 'Nora', 'Eli', 'Ruby', 'Kai', 'Iris', 'Max', 'Cleo', 'Finn', 'Maya', 'Jude', 'Esme', 'Theo', 'Nina', 'Cole', 'Wren', 'Reid']
const LAST = ['Reed', 'Cole', 'Frost', 'Vance', 'Pike', 'Hale', 'Lowe', 'Nash', 'Webb', 'Shaw', 'Quinn', 'Ross', 'Dorn', 'Knox', 'Bray', 'Fox', 'Lane', 'Cruz', 'Sims', 'York', 'Page', 'Bell', 'Hart', 'Dean', 'Marsh', 'Wolfe']

function makeUsers() {
  const users = []
  for (let i = 0; i < 52; i++) {
    const first = FIRST[i % FIRST.length]
    const last = LAST[(i * 7) % LAST.length]
    const role = ROLES[i % ROLES.length]
    const status = STATUSES[i % 5 === 0 ? 1 : i % 7 === 0 ? 2 : 0] // mostly Active
    const day = ((i * 3) % 27) + 1
    users.push({
      id: 'u' + (1000 + i),
      name: `${first} ${last}`,
      email: `${first}.${last}`.toLowerCase() + (i > 25 ? i : '') + '@example.com',
      role,
      status,
      lastActive: `2026-05-${String(day).padStart(2, '0')}`,
    })
  }
  // Make the first user the owner / current admin.
  users[0] = { ...users[0], name: 'Admin User', email: 'demo@hominis.test', role: 'Owner', status: 'Active', lastActive: '2026-05-28' }
  return users
}

export const USERS = makeUsers()

export const SETTINGS = {
  workspaceName: 'Acme Workspace',
  supportEmail: 'support@acme.example',
  timezone: 'America/New_York',
  twoFactor: true,
  weeklyDigest: false,
  seatLimit: 100,
}

// --- Analytics: deterministic 14-day signup / active series ---
export const SIGNUPS = [4, 6, 3, 8, 5, 9, 7, 11, 6, 10, 8, 12, 9, 14].map((count, i) => ({
  date: `2026-05-${String(15 + i).padStart(2, '0')}`,
  signups: count,
  active: 30 + count * 2 + (i % 3) * 4,
}))

// --- Audit log ---
const AUDIT_ACTORS = ['Admin User', 'Ava Reed', 'Liam Frost', 'Mia Vance', 'System']
const AUDIT_TEMPLATES = [
  ['user.invite', 'Invited {t} to the workspace', 'success'],
  ['user.role_change', 'Changed role for {t} to Editor', 'info'],
  ['user.suspend', 'Suspended {t}', 'warning'],
  ['user.delete', 'Deleted user {t}', 'danger'],
  ['auth.login', 'Signed in from 192.168.1.{n}', 'info'],
  ['auth.2fa_enabled', 'Enabled two-factor authentication', 'success'],
  ['billing.plan_change', 'Upgraded plan to Business', 'success'],
  ['settings.update', 'Updated workspace settings', 'info'],
  ['api.key_created', 'Created API key “prod-{n}”', 'info'],
  ['export.users', 'Exported the users table to CSV', 'info'],
]
export const AUDIT_EVENTS = Array.from({ length: 32 }).map((_, i) => {
  const [action, tmpl, level] = AUDIT_TEMPLATES[i % AUDIT_TEMPLATES.length]
  const actor = AUDIT_ACTORS[i % AUDIT_ACTORS.length]
  const target = `${FIRST[(i * 3) % FIRST.length]} ${LAST[(i * 5) % LAST.length]}`
  const hour = String((i * 7) % 24).padStart(2, '0')
  const min = String((i * 13) % 60).padStart(2, '0')
  const day = String(27 - (i % 14)).padStart(2, '0')
  return {
    id: 'ev' + (9000 + i),
    actor,
    action,
    level,
    message: tmpl.replace('{t}', target).replace('{n}', String(10 + (i % 80))),
    at: `2026-05-${day} ${hour}:${min}`,
  }
})

// --- Roles & permissions ---
export const PERMISSIONS = ['View dashboard', 'Manage users', 'Manage billing', 'Edit settings', 'View audit log', 'Export data', 'Manage API keys']
export const ROLE_PERMISSIONS = {
  Owner:  [true, true, true, true, true, true, true],
  Admin:  [true, true, false, true, true, true, true],
  Editor: [true, false, false, false, false, true, false],
  Viewer: [true, false, false, false, false, false, false],
}

// --- Billing ---
export const PLAN = {
  name: 'Business',
  price: 49,
  interval: 'seat / month',
  seatsUsed: 52,
  seatLimit: 100,
  renews: '2026-06-15',
  card: 'Visa •••• 4242',
}
export const INVOICES = [
  { id: 'INV-2026-05', date: '2026-05-15', amount: 2548.0, status: 'Paid' },
  { id: 'INV-2026-04', date: '2026-04-15', amount: 2401.0, status: 'Paid' },
  { id: 'INV-2026-03', date: '2026-03-15', amount: 2303.0, status: 'Paid' },
  { id: 'INV-2026-02', date: '2026-02-15', amount: 2156.0, status: 'Paid' },
]
