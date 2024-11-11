<script setup lang="ts">
defineProps<{
  stats: IGameStats
}>()
const emits = defineEmits(['initGame'])
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
