<script setup lang="ts">
defineProps<{
  term: ITerm
}>()
</script>
<template>
  <span>
    {{ term.back }}
    <span v-if="term.back_alternatives" class="ml-1">
      [{{ term.back_alternatives }}]
    </span>
  </span>
</template>
