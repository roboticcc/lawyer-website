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
    class="block text-left p-6 bg-white rounded-2xl border-2 border-primary-100 hover:shadow-xl hover:border-primary-300 transition-all duration-300 cursor-pointer no-underline"
  >
    <span class="text-sm text-primary-600 font-semibold uppercase tracking-wide">
      {{ service.category }}
    </span>
    <h3 class="mt-2 mb-3">{{ service.title }}</h3>
    <p class="text-gray-600">{{ service.shortDescription }}</p>
    <p class="mt-4 text-lg font-bold text-gray-900">{{ service.price }}</p>
  </a>
</template>
