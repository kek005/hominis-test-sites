import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5002'

test('job listings render', async ({ page }) => {
  await page.goto(BASE)
  await expect(page.getByRole('heading', { name: /Build the future with us/i })).toBeVisible()
  const jobs = page.getByTestId('job-card')
  await expect(jobs.first()).toBeVisible()
  expect(await jobs.count()).toBeGreaterThan(10)
})

test('AI department filter shows roles with an enriched job description', async ({ page }) => {
  await page.goto(BASE)
  await page.getByLabel('Department').selectOption('AI')
  const jobs = page.getByTestId('job-card')
  await expect(jobs.first()).toBeVisible()
  await jobs.first().getByRole('link', { name: 'View' }).click()
  // Enriched JD sections present on every role.
  await expect(page.getByRole('heading', { name: 'About the role' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Nice to have' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'What we offer' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How we hire' })).toBeVisible()
})

test('open a job and reach the multi-step application', async ({ page }) => {
  await page.goto(BASE)
  await page.getByTestId('job-card').first().getByRole('link', { name: 'View' }).click()
  await expect(page.getByRole('link', { name: 'Apply now' })).toBeVisible()
  await page.getByRole('link', { name: 'Apply now' }).click()

  // Step 1 (Personal) — continue should validate required fields.
  await expect(page.getByTestId('step-continue')).toBeVisible()
  await page.getByTestId('step-continue').click()
  await expect(page.getByText('First name is required.')).toBeVisible()

  // Fill personal info and advance to Experience step.
  await page.getByLabel('First name').fill('Demo')
  await page.getByLabel('Last name').fill('Applicant')
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByLabel('Phone').fill('+1 (555) 123-4567')
  await page.getByLabel('Current location').fill('Austin, TX')
  await page.getByTestId('step-continue').click()
  await expect(page.getByText('Total years of experience')).toBeVisible()
})
