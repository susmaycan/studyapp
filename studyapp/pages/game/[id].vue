<script setup lang="ts">
const route = useRoute()
const setId = computed(() => route.params.id)
const {
  data,
  execute: fetchSetDetail,
  isLoading,
} = useAPI<ISet>(`/sets/${setId.value}/`)

const settings = ref<IGameSettings>({
  type: EGameType.choose,
  mode: EGameMode.back,
})
onMounted(() => {
  fetchSetDetail()
})

const saveSettings = (savedSettings: IGameSettings) => {
  settings.value = { type: savedSettings.type, mode: savedSettings.mode }
}
</script>

<template>
  <set-skeleton-detail v-if="isLoading" />
  <div v-else class="flex flex-col justify-center items-center w-full h-full">
    <s-title class="mb-auto">👾 Learn by playing 👾</s-title>
    <div v-if="data" class="mb-auto">
      <div>
        <game-choose
          v-if="settings.type === EGameType.choose"
          :mode="settings.mode"
          :set="data"
        />
        <game-write
          v-if="settings.type === EGameType.write"
          :mode="settings.mode"
          :set="data"
        />
      </div>
      <div class="game-settings-container">
        <game-settings @accept="saveSettings" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-settings-container {
  position: absolute;
  right: 0;
  top: 30%;
  padding: 2rem;
}
</style>
