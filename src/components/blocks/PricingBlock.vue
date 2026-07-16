<script setup lang="ts">
import type { Service } from '@/types'

const props = defineProps<{
  services: Service[]
}>()
</script>

<template>
  <section
    v-if="services.some((s) => s.pricing?.length)"
    class="py-16 px-4 bg-white"
  >
    <div class="max-w-4xl mx-auto">
      <h2 class="mb-8 text-center">
        Стоимость услуг
      </h2>

      <div
        v-for="service in props.services"
        :key="service.id"
        class="mb-8"
      >
        <h3
          v-if="services.length > 1"
          class="mb-4"
        >
          {{ service.title }}
        </h3>
        <table class="w-full border-collapse">
          <caption class="sr-only">
            Стоимость услуг: {{ service.title }}
          </caption>
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th
                scope="col"
                class="text-left py-3 text-gray-600 font-semibold"
              >
                Услуга
              </th>
              <th
                scope="col"
                class="text-right py-3 text-gray-600 font-semibold"
              >
                Стоимость
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in service.pricing"
              :key="item.service"
              class="border-b border-gray-100"
            >
              <td class="py-3">
                {{ item.service }}
              </td>
              <td class="py-3 text-right font-semibold text-primary-700">
                {{ item.price }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
