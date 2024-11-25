<script setup lang="ts">
defineProps<{
  color?: ButtonColor
  icon?: string
  isDisabled?: boolean
  isLoading?: boolean
  isSubmitButton?: boolean
  variant?: 'solid' | 'outline' | 'link'
}>()

const emits = defineEmits(['click'])
</script>

<template>
  <u-button
    class="text-base"
    :color="color"
    :disabled="isDisabled"
    :icon="icon"
    :loading="isLoading"
    :type="isSubmitButton ? 'submit' : undefined"
    :variant="variant || 'solid'"
    @click="emits('click')"
  >
    <slot />
  </u-button>
</template>

<style scoped></style>
