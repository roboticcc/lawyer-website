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
    class="section-ink site-section"
  >
    <div class="site-container">
      <div class="section-intro">
        <h2 class="display-title">
          Реальные примеры из практики
        </h2>
        <div class="hidden h-px bg-white/20 md:block" />
      </div>

      <div class="grid grid-cols-1 border-l border-t border-white/15 md:grid-cols-2">
        <article
          v-for="caseStudy in visibleCases"
          :key="caseStudy.id"
          class="group flex min-h-[24rem] flex-col border-b border-r border-white/15 p-7 transition-colors hover:bg-white/[0.035] md:p-9"
        >
          <div class="flex items-start justify-between gap-6">
            <span class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary-400">
              {{ caseStudy.category }}
            </span>
            <span class="font-serif text-2xl text-white/30">{{ caseStudy.year }}</span>
          </div>
          <h3 class="mb-6 mt-auto max-w-xl uppercase text-primary-50 transition-colors group-hover:text-primary-300">
              {{ caseStudy.title }}
          </h3>
          <p class="border-t border-white/15 pt-5 text-sm text-[#aaa69e]">
              {{ caseStudy.result }}
          </p>
          <button
              type="button"
              class="mt-6 self-start text-xs font-semibold uppercase tracking-[0.1em] text-primary-300 underline decoration-primary-500/50 underline-offset-8 hover:text-primary-50"
              @click="openCase(caseStudy)"
            >
              Изучить решение суда →
          </button>
        </article>
      </div>

      <div
        v-if="!showAll && cases.length > visibleCount"
        class="mt-10 flex justify-end"
      >
        <button
          type="button"
          class="button-outline"
          @click="showAll = true"
        >
          Показать еще
        </button>
      </div>
    </div>

    <div
      v-if="activeCase"
      class="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      :aria-label="activeCase.title"
      @click.self="closeCase"
    >
      <div class="modal-panel relative w-full max-w-lg p-8 md:p-10">
        <button
          type="button"
          class="absolute right-4 top-4 text-black/40 hover:text-black"
          aria-label="Закрыть"
          @click="closeCase"
        >
          ✕
        </button>
        <span class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary-700">
          {{ activeCase.category }} • {{ activeCase.year }}
        </span>
        <h3 class="mb-5 mt-3 uppercase">
          {{ activeCase.title }}
        </h3>
        <p class="mb-4 text-black/60">
          {{ activeCase.description }}
        </p>
        <p class="border-t border-black/20 pt-5 font-semibold text-primary-800">
          {{ activeCase.result }}
        </p>
      </div>
    </div>
  </section>
</template>
