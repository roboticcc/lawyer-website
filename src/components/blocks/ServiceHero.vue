<script setup lang="ts">
import type { PropType } from 'vue'
import type { Service } from '@/types'
import PageHero from '@/components/shared/PageHero.vue'
import { useAttorneyStore } from '@/stores/attorney'

const props = defineProps({
  service: {
    type: Object as PropType<Service>,
    required: true,
  },
})

const attorneyStore = useAttorneyStore()
</script>

<template>
  <PageHero
    :title="props.service.title"
    :subtitle="props.service.shortDescription"
    :action-button="{
      text: 'Получить консультацию',
      href: '#contact-options',
      variant: 'primary',
    }"
    :secondary-button="{
      text: attorneyStore.attorney.phone ? 'Позвонить сейчас' : 'Написать в Telegram',
      href: attorneyStore.attorney.phone
        ? `tel:${attorneyStore.attorney.phone}`
        : attorneyStore.attorney.telegramUrl || '',
    }"
  >
    <template #image>
      <img
        src="/images/legal-office.webp"
        alt="Иллюстрация юридического кабинета"
        width="1024"
        height="1536"
        decoding="async"
        class="h-[26rem] w-full border border-white/15 object-cover md:h-[32rem]"
      >
    </template>

    <template #details>
      <p class="mt-5 font-sans text-2xl text-primary-300">
        {{ props.service.price }}
      </p>
    </template>
  </PageHero>
</template>
