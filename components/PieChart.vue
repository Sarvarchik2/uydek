<template>
  <div class="pie-chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  labels: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    default: () => ['#3b82f6', '#06b6d4', '#1e40af']
  },
  size: {
    type: Number,
    default: 120
  }
});

const chartRef = ref(null);
let chart = null;

onMounted(() => {
  createChart();
});

watch(() => props.data, () => {
  if (chart) {
    chart.destroy();
  }
  createChart();
}, { deep: true });

const createChart = () => {
  const ctx = chartRef.value.getContext('2d');
  
  chart = new ChartJS(ctx, {
    type: 'doughnut',
    data: {
      labels: props.labels,
      datasets: [{
        data: props.data,
        backgroundColor: props.colors,
        borderWidth: 0,
        cutout: '70%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    }
  });
};
</script>

<style scoped>
.pie-chart-container {
  width: v-bind(size + 'px');
  height: v-bind(size + 'px');
}
</style> 