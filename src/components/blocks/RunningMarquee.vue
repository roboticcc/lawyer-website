<script setup lang="ts">
import { useAttorneyStore } from '@/stores/attorney'

const attorneyStore = useAttorneyStore()
const text = `Адвокат ${attorneyStore.attorney.fullName} • Профессиональная защита прав • `
</script>

<template>
  <div
    class="marquee-wrapper bg-gray-900 text-white py-3 overflow-hidden"
    aria-hidden="true"
  >
    <div class="marquee-track">
      <span
        v-for="n in 4"
        :key="n"
        class="marquee-item"
      >{{ text }}</span>
    </div>
  </div>
</template>

<style scoped>
.marquee-wrapper {
  width: 100%;
}

.marquee-track {
  display: flex;
  white-space: nowrap;
  animation: marquee-scroll 22s linear infinite;
}

.marquee-item {
  padding-right: 1rem;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
