<template>
  <div class="statistics-page-wrap">
    <h1 class="statistics-title container">Личный кабинет</h1>
    <BusinessContainer active="statistics">
      
      <!-- График просмотров объявлений -->
      <div class="chart-section">
        <h2>Количество просмотров объявлений</h2>
        <div class="chart-container">
          <LineChart v-if="chartData" :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Карточки статистики -->
      <div class="stats-layout">
        <!-- Большая круговая диаграмма слева -->
        <div class="large-pie-chart">
          <PieChart 
            :data="pieData" 
            :labels="pieLabels" 
            :colors="pieColors"
            :size="120"
          />
        </div>

        <!-- Три карточки в центре -->
        <div class="center-cards">
          <div class="stats-card green-border">
            <div class="card-content">
              <div class="card-info">
                <div class="metric-title">
                  <span class="dot green"></span>
                  Запросы
                </div>
                <div class="metric-value">43%</div>
                <div class="metric-details">13 шт</div>
                <div class="metric-subtitle">8 рассмотрено</div>
              </div>
            </div>
          </div>

          <div class="stats-card blue-border">
            <div class="card-content">
              <div class="card-info">
                <div class="metric-title">
                  <span class="dot blue"></span>
                  Бронирования
                </div>
                <div class="metric-value">39%</div>
                <div class="metric-details">13 шт</div>
                <div class="metric-subtitle">8 рассмотрено</div>
              </div>
            </div>
          </div>

          <div class="stats-card dark-blue-border">
            <div class="card-content">
              <div class="card-info">
                <div class="metric-title">
                  <span class="dot dark-blue"></span>
                  Закрыто продаж
                </div>
                <div class="metric-value">39%</div>
                <div class="metric-details">13 шт</div>
                <div class="metric-subtitle">8 рассмотрено</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Большая кольцевая диаграмма справа -->
        <div class="large-donut-chart">
          <DonutChart 
            :value="83" 
            :label="'Рассмотрено'"
            :size="140"
            :color="'#2563eb'"
          />
        </div>
      </div>

    </BusinessContainer>
  </div>
</template>

<script setup>
import BusinessContainer from '@/components/BusinessContainer.vue';
import PieChart from '@/components/PieChart.vue';
import DonutChart from '@/components/DonutChart.vue';
import { Line as LineChart } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ref, onMounted } from 'vue';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

useHead({ title: 'Статистика | Uydek' });

const chartData = ref(null);
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#2563eb',
      borderWidth: 2,
      cornerRadius: 12,
      displayColors: false,
      padding: 12,
      callbacks: {
        label: function(context) {
          return `${context.parsed.y}M просмотров`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 10,
      ticks: {
        stepSize: 1,
        callback: function(value) {
          return value + 'M';
        },
        font: {
          size: 12,
          weight: '500'
        },
        color: '#666'
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.08)',
        drawBorder: false,
        lineWidth: 1
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#666',
        font: {
          size: 12,
          weight: '500'
        }
      }
    }
  },
  elements: {
    point: {
      hoverRadius: 8,
      hoverBorderWidth: 3
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
});

// Данные для круговой диаграммы
const pieData = [43, 39, 18];
const pieLabels = ['Запросы', 'Бронирования', 'Продажи'];
const pieColors = ['#3b82f6', '#06b6d4', '#1e40af'];

onMounted(() => {
  chartData.value = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    datasets: [
      {
        label: 'Просмотры',
        data: [9.5, 8.5, 10, 5, 8, 6, 8, 6, 8, 4.5, 7, 5],
        borderColor: '#2563eb',
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(37, 99, 235, 0.6)');
          gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.3)');
          gradient.addColorStop(1, 'rgba(37, 99, 235, 0.05)');
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };
});
</script>

<style scoped>
.statistics-page-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.statistics-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;
}

.chart-section {
  margin-bottom: 24px;
}

.chart-section h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #222;
}

.chart-container {
  height: 280px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

/* Новый макет статистики */
.stats-layout {
  display: flex;
  align-items: center;
  gap: 24px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

/* Большая круговая диаграмма слева */
.large-pie-chart {
  flex-shrink: 0;
}

/* Центральные карточки */
.center-cards {
  display: flex;
  gap: 12px;
  flex: 1;
  justify-content: space-between;
}

.stats-card {
  background: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  border: 2px solid;
  min-height: 140px;
  width: 30%;
}

.green-border {
  border: 2px solid #059669;
}

.blue-border {
  border: 2px solid #2563eb;
}

.dark-blue-border {
  border: 2px solid #1e40af;
}

.card-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.card-info {
  flex: 1;
}

.metric-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #222;
  margin-bottom: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.dot.green {
  background: #059669;
}

.dot.blue {
  background: #2563eb;
}

.dot.dark-blue {
  background: #1e40af;
}

.metric-value {
  font-size: 18px;
  font-weight: 700;
  color: #222;
  margin-bottom: 2px;
  line-height: 1;
}

.metric-details {
  font-size: 12px;
  color: #666;
  margin-bottom: 1px;
  line-height: 1;
}

.metric-subtitle {
  font-size: 10px;
  color: #888;
  line-height: 1;
}

/* Большая кольцевая диаграмма справа */
.large-donut-chart {
  flex-shrink: 0;
}

/* Адаптив */
@media (max-width: 1200px) {
  .stats-layout {
    flex-direction: column;
    gap: 16px;
  }
  
  .center-cards {
    width: 100%;
  }
}

@media (max-width: 900px) {
  .statistics-title {
    margin: 18px 0 16px 0;
    margin-left: 12px;
  }
  
  .chart-container {
    height: 250px;
    padding: 16px;
  }
  
  .stats-layout {
    padding: 16px;
  }
  
  .stats-card {
    padding: 10px 12px;
    min-height: 70px;
  }
}

@media (max-width: 600px) {
  .statistics-title {
    margin-left: 6px;
  }
  
  .chart-container {
    height: 200px;
    padding: 12px;
  }
  
  .chart-section h2 {
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .stats-layout {
    padding: 12px;
  }
  
  .stats-card {
    padding: 8px 10px;
  }
  
  .metric-value {
    font-size: 16px;
  }
}
</style> 