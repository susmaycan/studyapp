<script setup lang="ts">
const props = defineProps<{
  set: ISet
  mode: IGameMode
}>()

const { mode: propsMode } = toRefs(props)
const {
  canShowList,
  goNext,
  initGame,
  isCorrectResult,
  isFinished,
  optionList,
  selectedTerm,
  selectedUserResult,
  userResultList,
  writeResult,
} = useGame(props.set.terms, propsMode)

const displayAlert = ref(false)

const selectOption = () => {
  displayAlert.value = true
  setTimeout(
    () => {
      displayAlert.value = false
      goNext()
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
        placeholder="Type your answer"
        :value="selectedUserResult as string || ''"
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
      :results="userResultList"
      :terms="optionList"
      @init-game="initGame"
    />
  </div>
</template>
<style scoped></style>
