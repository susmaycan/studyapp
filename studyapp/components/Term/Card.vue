<script setup lang="ts">
const props = defineProps<{
  term: ITerm
}>()

const { speak, isCompatible } = useSpeechAPI()

const onCardClick = () => {
  if (showFront.value && isCompatible.value) speak(props.term.back)
  showFront.value = !showFront.value
}

const showFront = ref(true)
</script>
<template>
  <div
    class="term-card"
    :class="{
      'bg-sky-300 dark:bg-sky-500': !showFront,
      'bg-indigo-300 dark:bg-indigo-500': showFront,
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
