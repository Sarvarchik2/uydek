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
    <div class="catalog-section">
      <div class="catalog-section-header">
        <span class="catalog-section-title">Похожие квартиры</span>
        <span class="catalog-section-arrow">&rarr;</span>
      </div>
      <Swiper
        :slides-per-view="1.2"
        :space-between="18"
        :breakpoints="{600: { slidesPerView: 2.2 }, 900: { slidesPerView: 3.2 }}"
        :pagination="{ clickable: true }"
        :modules="[Pagination]"
        class="flat-suggestions-swiper"
      >
        <SwiperSlide v-for="(card, idx) in rentCards" :key="'rent'+idx">
          <div class="catalog-card">
            <div class="catalog-card-img-wrap">
              <Swiper
                :slides-per-view="1"
                :pagination="{ type: 'progressbar' }"
                :modules="[Pagination]"
                class="catalog-card-swiper"
              >
                <SwiperSlide v-for="(img, i) in card.images" :key="i">
                  <img :src="img" alt="flat" class="catalog-card-img" />
                </SwiperSlide>
                <template #pagination></template>
              </Swiper>
              <button class="catalog-like-btn" :class="{ active: card.liked }" @click.stop="toggleLike('rent', idx)">
                <svg width="22" height="22" viewBox="0 0 24 24"><path :fill="card.liked ? '#3b82f6' : '#bbb'" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </button>
            </div>
            <div class="catalog-card-price">{{ card.price }}</div>
            <div class="catalog-card-location">{{ card.location }}</div>
            <!-- <div class="catalog-card-desc">{{ card.shortDesc }}</div> -->
          </div>
        </SwiperSlide>
        <template #pagination></template>
      </Swiper>
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

const rentCards = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80'
    ],
    price: 'Цена: 600$',
    location: 'Юнусабадский район',
    shortDesc: 'Светлая 2-комнатная квартира с ремонтом, рядом метро.',
    liked: false
  },
  {
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'
    ],
    price: 'Цена: 600$',
    location: 'Мирабадский район',
    shortDesc: 'Уютная студия в центре города, вся техника.',
    liked: false
  },
  {
    id: 3,
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    price: 'Цена: 600$',
    location: 'Чиланзарский район',
    shortDesc: '3-комнатная квартира для семьи, рядом парк.',
    liked: false
  },
  {
    id: 4,
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    price: 'Цена: 600$',
    location: 'Чиланзарский район',
    shortDesc: '3-комнатная квартира для семьи, рядом парк.',
    liked: false
  },
  {
    id: 5,
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    price: 'Цена: 600$',
    location: 'Чиланзарский район',
    shortDesc: '3-комнатная квартира для семьи, рядом парк.',
    liked: false
  }
]

function toggleLike(type, idx) {
  if (type === 'rent') {
    rentCards[idx].liked = !rentCards[idx].liked
  }
}
</script>

<style >
@import './flat.css';
@import './index.css';
.flat-suggestions-swiper {
  margin-top: 18px;
  padding-bottom: 32px;
}
.flat-suggestions-swiper .swiper-pagination {
  bottom: 0;
}
.catalog-section{
    margin-top: 30px;
}
.flat-suggestions-swiper .catalog-card {
  min-width: 260px;
  max-width: 340px;
  margin: 0 auto;
}
</style> 