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
  <div v-else>
    <s-title class="mb-5">👾 Learn by playing 👾</s-title>
    <game-settings class="my-5" @accept="saveSettings" />
    <div v-if="data">
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
      <game-listening
        v-if="settings.type === EGameType.listening"
        :mode="settings.mode"
        :set="data"
      />
    </div>
  </div>
</template>
