import { defineConfig, devices } from '@playwright/test'

// Smoke tests run against the already-running dev servers (./start.sh).
export default defineConfig({
  testDir: '.',
  timeout: 30000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  use: {
    headless: true,
    actionTimeout: 10000,
    trace: 'off',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
