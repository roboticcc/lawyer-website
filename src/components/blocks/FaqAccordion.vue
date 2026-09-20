<script setup lang="ts">
import type { FaqItem } from '@/types'
import { useFaqStore } from '@/stores/faq'

defineProps<{
  faqItems: FaqItem[]
}>()

const faqStore = useFaqStore()
</script>

<template>
  <section class="section-ink site-section">
    <div class="site-container grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
      <h2 class="display-title">
        Вопросы и ответы
      </h2>

      <ul class="border-t border-white/15">
        <li
          v-for="item in faqItems"
          :key="item.id"
          class="border-b border-white/15"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-primary-300"
            :aria-expanded="faqStore.isExpanded(item.id)"
            :aria-controls="`faq-answer-${item.id}`"
            @click="faqStore.toggleItem(item.id)"
          >
            <span class="font-sans text-lg font-semibold leading-snug md:text-xl">{{ item.question }}</span>
            <span
              class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary-500/60 text-xl font-light leading-none text-primary-300 transition-transform"
              :class="{ 'rotate-45': faqStore.isExpanded(item.id) }"
              aria-hidden="true"
            >
              +
            </span>
          </button>
          <div
            v-show="faqStore.isExpanded(item.id)"
            :id="`faq-answer-${item.id}`"
            class="max-w-2xl pb-7 pr-12 text-[#aaa69e]"
          >
            {{ item.answer }}
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
