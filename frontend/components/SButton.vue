<script setup lang="ts">
defineProps<{
  isLoading?: boolean
  isDisabled?: boolean
  variant?: 'solid' | 'outline'
}>()

const emits = defineEmits(['click'])
</script>

<template>
  <u-button
    class="text-base"
    :disabled="isDisabled"
    :loading="isLoading"
    :variant="variant || 'solid'"
    @click="emits('click')"
  >
    <slot />
  </u-button>
</template>

<style scoped></style>
