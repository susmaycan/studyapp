<script lang="ts" setup>
const props = defineProps<{
  stats: ITermStats
}>()

const round = (value: number) => Math.round(value * 100) / 100

const chartData = computed(() =>
  [
    {
      label: 'OK',
      value: round((props.stats?.ok || 0) / (props.stats.total || 1)) * 100,
    },
    {
      label: 'KO',
      value: round((props.stats?.ko || 0) / (props.stats.total || 1)) * 100,
    },
  ].filter((data) => data.value > 0)
)
</script>
<template>
  <div
    v-if="stats.total !== undefined && stats.total !== null && stats.total > 0"
  >
    <pie-chart :data="chartData" :id="stats.id || 0" />
    <p>
      Total: <strong>{{ stats.total }}</strong>
    </p>
  </div>
  <span v-else>Not enough data</span>
</template>

<style scoped></style>
