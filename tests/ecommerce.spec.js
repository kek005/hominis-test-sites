import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5001'

// Pre-dismiss the first-visit newsletter popup so it doesn't intercept clicks.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    // Seed only once so state changes (cart, wishlist) survive in-test navigation.
    if (!localStorage.getItem('nimbus.state.v2')) {
      localStorage.setItem('nimbus.state.v2', JSON.stringify({
        cart: [], orders: [], user: null, wishlist: [], coupon: null, newsletterDismissed: true,
      }))
    }
  })
})

test('home renders with hero and category tiles', async ({ page }) => {
  await page.goto(BASE)
  await expect(page.getByRole('heading', { name: /Tech that keeps up with you/i })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Shop all products' })).toBeVisible()
})

test('shop lists products and add-to-cart updates the cart count', async ({ page }) => {
  await page.goto(`${BASE}/shop`)
  const cards = page.getByTestId('product-card')
  await expect(cards.first()).toBeVisible()
  expect(await cards.count()).toBeGreaterThan(10)

  await cards.first().getByRole('button', { name: 'Add', exact: true }).click()
  await expect(page.getByTestId('cart-count')).toHaveText('1')
})

test('deals page shows discounted products', async ({ page }) => {
  await page.goto(`${BASE}/deals`)
  await expect(page.getByRole('heading', { name: /Deals & clearance/i })).toBeVisible()
  await expect(page.getByTestId('product-card').first()).toBeVisible()
})

test('wishlist toggle increments the wishlist badge', async ({ page }) => {
  await page.goto(`${BASE}/shop`)
  await page.getByTestId('wishlist-toggle').first().click()
  await page.goto(`${BASE}/wishlist`)
  await expect(page.getByRole('heading', { name: /Your wishlist/i })).toBeVisible()
  await expect(page.getByTestId('product-card').first()).toBeVisible()
})
