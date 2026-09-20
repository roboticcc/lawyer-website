<script setup lang="ts">
import type { ProcessStep } from '@/types'

defineProps<{
  steps: ProcessStep[]
  title?: string
  pageHeading?: boolean
}>()
</script>

<template>
  <section
    id="work-process"
    class="section-paper site-section relative overflow-hidden"
    :class="pageHeading ? 'site-section--compact' : 'pb-8'"
  >
    <div class="site-container">
      <div
        v-if="title"
        class="mb-9"
      >
        <span
          v-if="!pageHeading"
          class="eyebrow mb-4"
        >От обращения до результата</span>
        <component
          :is="pageHeading ? 'h1' : 'h2'"
          :class="pageHeading ? 'content-page-title' : 'display-title'"
        >
          {{ title }}
        </component>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <article
          v-for="step in steps"
          :key="step.step"
          class="rounded-lg border border-black/10 bg-[#ebe6dc] p-7 md:p-9"
        >
          <span class="mb-8 block text-sm font-semibold text-primary-700">0{{ step.step }} / 04</span>
          <h3 class="mb-4 max-w-md text-2xl">
            {{ step.title }}
          </h3>
          <div>
            <p class="max-w-xl text-black/70">
              {{ step.description }}
            </p>
            <ul
              v-if="step.details?.length"
              class="mt-5 space-y-2 border-t border-black/10 pt-5 text-sm text-black/60"
            >
              <li
                v-for="detail in step.details"
                :key="detail"
                class="flex gap-3 before:mt-[0.75em] before:h-px before:w-4 before:flex-none before:bg-primary-700"
              >
                {{ detail }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
