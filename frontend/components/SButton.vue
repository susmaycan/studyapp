<script setup lang="ts">
defineProps<{
  isDisabled?: boolean
  isLoading?: boolean
  isSubmitButton?: boolean
  variant?: 'solid' | 'outline'
}>()

const emits = defineEmits(['click'])
</script>

<template>
  <u-button
    class="text-base"
    :disabled="isDisabled"
    :loading="isLoading"
    :type="isSubmitButton ? 'submit' : undefined"
    :variant="variant || 'solid'"
    @click="emits('click')"
  >
    <slot />
  </u-button>
</template>

<style scoped></style>
