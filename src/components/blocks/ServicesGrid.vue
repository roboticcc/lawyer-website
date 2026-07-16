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
    class="py-16 px-4 max-w-7xl mx-auto"
  >
    <h2
      v-if="title"
      class="mb-8 text-center"
    >
      {{ title }}
    </h2>

    <p
      v-if="description"
      class="text-xl text-gray-600 mb-12 max-w-4xl mx-auto text-center"
    >
      {{ description }}
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ServiceCard
        v-for="service in services"
        :key="service.id"
        :service="service"
      />
    </div>

    <div
      v-if="showLinkToAll"
      class="mt-8 text-center"
    >
      <RouterLink
        to="/uslugi"
        class="inline-flex items-center justify-center px-8 py-4 bg-secondary-500 text-white rounded-full hover:bg-secondary-600 transition-colors no-underline"
      >
        <span>Показать все услуги</span>
        <svg
          class="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </RouterLink>
    </div>
  </section>
</template>
