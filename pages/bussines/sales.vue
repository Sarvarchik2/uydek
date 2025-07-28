<template>
  <div class="sales-page-wrap">
    <h1 class="sales-title container">Личный кабинет</h1>
    <BusinessContainer active="sales">
      
      <!-- Метрики продаж -->
      <div class="sales-metrics">
        <div class="metric-card">
          <div class="metric-icon">
            <img src="@/assets/icons/filter_menu.svg" alt="Продажи" />
          </div>
          <div class="metric-content">
            <div class="metric-label">Всего продано:</div>
            <div class="metric-value">24 200 000 UZS</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">
            <img src="@/assets/icons/filter_menu.svg" alt="Сегодня" />
          </div>
          <div class="metric-content">
            <div class="metric-label">Сегодня продано:</div>
            <div class="metric-value">1 200 000 UZS</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">
            <img src="@/assets/icons/search_building.svg" alt="Жилье" />
          </div>
          <div class="metric-content">
            <div class="metric-label">Количество проданного жилья:</div>
            <div class="metric-value">12 шт</div>
          </div>
        </div>
      </div>

      <!-- График продаж -->
      <div class="chart-section">
        <h2>Количество продаж и бронирований</h2>
        <div class="chart-container">
          <LineChart v-if="chartData" :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Список продаж -->
      <div class="sales-list-section">
        <h2>Список продаж</h2>
        <div class="sales-list">
          <div class="sale-item">
            <div class="sale-date">
              <img src="@/assets/icons/filter_menu.svg" alt="Дата" />
              <span>12.08.25</span>
            </div>
            <div class="sale-property">Modera Tower</div>
            <div class="sale-buyer">John Paxan</div>
            <div class="sale-amount">600$</div>
            <div class="sale-status paid">
              <span class="status-icon">✓</span>
              <span>Оплачено</span>
            </div>
          </div>

          <div class="sale-item">
            <div class="sale-date">
              <img src="@/assets/icons/filter_menu.svg" alt="Дата" />
              <span>10.08.25</span>
            </div>
            <div class="sale-property">Sky Tower</div>
            <div class="sale-buyer">Sarah Johnson</div>
            <div class="sale-amount">800$</div>
            <div class="sale-status paid">
              <span class="status-icon">✓</span>
              <span>Оплачено</span>
            </div>
          </div>

          <div class="sale-item">
            <div class="sale-date">
              <img src="@/assets/icons/filter_menu.svg" alt="Дата" />
              <span>08.08.25</span>
            </div>
            <div class="sale-property">Green Valley</div>
            <div class="sale-buyer">Mike Wilson</div>
            <div class="sale-amount">450$</div>
            <div class="sale-status rejected">
              <span class="status-icon">✗</span>
              <span>Отклонено</span>
            </div>
          </div>
        </div>
      </div>

    </BusinessContainer>
  </div>
</template>

<script setup>
import BusinessContainer from '@/components/BusinessContainer.vue';
import { Line as LineChart } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ref, onMounted } from 'vue';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

useHead({ title: 'Продажи | Uydek' });

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
      borderColor: '#fbbf24',
      borderWidth: 2,
      cornerRadius: 12,
      displayColors: false,
      padding: 12,
      callbacks: {
        label: function(context) {
          return `${context.parsed.y}M продаж`;
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

onMounted(() => {
  chartData.value = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    datasets: [
      {
        label: 'Продажи',
        data: [2.5, 3.8, 4.2, 3.5, 5.1, 6.3, 5.7, 4.8, 4.1, 3.9, 3.2, 2.8],
        borderColor: '#fbbf24',
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(251, 191, 36, 0.6)');
          gradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.3)');
          gradient.addColorStop(1, 'rgba(251, 191, 36, 0.05)');
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fbbf24',
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
.sales-page-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sales-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;
}

/* Метрики продаж */
.sales-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.metric-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 16px;
}

.metric-icon {
  width: 48px;
  height: 48px;
  background: #fef3c7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-icon img {
  width: 24px;
  height: 24px;
}

.metric-content {
  flex: 1;
}

.metric-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 20px;
  font-weight: 700;
  color: #222;
}

/* График */
.chart-section {
  margin-bottom: 32px;
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

/* Список продаж */
.sales-list-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.sales-list-section h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #222;
}

.sales-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sale-item {
  display: grid;
  grid-template-columns: 120px 1fr 1fr 100px 120px;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  gap: 16px;
}

.sale-date {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.sale-date img {
  width: 16px;
  height: 16px;
}

.sale-property {
  font-size: 16px;
  font-weight: 500;
  color: #222;
}

.sale-buyer {
  font-size: 14px;
  color: #666;
}

.sale-amount {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  text-align: right;
}

.sale-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  width: fit-content;
}

.sale-status.paid {
  background: #dcfce7;
  color: #059669;
}

.sale-status.rejected {
  background: #fee2e2;
  color: #dc2626;
}

.status-icon {
  font-size: 12px;
  font-weight: bold;
}

/* Адаптив */
@media (max-width: 1200px) {
  .sales-metrics {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .sales-title {
    margin: 18px 0 16px 0;
    margin-left: 12px;
  }
  
  .sales-metrics {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .metric-card {
    padding: 20px;
  }
  
  .chart-container {
    height: 250px;
    padding: 16px;
  }
  
  .sales-list-section {
    padding: 20px;
  }
  
  .sale-item {
    grid-template-columns: 1fr;
    gap: 8px;
    text-align: center;
  }
  
  .sale-amount {
    text-align: center;
  }
  
  .sale-status {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .sales-title {
    margin-left: 6px;
  }
  
  .chart-container {
    height: 200px;
    padding: 12px;
  }
  
  .chart-section h2,
  .sales-list-section h2 {
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .metric-value {
    font-size: 18px;
  }
  
  .sales-list-section {
    padding: 16px;
  }
}
</style> 