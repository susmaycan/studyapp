<script setup lang="ts">
const props = defineProps<{
  set: ISet
}>()

const router = useRouter()
const onCardClick = () => {
  router.push('/sets/' + props.set.id)
}
</script>
<template>
  <div
    class="flex flex-col justify-center text-center items-center p-5"
    @click="onCardClick"
  >
    <set-image :url="set.picture" :width="200" :height="200" />
    <p>{{ set.name }}</p>
  </div>
</template>

<style scoped></style>
