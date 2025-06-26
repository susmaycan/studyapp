<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const setId = computed(() => route.params.id)
const {
  data,
  execute: fetchSetDetail,
  isLoading,
} = useAPI<ISet>(`/sets/${setId.value}/`)

onMounted(() => {
  fetchSetDetail()
})

const { isAdmin } = useAuth()

const goToList = () => {
  router.push('/sets')
}
</script>

<template>
  <set-skeleton-detail v-if="isLoading" />
  <div v-if="isAdmin && data" class="flex justify-end m-2 gap-3">
    <set-create-form @refresh="fetchSetDetail" :set="data" />
    <set-delete @refresh="goToList" :set="data" />
  </div>
  <set-detail v-if="data && !isLoading" :set="data" @refresh="fetchSetDetail" />
</template>

<style scoped></style>
