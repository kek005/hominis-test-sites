import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5007'

test('events list renders', async ({ page }) => {
  await page.goto(BASE)
  await expect(page.getByRole('heading', { name: /Find your next night out/i })).toBeVisible()
  await expect(page.getByTestId('event-card').first()).toBeVisible()
})

test('select an event, pick seats, and checkout', async ({ page }) => {
  await page.goto(BASE)
  await page.getByTestId('event-card').first().click()
  await page.getByTestId('get-tickets').click()
  await expect(page.getByText('Select your seats')).toBeVisible()

  // Pick two available (enabled) seats.
  const seats = page.locator('[data-testid="seat"]:not([disabled])')
  await seats.nth(0).click()
  await seats.nth(1).click()
  await expect(page.getByTestId('to-checkout')).toBeEnabled()
  await page.getByTestId('to-checkout').click()

  // Checkout validation then success.
  await page.getByTestId('place-order').click()
  await expect(page.getByText('Name is required.')).toBeVisible()
  await page.getByLabel('Full name').fill('Demo Buyer')
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByLabel('Card number').fill('4242424242424242')
  await page.getByLabel('Expiry').fill('12/28')
  await page.getByLabel('CVC').fill('123')
  await page.getByTestId('place-order').click()
  await expect(page.getByTestId('order-code')).toBeVisible()
})
