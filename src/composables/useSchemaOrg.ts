import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import type { Attorney, FaqItem, Service } from '@/types'
import {
  generateFaqSchema,
  generateLocalBusinessSchema,
  generateServiceBreadcrumbSchema,
  generateServiceSchema,
  generateWebSiteSchema,
} from '@/utils/schema'
import { SITE_HERO_IMAGE, SITE_NAME, SITE_URL } from '@/utils/constants'

const injectSchema = (schema: Record<string, unknown>) => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
      },
    ],
  })
}

export const useAttorneySchema = (attorney: Attorney, services: Service[] = []) => {
  injectSchema(generateLocalBusinessSchema(attorney, services))
}

export const useFaqSchema = (faqItems: FaqItem[]) => {
  injectSchema(generateFaqSchema(faqItems))
}

export const useServiceSchema = (service: Service, attorney: Attorney) => {
  injectSchema(generateServiceSchema(service, attorney))
  if (SITE_URL) injectSchema(generateServiceBreadcrumbSchema(service))
}

export const useWebSiteSchema = () => {
  if (SITE_URL) injectSchema(generateWebSiteSchema())
}

interface SeoOptions {
  noindex?: boolean
}

export const usePageSeo = (title: string, description: string, options: SeoOptions = {}) => {
  const route = useRoute()
  useHead(computed(() => {
    const origin = SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
    const path = route.path.replace(/\/+$/, '') || '/'
    const canonical = origin ? `${origin}${path}` : ''
    const image = origin ? `${origin}${SITE_HERO_IMAGE}` : ''

    return {
      title,
      link: canonical && !options.noindex ? [{ rel: 'canonical', href: canonical }] : [],
      meta: [
        { name: 'description', content: description },
        ...(options.noindex ? [{ name: 'robots', content: 'noindex, follow' }] : []),
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:site_name', content: SITE_NAME },
        ...(canonical ? [{ property: 'og:url', content: canonical }] : []),
        ...(image ? [{ property: 'og:image', content: image }] : []),
        { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
    }
  }))
}
