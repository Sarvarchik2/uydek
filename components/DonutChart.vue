<template>
  <div class="donut-chart-container">
    <canvas ref="chartRef"></canvas>
    <div class="donut-center">
      <div class="donut-value">{{ value }}%</div>
      <div class="donut-label">{{ label }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    default: 'Рассмотрено'
  },
  size: {
    type: Number,
    default: 120
  },
  color: {
    type: String,
    default: '#2563eb'
  }
});

const chartRef = ref(null);
let chart = null;

onMounted(() => {
  createChart();
});

watch(() => props.value, () => {
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
      labels: ['Progress', 'Remaining'],
      datasets: [{
        data: [props.value, 100 - props.value],
        backgroundColor: [props.color, '#e5e7eb'],
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
.donut-chart-container {
  position: relative;
  width: v-bind(size + 'px');
  height: v-bind(size + 'px');
}

.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.donut-value {
  font-size: 24px;
  font-weight: 700;
  color: #222;
  line-height: 1;
}

.donut-label {
  font-size: 14px;
  color: #666;
  line-height: 1;
}
</style> 