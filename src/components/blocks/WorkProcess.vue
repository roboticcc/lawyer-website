<script setup lang="ts">
import type { ProcessStep } from '@/types'

defineProps<{
  steps: ProcessStep[]
  title?: string
}>()
</script>

<template>
  <section
    id="work-process"
    class="py-16 px-4 bg-gray-50 work-process-section relative overflow-hidden"
  >
    <h2
      v-if="title"
      class="text-center mb-12"
    >
      {{ title }}
    </h2>
    <div class="max-w-6xl mx-auto relative">
      <div
        class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-primary-500 opacity-80 hidden md:block"
        aria-hidden="true"
      />

      <div
        v-for="step in steps"
        :key="step.step"
        class="timeline-item relative mb-16 md:w-1/2"
        :class="step.side === 'right' ? 'md:ml-auto md:pl-8' : 'md:pr-8'"
      >
        <div
          class="timeline-dot absolute w-6 h-6 bg-primary-500 rounded-full border-4 border-white z-10 hidden md:block"
          :class="step.side === 'right' ? '-left-3' : 'right-0 translate-x-1/2'"
          aria-hidden="true"
        />
        <div class="p-6 rounded-2xl bg-white shadow-md">
          <span class="text-sm text-gray-400 font-mono">ШАГ {{ step.step }}</span>
          <h3 class="mt-2 mb-3">
            {{ step.title }}
          </h3>
          <p class="text-gray-600">
            {{ step.description }}
          </p>
          <ul
            v-if="step.details?.length"
            class="mt-3 list-disc list-inside text-gray-600 space-y-1"
          >
            <li
              v-for="detail in step.details"
              :key="detail"
            >
              {{ detail }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
