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
