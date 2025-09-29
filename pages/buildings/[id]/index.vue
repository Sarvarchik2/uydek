<template>
    <div class="container">
        <NuxtLink to="/new-buildings" class="back">← К списку новостроек</NuxtLink>
        <div v-if="building" class="page">
            <!-- Header / Hero -->
            <section class="hero-header" :style="{ backgroundImage: `url(${building.image})` }">
                <div class="overlay"></div>
                <div class="hero-inner">
                    <div class="tags">
                        <span class="tag">строится, есть сданные</span>
                        <span class="tag">комфорт</span>
                    </div>
                    <h1 class="hero-title">ЖК «{{ building.name }}»</h1>
                    <div class="hero-rows">
                        <div class="row">
                            <span class="star">★ {{ building.rating }}</span>
                            <span class="sep">·</span>
                            <span class="reviews">{{ building.reviewsCount }} оценок</span>
                        </div>
                        <div class="row">
                            <span class="price-range">от {{ formatPrice(building.minMonthlyPrice) }} сум</span>
                            <span class="ppm">— ориент. от 188 — 312 тыс. сум за м²</span>
                        </div>
                        <div class="row">
                            <span class="metro">Ⓜ {{ building.country }}, {{ building.metroTimeMin }} мин. до
                                метро</span>
                        </div>
                    </div>
                    <div class="hero-actions">
                        <button class="cta" @click="showConsult = true">Контакты застройщика</button>
                        <button class="icon-btn" aria-label="Избранное">♡</button>
                    </div>
                    <NuxtLink :to="`/buildings/${id}/gallery`" class="photos-chip">{{ photosCount }} фотографий
                    </NuxtLink>
                </div>
                <div class="hero-tabs">
                    <div class="brand">самолет</div>
                    <nav class="tabs">
                        <NuxtLink to="#" class="tab is-active">Обзор</NuxtLink>
                        <NuxtLink :to="`/buildings/${id}/gallery`" class="tab">Фотографии</NuxtLink>
                        <NuxtLink to="#" class="tab">Ипотека</NuxtLink>
                        <NuxtLink :to="`/buildings/${id}/plans`" class="tab">Квартиры</NuxtLink>
                        <NuxtLink to="#" class="tab">Скидки и акции</NuxtLink>
                        <NuxtLink to="#" class="tab">Описание</NuxtLink>
                        <NuxtLink to="#" class="tab">Инфраструктура</NuxtLink>
                        <NuxtLink to="#" class="tab">Ход строительства</NuxtLink>
                    </nav>
                </div>
            </section>

            <!-- Генплан корпусов + контакты -->
            <section class="grid two">
                <div class="card">
                    <h3>Выбор корпуса на генплане</h3>
                    <GenplanInteractive :image="genplanImage" :points="genplanPoints" @pick="onPickFromGenplan" />
                </div>
                <div class="card contacts">
                    <h3>Контакты застройщика</h3>
                    <div class="dev">
                        <div class="dev-info">
                            <div class="dev-name">От застройщика</div>
                            <div class="dev-sub">Специалист расскажет об акциях и доступных квартирах</div>
                        </div>
                        <div class="dev-actions">
                            <NuxtLink :to="`/buildings/${id}/plans`" class="btn secondary">Смотреть планировки
                            </NuxtLink>
                            <button class="btn outline" @click="showConsult = true">Показать телефон</button>
                            <button class="btn primary" @click="showConsult = true">Позвонить застройщику</button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Акции / Подписка -->
            <section class="grid two">
                <div class="card">
                    <h3>Скидки и акции</h3>
                    <ul class="promo">
                        <li>Скидка до 20% до конца месяца</li>
                        <li>Беспроцентная рассрочка на 12 месяцев</li>
                    </ul>
                </div>
                <div class="card subscribe">
                    <h3>Подписаться</h3>
                    <div class="sub-row">
                        <input v-model="subscribeEmail" type="email" placeholder="Ваш e-mail" />
                        <button class="btn primary">Подписаться</button>
                    </div>
                    <div class="sub-note">Получайте уведомления об изменении цен и новых акциях</div>
                </div>
            </section>

            <!-- Фильтры и сортировка -->
            <section class="card">
                <div class="filters">
                    <div class="range">
                        <div class="title">Цена от</div>
                        <input v-model="priceFrom" placeholder="–" class="short" />
                        <span>до</span>
                        <input v-model="priceTo" placeholder="–" class="short" />
                        <span class="unit">₽</span>
                    </div>
                    <div class="range">
                        <div class="title">Общая площадь</div>
                        <input v-model="areaFrom" placeholder="от 20" class="short" />
                        <span>–</span>
                        <input v-model="areaTo" placeholder="до 81" class="short" />
                        <span class="unit">м²</span>
                    </div>
                    <div class="sort">
                        <span>Сортировать:</span>
                        <button class="chip" :class="{ active: sort === 'price' }" @click="sort = 'price'">по
                            цене</button>
                        <button class="chip" :class="{ active: sort === 'area' }" @click="sort = 'area'">по
                            площади</button>
                        <button class="chip" :class="{ active: sort === 'ppm' }" @click="sort = 'ppm'">по цене за
                            м²</button>
                    </div>
                </div>
                <div class="room-summary">
                    <div class="rcol" v-for="item in roomStats" :key="item.type">
                        <div class="rtitle">{{ item.title }}</div>
                        <div class="rrow"><span>от {{ item.area }} м²</span><span>от {{ item.price }}</span></div>
                        <div class="rsub">{{ item.plans }} планировок · {{ item.count }} квартир</div>
                    </div>
                </div>
                <NuxtLink to="/new-buildings" class="see-all">Смотреть все планировки в этом ЖК</NuxtLink>
            </section>

            <!-- Ипотека -->
            <section class="card mortgage">
                <h3>Ипотека в ЖК «{{ building.name }}»</h3>
                <div class="mort-grid">
                    <div class="mcell">
                        <div class="mnum">4 430 000</div>
                        <div class="mlabel">Минимальная цена</div>
                    </div>
                    <div class="mcell">
                        <div class="mnum">1 328 047</div>
                        <div class="mlabel">Первоначальный взнос</div>
                    </div>
                    <div class="mcell">
                        <div class="mnum">20%</div>
                        <div class="mlabel">Льготная ипотека</div>
                    </div>
                    <div class="mcell">
                        <div class="mnum">от 5.75%</div>
                        <div class="mlabel">Ставка</div>
                    </div>
                    <div class="mcell">
                        <div class="mnum">от 21 756 ₽</div>
                        <div class="mlabel">Платёж в месяц</div>
                    </div>
                </div>
                <button class="btn primary">Подобрать квартиру с льготной ипотекой</button>
                <div class="mort-note">В ЖК «{{ building.name }}» есть 44 ипотечные программы со ставкой от 5.75%.
                    Расчёт носит информационный характер.</div>
            </section>

            <!-- Динамика цен -->
            <section class="card">
                <div class="chart-header">
                    <div>
                        <div class="ch-title">Динамика изменения цены на квартиры в ЖК</div>
                        <button class="chip">Отслеживать цену</button>
                    </div>
                    <div class="updated">Обновлено 31 августа 2025</div>
                </div>
                <PriceDynamicsChart :labels="chartLabels" :series1="chartSeries1" />
            </section>

            <!-- Параметры ЖК -->
            <section class="card">
                <h3>Параметры ЖК</h3>
                <div class="params">
                    <div><span>Срок сдачи</span><span>4 кв. 2025 – 2 кв. 2028, есть сданные</span></div>
                    <div><span>Класс жилья</span><span>комфорт</span></div>
                    <div><span>Тип дома</span><span>кирпично-монолитный</span></div>
                    <div><span>Число корпусов</span><span>32</span></div>
                    <div><span>Этажность</span><span>от 8 до 27</span></div>
                    <div><span>Отделка</span><span>без отделки, под ключ, предчистовая</span></div>
                    <div><span>Высота потолков</span><span>2,58 — 3,68 м</span></div>
                    <div><span>Паркинг</span><span>подземный – 88, есть открытый</span></div>
                    <div><span>Тип договора</span><span>ДКП, ДДУ, 214 ФЗ</span></div>
                    <div><span>Очереди</span><span>13</span></div>
                    <div><span>Число квартир</span><span>12 722</span></div>
                    <div><span>Безбарьерная среда</span><span>есть</span></div>
                    <div><span>Детская площадка</span><span>есть</span></div>
                    <div><span>Спортивная площадка</span><span>есть</span></div>
                </div>
            </section>

            <!-- Вопросы застройщику -->
            <section class="card">
                <h3>Спросите у застройщика</h3>
                <div class="faq">
                    <button class="q">Когда сдаётся дом?</button>
                    <button class="q">Есть акции и скидки?</button>
                    <button class="q">Можно без первого взноса?</button>
                    <button class="q">Какие есть варианты отделки?</button>
                </div>
                <button class="btn outline" @click="showConsult = true">Позвонить застройщику</button>
            </section>

            <!-- Тексты о проекте (демо) -->
            <section class="card">
                <h3>О проекте</h3>
                <p>Комплекс «{{ building.name }}» расположен в перспективном районе с удобной инфраструктурой. Жители
                    отдыхают во внутренних дворах, рядом — парки и набережные для прогулок.</p>
                <h4>Инфраструктура</h4>
                <p>В пешей доступности — школы, детские сады, поликлиники и магазины. До метро — несколько остановок на
                    транспорте.</p>
                <h4>Архитектура, благоустройство и отделка</h4>
                <p>Современные монолитные дома, благоустроенные дворы без машин, качественная отделка в светлых тонах по
                    выбору.</p>
            </section>

            <ConsultationModal v-model="showConsult" @submit="onConsultSubmit" />
        </div>
        <div v-else class="notfound">Новостройка не найдена</div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { newBuildings } from '@/data/newBuildings'
import PriceDynamicsChart from '@/components/PriceDynamicsChart.vue'
import ConsultationModal from '@/components/ConsultationModal.vue'
import GenplanInteractive from '@/components/GenplanInteractive.vue'

const route = useRoute()
const id = Number(route.params.id)
const building = computed(() => newBuildings.find(b => b.id === id))

// Room stats (демо-данные)
const roomStats = [
    { type: 'studio', title: 'студии', area: '19,78', price: '4,43 млн ₽', plans: 17, count: 48 },
    { type: 'one', title: '1-комнатные', area: '30,57', price: '6,30 млн ₽', plans: 31, count: 129 },
    { type: 'two', title: '2-комнатные', area: '48,84', price: '9,43 млн ₽', plans: 32, count: 107 },
    { type: 'three', title: '3-комнатные', area: '74', price: '17,70 млн ₽', plans: 12, count: 29 }
]

// Filters and UI
const priceFrom = ref('')
const priceTo = ref('')
const areaFrom = ref('')
const areaTo = ref('')
const sort = ref<'price' | 'area' | 'ppm'>('price')
const showConsult = ref(false)
function onConsultSubmit(payload: any) { console.log('Consult request', payload) }

// Subscribe email input state
const subscribeEmail = ref('')

// Chart mock
const chartLabels = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
const chartSeries1 = [2000000, 2600000, 3200000, 3700000, 4200000, 4700000, 5200000, 5452794]

// Genplan demo data (replace with real image and points when available)
const genplanImage = 'https://avatars.mds.yandex.net/get-verba/1604130/2a0000019363b90543fee371ad8b8b70dbbf/realty_genplan'
const genplanPoints = [
    {
        id: 1, x: 42, y: 46, title: '39', delivery: '2026 г.', floors: 23, prices: [
            { type: 'Студии', from: '5 418 526 ₽' }, { type: '1-комн.', from: '8 281 833 ₽' },
            { type: '2-комн.', from: '10 618 246 ₽' }, { type: '3-комн.', from: '18 045 736 ₽' },
        ]
    },
    {
        id: 2, x: 58, y: 41, title: '40', delivery: '2027 г.', floors: 27, prices: [
            { type: 'Студии', from: '5 990 000 ₽' }, { type: '1-комн.', from: '8 750 000 ₽' },
        ]
    },
]

// Header helpers
const photosCount = 39
function formatPrice(n?: number) {
    if (n === undefined || n === null) return '—'
    return new Intl.NumberFormat('ru-RU').format(n)
}

function onPickFromGenplan(payload: { houseId: number | string; houseTitle: string; type: string }) {
    // Map 'Студии'|'1-комн.'|'2-комн.'|'3-комн.' -> number or special
    const map: Record<string, number | null> = {
        'Студии': 0,
        '1-комн.': 1,
        '2-комн.': 2,
        '3-комн.': 3,
        '4-комн.': 4,
    }
    const rooms = map[payload.type] ?? null
    const q: any = {}
    if (rooms !== null) q.rooms = rooms
    q.house = payload.houseId
    // navigate to plans page with pre-applied filters
    window.location.href = `/buildings/${id}/plans` + (Object.keys(q).length ? `?${new URLSearchParams(q).toString()}` : '')
}
</script>

<style scoped>
.back {
    display: inline-block;
    margin: 14px 0;
    color: #3b82f6;
    text-decoration: none;
}

.page {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* ===== HERO HEADER (Yandex-like) ===== */
.hero-header {
    position: relative;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    height: 420px;
    background-size: cover;
    background-position: center;
    border-radius: 0 0 20px 20px;
    overflow: hidden;
}

.hero-header .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, .35) 0%, rgba(0, 0, 0, .35) 40%, rgba(0, 0, 0, .5) 100%);
}

.hero-inner {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 28px 16px 18px;
    color: #fff;
}

.tags {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
}

.tag {
    background: rgba(255, 255, 255, .2);
    border: 1px solid rgba(255, 255, 255, .3);
    color: #fff;
    padding: 6px 10px;
    border-radius: 999px;
    font-weight: 700;
    backdrop-filter: blur(6px);
}

.hero-title {
    font-size: 40px;
    font-weight: 900;
    margin: 6px 0 8px;
    text-shadow: 0 2px 6px rgba(0, 0, 0, .3);
}

.hero-rows {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
}

.star {
    color: #ffd166;
    font-weight: 900;
}

.price-range {
    font-size: 20px;
    font-weight: 900;
}

.ppm {
    color: #d1d5db;
}

.metro { color: #d1fae5; }

.hero-actions { display: flex; gap: 10px; margin-top: 12px; }

.cta {
    background: #facc15;
    border: none;
    color: #111;
    font-weight: 900;
    padding: 10px 16px;
    border-radius: 12px;
    cursor: pointer;
}

.icon-btn {
    background: rgba(255, 255, 255, .2);
    border: 1px solid rgba(255, 255, 255, .35);
    color: #fff;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    cursor: pointer;
}

.photos-chip {
    position: absolute;
    left: 16px;
    bottom: 74px;
    background: rgba(0, 0, 0, .55);
    color: #fff;
    padding: 8px 12px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 800;
    border: 1px solid rgba(255, 255, 255, .2);
}

.hero-tabs {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 10px 16px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .35) 35%, rgba(0, 0, 0, .6) 100%);
}

.brand {
    color: #fff;
    font-weight: 900;
    opacity: .9;
}

.tabs {
    display: flex;
    gap: 16px;
    position: relative;
    z-index: 5;
}

.tab {
    color: #fff;
    text-decoration: none;
    padding: 8px 6px;
    opacity: .9;
    position: relative;
    z-index: 10;
    cursor: pointer;
    transition: all 0.2s ease;
}

.tab:hover {
    opacity: 1;
    color: #facc15;
}

.tab.is-active {
    border-bottom: 2px solid #ef4444;
}

@media (max-width: 980px) {
    .hero-title {
        font-size: 28px;
    }

    .price-range {
        font-size: 18px;
    }

    .hero-header {
        height: 360px;
    }
}

.meta {
    display: flex;
    gap: 10px;
    color: #6b7280;
    margin-bottom: 8px;
    flex-wrap: wrap;
}

/* ===== end hero header ===== */

.grid.two {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}

.card {
    background: #fff;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 8px 32px rgba(60, 100, 200, .08), 0 1.5px 6px rgba(60, 100, 200, .04);
}

.card h3 {
    margin: 0 0 12px;
    color: #3b82f6;
}

.specs {
    background: #f7f9ff;
    border-radius: 12px;
    padding: 12px;
    margin: 12px 0;
    display: grid;
    gap: 4px;
}

.benefit {
    color: #5b6aa1;
}

/* GenplanInteractive is self-styled; no legacy genplan styles needed */

.chip {
    border: none;
    background: #eef2ff;
    color: #3b82f6;
    padding: 8px 12px;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 700;
}

.chip.active {
    background: #3b82f6;
    color: #fff;
}

.contacts .dev {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.dev-actions {
    display: flex;
    gap: 10px;
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

.promo {
    margin: 0;
    padding-left: 18px;
    color: #4b5563;
}

.subscribe .sub-row {
    display: flex;
    gap: 10px;
}

.subscribe input {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid #e1e6f3;
    border-radius: 12px;
}

.sub-note {
    color: #7a8bb7;
    font-size: 12px;
    margin-top: 6px;
}

.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
}

.range {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    border-radius: 12px;
    padding: 10px 12px;
    box-shadow: 0 8px 32px rgba(60, 100, 200, .06), 0 1.5px 6px rgba(60, 100, 200, .04);
}

.range .title {
    font-weight: 700;
    margin-right: 6px;
}

.range .short {
    width: 90px;
    border: none;
    outline: none;
    background: transparent;
    font-weight: 700;
    color: #3b82f6;
}

.range .unit {
    color: #7a8bb7;
    font-weight: 700;
}

.sort {
    display: flex;
    gap: 8px;
    align-items: center;
}

.room-summary {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

.rcol {
    background: #f7f9ff;
    border-radius: 12px;
    padding: 12px;
}

.rtitle {
    font-weight: 800;
    margin-bottom: 6px;
    color: #3b82f6;
    text-transform: capitalize;
}

.rrow {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
}

.rsub {
    color: #7a8bb7;
    font-size: 12px;
    margin-top: 4px;
}

.see-all {
    display: inline-block;
    margin-top: 12px;
    color: #3b82f6;
    text-decoration: none;
    font-weight: 700;
}

.mortgage .mort-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 10px;
}

.mcell {
    background: #f7f9ff;
    border-radius: 12px;
    padding: 12px;
    text-align: center;
}

.mnum {
    font-weight: 800;
    color: #222;
}

.mlabel {
    color: #7a8bb7;
    font-size: 12px;
}

.mort-note {
    color: #7a8bb7;
    font-size: 12px;
    margin-top: 8px;
}

.chart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

.ch-title {
    font-weight: 800;
}

.updated {
    color: #7a8bb7;
    font-size: 12px;
}

.params {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.params>div {
    display: grid;
    grid-template-columns: 1.2fr 1.8fr;
    gap: 8px;
    background: #f7f9ff;
    border-radius: 12px;
    padding: 10px;
}

.params span:first-child {
    color: #7a8bb7;
    font-weight: 700;
}

.faq {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
}

.q {
    border: 1px solid #d8def0;
    background: #fff;
    border-radius: 12px;
    padding: 8px 10px;
    cursor: pointer;
}

.notfound {
    padding: 40px 0;
    color: #888;
}

@media (max-width: 980px) {
    .grid.two {
        grid-template-columns: 1fr;
    }

    .hero-wrap {
        grid-template-columns: 1fr;
    }

    .room-summary {
        grid-template-columns: repeat(2, 1fr);
    }

    .mortgage .mort-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .params {
        grid-template-columns: 1fr;
    }
}
</style>
