<script setup lang="ts">
const props = defineProps<{
  canEdit?: boolean
  showStats?: boolean
  term: ITerm
}>()

const emits = defineEmits(['refresh'])

const { speak, isCompatible } = useSpeechAPI()
const { isAdmin } = useAuth()

const playSound = () => {
  if (isCompatible.value) speak(props.term.back_alternatives || props.term.back)
}
</script>
<template>
  <div class="term-card h-32 w-full lg:w-52 lg:h-52 m-2 lg:m-5 rounded-md">
    <div v-if="isCompatible" class="sound-button">
      <s-button
        color="white"
        icon="i-heroicons-speaker-wave"
        variant="link"
        @click="playSound"
      />
    </div>
    <div v-if="canEdit && isAdmin" class="edit-buttons">
      <term-create-form :term="term" @refresh="emits('refresh')" />
      <term-delete :term="term" @refresh="emits('refresh')" />
    </div>
    <div
      class="bg-indigo-300 dark:bg-indigo-500 w-full h-full flex flex-col items-center justify-end rounded-t-md"
    >
      <p class="font-bold pb-3">{{ term.front }}</p>
      <term-stats v-if="showStats" :stats="term.stats" />
    </div>
    <div
      class="bg bg-teal-300 dark:bg-teal-500 w-full h-full flex flex-col items-center justify-start rounded-b-md"
    >
      <p class="term-back pt-3">
        <term-back :term="term" />
      </p>
    </div>
  </div>
</template>
<style lang="css" scoped>
.term-card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.term-back {
  word-break: break-all;
}

.edit-buttons {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.sound-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
}
</style>
