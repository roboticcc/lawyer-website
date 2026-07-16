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
    <div class="text-center py-12">
      <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
        <svg
          class="w-8 h-8 text-primary-600"
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
      <h1 class="mb-4">
        Спасибо за обращение!
      </h1>
      <p class="text-gray-600 mb-8">
        Мы оперативно свяжемся с вами в ближайшее время.
      </p>
      <RouterLink
        to="/"
        class="inline-flex px-8 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors no-underline"
      >
        Вернуться на главную
      </RouterLink>
    </div>
  </MinimalLayout>
</template>
