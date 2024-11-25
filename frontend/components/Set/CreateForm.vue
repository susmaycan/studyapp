<script setup lang="ts">
import type { FormError } from '#ui/types'

const props = defineProps<{
  set?: ISet
}>()

const emits = defineEmits(['refresh'])

const form = ref<ICreateSetForm>({
  name: props.set?.name || '',
  description: props.set?.description || '',
  picture: props.set?.picture || '',
  terms: props.set?.terms.map((term) => term.id) || [],
})

const params = ref({
  search: '',
  limit: 50,
})
const {
  data,
  execute: fetchTermList,
  isLoading: isSearchingTerms,
} = useAPI<IResponse<ITerm>>('/terms/', { params })

onMounted(() => {
  fetchTermList()
})

const termList = computed(() => data?.value?.results || [])

const {
  execute: createSet,
  isLoading: isCreating,
  error: createError,
} = useAPI('/sets/', { method: 'POST', body: form, watch: false })

const {
  execute: updateSet,
  isLoading: isUpdating,
  error: updateError,
} = useAPI('/sets/' + props.set?.id + '/', {
  method: 'PUT',
  body: form,
  watch: false,
})

const validate = (setForm: ICreateSetForm): FormError[] => {
  const errors = []
  if (!setForm.name)
    errors.push({ path: 'name', message: 'Name field is required' })
  if (setForm.terms?.length === 0)
    errors.push({ path: 'terms', message: 'Terms field is required' })
  return errors
}

const apiErrors = computed(() => {
  if (createError.value) createError.value?.data?.non_field_error
  if (updateError.value) updateError.value?.data?.non_field_error

  return []
})

const isLoading = computed(() => isUpdating.value && isCreating.value)
const showModal = ref(false)

const clearForm = () => {
  form.value = {
    name: '',
    description: '',
    picture: '',
    terms: [],
  }
}
const onSubmit = async () => {
  createError.value = null
  updateError.value = null

  if (isEditModal.value) await updateSet()
  else await createSet()

  if (!updateError.value && !createError.value) {
    if (!isEditModal.value) clearForm()
    showModal.value = false
    emits('refresh')
  }
}

const isEditModal = computed(() => !!props.set)

const search = async (q: string) => {
  params.value.search = q

  await fetchTermList()

  return termList.value
}
</script>
<template>
  <s-button
    :icon="
      isEditModal ? 'i-heroicons-pencil-square' : 'i-heroicons-plus-circle'
    "
    @click="showModal = true"
  >
    <span v-if="isEditModal">Edit set</span>
    <span v-else>Add set</span>
  </s-button>
  <u-modal v-model="showModal" fullscreen>
    <div class="p-7">
      <s-title class="mb-4">
        {{ !isEditModal ? 'Add set' : 'Edit set' }}
      </s-title>
      <u-form
        :validate="validate"
        :state="form"
        class="space-y-4"
        @submit="onSubmit"
      >
        <u-form-group label="Name" name="name" required>
          <s-input
            :is-loading="isLoading"
            placeholder="Enter set's name"
            :value="form.name"
            @input="form.name = $event"
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

        <u-form-group label="Picture" name="picture">
          <s-input
            :is-loading="isLoading"
            placeholder="Enter the term's picture (url)"
            :value="form.picture || ''"
            @input="form.picture = $event"
          />
        </u-form-group>

        <u-form-group
          label="Terms"
          name="terms"
          :help="`${form.terms?.length} total selected terms`"
        >
          <u-select-menu
            :model-value="form.terms"
            :search-attributes="['front', 'back']"
            multiple
            option-attribute="front"
            placeholder="Select terms"
            :loading="isSearchingTerms"
            :searchable="search"
            value-attribute="id"
            @update:model-value="form.terms = $event"
          >
            <template #option="{ option }">
              <span>{{ option.front }} - {{ option.back }}</span>
            </template>
          </u-select-menu>
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
