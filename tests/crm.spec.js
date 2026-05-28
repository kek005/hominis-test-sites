import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5004'

async function login(page) {
  await page.goto(`${BASE}/login`)
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible()
}

test('login then dashboard metrics render', async ({ page }) => {
  await login(page)
  await expect(page.getByText('Pipeline value')).toBeVisible()
})

test('pipeline kanban shows stage columns', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/pipeline`)
  const cols = page.getByTestId('kanban-column')
  await expect(cols.first()).toBeVisible()
  expect(await cols.count()).toBe(5)
  await expect(page.getByTestId('deal-card').first()).toBeVisible()
})

test('add a contact via modal', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/contacts`)
  const before = await page.getByTestId('contact-row').count()
  await page.getByTestId('add-contact').click()
  await expect(page.getByTestId('contact-modal')).toBeVisible()
  await page.getByLabel('Name').fill('Test Person')
  await page.getByLabel('Company').fill('Test Co')
  await page.getByLabel('Email').fill('test@example.com')
  await page.getByTestId('save-contact').click()
  await expect(page.getByTestId('contact-row')).toHaveCount(before + 1)
})

test('create a deal from the pipeline', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/pipeline`)
  const before = await page.getByTestId('deal-card').count()
  await page.getByTestId('new-deal').click()
  await expect(page.getByTestId('deal-modal')).toBeVisible()
  await page.getByLabel('Deal title').fill('Smoke Test Deal')
  await page.getByLabel('Value ($)').fill('5000')
  await page.getByTestId('save-deal').click()
  await expect(page.getByTestId('deal-card')).toHaveCount(before + 1)
})
