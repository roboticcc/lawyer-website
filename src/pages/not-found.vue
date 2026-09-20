<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { usePageSeo } from '@/composables/useSchemaOrg'

usePageSeo('Страница не найдена', 'Запрошенная страница не найдена.', { noindex: true })
</script>

<template>
  <MainLayout>
    <section class="section-paper site-section">
      <div class="site-container max-w-3xl">
        <h1 class="display-title mb-8">
          Страница не найдена
        </h1>
        <p class="mb-8 text-lg text-black/70">
          Проверьте адрес или перейдите к нужному разделу сайта.
        </p>
        <RouterLink
          to="/"
          class="text-primary-800 underline underline-offset-4"
        >
          На главную
        </RouterLink>
      </div>
    </section>
  </MainLayout>
</template>
