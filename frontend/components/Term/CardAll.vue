<script setup lang="ts">
const props = defineProps<{
  term: ITerm
  canEdit?: boolean
}>()

const emits = defineEmits(['refresh'])

const { speak, isCompatible } = useSpeechAPI()
const { isAdmin } = useAuth()

const onCardClick = () => {
  if (isCompatible.value) speak(props.term.back_alternatives || props.term.back)
}
</script>
<template>
  <div
    class="term-card h-32 w-full lg:w-52 lg:h-52 m-2 lg:m-5 bg-indigo-300 dark:bg-indigo-500"
    :class="{ 'hover:cursor-pointer': isCompatible }"
    @click="onCardClick"
  >
    <div v-if="canEdit && isAdmin" class="edit-buttons">
      <term-create-form :term="term" @refresh="emits('refresh')" />
      <term-delete :term="term" @refresh="emits('refresh')" />
    </div>
    <p class="font-bold">{{ term.front }}</p>
    -
    <p class="term-back">
      {{ term.back }}
      <span v-if="term.back_alternatives" class="ml-1">
        [{{ term.back_alternatives }}]
      </span>
    </p>
  </div>
</template>
<style lang="css" scoped>
.term-card {
  position: relative;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.term-back {
  word-break: break-all;
}

.edit-buttons {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
