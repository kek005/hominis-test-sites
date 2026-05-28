import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5005'

async function login(page) {
  await page.goto(`${BASE}/login`)
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Sign in' }).click()
  // Successful login lands on the authenticated app shell (default /users).
  await expect(page).toHaveURL(/\/(users|dashboard)/)
}

test('login then dashboard analytics render', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/dashboard`)
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  await expect(page.getByText('Total users')).toBeVisible()
})

test('users table renders with rows and supports edit modal', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/users`)
  await expect(page.getByTestId('user-row').first()).toBeVisible()
  expect(await page.getByTestId('user-row').count()).toBe(10) // page size

  await page.getByTestId('new-user').click()
  await expect(page.getByTestId('user-modal')).toBeVisible()
  await page.getByLabel('Name').fill('New Person')
  await page.getByLabel('Email').fill('new.person@example.com')
  await page.getByTestId('save-user').click()
  await expect(page.getByTestId('toast')).toBeVisible()
})

test('bulk select shows the action bar', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/users`)
  await page.getByLabel('Select all on page').check()
  await expect(page.getByTestId('bulk-bar')).toBeVisible()
})

test('user drawer opens from a row', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/users`)
  await page.getByTestId('user-row').first().getByRole('button', { name: 'View' }).click()
  await expect(page.getByTestId('user-drawer')).toBeVisible()
})

test('audit log and roles pages render', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/audit`)
  await expect(page.getByTestId('audit-row').first()).toBeVisible()
  await page.goto(`${BASE}/roles`)
  await expect(page.getByTestId('perm-row').first()).toBeVisible()
})
