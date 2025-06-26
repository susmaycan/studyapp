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
  {
    value: EGameType.listening,
    label: 'Listening',
  },
]

const gameModeOptions = computed(() => [
  {
    value: EGameMode.front,
    label: 'Front',
  },
  {
    value: EGameMode.back,
    label: 'Back',
  },
])

const gameSettings = ref<IGameSettings>({
  type: EGameType.choose,
  mode: EGameMode.back,
})

const play = () => {
  emits('accept', gameSettings.value)
}
</script>

<template>
  <div class="text-center w-full">
    <div class="flex justify-center gap-10 items-center w-full">
      <u-radio-group
        :model-value="gameSettings.type"
        :options="gameTypeOptions"
        @change="gameSettings.type = $event"
      >
        <template #label="{ option }">
          <p class="text-sm lg:text-base">
            {{ option.label }}
          </p>
        </template>
        <template #legend>
          <span class="text-md lg:text-lg font-bold">Type</span>
        </template>
      </u-radio-group>
      <u-radio-group
        :model-value="gameSettings.mode"
        :options="gameModeOptions"
        @change="gameSettings.mode = $event"
      >
        <template #label="{ option }">
          <p class="text-sm lg:text-base">
            {{ option.label }}
          </p>
        </template>
        <template #legend>
          <span class="text-md lg:text-lg font-bold">Mode</span>
        </template>
      </u-radio-group>
      <u-button icon="i-heroicons-play-circle" @click="play"> Play</u-button>
    </div>
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
