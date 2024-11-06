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
      :width="180"
      :height="180"
      :alt="`Picture of set ${set.name}`"
    />
    <p>{{ set.name }}</p>
  </div>
</template>
<style lang="css" scoped>
.set-card {
  width: 200px;
  height: 200px;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 1rem;
}

.set-card:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>
