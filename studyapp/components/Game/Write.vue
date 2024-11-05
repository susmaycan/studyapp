<script setup lang="ts">
const props = defineProps<{
  set: ISet
}>()

const {
  selectedTerm,
  optionList,
  resultList,
  isFinished,
  initGame,
  writeResult,
  selectedResult,
  goNext,
} = useSetWrittenGame(props.set.terms)

const canShowList = computed(
  () => !isFinished.value && props.set?.terms?.length
)

const isCorrect = computed(
  () =>
    selectedResult.value === selectedTerm.value?.back ||
    selectedResult.value === selectedTerm.value?.back_alternatives
)

const displayAlert = ref(false)

// const isCorrectOption = (choice: ITerm) => {
//   if (selectedResult.value?.id === choice.id) return isCorrect.value

//   if (selectedResult.value && choice.id === selectedTerm.value?.id) return true

//   return null
// }

const selectOption = () => {
  displayAlert.value = true
  setTimeout(
    () => {
      displayAlert.value = false
      goNext()
    },
    isCorrect.value ? 1000 : 2000
  )
}

onMounted(() => {
  initGame()
})
</script>
<template>
  <div>
    <div v-if="canShowList">
      <div class="my-4">
        <p>How do you say</p>
        <s-title>{{ selectedTerm?.front }}</s-title>
        <p>You can type it in kana or kanji</p>
      </div>
      <div class="my-3">
        <u-input
          class="mb-3"
          size="sm"
          color="white"
          placeholder="Type your answer"
          :value="selectedResult"
          @update:model-value="writeResult"
        />
        <s-button @click="selectOption" :is-disabled="!selectedResult">
          Accept
        </s-button>
      </div>

      <u-alert
        v-show="displayAlert"
        :color="isCorrect ? 'green' : 'red'"
        :title="isCorrect ? 'Correct! ✅' : 'Incorrect! ❌'"
        :description="
          !isCorrect
            ? `Correct answer is ${selectedTerm?.back}${
                selectedTerm?.back_alternatives
                  ? ' [' + selectedTerm?.back_alternatives + ']'
                  : ''
              }`
            : undefined
        "
      />
    </div>
    <game-result
      v-else-if="isFinished"
      :results="resultList"
      :terms="optionList"
      @init-game="initGame"
    />
  </div>
</template>
<style scoped></style>
