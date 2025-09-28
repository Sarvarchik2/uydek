<template>
    <div class="newb-card" @click="goToDetail">
        <div class="newb-card-media">
            <img :src="building.image" :alt="building.name" />
            <button class="newb-like" :class="{ active: liked }" @click.stop="liked = !liked">
                <svg width="20" height="20" viewBox="0 0 24 24">
                    <path :fill="liked ? '#3b82f6' : '#c9cbd6'"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </button>
        </div>
        <div class="newb-card-body">
            <div class="newb-title-row">
                <div class="newb-title">{{ building.name }}</div>
                <div class="newb-price">От {{ formattedPrice }} в месяц</div>
            </div>
            <div class="newb-meta">
                <span class="newb-meta-item">
                    <img src="@/assets/icons/lang.svg" alt="country" />
                    {{ building.country }}
                </span>
                <span class="newb-meta-item">
                    <img src="@/assets/icons/metrom.svg" alt="metro" />
                    {{ building.metroTimeMin }}мин
                </span>
                <span class="newb-meta-item rating">
                    <span class="star">★</span>
                    {{ building.rating }}
                    <span class="reviews">· {{ building.reviewsCount }} оценок</span>
                </span>
            </div>
            <div class="newb-address">{{ building.address }}</div>

            <div class="newb-specs">
                <div class="newb-specs-col">
                    <div class="row"><span>Студии</span><span>{{ building.specs.studio.area }}</span><span>{{
                        building.specs.studio.price }}</span></div>
                    <div class="row"><span>1-комн.</span><span>{{ building.specs.one.area }}</span><span>{{
                        building.specs.one.price }}</span></div>
                    <div class="row"><span>2-комн.</span><span>{{ building.specs.two.area }}</span><span>{{
                        building.specs.two.price }}</span></div>
                    <div class="row"><span>3-комн.</span><span>{{ building.specs.three.area }}</span><span>{{
                        building.specs.three.price }}</span></div>
                    <div class="row" v-if="building.specs.four"><span>4-комн.</span><span>{{ building.specs.four.area
                    }}</span><span>{{ building.specs.four.price }}</span></div>
                </div>
            </div>

            <div class="newb-benefit">
                <span class="label">ВЫГОДА</span> — {{ building.benefit }}
            </div>

            <div class="newb-actions">
                <button class="btn outline" @click.stop="openConsultation">+998 xxx xx xx</button>
                <button class="btn primary" @click.stop="openConsultation">Позвонить мне</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export interface BuildingSpecsItem { area: string; price: string }
export interface Building {
    id: number
    name: string
    image: string
    country: string
    metroTimeMin: number
    address: string
    rating: number
    reviewsCount: number
    minMonthlyPrice: number
    specs: {
        studio: BuildingSpecsItem
        one: BuildingSpecsItem
        two: BuildingSpecsItem
        three: BuildingSpecsItem
        four?: BuildingSpecsItem
    }
    benefit: string
}

const props = defineProps<{ building: Building }>()
const liked = ref(false)
const router = useRouter()

const formattedPrice = computed(() =>
    new Intl.NumberFormat('ru-RU').format(props.building.minMonthlyPrice) + ' сум'
)

const emit = defineEmits<{ (e: 'consult', id: number): void }>()
function openConsultation() { emit('consult', props.building.id) }
function goToDetail() { router.push(`/buildings/${props.building.id}`) }
</script>

<style scoped>
.newb-card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(60, 100, 200, 0.08), 0 1.5px 6px rgba(60, 100, 200, 0.04);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    /* растягиваем карточку на всю высоту ячейки */
}

.newb-card-media {
    position: relative;
    height: 180px;
    overflow: hidden;
}

.newb-card-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.newb-like {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(60, 100, 200, 0.10);
    cursor: pointer;
}

.newb-like.active {
    background: #eaf1ff;
}

.newb-card-body {
    padding: 14px 16px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    /* тело занимает доступную высоту */
}

.newb-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.newb-title {
    font-weight: 700;
    font-size: 18px;
    color: #222;
}

.newb-price {
    font-weight: 700;
    color: #3b82f6;
    font-size: 14px;
}

.newb-meta {
    display: flex;
    gap: 14px;
    color: #6b7280;
    font-size: 13px;
    align-items: center;
    flex-wrap: wrap;
}

.newb-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
}

.newb-meta-item img {
    width: 16px;
    height: 16px;
}

.newb-meta-item.rating .star {
    color: #f5c518;
    margin-right: 4px;
}

.newb-meta-item.rating .reviews {
    color: #9aa2b2;
    margin-left: 4px;
}

.newb-address {
    font-size: 13px;
    color: #4b5563;
}

.newb-specs {
    display: flex;
    border-top: 1px solid #eef1f8;
    padding-top: 8px;
}

.newb-specs-col {
    width: 100%;
    display: grid;
    grid-template-columns: 80px 1fr 1fr;
    row-gap: 6px;
    column-gap: 8px;
    font-size: 13px;
    color: #333;
    min-height: 120px;
    /* выравниваем по высоте блок с характеристиками */
}

.newb-specs-col .row {
    display: contents;
}

.newb-specs-col .row span:nth-child(1) {
    color: #6b7280;
}

.newb-specs-col .row span:nth-child(3) {
    text-align: right;
    color: #111;
    font-weight: 600;
}

.newb-benefit {
    background: #f7f9ff;
    color: #5b6aa1;
    border-radius: 12px;
    padding: 10px 12px;
    font-size: 12px;
    min-height: 40px;
    /* фиксируем минимальную высоту под 1-2 строки */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.newb-benefit .label {
    color: #3b82f6;
    font-weight: 700;
    margin-right: 6px;
}

.newb-actions {
    display: flex;
    flex-direction: column;
    /* кнопки одна над другой */
    gap: 10px;
    margin-top: auto;
    /* прижимаем блок кнопок вниз карточки */
}

.btn {
    border-radius: 12px;
    padding: 10px 12px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid transparent;
    width: 100%;
    /* кнопки на всю ширину */
    text-align: center;
}

.btn.outline {
    background: #fff;
    border-color: #d8def0;
    color: #3b82f6;
}

.btn.primary {
    background: #3b82f6;
    color: #fff;
}

@media (max-width: 700px) {
    .newb-card-media {
        height: 150px;
    }
}
</style>
