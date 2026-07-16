<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  label: string
  type?: string
  placeholder?: string
  autocomplete?: string
}>()

const { value, errorMessage } = useField<string>(() => props.name)
const inputId = computed(() => `field-${props.name}`)
</script>

<template>
  <div>
    <label
      :for="inputId"
      class="block text-sm font-medium text-gray-700 mb-1"
    >{{ label }}</label>
    <input
      :id="inputId"
      v-model="value"
      :type="type || 'text'"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? `${inputId}-error` : undefined"
      class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      :class="errorMessage ? 'border-red-500' : 'border-gray-300'"
    >
    <p
      v-if="errorMessage"
      :id="`${inputId}-error`"
      class="mt-1 text-sm text-red-600"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
