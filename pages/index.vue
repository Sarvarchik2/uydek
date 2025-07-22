<template>
  <div class="container" @click="closeAllDropdowns">
    <div class="uydek-main">
      <div class="uydek-main-header">
        <h1>НЕДВИЖИМОСТЬ В ТАШКЕНТЕ</h1>
        <img src="@/assets/first_page_line.svg" alt="uydek_Line" />
      </div>
      <div class="filter-bar">
        <div class="filter-item dropdown-container" @click.stop>
          <button class="filter-button dropdown" @click="toggleDropdown('propertyType')">
            {{ selectedPropertyType }}
            <img src="@/assets/icons/down.svg" alt="down" />
          </button>
          <div v-if="dropdowns.propertyType" class="filter-dropdown-menu">
            <a href="#" @click.prevent="selectPropertyType('Новостройки')">Новостройки</a>
            <a href="#" @click.prevent="selectPropertyType('Вторичка')">Вторичка</a>
          </div>
        </div>
        <div class="filter-item room-selector">
          <button class="room-button" :class="{ active: selectedRooms === 'studio' }" @click="selectRoom('studio')">Студия</button>
          <button class="room-button" :class="{ active: selectedRooms === '1' }" @click="selectRoom('1')">1</button>
          <button class="room-button" :class="{ active: selectedRooms === '2' }" @click="selectRoom('2')">2</button>
          <button class="room-button" :class="{ active: selectedRooms === '3' }" @click="selectRoom('3')">3</button>
          <button class="room-button" :class="{ active: selectedRooms === '+4' }" @click="selectRoom('+4')">+4</button>
        </div>
        <div class="filter-item">
          <div class="price-input-wrapper">
            <span>Цена:</span>
            <input type="text" :value="price" @input="formatPrice" placeholder="0" />
          </div>
        </div>
        <div class="filter-item">
          <button class="filter-button on-map">
            <span class="hide-on-tablet">На карте</span>
            <img src="@/assets/icons/onmap.svg" alt="map icon" />
          </button>
        </div>
        <div class="filter-item">
          <button class="show-button">
            <span class="hide-on-tablet">Показать</span>
            <img src="@/assets/icons/search_building.svg" alt="building icon" />
          </button>
        </div>
      </div>
      <!-- Секция карточек -->
      <div class="uydek-cards-section">
        <div class="uydek-cards-row">
          <div class="uydek-cards-col">
            <h2>Часто ищут</h2>
            <div class="uydek-cards-grid">
              <div class="uydek-card">
                <img src="@/assets/index/new_building.svg" alt="Новостройки" />
                <div class="uydek-card-content">
                  <div class="uydek-card-title">Новостройки</div>
                  <div class="uydek-card-count">2.356</div>
                </div>
                <div class="uydek-card-soon">Скоро</div>
              </div>
              <div class="uydek-card">
                <img src="@/assets/index/buy.svg" alt="Купить" />
                <div class="uydek-card-content">
                  <div class="uydek-card-title">Купить</div>
                  <div class="uydek-card-count">2.356</div>
                </div>
                <div class="uydek-card-soon">Скоро</div>
              </div>
              <NuxtLink to="/rent" class="uydek-card">
                <img src="@/assets/index/can_rent.svg" alt="Снять" />
                <div class="uydek-card-content">
                  <div class="uydek-card-title">Снять</div>
                  <div class="uydek-card-count">2.356</div>
                </div>
                
              </NuxtLink>
            </div>
          </div>
          <div class="uydek-cards-col">
            <h2>Про дом</h2>
            <div class="uydek-cards-grid">
              <div class="uydek-card">
                <img src="@/assets/index/cost.svg" alt="Оценим квартиру" />
                <div class="uydek-card-content">
                  <div class="uydek-card-title">Оценим квартиру</div>
                  <div class="uydek-card-count">2.356</div>
                </div>
                <div class="uydek-card-soon">Скоро</div>

              </div>
            </div>
          </div>
        </div>
        <div class="uydek-cards-row">
          <div class="uydek-cards-col">
            <h2>Сервисы под ключ</h2>
            <div class="uydek-cards-grid">
              <div class="uydek-card uydek-card-50">
                <img src="@/assets/index/chose_flat.svg" alt="Подберем квартиру" />
                <div class="uydek-card-content">
                  <div class="uydek-card-title">Подберем квартиру</div>
                  <div class="uydek-card-count">2.356</div>
                </div>
                <div class="uydek-card-soon">Скоро</div>

              </div>
              <div class="uydek-card uydek-card-50">
                <img src="@/assets/index/rent.svg" alt="Поможем сдать" />
                <div class="uydek-card-content">
                  <div class="uydek-card-title">Поможем сдать</div>
                  <div class="uydek-card-count">2.356</div>
                </div>
                <div class="uydek-card-soon">Скоро</div>

              </div>
            </div>
          </div>
          <div class="uydek-cards-col">
            <h2>Партнер</h2>
            <div class="uydek-cards-grid">
              <div class="uydek-card">
                <img src="@/assets/index/plane.svg" alt="Квартиры от самолет" />
                <div class="uydek-card-content">
                  <div class="uydek-card-title">Квартиры от самолет</div>
                  <div class="uydek-card-count">2.356</div>
                </div>
                <div class="uydek-card-soon">Скоро</div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-catalog-block">
        <div class="catalog-section">
          <div class="catalog-section-header">
            <span class="catalog-section-title">Купить квартиру</span>
            <span class="catalog-section-arrow">&rarr;</span>
          </div>
          <div class="catalog-cards-grid">
            <div v-for="(card, idx) in buyCards" :key="'buy'+idx" class="catalog-card">
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
                <button class="catalog-like-btn" :class="{ active: card.liked }" @click="toggleLike('buy', idx)">
                  <svg width="22" height="22" viewBox="0 0 24 24"><path :fill="card.liked ? '#3b82f6' : '#bbb'" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
              </div>
              <div class="catalog-card-price">От 10.500.000 UZS</div>
              <div class="catalog-card-location">Tashkent City</div>
            </div>
          </div>
        </div>
        <div class="catalog-section">
          <div class="catalog-section-header">
            <span class="catalog-section-title">Снять квартиру</span>
            <span class="catalog-section-arrow">&rarr;</span>
          </div>
          <div class="catalog-cards-grid">
            <div v-for="(card, idx) in rentCards" :key="'rent'+idx" class="catalog-card">
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
                <button class="catalog-like-btn" :class="{ active: card.liked }" @click="toggleLike('rent', idx)">
                  <svg width="22" height="22" viewBox="0 0 24 24"><path :fill="card.liked ? '#3b82f6' : '#bbb'" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
              </div>
              <div class="catalog-card-price">От 10.500.000 UZS</div>
              <div class="catalog-card-location">Tashkent City</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// --- Room Selector ---
const selectedRooms = ref('1');
const selectRoom = (rooms: string) => {
  selectedRooms.value = rooms;
};

// --- Property Type Dropdown ---
const selectedPropertyType = ref('Новостройки');
const dropdowns = reactive({
  propertyType: false,
});
const toggleDropdown = (d: keyof typeof dropdowns) => {
  dropdowns[d] = !dropdowns[d];
};
const selectPropertyType = (type: string) => {
  selectedPropertyType.value = type;
  dropdowns.propertyType = false;
};
const closeAllDropdowns = () => {
  dropdowns.propertyType = false;
}

// --- Price Input ---
const price = ref('');
const formatPrice = (event: Event) => {
  const target = event.target as HTMLInputElement;
  // Allow only numbers and remove formatting for logic
  let value = target.value.replace(/\D/g, '');
  // Format with spaces for display
  price.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const buyCards = ref([
  { images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    ], liked: false }
])
const rentCards = ref([
  { images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80',
    ], liked: false },
  { images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    ], liked: false }
])
function toggleLike(type: 'buy' | 'rent', idx: number) {
  if (type === 'buy') buyCards.value[idx].liked = !buyCards.value[idx].liked
  else rentCards.value[idx].liked = !rentCards.value[idx].liked
}
</script>

<style scoped>
@import url('./index.css');
</style>