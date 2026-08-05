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
    <section class="section-soft site-section--compact">
      <div class="site-container border-b border-white/15 pb-10">
        <h1 class="display-title max-w-5xl">Вопросы и ответы</h1>
      </div>
    </section>

    <FaqAccordion :faq-items="faqStore.faqItems" />
  </MainLayout>
</template>
