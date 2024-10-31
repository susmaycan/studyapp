<script setup lang="ts">
defineProps<{
  url: string
  alt: string
  width?: number
  height?: number
}>()
</script>
<template>
  <img :alt="alt" :height="height || 200" :src="url" :width="width || 200" />
</template>
