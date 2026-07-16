<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import MainLayout from '@/layouts/MainLayout.vue'
import ServicesGrid from '@/components/blocks/ServicesGrid.vue'
import { useServicesStore } from '@/stores/services'
import { usePageSeo } from '@/composables/useSchemaOrg'
import { generateServiceUrl } from '@/utils/seo'

const servicesStore = useServicesStore()

usePageSeo(
  'Услуги адвоката: уголовные, гражданские, административные дела',
  'Полный перечень услуг адвоката: защита по уголовным делам, экономическим преступлениям, административным и гражданским спорам.',
  'услуги адвоката, уголовные дела, гражданские споры, административные дела'
)

const itemListSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: servicesStore.services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: generateServiceUrl(service.slug),
    name: service.title,
  })),
}))

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(itemListSchema.value) }],
})
</script>

<template>
  <MainLayout>
    <section class="py-16 px-4 max-w-7xl mx-auto text-center">
      <h1 class="mb-6">
        Наша специализация
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Комплексная юридическая защита по всем ключевым направлениям права. Выберите категорию,
        чтобы узнать подробнее о порядке работы и стоимости.
      </p>
    </section>

    <ServicesGrid
      :services="servicesStore.services"
      title=""
      :show-link-to-all="false"
    />
  </MainLayout>
</template>
