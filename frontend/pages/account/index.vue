<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { logout, user } = useAuth()
const router = useRouter()

const onLogout = () => {
  logout()
  router.push('/login')
}
</script>
<template>
  <div>
    <s-title>Account</s-title>
    <h2>Hi {{ user?.email }}</h2>
    <s-button class="my-5" @click="onLogout">Logout</s-button>
  </div>
</template>

<style scoped></style>
