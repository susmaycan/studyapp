<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { filters, currentPage, updateFilters } = useFilters()
const { isAdmin } = useAuth()

const {
  data,
  execute: fetchSetList,
  isLoading,
} = useAPI<IResponse<ISet>>('/sets/', { params: filters })

onMounted(() => {
  fetchSetList()
})

const setList = computed<ISet[]>(() => data?.value?.results || [])
</script>
<template>
  <div>
    <div v-if="isAdmin" class="flex justify-end">
      <set-create-form @refresh="fetchSetList" />
    </div>
    <s-title>Sets</s-title>
    <p>Check out the list of sets</p>
    <div class="flex flex-col items-center justify-center">
      <s-input
        class="my-3"
        icon="i-heroicons-magnifying-glass-20-solid"
        :is-disabled="isLoading"
        :is-loading="isLoading"
        placeholder="Search terms..."
        :value="filters.search"
        @change="updateFilters('search', $event)"
      />
    </div>
    <div class="flex justify-center flex-wrap gap-5 mt-5"></div>
    <set-skeleton-list v-if="isLoading" />
    <div v-else class="flex flex-col items-center justify-center">
      <div class="flex justify-center flex-wrap w-full">
        <set-card v-for="set in setList" :key="set.id" :set="set" />
      </div>
      <div v-if="setList.length === 0">
        No sets found. Please try with a different query.
      </div>
      <div class="my-5">
        <s-pagination
          :page="currentPage"
          :total="data?.count"
          @change-page="filters.page = $event"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
