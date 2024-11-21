<script setup lang="ts">
const props = defineProps<{
  isCorrect?: boolean | null
  mode: IGameMode
  term: ITerm
}>()
const emits = defineEmits(['selectOption'])

const showFront = computed(() => props.mode !== EGameMode.front)

const onCardClick = () => {
  emits('selectOption')
}
</script>
<template>
  <div
    class="term-card h-20 w-full lg:w-72 lg:h-72 m-2 lg:m-5"
    @click="onCardClick"
    :class="{
      'bg-indigo-300 dark:bg-indigo-500': showFront && isCorrect === null,
      'bg-sky-300 dark:bg-sky-500': !showFront && isCorrect === null,
      'bg-red-300 dark:bg-red-500': isCorrect === false,
      'bg-emerald-300 dark:bg-emerald-500': isCorrect,
    }"
  >
    <p v-if="showFront">{{ term.front }}</p>
    <div v-else>
      <p>{{ term.back }}</p>
      <p v-if="term.back_alternatives">[{{ term.back_alternatives }}]</p>
    </div>
  </div>
</template>
<style lang="css" scoped>
.term-card {
  align-items: center;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.term-card:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>
