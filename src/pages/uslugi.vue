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
  'Услуги адвоката в Омске | Игорь Мосензов',
  'Направления работы адвоката Игоря Мосензова: уголовные дела, защита бизнеса, гражданские и административные споры. Описание услуг и стоимость.'
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
    <section class="section-soft site-section--compact">
      <div class="site-container grid gap-8 border-b border-white/15 pb-10 md:grid-cols-[1fr_0.8fr] md:items-end">
      <h1 class="display-title">
        Наша специализация
      </h1>
      <p class="max-w-2xl text-lg text-[#b9b5ad]">
        Комплексная юридическая защита по всем ключевым направлениям права. Выберите категорию,
        чтобы узнать подробнее о порядке работы и стоимости.
      </p>
      </div>
    </section>

    <ServicesGrid
      :services="servicesStore.services"
      title=""
      :show-link-to-all="false"
    />
  </MainLayout>
</template>
