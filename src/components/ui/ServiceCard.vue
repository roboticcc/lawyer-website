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
    class="service-card group relative flex min-h-[18rem] flex-col rounded-lg border border-white/10 bg-[#262521] p-7 text-left no-underline transition-all duration-200 hover:-translate-y-1 hover:border-primary-500/70 hover:bg-[#2b2925] md:p-8"
  >
    <span class="mb-7 pr-10 text-xs font-semibold uppercase tracking-[0.1em] text-primary-300">
      {{ service.category }}
    </span>
    <span
      class="absolute right-7 top-7 text-xl text-primary-300 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
      aria-hidden="true"
    >↗</span>
    <h3 class="mb-4 max-w-xl text-[clamp(1.2rem,2vw,1.55rem)] leading-snug text-primary-50">{{ service.title }}</h3>
    <p class="mb-7 max-w-xl text-sm text-[#c7c2b9]">{{ service.shortDescription }}</p>
    <p class="mt-auto border-t border-white/10 pt-4 text-sm font-semibold text-primary-300">{{ service.price }}</p>
  </a>
</template>
