<script setup lang="ts">
const props = defineProps<{
  term: ITerm
}>()

const onCardClick = () => {
  console.log('Flip it!')
  showFront.value = !showFront.value
}

const showFront = ref(true)
</script>
<template>
  <div
    class="term-card"
    :class="{ 'term-card-front': showFront, 'term-card-back': !showFront }"
    @click="onCardClick"
  >
    <p v-if="showFront">{{ term.front }}</p>
    <div v-else>
      <p>{{ term.back }}</p>
      <p v-if="term.back_alternatives">[{{ term.back_alternatives }}]</p>
    </div>
  </div>
</template>
<style lang="css" scoped>
.term-card {
  width: 200px;
  height: 200px;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 1rem;
}

.term-card:hover {
  cursor: pointer;
  opacity: 0.5;
}

.term-card-front {
  background-color: darkcyan;
}
.term-card-back {
  background-color: purple;
}
</style>
