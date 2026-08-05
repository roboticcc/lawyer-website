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
  primary: 'button-primary disabled:opacity-50',
  secondary: 'button-primary disabled:opacity-50',
  outline: 'button-outline',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed"
    :class="variantClasses[variant]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
