<template>
    <div class="lightbox" @click.self="$emit('close')">
        <button class="close" @click="$emit('close')">✕</button>
        <button class="nav prev" @click.stop="prev">‹</button>
        <img :src="images[index]" :alt="`Фото ${index + 1}`" />
        <button class="nav next" @click.stop="next">›</button>
        <div class="count">{{ index + 1 }} / {{ images.length }}</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
const props = defineProps<{ images: string[]; startIndex?: number }>()
const emit = defineEmits<{ (e: 'close'): void }>()
const index = ref(props.startIndex ?? 0)
watch(() => props.startIndex, v => { if (typeof v === 'number') index.value = v })
function prev() { index.value = (index.value - 1 + props.images.length) % props.images.length }
function next() { index.value = (index.value + 1) % props.images.length }
onMounted(() => {
    const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') emit('close')
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
})
</script>

<style scoped>
.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, .9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

img {
    max-width: 86vw;
    max-height: 86vh;
    border-radius: 12px;
    box-shadow: 0 20px 80px rgba(0, 0, 0, .4);
}

.close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #111827;
    color: #fff;
    border: 1px solid #374151;
    cursor: pointer;
    font-size: 18px;
}

.nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #111827;
    color: #fff;
    border: 1px solid #374151;
    cursor: pointer;
    font-size: 22px;
}

.prev {
    left: 20px;
}

.next {
    right: 20px;
}

.count {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #cbd5e1;
    font-weight: 800;
}
</style>
