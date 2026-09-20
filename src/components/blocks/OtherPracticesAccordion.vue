<script setup lang="ts">
import { ref } from 'vue'
import otherPracticesData from '@/data/otherPractices.json'
import type { OtherPracticeGroup } from '@/types'

const groups = otherPracticesData as OtherPracticeGroup[]
const openGroups = ref<string[]>([])

const toggleGroup = (id: string) => {
  const index = openGroups.value.indexOf(id)
  if (index === -1) {
    openGroups.value.push(id)
  } else {
    openGroups.value.splice(index, 1)
  }
}

const isOpen = (id: string) => openGroups.value.includes(id)

const formatGroupNumber = (index: number) => String(index + 1).padStart(2, '0')
const cleanGroupTitle = (title: string) => title.replace(/^[^\p{L}\p{N}]+/u, '')
</script>

<template>
  <section
    id="other-practices"
    class="section-paper site-section"
  >
    <div class="site-container grid min-w-0 gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-20">
      <div class="min-w-0">
        <h2 class="display-title text-balance text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.18] [hyphens:none]">
          Другие направления правовой поддержки
        </h2>
      </div>

      <div class="min-w-0 border-t border-black/20">
        <article
          v-for="(group, index) in groups"
          :key="group.id"
          class="border-b border-black/20"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-6 py-7 text-left transition-colors hover:text-primary-700"
            :aria-expanded="isOpen(group.id)"
            :aria-controls="`other-practice-${group.id}`"
            @click="toggleGroup(group.id)"
          >
            <span class="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-4 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-6">
              <span class="pt-1 font-sans text-base text-primary-700 md:text-lg">
                {{ formatGroupNumber(index) }}
              </span>
              <span class="min-w-0 break-normal font-sans text-xl uppercase leading-tight [hyphens:none] md:text-2xl">
                {{ cleanGroupTitle(group.title) }}
              </span>
            </span>
            <span
              class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-primary-700 text-2xl font-light leading-none text-primary-700 transition-transform"
              :class="{ 'rotate-45': isOpen(group.id) }"
              aria-hidden="true"
            >
              +
            </span>
          </button>

          <ul
            v-show="isOpen(group.id)"
            :id="`other-practice-${group.id}`"
            class="space-y-6 pb-8 pl-0 md:pl-12"
          >
            <li
              v-for="(item, itemIndex) in group.items"
              :key="item.title"
            >
              <a
                :href="`/uslugi/dopolnitelnye/${group.id}/${itemIndex + 1}`"
                target="_blank"
                rel="noopener noreferrer"
                class="font-semibold text-black/85 underline decoration-primary-700/40 underline-offset-4 hover:text-primary-700"
              >
                {{ item.title }} →
              </a>
              <p class="mt-1 max-w-2xl text-sm text-black/55">
                {{ item.description }}
              </p>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
