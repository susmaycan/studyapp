<script setup lang="ts">
import type { FormError } from '#ui/types'

const props = defineProps<{
  term?: ITerm
}>()

const emits = defineEmits(['refresh'])

const form = ref<ICreateTermForm>({
  front: props.term?.front || '',
  back: props.term?.back || '',
  back_alternatives: props.term?.back_alternatives || null,
  description: props.term?.description || null,
})

const {
  execute: createTerm,
  isLoading: isCreating,
  error: createError,
} = useAPI('/terms/', { method: 'POST', body: form, watch: false })

// })
const {
  execute: updateTerm,
  isLoading: isUpdating,
  error: updateError,
} = useAPI('/terms/' + props.term?.id + '/', {
  method: 'PUT',
  body: form,
  watch: false,
})

const validate = (termForm: ICreateTermForm): FormError[] => {
  const errors = []
  if (!termForm.front)
    errors.push({ path: 'front', message: 'Front field is required' })
  if (!termForm.back)
    errors.push({ path: 'back', message: 'Back field is required' })
  return errors
}

const apiErrors = computed(() => {
  if (createError.value) createError.value?.data?.non_field_error
  if (updateError.value) updateError.value?.data?.non_field_error

  return []
})

const isLoading = computed(() => isUpdating.value || isCreating.value)
const showModal = ref(false)

const onSubmit = async () => {
  createError.value = null
  updateError.value = null

  if (isEditModal.value) await updateTerm()
  else await createTerm()

  if (!updateError.value && !createError.value) {
    showModal.value = false

    if (!isEditModal.value) resetForm()

    emits('refresh')
  }
}

const resetForm = () => {
  form.value = {
    front: '',
    back: '',
    back_alternatives: null,
    description: null,
  }
}

const isEditModal = computed(() => !!props.term)
</script>
<template>
  <s-button
    v-if="!isEditModal"
    class="m-2"
    icon="i-heroicons-plus-circle"
    @click="showModal = true"
  />
  <s-button
    v-else
    icon="i-heroicons-pencil-square"
    color="white"
    variant="link"
    @click="showModal = true"
  />
  <u-modal v-model="showModal" fullscreen>
    <div class="p-7">
      <s-title class="mb-4">
        {{ !isEditModal ? 'Add term' : 'Edit term' }}
      </s-title>
      <u-form
        :validate="validate"
        :state="form"
        class="space-y-4"
        @submit="onSubmit"
      >
        <u-form-group label="Front" name="front" required>
          <s-input
            :is-loading="isLoading"
            placeholder="Enter the term's front"
            :value="form.front"
            @input="form.front = $event"
          />
        </u-form-group>

        <u-form-group label="Back" name="back" required>
          <s-input
            :is-loading="isLoading"
            placeholder="Enter the term's back"
            :value="form.back"
            @input="form.back = $event"
          />
        </u-form-group>
        <u-form-group label="Back alternatives" name="back_alternatives">
          <s-input
            :is-loading="isLoading"
            placeholder="Enter the term's back alternatives separated by commas"
            :value="form.back_alternatives || ''"
            @input="form.back_alternatives = $event"
          />
        </u-form-group>
        <u-form-group label="Description" name="description">
          <s-input
            :is-loading="isLoading"
            placeholder="Enter the term's description"
            :value="form.description || ''"
            @input="form.description = $event"
          />
        </u-form-group>
        <u-alert
          v-if="apiErrors && apiErrors.length"
          color="red"
          icon="i-heroicons-exclamation-triangle"
          title="Error!"
          variant="outline"
        >
          <template #description>
            <p v-for="error in apiErrors">{{ error }}</p>
          </template>
        </u-alert>
        <div class="flex gap-4">
          <s-button
            :is-loading="isLoading"
            @click="showModal = false"
            color="red"
          >
            Cancel
          </s-button>
          <s-button :is-loading="isLoading" is-submit-button>
            {{ isEditModal ? 'Save' : 'Create' }}
          </s-button>
        </div>
      </u-form>
    </div>
  </u-modal>
</template>
