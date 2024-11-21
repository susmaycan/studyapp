<script setup lang="ts">
const props = defineProps<{
  mode: IGameMode
  set: ISet
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

const { speak } = useSpeechAPI()

const displayAlert = ref(false)

const playWord = () => {
  speak(selectedTerm.value!.back_alternatives || selectedTerm.value!.back)
}

const selectOption = () => {
  document.getElementById('listening-game-input')?.blur()
  displayAlert.value = true

  if (isCorrectResult.value) {
    setTimeout(() => {
      goToNextWord()
    }, 1000)
  }
}

const goToNextWord = () => {
  displayAlert.value = false
  goNext()
  document.getElementById('listening-game-input')?.focus()
}

onMounted(() => {
  initGame()
})

watch(
  () => selectedTerm.value,
  () => {
    if (selectedTerm.value) playWord()
  }
)
</script>
<template>
  <div class="mt-5">
    <div v-if="canShowList">
      <div class="my-4">
        <p>How do you say</p>
        <u-button
          color="primary"
          icon="i-heroicons-speaker-wave"
          size="xl"
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
        id="listening-game-input"
        placeholder="Type your answer"
        :value="selectedUserResult as string || ''"
        @enter="selectedUserResult ? selectOption() : null"
        @input="writeResult"
      />
      <s-button @click="selectOption" :is-disabled="!selectedUserResult">
        Accept
      </s-button>
      <game-result-alert
        :display-alert="displayAlert"
        :is-correct-result="isCorrectResult"
        :mode="mode"
        :selected-term="selectedTerm"
        @go-to-next-word="goToNextWord"
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
