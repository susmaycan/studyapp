<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { filters, currentPage, updateFilters } = useFilters()
const { isAdmin } = useAuth()
const {
  data,
  execute: fetchTermList,
  isLoading,
} = useAPI<IResponse<ITerm>>('/terms/', { params: filters })

onMounted(() => {
  fetchTermList()
})

const termList = computed(() => data?.value?.results || [])
</script>
<template>
  <div>
    <div v-if="isAdmin" class="flex justify-end">
      <term-create-form @refresh="fetchTermList" />
    </div>
    <s-title>Terms</s-title>
    <p>Check out all available terms</p>
    <div class="flex flex-col items-center justify-center gap-4">
      <s-input
        icon="i-heroicons-magnifying-glass-20-solid"
        :is-disabled="isLoading"
        :is-loading="isLoading"
        placeholder="Search terms..."
        :value="filters.search"
        @change="updateFilters('search', $event)"
      />
    </div>
    <set-skeleton-list v-if="isLoading" />
    <div v-else class="flex flex-col items-center justify-center">
      <div class="flex justify-center flex-wrap w-full">
        <term-card-all
          v-for="term in termList"
          :key="term.id"
          :can-edit="true"
          :term="term"
          @refresh="fetchTermList"
        />
      </div>
      <div v-if="termList.length === 0">
        No terms match this query. Please try with a different query.
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
