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
    <h1 class="text-4xl">Sets</h1>
    <p>Check out the list of sets</p>
    <div class="flex justify-center flex-wrap gap-5 mt-5">
      <set-card v-for="set in setList" :key="set.id" :set="set" />
    </div>
    <set-skeleton-list v-if="isLoading" />
  </div>
</template>

<style scoped></style>
