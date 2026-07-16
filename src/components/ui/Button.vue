<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'primary', type: 'button', disabled: false }
)

defineEmits<{ click: [MouseEvent] }>()

const variantClasses: Record<string, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-300',
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
  outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed"
    :class="variantClasses[variant]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
