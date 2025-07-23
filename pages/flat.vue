<template>
  <div class="container">
    <div class="flat-detail-card">
      <div class="flat-detail-img-wrap">
        <Swiper
          :slides-per-view="1"
          :pagination="{ type: 'progressbar' }"
          :modules="modules"
          class="flat-detail-swiper"
        >
          <SwiperSlide v-for="(img, idx) in images" :key="idx">
            <img class="flat-detail-img" :src="img" alt="Квартира" />
          </SwiperSlide>
          <template #pagination></template>
        </Swiper>
      </div>
      <div class="flat-detail-info">
        <div class="flat-detail-header-row">
          <div class="flat-detail-title">Fully Furnished Studio Apartment</div>
          <div class="flat-detail-price-block">
            <div class="flat-detail-price-label">Цена</div>
            <div class="flat-detail-price">600$</div>
          </div>
        </div>
        <div class="flat-detail-location">Мирабадский район</div>
        <div class="flat-detail-params">
          <span>2 guests</span>
          <span class="flat-detail-dot">|</span>
          <span>1 bathroom</span>
          <span class="flat-detail-dot">|</span>
          <span>2 bedroom</span>
        </div>
        <div class="flat-detail-desc">
          Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
        </div>
        <div class="flat-detail-realtor-row">
          <img class="flat-detail-realtor-avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Риэлтор" />
          <div class="flat-detail-realtor-info">
            <div class="flat-detail-realtor-name">Ахмед Снюс Закидович</div>
            <div class="flat-detail-realtor-role">Собственник <span class="flat-detail-realtor-badge">🏢</span></div>
          </div>
          <div class="flat-detail-rating">
            <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">☆</span>
            <span class="flat-detail-rating-value">4.5 +</span>
          </div>
        </div>
        <div class="flat-detail-actions">
          <button class="flat-detail-btn main">Забронировать</button>
          <button class="flat-detail-btn outline">Связаться</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
const modules = [Pagination]
const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'
]
</script>

<style >
@import './flat.css';
</style> 