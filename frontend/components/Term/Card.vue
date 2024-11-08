<script setup lang="ts">
const props = defineProps<{
  term: ITerm
}>()

const { speak, isCompatible } = useSpeechAPI()

const onCardClick = () => {
  if (showFront.value && isCompatible.value)
    speak(props.term.back_alternatives || props.term.back)
  showFront.value = !showFront.value
}

const showFront = ref(true)
</script>
<template>
  <transition name="flip" mode="out-in">
    <div
      v-if="showFront"
      class="term-card h-20 w-full lg:w-72 lg:h-72 m-2 lg:m-5 bg-indigo-300 dark:bg-indigo-500"
      @click="onCardClick"
    >
      <p>{{ term.front }}</p>
    </div>
    <div
      v-else
      class="term-card h-20 w-full lg:w-72 lg:h-72 m-2 lg:m-5 bg-sky-300 dark:bg-sky-500"
      @click="onCardClick"
    >
      <p>{{ term.back }}</p>
      <p v-if="term.back_alternatives">[{{ term.back_alternatives }}]</p>
    </div>
  </transition>
</template>
<style lang="css" scoped>
.term-card {
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.term-card:hover {
  cursor: pointer;
  opacity: 0.5;
}

.flip-enter-active,
.flip-leave-active {
  transition: all 0.6s;
}
.flip-enter,
.flip-leave-to {
  transform: rotateY(-90deg);
}
</style>
