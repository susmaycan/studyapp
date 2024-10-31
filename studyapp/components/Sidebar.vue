<script setup lang="ts">
const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Sets',
    icon: 'i-heroicons-book-open',
    to: '/sets',
  },
]
</script>

<template>
  <p class="text-2xl mb-5 font-bold">📚 StudyApp</p>
  <UVerticalNavigation
    :links="links"
    :ui="{
      active: 'text-xl py-3',
      inactive: 'text-xl py-3',
    }"
  />
</template>
