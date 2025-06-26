<script setup lang="ts">
defineProps<{
  term: ITerm
}>()
</script>
<template>
  <span v-if="term.segments?.length">
    <ruby v-for="segment in term.segments">
      {{ segment.text }}<rp>(</rp><rt>{{ segment.reading }} </rt><rp>)</rp>
    </ruby>
  </span>
  <span v-else>
    {{ term.back }}
    <span v-if="term.back_alternatives" class="ml-1">
      [{{ term.back_alternatives }}]
    </span>
  </span>
</template>
