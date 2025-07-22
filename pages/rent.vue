<template>
  <div class="container listings-container">
    <!-- Фильтры -->
    <div class="listings-filters">
      <div class="filter-row">
        <button class="filter-btn active">Снять</button>
        <button class="filter-btn">Купить</button>
        <button class="filter-btn">Новостройки</button>
        <button class="filter-btn">Коммерческая</button>
        <button class="filter-btn">Ипотека</button>
        <button class="filter-btn">Журнал</button>
        <button class="filter-btn">Для бизнеса</button>
        <button class="filter-btn">За рубежом</button>
      </div>
      <div class="filter-row rent-filter-row">
        <button class="rent-filter-btn rent-filter-btn-menu">
          <img src="@/assets/icons/filter_menu.svg" alt="filter" class="icon">
        </button>
     
        <div class="rent-filter-btn-wrapper">
          <button
            class="rent-filter-btn rent-filter-btn-wrapper-room"
            :class="{ active: selectedRooms.includes('Студия') }"
            @click="toggleRoom('Студия')"
          >Студия</button>
          <button
            class="rent-filter-btn room-btn"
            :class="{ active: selectedRooms.includes('1') }"
            @click="toggleRoom('1')"
          >1</button>
          <button
            class="rent-filter-btn room-btn"
            :class="{ active: selectedRooms.includes('2') }"
            @click="toggleRoom('2')"
          >2</button>
          <button
            class="rent-filter-btn room-btn"
            :class="{ active: selectedRooms.includes('3') }"
            @click="toggleRoom('3')"
          >3</button>
          <button
            class="rent-filter-btn room-btn"
            :class="{ active: selectedRooms.includes('+4') }"
            @click="toggleRoom('+4')"
          >+4</button>
        </div>
        <div class="rent-filter-price-group">
          <span class="rent-filter-label">Цена</span>
          <span class="rent-filter-price-label">От:</span>
          <input type="text" placeholder="--" class="rent-filter-price-value"/>
          <span class="rent-filter-price-label">До:</span>
          <input type="text" placeholder="--" class="rent-filter-price-value"/>
        </div>
    
        <div class="rent-filter-dropdown-building-type">
          <button class="rent-filter-btn rent-filter-btn-building-type" @click="toggleBuildingTypeDropdown">
            {{ selectedBuildingType }}
            <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left:6px;vertical-align:middle;">
              <path d="M4 6L8 10L12 6" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div v-if="isBuildingTypeDropdownOpen" class="dropdown-menu-building-type">
            <div class="dropdown-item-building-type" :class="{ selected: selectedBuildingType === 'Взнос и платеж' }" @click="selectBuildingType('Взнос и платеж')">Взнос и платеж</div>
            <div class="dropdown-item-building-type" :class="{ selected: selectedBuildingType === 'Вторичка' }" @click="selectBuildingType('Вторичка')">Вторичка</div>
          </div>
        </div>
        <button class="rent-filter-btn">
          <img src="@/assets/icons/metro.svg" alt="метро" class="icon" style="width:20px;vertical-align:middle;" />
          Метро
        </button>
      </div>
    </div>
    <!-- Контент: список + карта -->
    <div class="listings-content">
      <div class="listings-list">
        <div class="listing-card" v-for="n in 3" :key="n">
          <div class="listing-img-wrap">
            <img class="listing-img" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Квартира" />
            <span class="listing-badge">+23</span>
          </div>
          <div class="listing-info">
            <div class="listing-title">Улица Т.Шевченко 10/4</div>
            <div class="listing-meta">
              <span class="listing-city"><img src="@/assets/icons/lang.svg" style="width:14px;vertical-align:middle;"/> Ташкент</span>
              <span class="listing-dot">•</span>
              <span class="listing-time">7мин</span>
            </div>
            <div class="listing-desc">35,2 м² · 1-комнатная квартира 12 этаж из 12</div>
            <div class="listing-benefit">ВЫГОДА - Без залога · Платите арендный платёж картой любого банка, кредитной/дебетовой и получите бонусы в соответствии с условиями...</div>
            <div class="listing-actions">
              <button class="listing-btn main">Показать телефон</button>
              <button class="listing-btn">Написать в чат</button>
              <button class="listing-fav"><span>♡</span></button>
            </div>
          </div>
          <div class="listing-price">400 y.e</div>
        </div>
      </div>
      <div class="listings-map">
        <div class="map-block">
          <img src="https://static-maps.yandex.ru/1.x/?ll=69.2797,41.3111&size=250,180&z=12&l=map&pt=69.2797,41.3111,pm2rdm" alt="map" style="width:100%;border-radius:20px;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedRooms = ref(['Студия'])
const selectedBuildingType = ref('Взнос и платеж')
const isBuildingTypeDropdownOpen = ref(false)

function toggleRoom(room) {
  const idx = selectedRooms.value.indexOf(room)
  if (idx === -1) {
    selectedRooms.value.push(room)
  } else {
    selectedRooms.value.splice(idx, 1)
  }
}

function toggleBuildingTypeDropdown() {
  isBuildingTypeDropdownOpen.value = !isBuildingTypeDropdownOpen.value
}
function selectBuildingType(type) {
  selectedBuildingType.value = type
  isBuildingTypeDropdownOpen.value = false
}
</script>

<style scoped>
@import url('./rent.css');
</style> 