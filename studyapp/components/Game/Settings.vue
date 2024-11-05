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

const gameSettings = ref<IGameSettings>({
  type: EGameType.choose,
  mode: EGameMode.back,
})

const play = () => {
  emits('accept', gameSettings.value)
}
</script>

<template>
  <div class="text-center flex flex-col gap-5 items-center">
    <h1 class="tex text-3xl">⚙️ Settings</h1>
    <u-radio-group
      :model-value="gameSettings.type"
      :options="gameTypeOptions"
      @change="gameSettings.type = $event"
    >
      <template #label="{ option }">
        <p class="text-base">
          {{ option.label }}
        </p>
      </template>
      <template #legend>
        <span class="text-lg font-bold">Game type</span>
      </template>
    </u-radio-group>
    <u-radio-group
      :model-value="gameSettings.mode"
      :options="gameModeOptions"
      @change="gameSettings.mode = $event"
    >
      <template #label="{ option }">
        <p class="text-base">
          {{ option.label }}
        </p>
      </template>
      <template #legend>
        <span class="text-lg font-bold">Game mode</span>
      </template></u-radio-group
    >
    <u-button @click="play"> 🔄 Generate game</u-button>
  </div>
</template>

<style scoped>
.settings-container {
  border: 0.5px solid white;
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 20px;
}
</style>
