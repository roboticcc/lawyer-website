<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import ContactActions from '@/components/ui/ContactActions.vue'
import otherPracticesData from '@/data/otherPractices.json'
import type { OtherPracticeGroup } from '@/types'
import { usePageSeo } from '@/composables/useSchemaOrg'

const route = useRoute()
const groups = otherPracticesData as OtherPracticeGroup[]
const group = computed(() => groups.find((entry) => entry.id === route.params.groupId))
const item = computed(() => {
  const index = Number(route.params.itemIndex) - 1
  return Number.isInteger(index) && index >= 0 ? group.value?.items[index] : undefined
})
const groupTitle = computed(() => group.value?.title.replace(/^[^\p{L}\p{N}]+/u, '') || '')

usePageSeo(
  item.value ? `${item.value.title} — услуги адвоката` : 'Услуга не найдена',
  item.value?.description || 'Услуги адвоката Мосензова Игоря Леонидовича.',
  { noindex: true }
)
</script>

<template>
  <MainLayout>
    <section
      v-if="item"
      class="section-paper site-section"
    >
      <div class="site-container max-w-4xl">
        <p class="eyebrow mb-6">
          {{ groupTitle }}
        </p>
        <h1 class="display-title mb-10">
          {{ item.title }}
        </h1>
        <p class="mb-12 max-w-3xl border-l-2 border-primary-700 pl-6 text-xl text-black/70">
          {{ item.description }}
        </p>
        <h2 class="mb-6 text-3xl">
          Обсудить ситуацию
        </h2>
        <ContactActions />
        <RouterLink
          to="/uslugi"
          class="mt-12 block text-primary-800 underline underline-offset-4"
        >
          Все услуги
        </RouterLink>
      </div>
    </section>
    <section
      v-else
      class="section-paper site-section text-center"
    >
      <h1 class="mb-6">
        Услуга не найдена
      </h1>
      <RouterLink
        to="/uslugi"
        class="text-primary-800 underline underline-offset-4"
      >
        Вернуться к услугам
      </RouterLink>
    </section>
  </MainLayout>
</template>
