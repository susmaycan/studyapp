<script setup lang="ts">
const props = defineProps<{
  set: ISet
  mode: IGameMode
}>()

const { mode: propsMode } = toRefs(props)
const {
  selectedTerm,
  choiceList,
  optionList,
  resultList,
  isFinished,
  initGame,
  mode,
  selectChoice,
  selectedResult,
  goNext,
} = useGame(props.set.terms, propsMode)

const canShowList = computed(
  () => !isFinished.value && props.set?.terms?.length
)

const isCorrect = computed(
  () => selectedTerm.value?.id === selectedResult.value?.id
)

const isCorrectOption = (choice: ITerm) => {
  if (selectedResult.value?.id === choice.id) return isCorrect.value

  if (selectedResult.value && choice.id === selectedTerm.value?.id) return true

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
      :results="resultList"
      :terms="optionList"
      :mode="mode"
      @init-game="initGame"
    />
  </div>
</template>
<style scoped></style>
