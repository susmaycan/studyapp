<template>
  <div :id="chartId" class="pie-chart"></div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import * as d3 from 'd3'

const { isDark } = useTheme()

interface PieChartData {
  label: string
  value: number
}

const chartId = computed(() => `pie-chart-${props.id}`)

// Define props
const props = defineProps<{
  id: number
  data: PieChartData[]
  colors?: string[] // Optional prop for custom colors
}>()

// Function to create the pie chart
const createChart = () => {
  // Use document.getElementById to get the chart container element
  const chartContainer = document.getElementById(chartId.value)
  if (!chartContainer) return

  const width = 150
  const height = 150
  const radius = Math.min(width, height) / 2

  // Use custom colors if provided, otherwise fall back to a default color palette
  const color = computed(() =>
    isDark.value
      ? {
          OK: '#10b981',
          KO: '#f43f5e',
        }
      : {
          OK: '#10b981',
          KO: '#fb7185',
        }
  )

  const textColor = computed(() => (isDark.value ? '#fff' : '#000'))
  // Remove any existing chart content
  d3.select(chartContainer).selectAll('*').remove()

  // Append an SVG element to the chart container
  const svg = d3
    .select(chartContainer)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)

  // Create the pie chart layout
  const pie = d3.pie<PieChartData>().value((d) => d.value)
  const arc = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(0)

  // Create a tooltip element (hidden by default)
  const tooltip = d3
    .select(chartContainer)
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('background-color', 'rgba(0, 0, 0, 0.7)')
    .style('color', '#fff')
    .style('padding', '5px')
    .style('border-radius', '4px')
    .style('pointer-events', 'none')

  const arcs = svg
    .selectAll('.arc')
    .data(pie(props.data))
    .enter()
    .append('g')
    .attr('class', 'arc')

  // Append the path for each slice
  arcs
    .append('path')
    .attr('d', arc)
    .style('fill', (d) => color.value[d.data.label])
    // Mouse events to show/hide the tooltip
    .on('mouseover', function (event, d) {
      const [x, y] = arc.centroid(d) // Get the centroid of the slice (position within the chart)
      // Show the tooltip and set the text and position
      tooltip.transition().duration(200).style('opacity', 1)
      tooltip
        .html(`<strong>${d.data.label}</strong>: ${d.data.value}%`)
        .style('left', `${x + width / 2}px`) // Position the tooltip closer to the slice
        .style('top', `${y + height / 2 + 10}px`) // Add an offset to move the tooltip slightly below
    })
    .on('mouseout', function () {
      console.log('On mouseout')
      // Hide the tooltip
      tooltip.transition().duration(200).style('opacity', 0)
    })

  // Add text labels inside the slices
  arcs
    .append('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .attr('dy', '.35em')
    .style('text-anchor', 'middle')
    .style('fill', textColor.value) // Change text color here (default is black)
    .text((d) => `${d.data.label}`)
}

// Watch for changes in the data prop
watch(() => props.data, createChart, { immediate: true })
watch(() => isDark.value, createChart, { immediate: true })

// Ensure chart creation happens after the component is mounted
onMounted(() => {
  createChart()
})
</script>

<style scoped>
.pie-chart {
  width: 150px;
  height: 150px;
}

/* Tooltip styles */
.tooltip {
  pointer-events: none; /* Ensures that the tooltip doesn't interfere with mouse events */
  opacity: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px;
  border-radius: 4px;
}
</style>
