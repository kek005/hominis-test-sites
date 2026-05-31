import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5010'

test('listings render and filters narrow the list', async ({ page }) => {
  await page.goto(BASE)
  await expect(page.getByRole('heading', { name: /Find a place that feels like home/i })).toBeVisible()
  const cards = page.getByTestId('property-card')
  await expect(cards.first()).toBeVisible()
  const before = await cards.count()
  expect(before).toBeGreaterThan(8)
  await page.getByLabel('City').selectOption('Austin, TX')
  // Austin has 3 seeded properties; toHaveCount auto-waits for React.
  await expect(cards).toHaveCount(3)
})

test('save toggle persists across navigation', async ({ page }) => {
  await page.goto(BASE)
  await page.getByTestId('save-toggle').first().click()
  await page.goto(`${BASE}/saved`)
  await expect(page.getByRole('heading', { name: /Saved homes/i })).toBeVisible()
})

test('property detail shows mortgage estimate and tour modal validates', async ({ page }) => {
  await page.goto(BASE)
  await page.getByTestId('property-card').first().getByRole('link').first().click()
  await expect(page.getByTestId('monthly-payment')).toBeVisible()
  await page.getByTestId('schedule-tour').click()
  await expect(page.getByTestId('tour-modal')).toBeVisible()
  await page.getByTestId('submit-tour').click()
  await expect(page.getByText('Required').first()).toBeVisible()
})

test('mortgage page computes a monthly payment', async ({ page }) => {
  await page.goto(`${BASE}/mortgage`)
  await expect(page.getByTestId('mortgage-monthly')).toBeVisible()
})
