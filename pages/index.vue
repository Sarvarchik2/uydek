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
            На карте
            <img src="@/assets/icons/onmap.svg" alt="map icon" />
          </button>
        </div>
        <div class="filter-item">
          <button class="show-button">
            Показать 815 новостроек
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
              </div>
              <div class="uydek-card">
                <img src="@/assets/index/buy.svg" alt="Купить" />
                <div class="uydek-card-content">
                  <div class="uydek-card-title">Купить</div>
                  <div class="uydek-card-count">2.356</div>
                </div>
              </div>
              <div class="uydek-card">
                <img src="@/assets/index/can_rent.svg" alt="Снять" />
                <div class="uydek-card-content">
                  <div class="uydek-card-title">Снять</div>
                  <div class="uydek-card-count">2.356</div>
                </div>
              </div>
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
              </div>
              <div class="uydek-card uydek-card-50">
                <img src="@/assets/index/rent.svg" alt="Поможем сдать" />
                <div class="uydek-card-content">
                  <div class="uydek-card-title">Поможем сдать</div>
                  <div class="uydek-card-count">2.356</div>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

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
</script>

<style scoped>
@import url('./index.css');
</style>