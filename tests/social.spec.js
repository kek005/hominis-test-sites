import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5012'

test('feed renders posts and composer', async ({ page }) => {
  await page.goto(BASE)
  await expect(page.getByTestId('post').first()).toBeVisible()
  await expect(page.getByTestId('composer-input')).toBeVisible()
})

test('compose a new post and see it at the top', async ({ page }) => {
  await page.goto(BASE)
  await page.getByTestId('composer-input').fill('Smoke test post — hello buzz!')
  await page.getByTestId('post-button').click()
  await expect(page.getByText('Smoke test post — hello buzz!')).toBeVisible()
})

test('like and comment on a post', async ({ page }) => {
  await page.goto(BASE)
  const post = page.getByTestId('post').first()
  const likeBefore = Number(await post.getByTestId('like-count').first().textContent())
  await post.getByTestId('like-button').first().click()
  await expect(post.getByTestId('like-count').first()).toHaveText(String(likeBefore + 1))

  await post.getByTestId('comment-input').first().fill('Great post!')
  await post.getByTestId('comment-submit').first().click()
  await expect(post.getByTestId('comment').last()).toContainText('Great post!')
})

test('profile and explore render', async ({ page }) => {
  await page.goto(`${BASE}/profile/amara`)
  await expect(page.getByRole('heading', { name: 'Amara Okafor' })).toBeVisible()
  await expect(page.getByTestId('follow-button')).toBeVisible()
  await page.goto(`${BASE}/explore`)
  await expect(page.getByTestId('suggested-user').first()).toBeVisible()
})
