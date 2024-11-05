<script setup lang="ts">
const emits = defineEmits(['accept'])

const gameTypeOptions = [
  {
    value: EGameType.choose,
    label: 'Choose',
  },
  {
    value: EGameType.write,
    label: 'Write',
  },
]

const gameModeOptions = [
  {
    value: EGameMode.front,
    label: 'Front',
  },
  {
    value: EGameMode.back,
    label: 'Back',
  },
]

const gameSettings = ref<{ type: string; mode: string }>({
  type: EGameType.choose,
  mode: EGameMode.back,
})

const play = () => {
  emits('accept', gameSettings.value)
}
</script>

<template>
  <div class="mt-3">
    <u-radio-group
      :model-value="gameSettings.type"
      legend="Game type"
      :options="gameTypeOptions"
      @update:model-value="gameSettings.type = $event"
    />
    <u-radio-group
      :model-value="gameSettings.mode"
      legend="Mode"
      :options="gameModeOptions"
      @update:model-value="gameSettings.mode = $event"
    />
    <u-button @click="play">Accept</u-button>
  </div>
</template>

<style scoped></style>
