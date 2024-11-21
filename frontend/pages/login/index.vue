<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const { authenticate } = useAuth()
const router = useRouter()

const loginOK = () => {
  authenticate('12345', { email: 'test@test.com', _id: '1' })
  router.push('/')
}
</script>
<template>
  <div>
    <s-title>Login</s-title>
    <s-button @click="loginOK">Login here</s-button>
  </div>
</template>

<style scoped></style>
