<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

defineProps<{
  errors?: string[]
  isSubmitting?: boolean
}>()

const emits = defineEmits(['submit'])

const form = ref<ILoginForm>({
  email: '',
  password: '',
})

const validate = (loginForm: ILoginForm): FormError[] => {
  const errors = []
  if (!loginForm.email)
    errors.push({ path: 'email', message: 'Email field is required' })
  else if (!loginForm.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    errors.push({ path: 'email', message: 'Email address is not valid' })
  if (!loginForm.password)
    errors.push({ path: 'password', message: 'Password field is required' })

  return errors
}

const onSubmit = () => {
  emits('submit', form.value)
}
</script>
<template>
  <u-form
    :validate="validate"
    :state="form"
    class="space-y-4"
    @submit="onSubmit"
  >
    <u-form-group label="Email" name="email" required>
      <s-input
        :is-loading="isSubmitting"
        placeholder="Enter your email address"
        :value="form.email"
        @input="form.email = $event"
      />
    </u-form-group>

    <u-form-group label="Password" name="password" required>
      <s-input
        :is-loading="isSubmitting"
        placeholder="Enter your password"
        type="password"
        :value="form.password"
        @input="form.password = $event"
      />
    </u-form-group>
    <u-alert
      v-if="errors && errors.length"
      color="red"
      icon="i-heroicons-exclamation-triangle"
      title="Error!"
      variant="outline"
    >
      <template #description>
        <p v-for="error in errors">{{ error }}</p>
      </template>
    </u-alert>
    <s-button :is-loading="isSubmitting" is-submit-button> Submit </s-button>
  </u-form>
</template>
