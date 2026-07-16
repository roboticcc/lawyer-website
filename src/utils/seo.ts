import { SITE_URL } from './constants'
import type { Attorney, Service } from '@/types'

export const generatePageUrl = (path: string): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export const generateServiceUrl = (slug: string): string => generatePageUrl(`/uslugi/${slug}`)

export const generateAttorneyAltText = (attorney: Attorney, service?: Service): string => {
  if (service) {
    return `Адвокат по делам о ${service.category.toLowerCase()} ${attorney.fullName}`
  }
  return `Адвокат по уголовным делам ${attorney.fullName}`
}

export const truncateDescription = (text: string, maxLength = 160): string => {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}…`
}
