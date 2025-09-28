<template>
    <section class="newb-section">
        <div class="newb-header">
            <h2>Новостройки</h2>
            <NuxtLink to="/map" class="newb-link">Все на карте →</NuxtLink>
        </div>
        <div class="newb-grid">
            <BuildingCard v-for="b in buildings" :key="b.id" :building="b" @consult="$emit('consult', $event)" />
        </div>
    </section>
</template>

<script setup lang="ts">
import BuildingCard, { type Building } from './BuildingCard.vue'
defineProps<{ buildings: Building[] }>()
defineEmits<{ (e: 'consult', id: number): void }>()
</script>

<style scoped>
.newb-section {
    margin: 16px 0 40px 0;
}

.newb-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
}

h2 {
    font-size: 20px;
    margin: 0;
    color: #3b82f6;
}

.newb-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 600;
}

.newb-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
}

@media (max-width: 1100px) {
    .newb-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 700px) {
    .newb-grid {
        grid-template-columns: 1fr;
    }
}
</style>
