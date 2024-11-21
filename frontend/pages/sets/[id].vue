<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
const route = useRoute()
const setId = computed(() => route.params.id)
const {
  data,
  execute: fetchSetDetail,
  isLoading,
} = useAPI<ISet>(`/sets/${setId.value}/`)

onMounted(() => {
  fetchSetDetail()
})
</script>

<template>
  <set-skeleton-detail v-if="isLoading" />
  <set-detail v-if="data" :set="data" />
</template>

<style scoped></style>
