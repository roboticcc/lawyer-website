<script setup lang="ts">
import type { Service } from '@/types'
import ServiceCard from '@/components/ui/ServiceCard.vue'

withDefaults(
  defineProps<{
    services: Service[]
    title?: string
    description?: string
    showLinkToAll?: boolean
  }>(),
  { title: 'Наша специализация', showLinkToAll: true }
)
</script>

<template>
  <section
    id="services-section"
    class="section-ink site-section"
  >
    <div class="site-container">
      <div class="section-intro">
        <h2
          v-if="title"
          class="display-title"
        >
          {{ title }}
        </h2>

        <p
          v-if="description"
          class="section-copy"
        >
          {{ description }}
        </p>
        <div
          v-else
          class="hidden h-px bg-white/20 md:block"
        />
      </div>

      <div class="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :service="service"
        />
      </div>

      <div
        v-if="showLinkToAll"
        class="mt-10 flex justify-end"
      >
        <RouterLink
          to="/uslugi"
          target="_blank"
          rel="noopener noreferrer"
          class="button-outline"
        >
          <span>Показать все услуги</span>
          <svg
            class="ml-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-grid {
  counter-reset: service;
}

.service-grid > :not(:first-child) {
  margin-left: -1px;
}

@media (max-width: 1023px) {
  .service-grid > :not(:first-child) {
    margin-left: 0;
  }
}
</style>
