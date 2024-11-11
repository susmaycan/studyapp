<script setup lang="ts">
const props = defineProps<{
  set: ISet
  mode: IGameMode
}>()

const { mode: propsMode } = toRefs(props)
const {
  canShowList,
  choiceList,
  initGame,
  isCorrectResult,
  isFinished,
  mode,
  optionList,
  selectedTerm,
  selectedUserResult,
  selectChoice,
  userResultList,
} = useGame(props.set.terms, propsMode)

const isCorrectOption = (choice: ITerm) => {
  const userResult = selectedUserResult.value as ITerm

  if (!userResult) return null
  if (userResult.id === choice.id) return isCorrectResult.value
  if (userResult && choice.id === selectedTerm.value?.id) return true
  return null
}

const { speak } = useSpeechAPI()

onMounted(() => {
  initGame()
})

const selectOption = (choice: ITerm) => {
  if (selectedTerm.value?.back)
    speak(selectedTerm.value!.back_alternatives || selectedTerm.value!.back)
  selectChoice(choice)
}
</script>
<template>
  <div>
    <div v-if="canShowList">
      <div class="my-4">
        <p>Select the correct word for</p>
        <s-title>
          <span v-if="mode === EGameMode.front">{{ selectedTerm?.front }}</span>
          <span v-else>
            {{ selectedTerm?.back }}
            <span v-if="selectedTerm?.back_alternatives">
              [{{ selectedTerm.back_alternatives }}]
            </span>
          </span>
        </s-title>
      </div>
      <div class="flex flex-wrap justify-center">
        <game-term-card
          v-for="choice in choiceList"
          :key="choice.id"
          :term="choice"
          :mode="mode"
          :is-correct="isCorrectOption(choice)"
          @select-option="selectOption(choice)"
        />
      </div>
    </div>
    <game-result
      v-else-if="isFinished"
      :game-type="EGameType.choose"
      :mode="mode"
      :results="userResultList"
      :terms="optionList"
      @init-game="initGame"
    />
  </div>
</template>
<style scoped></style>
