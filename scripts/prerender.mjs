import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve, join, dirname } from 'node:path'
import { createServer, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const env = loadEnv('production', root, 'VITE_')
const siteUrl = (env.VITE_SITE_URL || '').replace(/\/+$/, '')

if (siteUrl && (new URL(siteUrl).protocol !== 'https:' || new URL(siteUrl).origin !== siteUrl)) {
  throw new Error('VITE_SITE_URL must be a public HTTPS origin without a path')
}

const services = JSON.parse(await readFile(join(root, 'src/data/services.json'), 'utf8'))
const groups = JSON.parse(await readFile(join(root, 'src/data/otherPractices.json'), 'utf8'))
const cases = JSON.parse(await readFile(join(root, 'src/data/cases.json'), 'utf8'))
const mainRoutes = ['/', '/uslugi', '/priory-raboty', '/faq', '/kontakt', '/policy']
const serviceRoutes = services.map((service) => `/uslugi/${service.slug}`)
const otherRoutes = groups.flatMap((group) =>
  group.items.map((_, index) => `/uslugi/dopolnitelnye/${group.id}/${index + 1}`)
)
const caseRoutes = ['/praktika', ...cases.map((item) => `/praktika/${item.id}`)]
const routes = [...mainRoutes, ...serviceRoutes, ...otherRoutes, ...caseRoutes]
const indexableRoutes = [...mainRoutes, ...serviceRoutes]

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char])

function renderHeadTag({ tag, props = {}, textContent, innerHTML }) {
  if (!['title', 'meta', 'link', 'script'].includes(tag)) return ''
  const attrs = Object.entries(props)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([name, value]) => ` ${name}="${escapeHtml(value)}"`)
    .join('')
  if (tag === 'meta' || tag === 'link') return `<${tag}${attrs}>`
  const content = innerHTML === undefined ? escapeHtml(textContent ?? '') : String(innerHTML).replace(/</g, '\\u003c')
  return `<${tag}${attrs}>${content}</${tag}>`
}

const template = await readFile(join(dist, 'index.html'), 'utf8')
const vite = await createServer({
  configFile: false,
  mode: 'production',
  plugins: [vue()],
  resolve: { alias: { '@': join(root, 'src') } },
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.ts')
  for (const route of routes) {
    const { body, tags } = await render(route)
    const head = tags.map(renderHeadTag).filter(Boolean).join('\n    ')
    const html = template
      .replace(/<title>[\s\S]*?<\/title>/, '')
      .replace('</head>', `    ${head}\n  </head>`)
      .replace('<div id="app"></div>', `<div id="app" data-prerendered-route="${escapeHtml(route)}">${body}</div>`)
    const file = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html')
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, html)
  }
  const missingPage = await render('/not-found')
  const missingHead = missingPage.tags.map(renderHeadTag).filter(Boolean).join('\n    ')
  await writeFile(join(dist, '404.html'), template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('</head>', `    ${missingHead}\n  </head>`)
    .replace('<div id="app"></div>', `<div id="app" data-prerendered-route="/not-found">${missingPage.body}</div>`))
} finally {
  await vite.close()
}

if (siteUrl) {
  const urls = indexableRoutes.map((route) => `  <url><loc>${escapeHtml(siteUrl + route)}</loc></url>`).join('\n')
  await writeFile(join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
}

await writeFile(join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`)

console.log(`Prerendered ${routes.length} pages${siteUrl ? ' and sitemap.xml' : ' (set VITE_SITE_URL for sitemap.xml)'}`)
