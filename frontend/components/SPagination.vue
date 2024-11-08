<script setup lang="ts">
const props = defineProps<{
  total?: string | number
  page: string | number
}>()

const emit = defineEmits(['change-page'])

const updatePage = (newPage: number) => {
  emit('change-page', newPage)
}

const numberedPage = computed<number>(() => {
  if (typeof props.page === 'number') return props.page
  else return parseInt(props.page)
})
const numberedTotal = computed<number>(() => {
  if (!props.total) return 1
  if (typeof props.total === 'number') return props.total
  else return parseInt(props.total)
})
</script>

<template>
  <u-pagination
    :model-value="numberedPage"
    :page-count="14"
    :total="numberedTotal"
    @update:model-value="updatePage"
  />
</template>

<style scoped></style>
