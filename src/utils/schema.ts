import type { Attorney, FaqItem, ProcessStep, Service } from '@/types'
import { generatePageUrl, generateServiceUrl } from './seo'

export const generateLocalBusinessSchema = (attorney: Attorney, services: Service[] = []) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
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
    sameAs: [attorney.maxUrl, attorney.whatsappUrl, attorney.telegramUrl].filter(Boolean),
    priceRange: '$$$',
    areaServed: {
      '@type': 'City',
      name: attorney.serviceRegions.join(', '),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        name: service.title,
        url: generateServiceUrl(service.slug),
        description: service.shortDescription,
      })),
    },
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
    name: service.title,
    description: service.longDescription || service.shortDescription,
    provider: {
      '@type': 'LegalService',
      name: attorney.fullName,
      ...(attorney.phone ? { telephone: attorney.phone } : {}),
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'RU',
        addressLocality: attorney.city,
        streetAddress: attorney.address,
      },
    },
    areaServed: attorney.serviceRegions.join(', '),
    serviceType: service.category,
    offers: service.pricing?.map((p) => ({
      '@type': 'Offer',
      name: p.service,
      priceCurrency: 'RUB',
      price: p.price,
    })),
    potentialAction: {
      '@type': 'ViewAction',
      target: generateServiceUrl(service.slug),
      name: 'View Service',
    },
  }
}

export const generateHowToSchema = (steps: ProcessStep[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Порядок работы с адвокатом',
    description:
      'Пошаговый алгоритм юридической помощи от первого анализа до судебного решения',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'RUB',
      value: { '@type': 'PriceSpecification', price: 0, priceCurrency: 'RUB' },
    },
    tool: [
      { '@type': 'HowToTool', name: 'Первичная консультация' },
      { '@type': 'HowToTool', name: 'Анализ документов' },
      { '@type': 'HowToTool', name: 'Составление искового заявления' },
    ],
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      url: generatePageUrl('/priory-raboty'),
      name: step.title,
      text: step.description,
      image: step.imageUrl,
      position: step.step,
      itemListElement: step.details?.map((detail) => ({
        '@type': 'HowToDirection',
        text: detail,
      })),
    })),
  }
}
