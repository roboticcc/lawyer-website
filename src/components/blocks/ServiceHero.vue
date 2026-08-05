<script setup lang="ts">
import type { PropType } from 'vue'
import type { Service } from '@/types'
import PageHero from '@/components/shared/PageHero.vue'
import { useAttorneyStore } from '@/stores/attorney'

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
      <div class="abstract-portrait" aria-hidden="true" />
    </template>

    <template #details>
      <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.1em] text-[#aaa69e]">
        <div class="flex items-center gap-2.5">
          <span class="h-1.5 w-1.5 rounded-full bg-primary-500" />
          <span>{{ attorneyStore.attorney.experienceYears }} лет стажа</span>
        </div>
        <div class="flex items-center gap-2.5">
          <span class="h-1.5 w-1.5 rounded-full bg-primary-500" />
          <span>{{ attorneyStore.attorney.casesWon }}+ успешных дел</span>
        </div>
      </div>
      <p class="mt-5 font-serif text-2xl text-primary-300">
        {{ props.service.price }}
      </p>
    </template>
  </PageHero>
</template>
