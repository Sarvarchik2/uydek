<template>
    <div class="plans-page">
        <div class="container">
            <div class="header">
                <NuxtLink :to="`/buildings/${id}`" class="back">← К ЖК</NuxtLink>
                <h1>Планировки — ЖК {{ buildingName }}</h1>
            </div>

            <div class="filters">
                <div class="row">
                    <div class="group">
                        <label>Комнат</label>
                        <div class="chips">
                            <button :class="['chip', { active: filters.rooms === null }]"
                                @click="filters.rooms = null">Все</button>
                            <button v-for="r in roomOptions" :key="r" :class="['chip', { active: filters.rooms === r }]"
                                @click="filters.rooms = r">{{ r }}</button>
                        </div>
                    </div>
                    <div class="group">
                        <label>Площадь, м²</label>
                        <div class="range">
                            <input type="number" v-model.number="filters.minArea" placeholder="от" />
                            <span>—</span>
                            <input type="number" v-model.number="filters.maxArea" placeholder="до" />
                        </div>
                    </div>
                    <div class="group">
                        <label>Цена</label>
                        <div class="range">
                            <input type="number" v-model.number="filters.minPrice" placeholder="от" />
                            <span>—</span>
                            <input type="number" v-model.number="filters.maxPrice" placeholder="до" />
                        </div>
                    </div>
                    <div class="group">
                        <label>Сортировка</label>
                        <select v-model="sort">
                            <option value="relevant">По релевантности</option>
                            <option value="price-asc">Цена: по возрастанию</option>
                            <option value="price-desc">Цена: по убыванию</option>
                            <option value="area-asc">Площадь: по возрастанию</option>
                            <option value="area-desc">Площадь: по убыванию</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="summary">
                Найдено {{ filteredAndSorted.length }} планировок
            </div>

            <div class="list">
                <PlanCard v-for="p in filteredAndSorted" :key="p.id" :plan="p" @consult="openConsult" />
            </div>
        </div>

        <ConsultationModal v-model="consultOpen" :buildingName="`ЖК ${buildingName}`" />
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import PlanCard, { type PlanItem } from '~/components/PlanCard.vue'
import ConsultationModal from '~/components/ConsultationModal.vue'
import Placeholder from '@/assets/logo.svg'

const route = useRoute()
// Получаем ID из маршрута
const id = route.params.id as string
// Assumption: we don't have a building store; using id in title for now
const buildingName = `#${id}`

const consultOpen = ref(false)
const openConsult = () => (consultOpen.value = true)

const roomOptions = [1, 2, 3, 4]

const filters = reactive({
    rooms: null as number | null,
    minArea: null as number | null,
    maxArea: null as number | null,
    minPrice: null as number | null,
    maxPrice: null as number | null,
})

// Apply initial filters from query (?rooms=1&house=...)
const qpRooms = route.query.rooms
if (typeof qpRooms === 'string') {
    const n = Number(qpRooms)
    if (!Number.isNaN(n)) filters.rooms = n
}

const sort = ref<'relevant' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'>('relevant')

// Mock plans
const allPlans = ref<PlanItem[]>([
    { id: 1, title: '1 комната • 32,2 м²', rooms: '1-комн.', area: 32.2, price: '6 297 418 ₽ — 6 591 340 ₽', priceRange: '6 297 418 — 6 591 340 ₽', pricePpm: '195 571 ₽', kitchenArea: 14.2, floorsText: '2, 11, 15, 19, 24', delivery: '2 кв. 2028', floor: 2, house: 'Корпус 6-7', image: Placeholder, offersCount: 5 },
    { id: 2, title: '1 комната • 33,5 м²', rooms: '1-комн.', area: 33.5, price: '6 431 609 ₽ — 6 851 286 ₽', priceRange: '6 431 609 — 6 851 286 ₽', pricePpm: '195 192 ₽', kitchenArea: 10.2, floorsText: '2, 4, 8, 12, 13, 15, 19, 24', delivery: '2 кв. 2028', floor: 2, house: 'Корпус 6-7', image: Placeholder, offersCount: 9 },
    { id: 3, title: 'Студия • 28 м²', rooms: 'Студия', area: 28, price: '5 200 000 ₽ — 5 600 000 ₽', priceRange: '5 200 000 — 5 600 000 ₽', pricePpm: '180 000 ₽', kitchenArea: 8.2, floorsText: '3—17', delivery: '4 кв. 2027', floor: 3, house: 'Корпус 3', image: Placeholder, offersCount: 7 },
])

// Helpers to parse numeric price from string like '1 040 000 000 сум'
const getPriceNum = (price: string) => Number(price.replace(/[^0-9]/g, ''))

const filteredAndSorted = computed(() => {
    let data = allPlans.value.filter(p => {
        const rOk = filters.rooms == null
            ? true
            : (typeof filters.rooms === 'number' ? p.rooms.startsWith(String(filters.rooms)) : true)
        const aMinOk = filters.minArea == null || p.area >= filters.minArea
        const aMaxOk = filters.maxArea == null || p.area <= filters.maxArea
        const pMinOk = filters.minPrice == null || getPriceNum(p.price) >= filters.minPrice
        const pMaxOk = filters.maxPrice == null || getPriceNum(p.price) <= filters.maxPrice
        return rOk && aMinOk && aMaxOk && pMinOk && pMaxOk
    })

    switch (sort.value) {
        case 'price-asc':
            data = data.slice().sort((a, b) => getPriceNum(a.price) - getPriceNum(b.price))
            break
        case 'price-desc':
            data = data.slice().sort((a, b) => getPriceNum(b.price) - getPriceNum(a.price))
            break
        case 'area-asc':
            data = data.slice().sort((a, b) => a.area - b.area)
            break
        case 'area-desc':
            data = data.slice().sort((a, b) => b.area - a.area)
            break
    }

    return data
})
</script>

<style scoped>
.plans-page { background: #f6f8ff; min-height: 100%; padding: 16px 0 40px; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }

.header { display: flex; align-items: center; gap: 16px; margin: 8px 0 16px; }

.header h1 { font-size: 26px; font-weight: 900; margin: 0; letter-spacing: .2px; }

.back { color: #3b82f6; text-decoration: none; font-weight: 800; border-radius: 10px; padding: 6px 8px; }
.back:hover { background: rgba(59,130,246,.08); }
.back:focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; }

.filters { position: sticky; top: 68px; z-index: 5; background: rgba(255,255,255,.9); backdrop-filter: saturate(140%) blur(4px); border: 1px solid #e8ecfa; border-radius: 16px; padding: 12px; box-shadow: 0 8px 32px rgba(60,100,200,.08), 0 1.5px 6px rgba(60,100,200,.04); margin-bottom: 12px; }

.row { display: grid; grid-template-columns: 1.1fr 1.1fr 1.1fr 1fr; gap: 12px; }

.group { display: flex; flex-direction: column; gap: 6px; }

.group label { font-size: 12px; color: #7a8bb7; font-weight: 900; letter-spacing: .2px; }

.chips { display: flex; flex-wrap: wrap; gap: 8px; }

.chip { padding: 8px 12px; border-radius: 12px; border: 1px solid #d8def0; background: #fff; cursor: pointer; font-weight: 800; transition: all .2s ease; }
.chip:hover { border-color: #bfd2ff; background: #f6f9ff; }

.chip.active { background: #3b82f6; color: #fff; border-color: transparent; box-shadow: 0 0 0 2px rgba(59,130,246,.12) inset; }

.range { display: flex; align-items: center; gap: 8px; }

input[type="number"] { width: 100%; border: 1px solid #d8def0; border-radius: 12px; padding: 10px 12px; background: #fff; transition: border-color .2s ease, box-shadow .2s ease; }
input[type="number"]:hover { border-color: #bfd2ff; }
input[type="number"]:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.12); }

select { width: 100%; border: 1px solid #d8def0; border-radius: 12px; padding: 10px 12px; background: #fff; transition: border-color .2s ease, box-shadow .2s ease; }
select:hover { border-color: #bfd2ff; }
select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.12); }

.summary { color: #7a8bb7; margin: 10px 0 14px; font-weight: 800; }

.list { display: flex; flex-direction: column; gap: 12px; }

@media (max-width: 1100px) { .row { grid-template-columns: 1fr 1fr; } .list { gap: 10px; } }

@media (max-width: 760px) { .row { grid-template-columns: 1fr; } .list { gap: 10px; } }

@media (max-width: 520px) { .list { gap: 10px; } }
</style>
