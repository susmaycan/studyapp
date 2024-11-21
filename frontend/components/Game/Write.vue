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
} = useGame(props.set.terms, propsMode, EGameType.write)

const { speak, isCompatible } = useSpeechAPI()

const displayAlert = ref(false)

const selectOption = () => {
  document.getElementById('write-game-input')?.blur()
  displayAlert.value = true
  if (isCompatible)
    speak(selectedTerm.value!.back_alternatives || selectedTerm.value!.back)

  if (isCorrectResult.value) {
    setTimeout(() => {
      goToNextWord()
    }, 2000)
  }
}

const goToNextWord = () => {
  displayAlert.value = false
  goNext()
  document.getElementById('write-game-input')?.focus()
}

onMounted(() => {
  initGame()
})
</script>
<template>
  <div class="mt-5">
    <div v-if="canShowList">
      <div class="my-4">
        <p>How do you say</p>
        <s-title v-if="mode === EGameMode.front">
          {{ selectedTerm?.front }}
        </s-title>
        <s-title v-else>
          {{ selectedTerm?.back }}
          <span v-if="selectedTerm?.back_alternatives">
            [{{ selectedTerm.back_alternatives }}]
          </span>
        </s-title>
        <p v-if="mode === EGameMode.front">
          You can type the back or the alternative back
        </p>
      </div>
      <s-input
        class="mb-3"
        id="write-game-input"
        :is-disabled="displayAlert"
        placeholder="Type your answer"
        :value="selectedUserResult as string || ''"
        @enter="selectedUserResult ? selectOption() : null"
        @input="writeResult"
      />
      <s-button
        class="mb-3"
        @click="selectOption"
        :is-disabled="!selectedUserResult || displayAlert"
      >
        Accept
      </s-button>
      <game-result-alert
        :display-alert="displayAlert"
        :selected-term="selectedTerm"
        :is-correct-result="isCorrectResult"
        :mode="mode"
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
