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
  <div class="set-card" @click="onCardClick">
    <set-image
      v-if="set.picture"
      :url="set.picture"
      :alt="`Picture of set ${set.name}`"
    />
    <h2 class="text-lg pt-1 font-bold">{{ set.name }}</h2>
  </div>
</template>
<style lang="css" scoped>
.set-card {
  width: 13rem;
  height: 13rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 1.25rem;
}

.set-card:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>
