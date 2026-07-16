export interface AttorneyPhotos {
  hero: string
  working: string
  passport: string
}

export interface Attorney {
  fullName: string
  bio: string
  regNumber: string
  experienceYears: number
  casesWon: number
  phone: string
  email: string
  city: string
  address: string
  postalCode: string
  inn: string
  ogrn: string
  serviceRegions: string[]
  vkUrl?: string
  maxUrl?: string
  whatsappUrl?: string
  telegramUrl?: string
  photos: AttorneyPhotos
}

export interface ServicePricing {
  service: string
  price: string
}

export interface Service {
  id: string
  category: string
  title: string
  slug: string
  shortDescription: string
  longDescription?: string
  icon: string
  price: string
  pageTitle?: string
  pricing?: ServicePricing[]
  relatedCases?: string[]
}

export interface FaqItem {
  id: string
  category: string
  question: string
  answer: string
}

export interface CaseStudy {
  id: string
  title: string
  category: string
  description: string
  result: string
  year: number
  imageUrl: string
}

export interface OtherPracticeItem {
  title: string
  description: string
}

export interface OtherPracticeGroup {
  id: string
  title: string
  items: OtherPracticeItem[]
}

export type ProcessStepSide = 'left' | 'right'

export interface ProcessStep {
  step: number
  title: string
  description: string
  side: ProcessStepSide
  details?: string[]
  imageUrl?: string
}

export interface ConsultationFormValues {
  name: string
  phone: string
  service?: string
  agree: boolean
}

export interface ContactFormValues {
  name: string
  email?: string
  phone: string
  message?: string
  agree: boolean
}
