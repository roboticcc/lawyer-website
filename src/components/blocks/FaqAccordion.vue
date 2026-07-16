<script setup lang="ts">
import type { FaqItem } from '@/types'
import { useFaqStore } from '@/stores/faq'

defineProps<{
  faqItems: FaqItem[]
}>()

const faqStore = useFaqStore()
</script>

<template>
  <section class="py-12 px-4 max-w-4xl mx-auto">
    <div class="bg-white shadow-lg rounded-2xl p-6 md:p-10">
      <h2 class="mb-8">
        Вопросы и ответы
      </h2>

      <ul class="divide-y divide-gray-100">
        <li
          v-for="item in faqItems"
          :key="item.id"
        >
          <button
            type="button"
            class="w-full flex justify-between items-center gap-4 py-4 text-left"
            :aria-expanded="faqStore.isExpanded(item.id)"
            :aria-controls="`faq-answer-${item.id}`"
            @click="faqStore.toggleItem(item.id)"
          >
            <span class="font-semibold text-gray-900">{{ item.question }}</span>
            <svg
              class="w-5 h-5 flex-shrink-0 transition-transform"
              :class="{ 'rotate-180': faqStore.isExpanded(item.id) }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            v-if="faqStore.isExpanded(item.id)"
            :id="`faq-answer-${item.id}`"
            class="pb-4 text-gray-600"
          >
            {{ item.answer }}
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
