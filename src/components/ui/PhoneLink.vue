<script setup lang="ts">
import { computed } from 'vue'
import { useAttorneyStore } from '@/stores/attorney'

withDefaults(
  defineProps<{
    showIcon?: boolean
  }>(),
  { showIcon: false }
)

const attorneyStore = useAttorneyStore()
const telHref = computed(() => `tel:${attorneyStore.attorney.phone}`)
</script>

<template>
  <a
    v-if="attorneyStore.attorney.phone"
    :href="telHref"
    class="phone-link inline-flex items-center gap-2"
  >
    <svg
      v-if="showIcon"
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
    <span>{{ attorneyStore.formattedPhone }}</span>
  </a>
</template>
