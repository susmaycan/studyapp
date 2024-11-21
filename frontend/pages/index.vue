<script setup lang="ts">
const { filters, currentPage, updateFilters } = useFilters()

const {
  data: dataSet,
  execute: fetchSetList,
  isLoading: isLoadingSets,
} = useAPI<IResponse<ISet>>('/sets/', { params: { ordering: 'created_at' } })

const {
  data: dataTerm,
  execute: fetchTermList,
  isLoading: isLoadingTerms,
} = useAPI<IResponse<ITerm>>('/terms/', { params: { ordering: 'created_at' } })

onMounted(() => {
  fetchSetList()
  fetchTermList()
})

const setList = computed<ISet[]>(
  () => dataSet?.value?.results.slice(0, 3) || []
)
const termList = computed<ITerm[]>(
  () => dataTerm?.value?.results.slice(0, 3) || []
)
</script>
<template>
  <div>
    <s-title>Study App 📚</s-title>
    <div class="flex justify-center flex-wrap gap-5 mt-5"></div>
    <set-skeleton-list v-if="isLoadingSets || isLoadingTerms" />
    <div v-else class="flex flex-col items-center justify-center">
      <h2 class="mb-1 text-lg">Check out the latest sets</h2>
      <div class="flex justify-center flex-wrap w-full">
        <set-card v-for="set in setList" :key="set.id" :set="set" />
      </div>
      <h2 class="mb-2 text-lg">Check out the latest terms</h2>
      <div class="flex justify-center flex-wrap w-full">
        <term-card-all v-for="term in termList" :key="term.id" :term="term" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
