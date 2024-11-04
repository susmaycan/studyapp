<script setup lang="ts">
defineProps<{
  areButtonsDisabled: boolean
}>()

const emits = defineEmits(['startGame'])
</script>

<template>
  <div class="mt-3">
    <p>Learn by playing</p>
    <div class="flex justify-center items-center gap-2">
      <s-button
        :is-disabled="areButtonsDisabled"
        @click="emits('startGame', GAME_MODE_TYPE.CHOOSE)"
      >
        Easy 😌
      </s-button>
      <s-button
        :is-disabled="areButtonsDisabled"
        @click="emits('startGame', GAME_MODE_TYPE.WRITE)"
      >
        Hard 🥵
      </s-button>
    </div>
  </div>
</template>

<style scoped></style>
