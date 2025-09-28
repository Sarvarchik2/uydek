<template>
    <div class="container newb-listing">
        <!-- Фильтр сверху -->
        <div class="nb-filter">
            <button class="nb-pill nb-cat" @click="showFilterModal = true">
                <img src="@/assets/icons/filter_menu.svg" alt="cat" />
                Категории
            </button>

            <div class="nb-rooms">
                <button class="nb-chip" :class="{ active: selectedRooms.includes('Студия') }"
                    @click="toggleRoom('Студия')">Студия</button>
                <button class="nb-chip" :class="{ active: selectedRooms.includes('1') }"
                    @click="toggleRoom('1')">1</button>
                <button class="nb-chip" :class="{ active: selectedRooms.includes('2') }"
                    @click="toggleRoom('2')">2</button>
                <button class="nb-chip" :class="{ active: selectedRooms.includes('3') }"
                    @click="toggleRoom('3')">3</button>
                <button class="nb-chip" :class="{ active: selectedRooms.includes('+4') }"
                    @click="toggleRoom('+4')">+4</button>
            </div>

            <div class="nb-price">
                <span class="lbl">Цена</span>
                <span class="sub">От:</span>
                <input v-model="priceFrom" class="nb-input" placeholder="--" />
                <span class="sub">До:</span>
                <input v-model="priceTo" class="nb-input" placeholder="--" />
            </div>

            <NuxtLink to="/map" class="nb-pill nb-link">
                <img src="@/assets/icons/onmap.svg" alt="map" />
                На карте
            </NuxtLink>

            <button class="nb-pill nb-link" @click="showMetroModal = true">
                <img src="@/assets/icons/metro.svg" alt="metro" />
                Метро
            </button>

            <button class="nb-pill nb-link" @click="showQuickSearch = true">
                <img src="@/assets/icons/search.svg" alt="search" />
                Быстрый поиск
            </button>
        </div>

        <div class="newb-toolbar">
            <div class="left">
                <h1>Новостройки</h1>
                <span class="count">{{ filtered.length }}</span>
            </div>
            <div class="right">
                <input v-model="q" class="inp" placeholder="Поиск по названию или адресу" />
                <select v-model="sort" class="sel">
                    <option value="price_asc">Цена: сначала дешевле</option>
                    <option value="price_desc">Цена: сначала дороже</option>
                    <option value="rating_desc">Рейтинг</option>
                </select>
            </div>
        </div>
        <div class="grid">
            <BuildingCard v-for="b in sorted" :key="b.id" :building="b" @consult="showConsult = true" />
        </div>
        <ConsultationModal v-model="showConsult" @submit="onConsultSubmit" />
        <SvgModal v-model="showMetroModal">
            <svg width="300" height="120" viewBox="0 0 300 120">
                <rect x="10" y="10" width="280" height="100" rx="20" fill="#e9edf8" stroke="#3b82f6" stroke-width="4" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#3b82f6">Тут
                    будет карта метро</text>
            </svg>
        </SvgModal>
        <RentFilterModal v-model="showFilterModal" />
        <QuickSearchModal v-model="showQuickSearch" search-type="new-buildings" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BuildingCard, { type Building } from '@/components/BuildingCard.vue'
import ConsultationModal from '@/components/ConsultationModal.vue'
import { newBuildings as sharedNewBuildings } from '@/data/newBuildings'
import SvgModal from '@/components/SvgModal.vue'
import RentFilterModal from '@/components/RentFilterModal.vue'
import QuickSearchModal from '@/components/QuickSearchModal.vue'

const data = ref<Building[]>(sharedNewBuildings)
const showConsult = ref(false)
function onConsultSubmit(payload: any) { console.log('Consult request', payload) }

const q = ref('')
const sort = ref<'price_asc' | 'price_desc' | 'rating_desc'>('price_asc')

// Фильтр: комнаты/цена/модалки
const selectedRooms = ref<string[]>(['Студия'])
const priceFrom = ref('')
const priceTo = ref('')
const showMetroModal = ref(false)
const showFilterModal = ref(false)
const showQuickSearch = ref(false)

function toggleRoom(room: string) {
    const i = selectedRooms.value.indexOf(room)
    if (i === -1) selectedRooms.value.push(room)
    else selectedRooms.value.splice(i, 1)
}

const filtered = computed(() => {
    const s = q.value.trim().toLowerCase()
    if (!s) return data.value
    return data.value.filter(b =>
        b.name.toLowerCase().includes(s) ||
        b.address.toLowerCase().includes(s)
    )
})

const sorted = computed(() => {
    const arr = [...filtered.value]
    switch (sort.value) {
        case 'price_desc':
            return arr.sort((a, b) => b.minMonthlyPrice - a.minMonthlyPrice)
        case 'rating_desc':
            return arr.sort((a, b) => b.rating - a.rating)
        default:
            return arr.sort((a, b) => a.minMonthlyPrice - b.minMonthlyPrice)
    }
})
</script>

<style scoped>
.newb-listing {
    padding: 24px 0;
}

/* Верхний фильтр */
.nb-filter {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 14px;
}

.nb-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    background: #fff;
    border-radius: 999px;
    padding: 10px 14px;
    cursor: pointer;
    box-shadow: 0 8px 32px rgba(60, 100, 200, 0.06), 0 1.5px 6px rgba(60, 100, 200, 0.04);
}

.nb-pill img {
    width: 18px;
    height: 18px;
}

.nb-cat {
    font-weight: 700;
    color: #3b82f6;
}

.nb-link {
    color: #3b82f6;
    font-weight: 600;
}

.nb-rooms {
    display: flex;
    gap: 8px;
    background: #fff;
    border-radius: 999px;
    padding: 4px;
    box-shadow: 0 8px 32px rgba(60, 100, 200, 0.06), 0 1.5px 6px rgba(60, 100, 200, 0.04);
}

.nb-chip {
    background: transparent;
    border: none;
    padding: 8px 12px;
    border-radius: 999px;
    color: #7a8bb7;
    font-weight: 700;
    cursor: pointer;
}

.nb-chip.active {
    background: #3b82f6;
    color: #fff;
}

.nb-price {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    border-radius: 999px;
    padding: 10px 14px;
    box-shadow: 0 8px 32px rgba(60, 100, 200, 0.06), 0 1.5px 6px rgba(60, 100, 200, 0.04);
}

.nb-price .lbl {
    font-weight: 700;
    color: #222;
    margin-right: 6px;
}

.nb-price .sub {
    color: #7a8bb7;
    font-weight: 700;
}

.nb-input {
    width: 70px;
    border: none;
    background: transparent;
    outline: none;
    font-weight: 700;
    color: #3b82f6;
}

.newb-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
}

.newb-toolbar .left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.newb-toolbar h1 {
    margin: 0;
    font-size: 24px;
    color: #3b82f6;
}

.newb-toolbar .count {
    color: #7a8bb7;
    font-weight: 600;
}

.newb-toolbar .right {
    display: flex;
    align-items: center;
    gap: 10px;
}

.inp {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #d8def0;
    min-width: 260px;
}

.sel {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #d8def0;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
}

@media (max-width:1100px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width:700px) {
    .grid {
        grid-template-columns: 1fr;
    }

    .inp {
        min-width: 0;
        width: 100%;
    }
}
</style>
