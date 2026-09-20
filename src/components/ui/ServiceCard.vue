<script setup lang="ts">
import type { Service } from '@/types'

const props = defineProps<{
  service: Service
}>()

const serviceHref = `/uslugi/${props.service.slug}`
</script>

<template>
  <a
    :href="serviceHref"
    target="_blank"
    rel="noopener noreferrer"
    class="service-card group relative flex min-h-[25rem] flex-col border border-white/15 bg-[#1d1d1b] p-7 text-left no-underline transition-colors duration-300 hover:border-primary-500 md:p-9"
  >
    <span class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary-400">
      {{ service.category }}
    </span>
    <h3 class="mb-6 mt-auto max-w-md uppercase text-primary-50 transition-colors group-hover:text-primary-300">{{ service.title }}</h3>
    <p class="border-t border-white/15 pt-5 text-sm text-[#aaa69e]">{{ service.shortDescription }}</p>
    <p class="mt-5 text-sm font-semibold uppercase tracking-[0.1em] text-primary-300">{{ service.price }}</p>
  </a>
</template>

<style scoped>
.service-card {
  counter-increment: service;
}

.service-card::after {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: rgba(242, 239, 232, 0.25);
  content: "0" counter(service);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
}
</style>
