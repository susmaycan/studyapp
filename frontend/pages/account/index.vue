<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { logout, user, userAvatar } = useAuth()
const router = useRouter()

const onLogout = () => {
  logout()
  router.push('/login')
}
</script>
<template>
  <div>
    <s-title>Account</s-title>
    <u-avatar size="3xl" :src="userAvatar" alt="Avatar" />
    <h2>Hi {{ user?.email }}</h2>
    <s-button
      icon="i-heroicons-arrow-left-end-on-rectangle-16-solid"
      class="my-5"
      @click="onLogout"
      >Logout</s-button
    >
  </div>
</template>

<style scoped></style>
