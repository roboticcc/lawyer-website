import { useHead } from '@unhead/vue'
import type { Attorney, FaqItem, ProcessStep, Service } from '@/types'
import {
  generateFaqSchema,
  generateHowToSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
} from '@/utils/schema'

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
}

export const useHowToSchema = (steps: ProcessStep[]) => {
  injectSchema(generateHowToSchema(steps))
}

export const usePageSeo = (title: string, description: string, keywords?: string) => {
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
  })
}
