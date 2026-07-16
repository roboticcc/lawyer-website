<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import FaqAccordion from '@/components/blocks/FaqAccordion.vue'
import { useFaqStore } from '@/stores/faq'
import { usePageSeo, useFaqSchema } from '@/composables/useSchemaOrg'

const faqStore = useFaqStore()

usePageSeo(
  'Вопросы и ответы адвокату: частые вопросы о судебных делах',
  'Ответы на частые вопросы о работе адвоката: гарантии, стоимость, сроки судебных разбирательств.',
  'вопросы адвокату, ответы юриста, частые вопросы'
)

useFaqSchema(faqStore.faqItems)
</script>

<template>
  <MainLayout>
    <section class="py-16 px-4 max-w-7xl mx-auto text-center">
      <h1 class="mb-6">
        Вопросы и ответы
      </h1>
    </section>

    <FaqAccordion :faq-items="faqStore.faqItems" />
  </MainLayout>
</template>
