import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5008'

async function login(page) {
  await page.goto(`${BASE}/login`)
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page).toHaveURL(/\/dashboard/)
}

test('login gate rejects bad credentials', async ({ page }) => {
  await page.goto(`${BASE}/login`)
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByLabel('Password').fill('nope')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByTestId('login-error')).toBeVisible()
})

test('dashboard shows policy cards', async ({ page }) => {
  await login(page)
  await expect(page.getByTestId('policy-card').first()).toBeVisible()
})

test('file a claim through the wizard', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/file-claim`)
  // Step 1: must pick a policy
  await page.getByTestId('claim-continue').click()
  await expect(page.getByText('Select a policy.')).toBeVisible()
  await page.locator('input[name="policy"]').first().check()
  await page.getByTestId('claim-continue').click()
  // Step 2: incident details
  await page.getByLabel('Incident type').fill('Collision')
  await page.getByLabel('Date of incident').fill('2026-05-20')
  await page.getByLabel('Estimated amount').fill('2500')
  await page.getByLabel('What happened?').fill('Minor collision in a parking lot with rear bumper damage.')
  await page.getByTestId('claim-continue').click()
  // Step 3: photos -> Step 4: review -> submit
  await page.getByTestId('claim-continue').click()
  await page.getByTestId('submit-claim').click()
  await expect(page).toHaveURL(/\/claims/)
  await expect(page.getByTestId('claim-row').first()).toBeVisible()
})

test('get a quote through the wizard', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/quote`)
  await page.getByTestId('quote-type').first().click()
  await page.getByTestId('quote-continue').click()
  await page.getByLabel('ZIP code').fill('98101')
  await page.getByLabel('Age', { exact: true }).fill('34')
  await page.getByTestId('quote-continue').click()
  await page.getByLabel('Full name').fill('Morgan Hayes')
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByTestId('quote-continue').click()
  await expect(page.getByTestId('quote-estimate')).toBeVisible()
})
