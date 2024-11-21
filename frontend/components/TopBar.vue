<script setup lang="ts">
const { isAuthenticated } = useAuth()

const guestLinks = [
  {
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Sets',
    icon: 'i-heroicons-book-open',
    to: '/sets',
  },
  {
    label: 'Terms',
    icon: 'i-heroicons-academic-cap',
    to: '/terms',
  },
]

const authenticatedLinks = [
  {
    avatar: {
      src: 'https://preview.redd.it/knrskwg8sya91.jpg?width=737&format=pjpg&auto=webp&s=fdc18cacde5b5a3e3216f6513642c7fe395cf40d',
    },
    to: '/account',
  },
]
const links = computed(() => {
  if (!isAuthenticated.value) return guestLinks
  else return [guestLinks, authenticatedLinks]
})
</script>

<template>
  <div class="flex justify-center items-center mb-5">
    <p class="text-2xl font-bold"></p>
    <u-horizontal-navigation
      :links="links"
      :ui="{
        active: 'text-xl py-3',
        inactive: 'text-xl py-3',
        avatar: {
          size: 'md',
        },
      }"
    />
    <div class="ml-auto">
      <theme-switch />
    </div>
  </div>
</template>
