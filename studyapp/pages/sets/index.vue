<script setup lang="ts">
const {
  data,
  execute: fetchSetList,
  isLoading,
} = useAPI<IResponse<ISet>>('/sets/')

onMounted(() => {
  fetchSetList()
})

const setList = computed<ISet[]>(() => data?.value?.results || [])
</script>
<template>
  <div>
    <h1>Sets page!</h1>
    <div v-if="isLoading">Loading data...</div>
    <set-card v-for="set in setList" :key="set.id" :set="set" />
  </div>
</template>

<style scoped></style>
