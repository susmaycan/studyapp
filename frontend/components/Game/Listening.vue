<script setup lang="ts">
const props = defineProps<{
  set: ISet
  mode: IGameMode
}>()

const { mode: propsMode } = toRefs(props)
const {
  canShowList,
  gameStats,
  goNext,
  initGame,
  isCorrectResult,
  isFinished,
  selectedTerm,
  selectedUserResult,
  writeResult,
} = useGame(props.set.terms, propsMode, EGameType.listening)

const { speak, isCompatible } = useSpeechAPI()

const displayAlert = ref(false)

const playWord = () => {
  speak(selectedTerm.value!.back_alternatives || selectedTerm.value!.back)
}

const selectOption = () => {
  displayAlert.value = true
  setTimeout(
    () => {
      displayAlert.value = false
      goNext()
      document.getElementById('write-game-input')?.focus()
    },
    isCorrectResult.value ? 1000 : 2000
  )
}

const alertText = computed(() => {
  if (!selectedTerm.value) return ''

  let correctAnswer = selectedTerm.value.front

  if (props.mode === EGameMode.front) {
    const alternativeBack = selectedTerm.value.back_alternatives
      ? ` [${selectedTerm.value.back_alternatives}]`
      : ''
    correctAnswer = selectedTerm?.value.back + alternativeBack
  }

  return `Correct answer is ${correctAnswer}`
})

onMounted(() => {
  initGame()
})

watch(
  () => selectedTerm.value,
  () => {
    playWord()
  }
)
</script>
<template>
  <div class="mt-5">
    <div v-if="canShowList">
      <div class="my-4">
        <p>How do you say</p>
        <u-button
          icon="i-heroicons-speaker-wave"
          size="xl"
          color="primary"
          square
          variant="solid"
          @click="playWord"
        />
        <p v-if="mode === EGameMode.front">
          You can type the back or the alternative back
        </p>
      </div>
      <s-input
        class="mb-3"
        id="write-game-input"
        placeholder="Type your answer"
        :value="selectedUserResult as string || ''"
        @enter="selectOption"
        @input="writeResult"
      />
      <s-button @click="selectOption" :is-disabled="!selectedUserResult">
        Accept
      </s-button>
      <u-alert
        v-show="displayAlert"
        :color="isCorrectResult ? 'green' : 'red'"
        :title="isCorrectResult ? 'Correct! ✅' : 'Incorrect! ❌'"
        :description="alertText"
      />
    </div>
    <game-result
      v-else-if="isFinished"
      :stats="gameStats"
      @init-game="initGame"
    />
  </div>
</template>
<style scoped></style>
