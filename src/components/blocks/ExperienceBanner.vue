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
  <section class="py-12 px-4 bg-white">
    <div
      ref="rootEl"
      class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 bg-gray-900 text-white rounded-2xl overflow-hidden"
    >
      <div class="p-8 text-center">
        <div class="text-5xl font-mono font-bold text-primary-400 tabular-nums">
          более {{ casesCount }}
        </div>
        <p class="mt-2 text-gray-300">
          Успешно завершенных судебных процессов
        </p>
      </div>
      <div class="p-8 text-center">
        <div class="text-5xl font-mono font-bold text-primary-400 tabular-nums">
          {{ yearsCount }}
        </div>
        <p class="mt-2 text-gray-300">
          Лет непрерывного юридического стажа
        </p>
      </div>
    </div>
  </section>
</template>
