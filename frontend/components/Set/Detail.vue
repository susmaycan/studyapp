<script setup lang="ts">
const props = defineProps<{
  set: ISet
}>()

const router = useRouter()
const startGame = () => {
  router.push(`/game/${props.set?.id}`)
}

const emptyTermsLength = computed(() => props.set.terms.length === 0)

const { voiceListCode, japaneseVoice } = useSpeechAPI()
</script>
<template>
  <div>
    <div class="flex flex-col text-center items-center mb-3">
      <s-title>{{ set?.name }}</s-title>
      <p class="my-2">{{ set?.description }}</p>
      <set-image
        v-if="set.picture"
        class="mb-3"
        :url="set.picture"
        :width="300"
        :height="300"
        :alt="`Picture of set ${set.name}`"
      />
      <s-button :is-disabled="emptyTermsLength" @click="startGame">
        ▶️ Practice
      </s-button>
    </div>
    <div>
      {{ japaneseVoice }}
    </div>
    <div>
      {{ voiceListCode }}
    </div>
    <div>
      <p v-if="emptyTermsLength">No terms in this set.</p>
      <div class="flex justify-center flex-wrap">
        <term-card v-for="term in set.terms" :key="term.id" :term="term" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
