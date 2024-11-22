<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const { authenticate } = useAuth()
const router = useRouter()

const formData = ref<ILoginForm>({ email: '', password: '' })
const {
  data,
  execute: loginEndpoint,
  isLoading: isAuthenticating,
  error: loginError,
} = useAPI<ILoginResponse>('/auth/login/', { method: 'POST', body: formData })

const submitForm = async (form: ILoginForm) => {
  loginError.value = null
  formData.value = form
  await loginEndpoint()

  if (data.value) {
    authenticate(data.value.token, data.value.user)
    router.push('/')
  } else {
    console.log('error', loginError.value?.data)
  }
}
</script>
<template>
  <div>
    <s-title>➡️ Login</s-title>
    <p class="mt-3">Please log in to continue</p>
    <login-form
      @submit="submitForm"
      :is-submitting="isAuthenticating"
      :errors="loginError?.data?.non_field_errors"
    />
  </div>
</template>

<style scoped></style>
