<script setup lang="ts">
const route = useRoute()
const setId = computed(() => route.params.id)
const mode = computed(() => route.query.mode || EGameType.choose)
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
  <game-settings />
  <div v-if="data">
    <game-choose v-if="mode === EGameType.choose" :set="data" />
    <game-write v-if="mode === EGameType.write" :set="data" />
  </div>
</template>

<style scoped></style>
