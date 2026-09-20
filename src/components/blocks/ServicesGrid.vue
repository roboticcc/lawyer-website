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
  { title: 'Наша специализация', description: '', showLinkToAll: true }
)
</script>

<template>
  <section
    id="services-section"
    class="section-ink site-section"
  >
    <div class="site-container">
      <div
        v-if="title || description"
        class="section-intro"
      >
        <div v-if="title">
          <span class="eyebrow mb-4">Направления практики</span>
          <h2 class="display-title">
            {{ title }}
          </h2>
        </div>
        <p
          v-if="description"
          class="section-copy"
        >
          {{ description }}
        </p>
      </div>

      <div class="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        <ServiceCard
          v-for="(service, index) in services"
          :key="service.id"
          :service="service"
          :class="{ 'md:col-span-2': services.length % 2 === 1 && index === services.length - 1 }"
        />
      </div>

      <div
        v-if="showLinkToAll"
        class="mt-10 flex justify-end"
      >
        <RouterLink
          to="/uslugi"
          class="button-outline"
        >
          <span>Все направления</span>
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
