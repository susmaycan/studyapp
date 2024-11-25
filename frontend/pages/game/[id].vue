<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const setId = computed(() => route.params.id)
const {
  data,
  execute: fetchSetDetail,
  isLoading,
} = useAPI<ISet>(`/sets/${setId.value}/`)

const results = ref<IGameResults | null>(null)
const { execute: setResults } = useAPI(`/stats/results/`, {
  body: results,
  method: 'POST',
})

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

const finishGame = (gameResults: IGameResults) => {
  results.value = gameResults
  setResults()
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
        @finish-game="finishGame"
      />
      <game-write
        v-if="settings.type === EGameType.write"
        :mode="settings.mode"
        :set="data"
        @finish-game="finishGame"
      />
      <game-listening
        v-if="settings.type === EGameType.listening"
        :mode="settings.mode"
        :set="data"
        @finish-game="finishGame"
      />
    </div>
  </div>
</template>
