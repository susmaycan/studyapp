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

onMounted(() => {
  initGame()
})
</script>
<template>
  <div>
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
      <div class="my-3">
        <u-input
          class="mb-3"
          size="sm"
          color="white"
          placeholder="Type your answer"
          :value="selectedUserResult || ''"
          @update:model-value="writeResult"
        />
        <s-button @click="selectOption" :is-disabled="!selectedUserResult">
          Accept
        </s-button>
      </div>

      <u-alert
        v-show="displayAlert"
        :color="isCorrectResult ? 'green' : 'red'"
        :title="isCorrectResult ? 'Correct! ✅' : 'Incorrect! ❌'"
        :description="
          !isCorrectResult
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
      :results="userResultList"
      :terms="optionList"
      @init-game="initGame"
    />
  </div>
</template>
<style scoped></style>
