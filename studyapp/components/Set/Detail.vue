<script setup lang="ts">
const props = defineProps<{
  set: ISet
}>()

const router = useRouter()
const startGame = (mode: string) => {
  router.push(`/play/${set?.id}?mode=${mode}`)
}

const emptyTermsLength = computed(() => props.set?.terms.length === 0)
</script>
<template>
  <div>
    <div>
      <set-image :url="set.picture" :width="100" :height="100" />

      <h1>{{ set?.name }}</h1>
      <p>{{ set?.description }}</p>
      <!-- <SetGameButtons
        areButtonsDisabled="{emptyTermsLength()}"
        isLoading="{isLoading}"
        startGame="{startGame}"
      /> -->
    </div>
    <div>
      <!-- <FlatList data={set?.terms} renderItem={({ item:
      term }) => (
      <TermCard key="{term.id}" term="{term}" />
      )} numColumns={2} /> {emptyTermsLength() &&
      <Text>No terms in this set.</Text>} -->
      <div v-for="term in set.term" :key="term.id">
        {{ term.name }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
