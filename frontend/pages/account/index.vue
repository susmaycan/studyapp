<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { logout } = useAuth()
const router = useRouter()

const onLogout = () => {
  logout()
  router.push('/login')
}
</script>
<template>
  <div>
    <s-title>Account</s-title>
    <s-button @click="onLogout">Logout</s-button>
  </div>
</template>

<style scoped></style>
