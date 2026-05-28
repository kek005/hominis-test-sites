import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5006'

test('home shows destinations and search widget', async ({ page }) => {
  await page.goto(BASE)
  await expect(page.getByRole('heading', { name: /Where to next/i })).toBeVisible()
  await expect(page.getByTestId('destination').first()).toBeVisible()
})

test('flight search lists results and reaches booking with seat map', async ({ page }) => {
  await page.goto(BASE)
  await page.getByTestId('search-flights').click()
  await expect(page.getByTestId('flight-card').first()).toBeVisible()
  await page.getByTestId('select-flight').first().click()
  await expect(page.getByText('Choose your seats')).toBeVisible()
  await expect(page.getByTestId('seat').first()).toBeVisible()
})

test('booking a flight requires passenger details then confirms', async ({ page }) => {
  await page.goto(`${BASE}/flights?from=PAR&to=TYO&pax=1`)
  await page.getByTestId('select-flight').first().click()
  await page.getByTestId('confirm-booking').click()
  await expect(page.getByText('Passenger name is required.')).toBeVisible()
  await page.getByLabel('Full name').fill('Alex Traveler')
  await page.getByLabel('Email').fill('demo@hominis.test')
  await page.getByTestId('confirm-booking').click()
  await expect(page.getByTestId('booking-ref')).toBeVisible()
})

test('hotels list and book a room', async ({ page }) => {
  await page.goto(`${BASE}/hotels`)
  await expect(page.getByTestId('hotel-card').first()).toBeVisible()
  await page.getByTestId('hotel-card').first().click()
  await page.getByTestId('book-room').first().click()
  await expect(page.getByTestId('booking-ref')).toBeVisible()
})
