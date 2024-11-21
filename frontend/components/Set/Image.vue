<script setup lang="ts">
const props = defineProps<{
  url: string
  alt: string
  width?: number
  height?: number
}>()

const width = computed(() => (props.width || 11) + 'rem')
const height = computed(() => (props.height || 11) + 'rem')
</script>
<template>
  <img :alt="alt" class="set-image" :src="url" />
</template>
<style scoped>
.set-image {
  border-radius: 0.5rem;
  object-fit: fill;
  width: v-bind(width);
  height: v-bind(height);
}
</style>
