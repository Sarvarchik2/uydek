<template>
    <div class="chart-wrap">
        <Line :data="data" :options="options" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const props = defineProps<{ labels: string[]; series1: number[]; series2?: number[] }>()

const data = computed(() => ({
    labels: props.labels,
    datasets: [
        {
            label: 'Средняя цена за квартиру',
            data: props.series1,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,.15)',
            fill: true,
            tension: 0.3,
        },
        props.series2 ? {
            label: 'Средняя цена за м²',
            data: props.series2,
            borderColor: '#9aa2b2',
            backgroundColor: 'rgba(154,162,178,.12)',
            fill: true,
            tension: 0.3,
            yAxisID: 'y1'
        } : undefined as any
    ].filter(Boolean)
}))

const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    stacked: false,
    plugins: { legend: { display: true } },
    scales: {
        y: { type: 'linear' as const, position: 'left' as const },
        y1: { type: 'linear' as const, position: 'right' as const, grid: { drawOnChartArea: false } }
    }
}
</script>

<style scoped>
.chart-wrap {
    width: 100%;
    height: 280px;
}
</style>
