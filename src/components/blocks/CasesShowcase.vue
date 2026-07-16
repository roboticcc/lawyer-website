<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CaseStudy } from '@/types'

const props = defineProps<{
  cases: CaseStudy[]
}>()

const activeCase = ref<CaseStudy | null>(null)
const showAll = ref(false)
const visibleCount = 4

const visibleCases = computed(() =>
  showAll.value ? props.cases : props.cases.slice(0, visibleCount)
)

const openCase = (caseStudy: CaseStudy) => {
  activeCase.value = caseStudy
}

const closeCase = () => {
  activeCase.value = null
}
</script>

<template>
  <section
    id="cases"
    class="py-16 px-4 max-w-7xl mx-auto"
  >
    <h2 class="mb-12 text-center">
      Реальные примеры из практики
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="caseStudy in visibleCases"
        :key="caseStudy.id"
        class="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
      >
        <img
          :src="caseStudy.imageUrl"
          :alt="`Судебное дело: ${caseStudy.title}`"
          class="w-full h-48 object-cover"
          loading="lazy"
          width="400"
          height="192"
        >
        <div class="p-6 flex flex-col flex-grow">
          <span class="text-sm text-primary-600 font-semibold uppercase tracking-wide">
            {{ caseStudy.category }}
          </span>
          <h3 class="mt-2 mb-3">
            {{ caseStudy.title }}
          </h3>
          <p class="text-gray-600 flex-grow">
            {{ caseStudy.result }}
          </p>
          <button
            type="button"
            class="mt-4 text-secondary-600 font-semibold hover:text-secondary-700 text-left"
            @click="openCase(caseStudy)"
          >
            Изучить решение суда →
          </button>
        </div>
      </article>
    </div>

    <div
      v-if="!showAll && cases.length > visibleCount"
      class="mt-10 text-center"
    >
      <button
        type="button"
        class="px-8 py-3 border-2 border-primary-500 text-primary-600 rounded-full hover:bg-primary-50 transition-colors font-semibold"
        @click="showAll = true"
      >
        Показать еще
      </button>
    </div>

    <div
      v-if="activeCase"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      :aria-label="activeCase.title"
      @click.self="closeCase"
    >
      <div class="bg-white rounded-2xl max-w-lg w-full p-8 relative">
        <button
          type="button"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Закрыть"
          @click="closeCase"
        >
          ✕
        </button>
        <span class="text-sm text-primary-600 font-semibold uppercase tracking-wide">
          {{ activeCase.category }} • {{ activeCase.year }}
        </span>
        <h3 class="mt-2 mb-4">
          {{ activeCase.title }}
        </h3>
        <p class="text-gray-600 mb-4">
          {{ activeCase.description }}
        </p>
        <p class="font-semibold text-primary-700">
          {{ activeCase.result }}
        </p>
      </div>
    </div>
  </section>
</template>
