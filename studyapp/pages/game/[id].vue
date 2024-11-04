<script setup lang="ts">
const route = useRoute()
const setId = computed(() => route.params.id)
const mode = computed(() => route.query.mode || GAME_MODE_TYPE.CHOOSE)
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
  <div v-if="data">
    <game-choose v-if="mode === GAME_MODE_TYPE.CHOOSE" :set="data" />
    <game-write v-if="mode === GAME_MODE_TYPE.WRITE" :set="data" />
  </div>
</template>

<style scoped></style>
