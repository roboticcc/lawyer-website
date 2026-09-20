<script setup lang="ts">
import { useAttorneyStore } from '@/stores/attorney'
import { CONTACT_EMAIL } from '@/utils/constants'

const attorneyStore = useAttorneyStore()
const links = [
  { label: 'Написать в Telegram', href: attorneyStore.attorney.telegramUrl },
  { label: 'Написать в MAX', href: attorneyStore.attorney.maxUrl },
  { label: 'Написать в WhatsApp', href: attorneyStore.attorney.whatsappUrl },
  { label: 'Написать на почту', href: `mailto:${CONTACT_EMAIL}` },
].filter((link) => link.href)
</script>

<template>
  <div
    class="flex flex-wrap gap-3"
    aria-label="Способы связи с адвокатом"
  >
    <a
      v-for="(link, index) in links"
      :key="link.label"
      :href="link.href"
      :target="link.href?.startsWith('mailto:') ? undefined : '_blank'"
      :rel="link.href?.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
      :class="index === 0 ? 'button-primary' : 'button-outline'"
    >
      {{ link.label }}
    </a>
  </div>
</template>
