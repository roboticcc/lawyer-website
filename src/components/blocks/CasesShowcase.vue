<script setup lang="ts">
import { ref } from 'vue'
import type { CaseStudy } from '@/types'

withDefaults(defineProps<{ cases: CaseStudy[]; showHeading?: boolean }>(), {
  showHeading: true,
})

const carousel = ref<HTMLElement | null>(null)
const scrollCases = (direction: number) => {
  carousel.value?.scrollBy({ left: direction * 340, behavior: 'smooth' })
}
</script>

<template>
  <section
    id="cases"
    class="section-ink"
    :class="showHeading ? 'site-section' : 'site-section--compact'"
  >
    <div class="site-container">
      <div
        v-if="showHeading"
        class="mb-9"
      >
        <h2 class="display-title">
          Иллюстративные примеры
        </h2>
      </div>

      <div
        ref="carousel"
        class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        aria-label="Примеры дел: прокрутка по горизонтали"
        tabindex="0"
      >
        <article
          v-for="caseStudy in cases"
          :key="caseStudy.id"
          class="group flex min-h-[19rem] w-[min(82vw,20rem)] shrink-0 snap-start flex-col rounded-lg border border-white/10 bg-[#262521] p-7 transition-colors hover:border-primary-500"
        >
          <div class="flex items-start justify-between gap-4">
            <span class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary-400">
              {{ caseStudy.category }}
            </span>
            <span class="text-sm text-white/50">{{ caseStudy.year }}</span>
          </div>
          <h3 class="mb-4 mt-7 text-xl leading-snug text-primary-50 transition-colors group-hover:text-primary-300">
            {{ caseStudy.title }}
          </h3>
          <p class="mt-auto border-t border-white/15 pt-4 text-sm text-[#c7c2b9]">
            {{ caseStudy.result }}
          </p>
          <a
            :href="`/praktika/${caseStudy.id}`"
            class="mt-5 self-start text-sm font-semibold text-primary-300 underline underline-offset-4 hover:text-primary-50"
          >
            Открыть описание →
          </a>
        </article>
      </div>
      <div class="mt-4 flex items-center justify-between gap-4">
        <p class="text-sm text-[#aaa69e]">
          Листайте примеры в сторону
        </p>
        <div class="flex gap-2">
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-md border border-white/25 hover:border-primary-300"
            aria-label="Предыдущие примеры"
            @click="scrollCases(-1)"
          >
            ←
          </button>
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-md border border-white/25 hover:border-primary-300"
            aria-label="Следующие примеры"
            @click="scrollCases(1)"
          >
            →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
