import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5009'

async function login(page) {
  await page.goto(`${BASE}/login`)
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page).toHaveURL(/\/dashboard/)
}

test('login then dashboard stats render', async ({ page }) => {
  await login(page)
  await expect(page.getByText('Patients in care')).toBeVisible()
  await expect(page.getByText('Bed occupancy', { exact: true })).toBeVisible()
})

test('patients table renders and admit modal works', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/patients`)
  const before = await page.getByTestId('patient-row').count()
  expect(before).toBeGreaterThan(0)
  await page.getByTestId('admit-patient').click()
  await expect(page.getByTestId('admit-modal')).toBeVisible()
  await page.getByLabel('Full name').fill('Test Patient')
  await page.getByLabel('Age').fill('44')
  await page.getByLabel('Diagnosis').fill('Observation')
  await page.getByTestId('save-patient').click()
  await expect(page.getByTestId('patient-row')).toHaveCount(before + 1)
})

test('patient detail allows adding a chart note', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/patients`)
  await page.getByTestId('patient-row').first().getByRole('link').click()
  await expect(page.getByText('Vitals')).toBeVisible()
  await page.getByTestId('note-input').fill('Reviewed labs, all within range.')
  await page.getByTestId('add-note').click()
  await expect(page.getByTestId('note').first()).toContainText('Reviewed labs')
})

test('beds and staff pages render', async ({ page }) => {
  await login(page)
  await page.goto(`${BASE}/beds`)
  await expect(page.getByTestId('ward-grid').first()).toBeVisible()
  await page.goto(`${BASE}/staff`)
  await expect(page.getByTestId('staff-card').first()).toBeVisible()
})
