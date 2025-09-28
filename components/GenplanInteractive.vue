<template>
    <div class="genplan-wrap">
        <img class="genplan-img" :src="image" alt="Генплан" />
        <button v-for="p in points" :key="p.id" class="dot" :style="{ left: p.x + '%', top: p.y + '%' }"
            @click.stop="toggle(p.id)" aria-label="Корпус" />

        <div v-for="p in points" :key="p.id + '-tip'" v-show="activeId === p.id" class="tip" :style="tipStyle(p)">
            <div class="tip-head">
                <div class="title">К. {{ p.title }}</div>
                <div class="sub">сдаётся в {{ p.delivery }} · {{ p.floors }} этажа</div>
            </div>
            <ul class="types">
                <li v-for="t in p.prices" :key="t.type" @click.stop="pick(p, t)">
                    <span class="t">{{ t.type }}</span>
                    <span class="p">от {{ t.from }}</span>
                    <span class="arr">›</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const emit = defineEmits<{ (e: 'pick', payload: { houseId: number | string; houseTitle: string; type: string }): void }>()

export interface GenplanPointPrice { type: string; from: string }
export interface GenplanPoint {
    id: number | string
    x: number // percent
    y: number // percent
    title: string
    delivery: string
    floors: number
    prices: GenplanPointPrice[]
}

const props = defineProps<{ image: string; points?: GenplanPoint[] }>()

const activeId = ref<GenplanPoint['id'] | null>(null)
const points = computed<GenplanPoint[]>(() => props.points ?? [
    {
        id: 1, x: 38, y: 42, title: '39', delivery: '2026 г.', floors: 23, prices: [
            { type: 'Студии', from: '5 418 526 ₽' },
            { type: '1-комн.', from: '8 281 833 ₽' },
            { type: '2-комн.', from: '10 618 246 ₽' },
            { type: '3-комн.', from: '18 045 736 ₽' },
        ]
    },
    {
        id: 2, x: 55, y: 37, title: '40', delivery: '2027 г.', floors: 27, prices: [
            { type: 'Студии', from: '5 990 000 ₽' },
            { type: '1-комн.', from: '8 750 000 ₽' },
        ]
    },
    {
        id: 3, x: 24, y: 58, title: '12', delivery: '2025 г.', floors: 18, prices: [
            { type: '1-комн.', from: '7 200 000 ₽' },
            { type: '2-комн.', from: '9 850 000 ₽' },
        ]
    },
])

function toggle(id: GenplanPoint['id']) {
    activeId.value = activeId.value === id ? null : id
}

function tipStyle(p: GenplanPoint) {
    const left = Math.min(Math.max(p.x, 12), 88)
    const top = Math.min(Math.max(p.y, 12), 88)
    return { left: left + '%', top: top + '%' }
}

function pick(p: GenplanPoint, t: GenplanPointPrice) {
    emit('pick', { houseId: p.id, houseTitle: p.title, type: t.type })
}
</script>

<style scoped>
.genplan-wrap {
    position: relative;
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    background: #f3f6ff;
}

.genplan-img {
    width: 100%;
    display: block;
    object-fit: cover;
    max-height: 520px;
}

.dot {
    position: absolute;
    width: 14px;
    height: 14px;
    background: #fff;
    border: 3px solid #111827;
    border-radius: 999px;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, .25);
    cursor: pointer;
}

.tip {
    position: absolute;
    transform: translate(-50%, -10px);
    background: #fff;
    color: #111;
    border-radius: 12px;
    box-shadow: 0 18px 60px rgba(23, 34, 64, .2), 0 4px 14px rgba(23, 34, 64, .1);
    width: 280px;
    padding: 10px;
    z-index: 5;
}

.tip-head .title {
    font-weight: 800;
    margin-bottom: 2px;
}

.tip-head .sub {
    color: #7a8bb7;
    font-size: 12px;
    font-weight: 700;
}

.types {
    list-style: none;
    padding: 6px 0 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.types li {
    display: grid;
    grid-template-columns: 1fr auto 18px;
    align-items: center;
    gap: 8px;
    border: 1px solid #e5eaf7;
    border-radius: 10px;
    padding: 8px 10px;
    cursor: pointer;
}

.types li:hover {
    background: #f7faff;
    border-color: #dfe7fb;
}

.types .t {
    font-weight: 700;
    color: #374151;
}

.types .p {
    font-weight: 800;
    color: #111;
}

.types .arr {
    color: #b7c2e5;
    font-size: 18px;
    line-height: 0;
    text-align: right;
}
</style>
