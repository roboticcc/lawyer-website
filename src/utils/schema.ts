import type { Attorney, FaqItem, Service } from '@/types'
import { generateServiceUrl } from './seo'
import { SITE_NAME, SITE_URL } from './constants'

export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'Адвокат Игорь Мосензов',
  url: SITE_URL,
})

export const generateServiceBreadcrumbSchema = (service: Service) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Услуги', item: `${SITE_URL}/uslugi` },
    { '@type': 'ListItem', position: 3, name: service.title, item: generateServiceUrl(service.slug) },
  ],
})

export const generateLocalBusinessSchema = (attorney: Attorney, services: Service[] = []) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    ...(SITE_URL ? { '@id': `${SITE_URL}/#attorney`, url: SITE_URL } : {}),
    name: attorney.fullName,
    description: attorney.bio,
    ...(attorney.phone ? { telephone: attorney.phone } : {}),
    email: attorney.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
      addressLocality: attorney.city,
      streetAddress: attorney.address,
      postalCode: attorney.postalCode,
    },
    areaServed: [
      { '@type': 'City', name: attorney.city },
      { '@type': 'AdministrativeArea', name: 'Омская область' },
    ],
    ...(SITE_URL && services.length ? { hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги адвоката',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        name: service.title,
        url: generateServiceUrl(service.slug),
        description: service.shortDescription,
      })),
    } } : {}),
  }
}

export const generateFaqSchema = (faqItems: FaqItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export const generateServiceSchema = (service: Service, attorney: Attorney) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    ...(SITE_URL ? { url: generateServiceUrl(service.slug) } : {}),
    name: service.title,
    description: service.longDescription || service.shortDescription,
    provider: {
      '@type': 'LegalService',
      ...(SITE_URL ? { '@id': `${SITE_URL}/#attorney` } : {}),
      name: attorney.fullName,
      ...(attorney.phone ? { telephone: attorney.phone } : {}),
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'RU',
        addressLocality: attorney.city,
        streetAddress: attorney.address,
      },
    },
    areaServed: attorney.serviceRegions,
    serviceType: service.category,
  }
}
