<template>
    <div class="gallery-page">
        <div class="container">
            <div class="head">
                <NuxtLink :to="`/buildings/${id}`" class="back">← К ЖК</NuxtLink>
                <h1>Галерея — ЖК {{ buildingName }}</h1>
            </div>
            <div class="tabs">
                <button class="tab is-active">Все</button>
                <button class="tab">Обзор</button>
                <button class="tab">Внутренний двор</button>
                <button class="tab">Холл</button>
                <button class="tab">Лифт</button>
                <button class="tab">Особенности</button>
            </div>
            <div class="grid">
                <img v-for="(url, i) in images" :key="i" :src="url" :alt="`Фото ${i + 1}`" @click="open(i)" />
            </div>
        </div>

        <GalleryLightbox v-if="lightboxOpen" :images="images" :start-index="startIndex" @close="lightboxOpen = false" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import GalleryLightbox from '@/components/GalleryLightbox.vue'

const route = useRoute()
const id = route.params.id as string
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
.gallery-page {
    background: #0b1220;
    min-height: 100%;
    padding: 16px 0 40px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
}

.head {
    color: #fff;
    display: flex;
    align-items: center;
    gap: 16px;
}

.head h1 {
    font-size: 22px;
    font-weight: 900;
    margin: 10px 0;
}

.back {
    color: #93c5fd;
    text-decoration: none;
    font-weight: 800;
}

.tabs {
    display: flex;
    gap: 12px;
    margin: 6px 0 16px;
}

.tab {
    background: #1f2937;
    color: #cbd5e1;
    border: 1px solid #374151;
    border-radius: 999px;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: 800;
}

.tab.is-active {
    background: #111827;
    color: #fff;
    border-color: #6b7280;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.grid img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;
}

@media (max-width: 900px) {
    .grid {
        grid-template-columns: repeat(2, 1fr)
    }
}

@media (max-width: 600px) {
    .grid {
        grid-template-columns: 1fr
    }

    .grid img {
        height: 200px
    }
}
</style>
