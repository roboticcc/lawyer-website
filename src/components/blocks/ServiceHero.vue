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
    <template #breadcrumb>
      <nav
        aria-label="Навигационная цепочка"
        class="mb-8 text-sm text-primary-300"
      >
        <RouterLink
          to="/"
          class="underline underline-offset-4 hover:text-primary-50"
        >
          Главная
        </RouterLink>
        <span aria-hidden="true"> / </span>
        <RouterLink
          to="/uslugi"
          class="underline underline-offset-4 hover:text-primary-50"
        >
          Услуги
        </RouterLink>
      </nav>
    </template>

    <template #image>
      <img
        src="/images/legal-office.webp"
        alt="Иллюстрация юридического кабинета"
        width="1024"
        height="1536"
        decoding="async"
        class="h-[14rem] w-full rounded-lg object-cover sm:h-[19rem] md:h-[25rem]"
      >
    </template>

    <template #details>
      <p class="font-sans text-lg font-semibold text-primary-300">
        {{ props.service.price }}
      </p>
    </template>
  </PageHero>
</template>
