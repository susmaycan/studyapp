<script setup lang="ts">
defineProps<{
  term: ITerm
}>()
</script>
<template>
  <div class="term-card h-56 w-full lg:w-56 m-2 lg:m-5 rounded-md">
    <div
      class="bg-indigo-300 dark:bg-indigo-500 w-full h-full flex flex-col items-center justify-end rounded-t-md pb-3"
    >
      <p class="font-bold">{{ term.front }}</p>
      <p class="term-back">
        <term-back :term="term" />
      </p>
    </div>
    <div
      class="bg bg-neutral-200 dark:bg-neutral-800 w-full h-full flex flex-col items-center justify-start rounded-b-md pt-3"
    >
      <term-stats :stats="term.stats" />
    </div>
  </div>
</template>
<style lang="css" scoped>
.term-card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
</style>
