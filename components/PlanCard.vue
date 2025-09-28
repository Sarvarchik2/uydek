<template>
    <div class="plan-card">
        <div class="left">
            <img :src="plan.image" :alt="plan.title" />
            <div class="badge">{{ plan.rooms }}</div>
        </div>
        <div class="right">
            <div class="head">
                <div class="title">{{ plan.title }}</div>
                <div class="price">
                    <div class="range">{{ plan.priceRange || plan.price }}</div>
                    <div v-if="plan.pricePpm" class="ppm">от {{ plan.pricePpm }} за м²</div>
                </div>
            </div>
            <div class="specs">
                <div><span>Общая:</span><b>{{ plan.area }} м²</b></div>
                <div><span>Кухня:</span><b>{{ plan.kitchenArea ?? '—' }} м²</b></div>
                <div><span>Этажи:</span><b>{{ plan.floorsText || plan.floor }}</b></div>
                <div><span>Корпус:</span><b>{{ plan.house }}</b></div>
                <div><span>Срок сдачи:</span><b>{{ plan.delivery || '—' }}</b></div>
            </div>
            <div class="footer">
                <button class="cta" @click.stop="$emit('select', plan)">Выбрать из {{ plan.offersCount || 1 }}
                    квартир</button>
                <div class="tel">
                    <button class="btn outline" @click.stop="$emit('consult')">Показать телефон</button>
                    <button class="btn primary" @click.stop="$emit('consult')">Позвонить мне</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
export interface PlanItem {
    id: number
    title: string
    rooms: string
    area: number
    price: string
    floor: number
    house: string
    image: string
    priceRange?: string
    pricePpm?: string
    kitchenArea?: number
    floorsText?: string
    offersCount?: number
    delivery?: string
}
defineProps<{ plan: PlanItem }>()
</script>

<style scoped>
.plan-card {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 14px;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(23, 34, 64, .12), 0 3px 10px rgba(23, 34, 64, .06);
}

.left {
    position: relative;
    background: #f7f9ff;
    min-height: 220px;
}

.left img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #111;
    color: #fff;
    border-radius: 999px;
    padding: 6px 10px;
    font-weight: 800;
    font-size: 12px;
}

.right {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
}

.title {
    font-size: 20px;
    font-weight: 800;
}

.price {
    text-align: right;
}

.price .range {
    font-size: 20px;
    font-weight: 800;
    color: #111;
}

.price .ppm {
    color: #7a8bb7;
    font-size: 12px;
    font-weight: 700;
}

.specs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    color: #6b7280;
}

.specs span {
    color: #7a8bb7;
    font-weight: 700;
    margin-right: 6px;
}

.specs b {
    color: #111;
}

.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 6px;
}

.cta {
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 10px 14px;
    font-weight: 800;
    cursor: pointer;
}

.tel {
    display: flex;
    gap: 8px;
}

.btn {
    border-radius: 12px;
    padding: 10px 12px;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid #d8def0;
}

.btn.primary {
    background: #3b82f6;
    color: #fff;
    border-color: transparent;
}

.btn.outline {
    background: #fff;
    color: #3b82f6;
}

@media (max-width: 900px) {
    .plan-card {
        grid-template-columns: 1fr;
    }
}
</style>
