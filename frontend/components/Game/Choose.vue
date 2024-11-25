<script setup lang="ts">
const props = defineProps<{
  mode: IGameMode
  set: ISet
}>()

const { mode: propsMode } = toRefs(props)
const emits = defineEmits(['finishGame'])

const {
  canShowList,
  choiceList,
  gameResultStats,
  gameStats,
  initGame,
  isCorrectResult,
  isFinished,
  mode,
  selectChoice,
  selectedTerm,
  selectedUserResult,
} = useGame(props.set.terms, propsMode, EGameType.choose)

const isCorrectOption = (choice: ITerm) => {
  const userResult = selectedUserResult.value as ITerm

  if (!userResult) return null
  if (userResult.id === choice.id) return isCorrectResult.value
  if (userResult && choice.id === selectedTerm.value?.id) return true
  return null
}

const { speak, isCompatible } = useSpeechAPI()

onMounted(() => {
  initGame()
})

const selectOption = (choice: ITerm) => {
  if (isCompatible)
    speak(selectedTerm.value!.back_alternatives || selectedTerm.value!.back)
  selectChoice(choice)
}

watch(
  () => isFinished.value,
  (newValue, oldValue) => {
    if (isFinished.value) emits('finishGame', gameResultStats.value)
  }
)
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
          :is-correct="isCorrectOption(choice)"
          :mode="mode"
          :term="choice"
          @select-option="selectOption(choice)"
        />
      </div>
    </div>
    <game-result
      v-else-if="isFinished"
      :stats="gameStats"
      @init-game="initGame"
    />
  </div>
</template>
<style scoped></style>
