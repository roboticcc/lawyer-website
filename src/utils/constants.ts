import attorneyData from '@/data/attorney.json'

export const SITE_NAME = 'Правовая защита граждан'

export const CONTACT_PHONE = import.meta.env.VITE_ADVOKAT_PHONE || attorneyData.phone
export const CONTACT_EMAIL = 'advokat800@yandex.ru'
export const SITE_HERO_IMAGE = attorneyData.photos.hero

export const SITE_URL = (import.meta.env.VITE_SITE_URL || '').replace(/\/+$/, '')
