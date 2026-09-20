<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { useCasesStore } from '@/stores/cases'
import { usePageSeo } from '@/composables/useSchemaOrg'

const route = useRoute()
const casesStore = useCasesStore()
const caseStudy = computed(() => casesStore.cases.find((item) => item.id === route.params.id))

usePageSeo(
  caseStudy.value ? `Пример дела: ${caseStudy.value.title}` : 'Описание дела',
  caseStudy.value ? `Демонстрационное описание: ${caseStudy.value.description}` : 'Описание дела адвоката.',
  undefined
)
</script>

<template>
  <MainLayout>
    <article
      v-if="caseStudy"
      class="section-paper site-section"
    >
      <div class="site-container max-w-4xl">
        <p class="eyebrow mb-6">
          {{ caseStudy.category }} · {{ caseStudy.year }}
        </p>
        <h1 class="display-title mb-8">
          {{ caseStudy.title }}
        </h1>
        <p class="mb-10 border-l-2 border-primary-700 pl-5 text-sm text-black/65">
          Демонстрационный пример. Ссылка на судебный акт будет добавлена после проверки материала.
        </p>
        <h2 class="mb-4 text-2xl">
          Обстоятельства
        </h2>
        <p class="mb-9 max-w-3xl text-lg text-black/75">
          {{ caseStudy.description }}
        </p>
        <h2 class="mb-4 text-2xl">
          Итог примера
        </h2>
        <p class="mb-12 max-w-3xl text-lg text-black/75">
          {{ caseStudy.result }}
        </p>
        <RouterLink
          to="/praktika"
          class="text-primary-800 underline underline-offset-4"
        >
          Вернуться к примерам дел
        </RouterLink>
      </div>
    </article>
    <section
      v-else
      class="section-paper site-section text-center"
    >
      <h1 class="mb-6">
        Дело не найдено
      </h1>
      <RouterLink
        to="/praktika"
        class="text-primary-800 underline underline-offset-4"
      >
        Вернуться к примерам дел
      </RouterLink>
    </section>
  </MainLayout>
</template>
