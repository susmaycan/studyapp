<script setup lang="ts">
defineProps<{
  icon?: string
  id?: string
  isDisabled?: boolean
  isLoading?: boolean
  placeholder?: string
  value?: string
}>()

const emits = defineEmits(['change', 'input'])

const onChange = (newValue: string) => {
  emits('change', newValue)
}
const onInput = (newValue: string) => {
  emits('input', newValue)
}
</script>
<template>
  <u-input
    :disabled="isLoading"
    :icon="icon"
    :id="id"
    :loading="isLoading"
    :model-value="value"
    :placeholder="placeholder"
    size="lg"
    :ui="{ icon: { trailing: { pointer: '' } } }"
    @change="onChange"
    @update:model-value="onInput"
  >
    <template #trailing>
      <u-button
        v-show="value"
        color="gray"
        :disabled="isLoading"
        icon="i-heroicons-x-mark-20-solid"
        variant="link"
        @click.stop="onChange('')"
      />
    </template>
  </u-input>
</template>
<style scoped></style>
