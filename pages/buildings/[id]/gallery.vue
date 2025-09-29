<template>
    <div class="gallery-page">
        <div class="container">
            <div class="head">
                <NuxtLink :to="`/buildings/${id}`" class="back">← К ЖК</NuxtLink>
                <h1>Галерея — ЖК {{ buildingName }}</h1>
            </div>
            <div class="tabs" role="tablist" aria-label="Категории галереи">
                <button class="tab is-active" role="tab" aria-selected="true">Все</button>
                <button class="tab" role="tab" aria-selected="false">Обзор</button>
                <button class="tab" role="tab" aria-selected="false">Внутренний двор</button>
                <button class="tab" role="tab" aria-selected="false">Холл</button>
                <button class="tab" role="tab" aria-selected="false">Лифт</button>
                <button class="tab" role="tab" aria-selected="false">Особенности</button>
            </div>
            <div class="grid" aria-live="polite">
                <figure v-for="(url, i) in images" :key="i" class="card" @click="open(i)" tabindex="0">
                    <img :src="url" :alt="`Фото ${i + 1}`" loading="lazy" />
                </figure>
            </div>
        </div>

        <GalleryLightbox v-if="lightboxOpen" :images="images" :start-index="startIndex" @close="lightboxOpen = false" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GalleryLightbox from '@/components/GalleryLightbox.vue'

// Получаем ID из маршрута
const id = useRoute().params.id as string
const buildingName = `#${id}`

const images = ref<string[]>([
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
])

const lightboxOpen = ref(false)
const startIndex = ref(0)
function open(idx: number) { startIndex.value = idx; lightboxOpen.value = true }
</script>

<style scoped>
.gallery-page { background: #0b1220; min-height: 100%; padding: 16px 0 40px; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }

.head { color: #fff; display: flex; align-items: center; gap: 16px; }

.head h1 { font-size: 26px; font-weight: 900; margin: 6px 0 4px; letter-spacing: .2px; }

.back { color: #93c5fd; text-decoration: none; font-weight: 800; border-radius: 10px; padding: 6px 8px; }
.back:hover { background: rgba(147,197,253,.12); }
.back:focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; border-radius: 10px; }

.tabs { display: flex; gap: 8px; margin: 8px 0 18px; flex-wrap: wrap; }

.tab { background: #172034; color: #cbd5e1; border: 1px solid #22304a; border-radius: 999px; padding: 8px 14px; cursor: pointer; font-weight: 800; transition: all .2s ease; }
.tab:hover { background: #0f172a; color: #fff; border-color: #334155; }
.tab:focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; }

.tab.is-active { background: #0f172a; color: #fff; border-color: #60a5fa; box-shadow: 0 0 0 3px rgba(96,165,250,.15) inset; }

.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 12px; }
.card { grid-column: span 4; background: #0f172a; border: 1px solid rgba(148,163,184,.12); border-radius: 14px; overflow: hidden; box-shadow: 0 8px 30px rgba(2,6,23,.35); transition: transform .25s ease, box-shadow .25s ease; }
.card:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(2,6,23,.5); }
.card img { width: 100%; height: 240px; object-fit: cover; display: block; }
.card:focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; }

/* replaced by .card styles */

@media (max-width: 1100px) { .card { grid-column: span 6; } }
@media (max-width: 720px) { .card { grid-column: span 12; } .card img { height: 200px; } }
</style>
