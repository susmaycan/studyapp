<script setup lang="ts">
defineProps<{
  isLoading?: boolean
  isDisabled?: boolean
}>()

const emits = defineEmits(['click'])
</script>

<template>
  <u-button
    :loading="isLoading"
    @click="emits('click')"
    :disabled="isDisabled"
    class="text-base"
  >
    <slot />
  </u-button>
</template>

<style scoped></style>
