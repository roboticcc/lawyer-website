<script setup lang="ts">
import { useAttorneyStore } from '@/stores/attorney'
import { CONTACT_EMAIL } from '@/utils/constants'

withDefaults(
  defineProps<{
    variant?: 'light' | 'dark'
  }>(),
  { variant: 'light' }
)

const attorneyStore = useAttorneyStore()

const links = [
  { key: 'vk', url: attorneyStore.attorney.vkUrl, label: 'ВКонтакте', external: true },
  { key: 'max', url: attorneyStore.attorney.maxUrl, label: 'Max', external: true },
  { key: 'whatsapp', url: attorneyStore.attorney.whatsappUrl, label: 'WhatsApp', external: true },
  { key: 'telegram', url: attorneyStore.attorney.telegramUrl, label: 'Telegram', external: true },
  { key: 'email', url: `mailto:${CONTACT_EMAIL}`, label: 'Электронная почта', external: false },
].filter((link) => link.url)
</script>

<template>
  <div class="flex items-center gap-2">
    <a
      v-for="link in links"
      :key="link.key"
      :href="link.url"
      :target="link.external ? '_blank' : undefined"
      :rel="link.external ? 'noopener noreferrer' : undefined"
      :aria-label="link.label"
      class="flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
      :class="
        variant === 'dark'
          ? 'border-white/20 text-primary-100 hover:border-primary-500 hover:bg-primary-500 hover:text-[#191917]'
          : 'border-black/20 text-[#191917] hover:border-primary-600 hover:bg-primary-500'
      "
    >
      <svg
        v-if="link.key === 'vk'"
        class="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M13.6 17.2c-5.5 0-8.7-3.8-8.8-10h2.9c.1 4.4 2 6.3 3.5 6.7v-6.7h2.7v4c1.4-.1 2.9-1.5 3.4-4h2.7c-.4 3-2.6 5-4.2 5.9 1.6.7 4.1 2.5 5 5.6h-3c-.7-2.4-2.5-3.9-4.9-4.1v4.1c0 .3-.2.5-.5.5z"
        />
      </svg>
      <svg
        v-else-if="link.key === 'max'"
        class="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16v9a1 1 0 01-1 1H9l-4 3v-3H5a1 1 0 01-1-1V6z"
        />
      </svg>
      <svg
        v-else-if="link.key === 'whatsapp'"
        class="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M12.04 2c-5.5 0-10 4.5-10 10 0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.5.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10s-4.5-10-9.96-10zm5.9 14.2c-.2.6-1.4 1.2-2 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5.3.6.9 2.1 1 2.3.1.2.1.4 0 .6-.4.8-.8 1-.6 1.3.9 1.7 1.8 2.3 3.2 3 .2.1.4.1.6-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.6-.1.2.1 1.7.8 2 1 .3.1.5.2.5.3.1.2.1.7-.1 1.1z"
        />
      </svg>
      <svg
        v-else-if="link.key === 'telegram'"
        class="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M21.9 4.3 2.7 11.7c-.9.4-.9 1.5.1 1.8l4.6 1.5 1.8 5.7c.2.7 1 .9 1.6.4l2.6-2.3 4.9 3.6c.7.5 1.7.1 1.9-.7l3.6-16.4c.2-.9-.7-1.7-1.6-1.4zM8.9 14.3l8.9-6.6c.3-.2.6.2.3.4l-7.2 6.8-.4 3.2z"
        />
      </svg>
      <svg
        v-else
        class="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm0 0l9 7 9-7"
        />
      </svg>
    </a>
  </div>
</template>
