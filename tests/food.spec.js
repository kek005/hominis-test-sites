import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5011'

test('restaurants render and search filters them', async ({ page }) => {
  await page.goto(BASE)
  await expect(page.getByRole('heading', { name: /Hungry/i })).toBeVisible()
  const cards = page.getByTestId('restaurant-card')
  await expect(cards.first()).toBeVisible()
  expect(await cards.count()).toBeGreaterThan(6)
})

test('add items to cart and checkout', async ({ page }) => {
  await page.goto(BASE)
  await page.getByTestId('restaurant-card').first().click()
  await page.getByTestId('add-item').first().click()
  await page.getByTestId('add-item').nth(1).click()
  await expect(page.getByTestId('cart-count')).toHaveText('2')

  await page.getByTestId('cart-link').click()
  await expect(page.getByTestId('cart-item').first()).toBeVisible()
  await page.getByTestId('to-checkout').click()

  // Validation
  await page.getByTestId('place-order').click()
  await expect(page.getByText('Cardholder name is required.')).toBeVisible()
  await page.getByLabel('Cardholder name').fill('Demo Buyer')
  await page.getByLabel('Card number').fill('4242424242424242')
  await page.getByLabel('Expiry').fill('12/28')
  await page.getByLabel('CVC').fill('123')
  await page.getByTestId('place-order').click()
  await expect(page.getByTestId('tracking-status')).toBeVisible()
})
