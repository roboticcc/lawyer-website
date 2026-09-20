import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { JSDOM } from 'jsdom'
import { loadEnv } from 'vite'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const env = loadEnv('production', root, 'VITE_')
const siteUrl = (env.VITE_SITE_URL || '').replace(/\/+$/, '')
const services = JSON.parse(await readFile(join(root, 'src/data/services.json'), 'utf8'))
const groups = JSON.parse(await readFile(join(root, 'src/data/otherPractices.json'), 'utf8'))
const cases = JSON.parse(await readFile(join(root, 'src/data/cases.json'), 'utf8'))
const indexable = ['/', '/uslugi', '/priory-raboty', '/faq', '/kontakt', '/policy',
  ...services.map(({ slug }) => `/uslugi/${slug}`)]
const unindexed = ['/praktika', ...cases.map(({ id }) => `/praktika/${id}`),
  ...groups.flatMap((group) => group.items.map((_, index) => `/uslugi/dopolnitelnye/${group.id}/${index + 1}`))]
const allRoutes = new Set([...indexable, ...unindexed])
const titles = new Set()

for (const route of allRoutes) {
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html')
  const html = await readFile(file, 'utf8')
  const dom = new JSDOM(html)
  const document = dom.window.document
  const title = document.title.trim()
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content')
  const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content')
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href')

  assert(title, `${route}: missing title`)
  assert(description, `${route}: missing description`)
  assert.equal(document.querySelectorAll('h1').length, 1, `${route}: expected one H1`)
  assert(document.querySelector('main')?.textContent?.trim(), `${route}: missing main content`)
  if (indexable.includes(route)) {
    assert(!titles.has(title), `${route}: duplicate title`)
    titles.add(title)
    assert(!robots?.includes('noindex'), `${route}: unexpected noindex`)
    assert.equal(canonical, siteUrl ? `${siteUrl}${route}` : undefined, `${route}: canonical`)
  } else {
    assert(robots?.includes('noindex'), `${route}: noindex missing`)
  }

  for (const link of document.querySelectorAll('a[href^="/"]')) {
    const path = new URL(link.getAttribute('href'), 'https://example.test').pathname.replace(/\/$/, '') || '/'
    assert(allRoutes.has(path), `${route}: broken internal link ${path}`)
  }

  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    assert.doesNotThrow(() => JSON.parse(script.textContent || ''), `${route}: invalid JSON-LD`)
  }
  dom.window.close()
}

const missingHtml = await readFile(join(dist, '404.html'), 'utf8')
assert(missingHtml.includes('name="robots" content="noindex, follow"'), '404: noindex missing')

const robots = await readFile(join(dist, 'robots.txt'), 'utf8')
if (siteUrl) {
  assert(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), 'robots: wrong sitemap URL')
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8')
  const map = new JSDOM(sitemap, { contentType: 'text/xml' })
  const urls = [...map.window.document.querySelectorAll('loc')].map((node) => node.textContent)
  assert.deepEqual(urls, indexable.map((route) => `${siteUrl}${route}`), 'sitemap: wrong routes')
  map.window.close()
} else {
  assert(!robots.includes('Sitemap:'), 'robots: sitemap advertised without a domain')
  await assert.rejects(readFile(join(dist, 'sitemap.xml'), 'utf8'), { code: 'ENOENT' })
}

console.log(`SEO check passed: ${allRoutes.size} pages, ${indexable.length} indexable`)
