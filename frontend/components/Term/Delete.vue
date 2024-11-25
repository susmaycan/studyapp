<script setup lang="ts">
const props = defineProps<{
  term: ITerm
}>()

const emits = defineEmits(['refresh'])

// })
const {
  execute: deleteTerm,
  isLoading: isDeleting,
  error: deleteError,
} = useAPI('/terms/' + props.term?.id + '/', {
  method: 'DELETE',
  watch: false,
})

const apiErrors = computed(() => {
  if (deleteError.value) deleteError.value?.data?.non_field_error

  return []
})

const showModal = ref(false)

const confirmDelete = async () => {
  deleteError.value = null

  await deleteTerm()

  if (!deleteError.value) {
    showModal.value = false
    emits('refresh')
  }
}
</script>
<template>
  <s-button
    icon="i-heroicons-trash"
    color="white"
    variant="link"
    @click="showModal = true"
  />
  <u-modal v-model="showModal">
    <div class="p-7">
      <s-title class="mb-4"> Delete term </s-title>
      <p class="my-3">
        Are you sure you want to delete
        <strong class="te text-lg">{{ term.front }}</strong> term?
      </p>
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
          :is-loading="isDeleting"
          @click="showModal = false"
          color="red"
        >
          Cancel
        </s-button>
        <s-button :is-loading="isDeleting" @click="confirmDelete">
          Confirm
        </s-button>
      </div>
    </div>
  </u-modal>
</template>
