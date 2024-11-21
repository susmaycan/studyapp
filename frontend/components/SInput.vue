<script setup lang="ts">
defineProps<{
  icon?: string
  id?: string
  isDisabled?: boolean
  isLoading?: boolean
  label?: string
  placeholder?: string
  type?: 'password'
  value?: string
}>()

const emits = defineEmits(['change', 'input', 'enter'])

const onChange = (newValue: string) => {
  emits('change', newValue)
}
const onInput = (newValue: string) => {
  emits('input', newValue)
}
const onEnter = () => {
  emits('enter')
}

const onClearInput = () => {
  onChange('')
  onInput('')
}
</script>
<template>
  <label class="font-bold" v-if="label" :for="id">{{ label }} </label>
  <u-input
    :disabled="isLoading || isDisabled"
    :icon="icon"
    :id="id"
    :loading="isLoading"
    :model-value="value"
    :placeholder="placeholder"
    size="lg"
    :type="type"
    :ui="{ icon: { trailing: { pointer: '' } } }"
    @change="onChange"
    @keypress.enter="onEnter"
    @update:model-value="onInput"
  >
    <template #trailing>
      <u-button
        v-show="value"
        :disabled="isLoading || isDisabled"
        color="gray"
        icon="i-heroicons-x-mark-20-solid"
        variant="link"
        @click.stop="onClearInput"
      />
    </template>
  </u-input>
</template>
<style scoped></style>
