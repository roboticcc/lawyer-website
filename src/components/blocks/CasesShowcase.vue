<script setup lang="ts">
import type { CaseStudy } from '@/types'

withDefaults(defineProps<{ cases: CaseStudy[]; showHeading?: boolean }>(), {
  showHeading: true,
})
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
        class="section-intro"
      >
        <h2 class="display-title">
          Примеры дел
        </h2>
        <p class="section-copy">
          Демонстрационные описания. Материалы судебных решений будут добавлены после проверки.
        </p>
      </div>

      <div
        class="case-carousel"
        aria-label="Примеры дел: прокрутка по горизонтали"
        tabindex="0"
      >
        <article
          v-for="caseStudy in cases"
          :key="caseStudy.id"
          class="case-card group flex flex-col border border-white/15 bg-[#1d1d1b] p-6 transition-colors hover:border-primary-500"
        >
          <div class="flex items-start justify-between gap-4">
            <span class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary-400">
              {{ caseStudy.category }}
            </span>
            <span class="text-sm text-white/50">{{ caseStudy.year }}</span>
          </div>
          <h3 class="mb-4 mt-7 text-xl uppercase text-primary-50 transition-colors group-hover:text-primary-300">
            {{ caseStudy.title }}
          </h3>
          <p class="mt-auto border-t border-white/15 pt-4 text-sm text-[#aaa69e]">
            {{ caseStudy.result }}
          </p>
          <a
            :href="`/praktika/${caseStudy.id}`"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 self-start text-xs font-semibold uppercase tracking-[0.1em] text-primary-300 underline underline-offset-8 hover:text-primary-50"
          >
            Открыть описание →
          </a>
        </article>
      </div>
      <p class="mt-4 text-xs text-white/50">
        Листайте карточки в сторону, чтобы увидеть все дела.
      </p>
    </div>
  </section>
</template>

<style scoped>
.case-carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
  scrollbar-color: #ac987e #23221f;
}

.case-card {
  flex: 0 0 clamp(16rem, 27vw, 19rem);
  min-height: 20rem;
  scroll-snap-align: start;
}
</style>
