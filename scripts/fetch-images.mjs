// Downloads real stock photos into each site's public/ folder so the test
// environments stay self-contained and reproducible. Re-runnable: existing
// files are skipped. Sources: loremflickr (keyword-matched), picsum
// (fallback), i.pravatar.cc (avatars).
import { writeFile, mkdir, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRODUCTS } from '../ecommerce/src/data/seed.js'
import { CONTACTS } from '../crm/src/data/seed.js'
import { USERS } from '../admin/src/data/seed.js'
import { CITIES, HOTELS } from '../travel/src/data/seed.js'
import { EVENTS } from '../tickets/src/data/seed.js'
import { STAFF } from '../hospital/src/data/seed.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const CATEGORY_KEYWORDS = {
  Audio: 'headphones,audio',
  Wearables: 'smartwatch,fitness',
  Home: 'home,interior',
  Accessories: 'gadget,tech',
  Cameras: 'camera,photography',
  Gaming: 'gaming,controller',
  Office: 'desk,office',
  Outdoors: 'backpack,outdoor',
  Kitchen: 'kitchen,appliance',
  Phones: 'smartphone,phone',
}

async function exists(p) {
  try { const s = await stat(p); return s.size > 2500 } catch { return false }
}

async function download(url, dest, { timeout = 20000 } = {}) {
  if (await exists(dest)) return 'skip'
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeout)
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: 'follow' })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 2500) throw new Error('too small (' + buf.length + 'b)')
    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, buf)
    return 'ok'
  } finally {
    clearTimeout(t)
  }
}

// Run tasks with a small concurrency limit so we don't hammer the services.
async function run(tasks, limit = 6) {
  let i = 0, ok = 0, skip = 0, fail = 0
  async function worker() {
    while (i < tasks.length) {
      const task = tasks[i++]
      try {
        const r = await task()
        if (r === 'ok') ok++; else if (r === 'skip') skip++
      } catch (e) {
        fail++
        console.warn('  ! ' + (e.message || e))
      }
    }
  }
  await Promise.all(Array.from({ length: limit }, worker))
  return { ok, skip, fail }
}

const jobs = []

// Ecommerce product photos (keyword-matched, picsum fallback).
PRODUCTS.forEach((p, idx) => {
  const dest = `${ROOT}/ecommerce/public/products/${p.id}.jpg`
  const kw = CATEGORY_KEYWORDS[p.category] || 'product'
  const primary = `https://loremflickr.com/600/450/${encodeURIComponent(kw)}?lock=${idx + 1}`
  const fallback = `https://picsum.photos/seed/${p.id}/600/450`
  jobs.push(async () => {
    try { return await download(primary, dest) }
    catch { return await download(fallback, dest) }
  })
})

// CRM contact avatars.
CONTACTS.forEach((c, idx) => {
  const dest = `${ROOT}/crm/public/avatars/${c.id}.jpg`
  jobs.push(() => download(`https://i.pravatar.cc/200?img=${(idx % 70) + 1}`, dest))
})

// Admin user avatars.
USERS.forEach((u, idx) => {
  const dest = `${ROOT}/admin/public/avatars/${u.id}.jpg`
  jobs.push(() => download(`https://i.pravatar.cc/120?img=${(idx % 70) + 1}`, dest))
})

// Careers imagery.
jobs.push(() => download('https://loremflickr.com/1200/500/office,team?lock=7', `${ROOT}/careers/public/img/hero.jpg`))
jobs.push(() => download('https://loremflickr.com/1200/500/coworking,startup?lock=11', `${ROOT}/careers/public/img/company.jpg`))

// Travel: destination + hotel photos (keyword-matched, picsum fallback).
jobs.push(() => download('https://loremflickr.com/1600/600/travel,landmark?lock=3', `${ROOT}/travel/public/img/dest/hero.jpg`))
CITIES.forEach((c, idx) => {
  const dest = `${ROOT}/travel/public/img/dest/${c.img}.jpg`
  const primary = `https://loremflickr.com/600/400/${encodeURIComponent(c.city)}?lock=${idx + 20}`
  const fallback = `https://picsum.photos/seed/${c.img}/600/400`
  jobs.push(async () => { try { return await download(primary, dest) } catch { return await download(fallback, dest) } })
})
HOTELS.forEach((h, idx) => {
  const dest = `${ROOT}/travel/public/img/hotels/${h.img}.jpg`
  const primary = `https://loremflickr.com/600/450/hotel,${encodeURIComponent(h.city)}?lock=${idx + 40}`
  const fallback = `https://picsum.photos/seed/${h.img}/600/450`
  jobs.push(async () => { try { return await download(primary, dest) } catch { return await download(fallback, dest) } })
})

// Tickets: event posters by category.
const EVENT_KW = { Concert: 'concert,stage', Sports: 'stadium,sport', Theater: 'theatre,stage', Comedy: 'comedy,microphone', Festival: 'music,festival', Movie: 'cinema,movie' }
EVENTS.forEach((e, idx) => {
  const dest = `${ROOT}/tickets/public/img/events/${e.img}.jpg`
  const kw = EVENT_KW[e.category] || 'event'
  const primary = `https://loremflickr.com/600/400/${encodeURIComponent(kw)}?lock=${idx + 60}`
  const fallback = `https://picsum.photos/seed/${e.img}/600/400`
  jobs.push(async () => { try { return await download(primary, dest) } catch { return await download(fallback, dest) } })
})

// Hospital: staff avatars.
STAFF.forEach((s) => {
  jobs.push(() => download(`https://i.pravatar.cc/160?img=${s.avatar}`, `${ROOT}/hospital/public/avatars/${s.id}.jpg`))
})

console.log(`Fetching ${jobs.length} images…`)
const res = await run(jobs, 6)
console.log(`Done. ok=${res.ok} skip=${res.skip} fail=${res.fail}`)
