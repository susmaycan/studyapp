<script setup lang="ts">
const props = defineProps<{
  mode: IGameMode
  results: ITerm[] | string[]
  gameType: IGameType
  terms: ITerm[]
}>()
const emits = defineEmits(['initGame'])

const stats = computed(() => {
  let stats = { ok: 0, ko: 0, total: props.terms.length }
  props.terms.forEach((term, index) => {
    let isCorrect = false

    if (props.gameType === EGameType.choose) {
      const result = props.results[index] as ITerm
      if (props.mode === EGameMode.front && term.back === result.back)
        isCorrect = true
      else if (props.mode === EGameMode.back && term.front === result.front)
        isCorrect = true
    } else {
      const result = props.results[index] as string

      if (props.mode === EGameMode.back && term.front === result)
        isCorrect = true
      else if (
        (props.mode === EGameMode.front && term.back === result) ||
        (term?.back_alternatives?.split(',') || []).includes(result)
      )
        isCorrect = true
    }

    if (isCorrect) stats.ok++
    else stats.ko++
  })
  return stats
})
</script>
<template>
  <div>
    <div class="flex flex-col text-center items-center mb-4">
      <p class="font-bold text-2xl">
        Stats: {{ stats.ok }} / {{ stats.total }}
      </p>
      <p v-if="stats.ok === stats.total">Congrats! You got it all right! 🎉</p>
      <p v-else>You'll get it next time!💪</p>
    </div>
    <div>
      <p class="mb-3">Play again</p>
      <s-button @click="emits('initGame')">Wanna play again?</s-button>
    </div>
  </div>
</template>

<style scoped></style>
