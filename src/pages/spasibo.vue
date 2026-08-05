<script setup lang="ts">
import MinimalLayout from '@/layouts/MinimalLayout.vue'
import { usePageSeo } from '@/composables/useSchemaOrg'

usePageSeo(
  'Спасибо за обращение',
  'Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
  undefined
)
</script>

<template>
  <MinimalLayout>
    <div class="modal-panel px-8 py-12 text-center md:px-14">
      <div class="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-primary-700">
        <svg
          class="h-8 w-8 text-primary-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 class="mb-5 text-5xl uppercase">
        Спасибо за обращение!
      </h1>
      <p class="mb-8 text-black/60">
        Мы оперативно свяжемся с вами в ближайшее время.
      </p>
      <RouterLink
        to="/"
        class="button-primary"
      >
        Вернуться на главную
      </RouterLink>
    </div>
  </MinimalLayout>
</template>
