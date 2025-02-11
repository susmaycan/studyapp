<script setup lang="ts">
const { userAvatar } = useAuth()

const { isAuthenticated } = useAuth()
const router = useRouter()

const links = computed<ISidebarLink[]>(() => [
  {
    authenticated: true,
    icon: 'i-heroicons-home',
    label: 'Home',
    placement: 'left',
    to: '/',
  },
  {
    authenticated: true,
    icon: 'i-heroicons-book-open',
    label: 'Sets',
    placement: 'left',
    to: '/sets',
  },
  {
    authenticated: true,
    icon: 'i-heroicons-academic-cap',
    label: 'Terms',
    placement: 'left',
    to: '/terms',
  },
])
</script>

<template>
  <s-top-bar :links="links">
    <template #title>
      <h2 class="font-bold text-lg">Study App 📚</h2>
    </template>
    <template #right>
      <s-button
        v-if="isAuthenticated"
        :variant="EButtonVariant.link"
        @click="router.push('/account')"
      >
        <u-avatar :src="userAvatar" alt="Avatar" />
      </s-button>
      <s-theme-switch />
    </template>
  </s-top-bar>
</template>
