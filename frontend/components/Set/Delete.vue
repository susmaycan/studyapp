<script setup lang="ts">
const props = defineProps<{
  set: ISet
}>()

const emits = defineEmits(['refresh'])

const {
  execute: deleteTerm,
  isLoading: isDeleting,
  error: deleteError,
} = useAPI('/sets/' + props.set?.id + '/', {
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
  <s-button icon="i-heroicons-trash" @click="showModal = true">
    Delete set
  </s-button>
  <u-modal v-model="showModal">
    <div class="p-7">
      <s-title class="mb-4"> Delete set </s-title>
      <p class="my-3">
        Are you sure you want to delete
        <strong class="te text-lg">{{ set.name }}</strong> set?
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
