<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useCounterAnimation, useScrollReveal } from '@/composables/useAnimation'

const props = defineProps<{
  casesWon: number
  experienceYears: number
}>()

const { count: casesCount, startAnimation: startCasesAnimation } = useCounterAnimation(
  props.casesWon
)
const { count: yearsCount, startAnimation: startYearsAnimation } = useCounterAnimation(
  props.experienceYears
)

const rootEl = ref<HTMLElement | null>(null)
const { isVisible, observe } = useScrollReveal(rootEl)

onMounted(() => {
  observe()
})

watch(isVisible, (visible) => {
  if (visible) {
    startCasesAnimation()
    startYearsAnimation()
  }
})
</script>

<template>
  <section class="section-ink site-section--compact">
    <div
      ref="rootEl"
      class="site-container grid grid-cols-1 border-y border-white/15 sm:grid-cols-2 sm:divide-x sm:divide-white/15"
    >
      <div class="border-b border-white/15 py-10 sm:border-b-0 sm:px-10 sm:py-14">
        <div class="font-serif text-[clamp(3.5rem,8vw,7rem)] font-normal leading-none text-primary-300 tabular-nums">
          более {{ casesCount }}
        </div>
        <p class="mt-4 max-w-sm text-xs uppercase tracking-[0.14em] text-[#aaa69e]">
          Успешно завершенных судебных процессов
        </p>
      </div>
      <div class="py-10 sm:px-10 sm:py-14">
        <div class="font-serif text-[clamp(3.5rem,8vw,7rem)] font-normal leading-none text-primary-300 tabular-nums">
          {{ yearsCount }}
        </div>
        <p class="mt-4 max-w-sm text-xs uppercase tracking-[0.14em] text-[#aaa69e]">
          Лет непрерывного юридического стажа
        </p>
      </div>
    </div>
  </section>
</template>
