<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const { authenticate } = useAuth()
const router = useRouter()

const submitForm = (form: ILoginForm) => {
  authenticate('12345', { email: form.email, _id: '1' })
  router.push('/')
}
</script>
<template>
  <div>
    <s-title>➡️ Login</s-title>
    <p class="mt-3">Please log in to continue</p>
    <login-form @submit="submitForm" />
  </div>
</template>

<style scoped></style>
