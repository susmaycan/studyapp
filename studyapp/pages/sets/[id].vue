<script setup lang="ts">
const route = useRoute()
const setId = computed(() => route.params.id)
const {
  data,
  execute: fetchSetDetail,
  isLoading,
} = useAPI<ISet>(() => '/sets/' + setId.value)

onMounted(() => {
  fetchSetDetail()
})
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <set-detail v-if="data" :set="data" />
</template>

<style scoped></style>
