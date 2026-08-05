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
    class="section-paper site-section relative overflow-hidden"
  >
    <div class="site-container">
      <div
        v-if="title"
        class="section-intro"
      >
        <h2 class="display-title">
          {{ title }}
        </h2>
        <div class="hidden h-px bg-black/25 md:block" />
      </div>

      <div class="border-t border-black/20">
        <article
          v-for="step in steps"
          :key="step.step"
          class="grid gap-5 border-b border-black/20 py-8 md:grid-cols-[7rem_0.8fr_1.2fr] md:gap-10 md:py-12"
        >
          <span class="font-serif text-3xl text-primary-700">0{{ step.step }}</span>
          <h3 class="max-w-md uppercase">
            {{ step.title }}
          </h3>
          <div>
            <p class="max-w-xl text-black/60">
              {{ step.description }}
            </p>
            <ul
              v-if="step.details?.length"
              class="mt-4 space-y-2 text-sm text-black/55"
            >
              <li
                v-for="detail in step.details"
                :key="detail"
                class="flex gap-3 before:mt-[0.7em] before:h-px before:w-5 before:flex-none before:bg-primary-700"
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
