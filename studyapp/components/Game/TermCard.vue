<script setup lang="ts">
const props = defineProps<{
  term: ITerm
  mode: IGameMode
  isCorrect: boolean | null
}>()
const emits = defineEmits(['selectOption'])

const showFront = computed(() => props.mode !== EGameMode.front)

const onCardClick = () => {
  emits('selectOption')
}
</script>
<template>
  <div
    class="term-card"
    :class="{
      'bg-sky-300 dark:bg-sky-500': !showFront,
      'bg-indigo-300 dark:bg-indigo-500': showFront,
      'bg-emerald-300 dark:bg-emerald-500': isCorrect,
      'bg-red-300 dark:bg-red-500': isCorrect === false,
    }"
    @click="onCardClick"
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
  width: 200px;
  height: 200px;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 1rem;
}

.term-card:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>
