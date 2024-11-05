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
      'term-card-front': showFront,
      'term-card-back': !showFront,
      'term-card-success': isCorrect,
      'term-card-error': isCorrect === false,
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

.term-card-front {
  background-color: darkcyan;
}
.term-card-back {
  background-color: purple;
}
.term-card-success {
  background-color: green;
}
.term-card-error {
  background-color: red;
}
</style>
