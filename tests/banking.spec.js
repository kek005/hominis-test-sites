import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5003'

async function login(page) {
  await page.goto(`${BASE}/login`)
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByTestId('net-worth')).toBeVisible()
}

test('login gate rejects bad credentials', async ({ page }) => {
  await page.goto(`${BASE}/login`)
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByLabel('Password').fill('wrong')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByTestId('login-error')).toBeVisible()
})

test('login then see dashboard accounts', async ({ page }) => {
  await login(page)
  await expect(page.getByTestId('account-card').first()).toBeVisible()
})

test('transfer shows confirmation modal and completes', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/transfer`)
  await page.getByLabel('Amount').fill('100')
  await page.getByTestId('review-transfer').click()
  await expect(page.getByTestId('confirm-modal')).toBeVisible()
  await page.getByTestId('confirm-transfer').click()
  await expect(page.getByTestId('toast')).toBeVisible()
})

test('insufficient funds is rejected', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/transfer`)
  await page.getByLabel('Amount').fill('999999')
  await page.getByTestId('review-transfer').click()
  await expect(page.getByTestId('amount-error')).toBeVisible()
})
