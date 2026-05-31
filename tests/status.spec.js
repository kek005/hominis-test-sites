import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5000'

test('status page lists every site with up/down indicators', async ({ page }) => {
  await page.goto(`${BASE}/status/`)
  await expect(page.getByRole('heading', { name: 'System status' })).toBeVisible()

  // status.json is loaded and rows are rendered for all 12 sites.
  const rows = page.getByTestId('status-row')
  await expect(rows.first()).toBeVisible()
  expect(await rows.count()).toBe(12)

  // After pings resolve, the running count should equal the total.
  await expect(page.getByTestId('status-up').first()).toBeVisible()
  await expect(page.locator('#running')).toHaveText('12')
  await expect(page.locator('#total')).toHaveText('12')
})

test('status.json is reachable and well-formed', async ({ request }) => {
  const res = await request.get(`${BASE}/status.json`)
  expect(res.status()).toBe(200)
  const body = await res.json()
  expect(typeof body.startedAt).toBe('string')
  expect(Array.isArray(body.sites)).toBe(true)
  expect(body.sites.length).toBe(12)
})
