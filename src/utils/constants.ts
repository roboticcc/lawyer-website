export const SITE_NAME = 'Правовая защита граждан'

export const CONTACT_PHONE = import.meta.env.VITE_ADVOKAT_PHONE || '+74951234567'
export const CONTACT_PHONE_FORMATTED = '+7 (495) 123-45-67'
export const CONTACT_EMAIL = 'info@pravo-protection.ru'

export const SOCIAL_LINKS = {
  vk: 'https://vk.com/advokat_petrov',
  whatsapp: 'https://wa.me/79031234567',
  telegram: 'https://t.me/advokat_petrov',
  email: `mailto:${CONTACT_EMAIL}`,
}

export const OPENING_HOURS = 'Пн-Пт 09:00-18:00'

export const ADVOKAT_REG_NUMBER = import.meta.env.VITE_ADVOKAT_REG_NUMBER || 'РА 1234567'
export const ADVOKAT_FULL_NAME = import.meta.env.VITE_ADVOKAT_NAME || 'Иван Иванович Петров'

export const YANDEX_METRIKA_ID = import.meta.env.VITE_YANDEX_METRIKA_ID || ''
export const GTM_ID = import.meta.env.VITE_GTM_ID || ''

export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://pravo-protection.ru'
