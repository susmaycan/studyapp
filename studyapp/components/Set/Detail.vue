<script setup lang="ts">
const props = defineProps<{
  set: ISet
}>()

const router = useRouter()
const startGame = (mode: string) => {
  router.push(`/game/${props.set?.id}?mode=${mode}`)
}

const emptyTermsLength = computed(() => props.set.terms.length === 0)
</script>
<template>
  <div>
    <div class="flex flex-col text-center items-center mb-3">
      <s-title class="mb-2">{{ set?.name }}</s-title>
      <set-image
        v-if="set.picture"
        :url="set.picture"
        :width="200"
        :height="200"
        :alt="`Picture of set ${set.name}`"
      />
      <p class="mt-2">{{ set?.description }}</p>
      <s-button :is-disabled="emptyTermsLength" @click="startGame">
        Practice
      </s-button>
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
