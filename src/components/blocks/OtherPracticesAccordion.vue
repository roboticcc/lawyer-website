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
</script>

<template>
  <section
    id="other-practices"
    class="py-16 px-4 bg-white"
  >
    <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
      <div>
        <h2>Другие направления правовой поддержки</h2>
      </div>

      <div class="md:col-span-2 space-y-4">
        <article
          v-for="group in groups"
          :key="group.id"
          class="border border-gray-200 rounded-2xl overflow-hidden"
        >
          <button
            type="button"
            class="w-full flex justify-between items-center gap-4 p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
            :aria-expanded="isOpen(group.id)"
            :aria-controls="`other-practice-${group.id}`"
            @click="toggleGroup(group.id)"
          >
            <span class="font-semibold text-gray-900">{{ group.title }}</span>
            <span
              class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-primary-500 text-white text-lg leading-none transition-transform"
              :class="{ 'rotate-45': isOpen(group.id) }"
              aria-hidden="true"
            >
              +
            </span>
          </button>

          <ul
            v-if="isOpen(group.id)"
            :id="`other-practice-${group.id}`"
            class="p-5 space-y-4"
          >
            <li
              v-for="item in group.items"
              :key="item.title"
            >
              <p class="font-semibold text-gray-900">
                {{ item.title }}
              </p>
              <p class="text-gray-600 text-sm mt-1">
                {{ item.description }}
              </p>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
