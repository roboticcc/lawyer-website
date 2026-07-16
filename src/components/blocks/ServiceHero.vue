<script setup lang="ts">
import type { PropType } from 'vue'
import type { Service } from '@/types'
import PageHero from '@/components/shared/PageHero.vue'
import { useAttorneyStore } from '@/stores/attorney'
import { generateAttorneyAltText } from '@/utils/seo'

const props = defineProps({
  service: {
    type: Object as PropType<Service>,
    required: true,
  },
})

const attorneyStore = useAttorneyStore()
</script>

<template>
  <PageHero
    :title="props.service.title"
    :subtitle="props.service.shortDescription"
    :action-button="{
      text: 'Бесплатная консультация',
      href: '#consultation-form',
      variant: 'primary',
    }"
    :secondary-button="{
      text: 'Позвонить сейчас',
      href: `tel:${attorneyStore.attorney.phone}`,
    }"
  >
    <template #image>
      <img
        :src="attorneyStore.attorney.photos.working"
        :alt="generateAttorneyAltText(attorneyStore.attorney, props.service)"
        class="w-full h-auto rounded-2xl shadow-xl"
        loading="eager"
        fetchpriority="high"
        width="640"
        height="480"
      >
    </template>

    <template #details>
      <div class="flex items-center gap-4 mt-4 text-sm">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-primary-500 rounded-full" />
          <span>{{ attorneyStore.attorney.experienceYears }} лет стажа</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-secondary-500 rounded-full" />
          <span>{{ attorneyStore.attorney.casesWon }}+ успешных дел</span>
        </div>
      </div>
      <p class="mt-4 text-lg font-bold text-gray-900">
        {{ props.service.price }}
      </p>
    </template>
  </PageHero>
</template>
