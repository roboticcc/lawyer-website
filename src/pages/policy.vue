<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import policy from '@/data/privacyPolicy.json'
import { usePageSeo } from '@/composables/useSchemaOrg'

usePageSeo(
  'Политика обработки персональных данных',
  'Политика обработки персональных данных посетителей сайта адвоката Мосензова Игоря Леонидовича.'
)
</script>

<template>
  <MainLayout>
    <section class="section-paper site-section">
      <article class="site-container max-w-4xl text-black/75">
        <h1 class="display-title mb-8 text-4xl text-[#191917] md:text-5xl">
          {{ policy.title }}
        </h1>
        <p class="text-sm">
          {{ policy.published }}
        </p>
        <p class="mb-12 text-sm">
          {{ policy.effective }}
        </p>

        <section
          v-for="section in policy.sections"
          :key="section.title"
          class="mt-12"
        >
          <h2 class="mb-6 text-2xl text-[#191917] md:text-3xl">
            {{ section.title }}
          </h2>
          <p
            v-for="paragraph in section.paragraphs"
            :key="paragraph"
            class="mb-4 leading-relaxed"
          >
            {{ paragraph }}
          </p>
        </section>
      </article>
    </section>
  </MainLayout>
</template>
