<script setup lang="ts">
const props = defineProps<{
  displayAlert: boolean
  isCorrectResult?: boolean
  mode: IGameMode
  selectedTerm?: ITerm | null
}>()

const emits = defineEmits(['goToNextWord'])

const onKeyDown = (event: KeyboardEvent) => {
  if (props.displayAlert && (event.key === 'Enter' || event.key === 'Escape')) {
    emits('goToNextWord')
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyDown)
})
</script>
<template>
  <u-alert
    v-show="displayAlert"
    :color="isCorrectResult ? 'green' : 'red'"
    :title="isCorrectResult ? 'Correct! ✅' : 'Incorrect! ❌'"
  >
    <template #description>
      <p v-if="selectedTerm">
        Correct answer is
        <strong>
          <span v-if="mode === EGameMode.front">
            <term-back :term="selectedTerm" />
          </span>
          <span v-else>{{ selectedTerm.front }}</span>
        </strong>
      </p>
      <s-button
        @click="emits('goToNextWord')"
        class="mt-2"
        color="white"
        variant="outline"
      >
        Go next
      </s-button>
    </template>
  </u-alert>
</template>
