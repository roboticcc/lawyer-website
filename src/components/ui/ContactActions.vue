<script setup lang="ts">
import { useAttorneyStore } from '@/stores/attorney'
import { CONTACT_EMAIL } from '@/utils/constants'

const attorneyStore = useAttorneyStore()
const links = [
  { label: 'Написать в Telegram', shortLabel: 'Telegram', href: attorneyStore.attorney.telegramUrl },
  { label: 'Позвонить адвокату', shortLabel: attorneyStore.formattedPhone, href: attorneyStore.attorney.phone ? `tel:${attorneyStore.attorney.phone}` : '' },
  { label: 'Написать в MAX', shortLabel: 'MAX', href: attorneyStore.attorney.maxUrl },
  { label: 'Написать в WhatsApp', shortLabel: 'WhatsApp', href: attorneyStore.attorney.whatsappUrl },
  { label: 'Написать на почту', shortLabel: 'Почта', href: `mailto:${CONTACT_EMAIL}` },
].filter((link) => link.href)
const [primaryLink, ...alternativeLinks] = links
</script>

<template>
  <div
    class="contact-actions"
    aria-label="Способы связи с адвокатом"
  >
    <a
      v-if="primaryLink"
      :href="primaryLink.href"
      target="_blank"
      rel="noopener noreferrer"
      class="button-primary"
    >
      {{ primaryLink.label }}
      <span aria-hidden="true">↗</span>
    </a>
    <div class="contact-actions__alternatives">
      <span class="contact-actions__label">Другие способы:</span>
      <a
        v-for="link in alternativeLinks"
        :key="link.label"
        :href="link.href"
        :target="link.href?.startsWith('http') ? '_blank' : undefined"
        :rel="link.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
        :aria-label="link.label"
      >
        {{ link.shortLabel }}
      </a>
    </div>
  </div>
</template>
