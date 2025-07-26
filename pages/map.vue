<template>
  <div class="map-page-container container">
    <!-- Фильтры -->
    <div class="listings-filters">
      <div class="filter-row">
        <button class="filter-btn" :class="{ active: activeCategory === 'Снять' }" @click="activeCategory = 'Снять'">Снять</button>
        <button class="filter-btn" :class="{ active: activeCategory === 'Купить' }" @click="activeCategory = 'Купить'">Купить</button>
        <button class="filter-btn" :class="{ active: activeCategory === 'Новостройки' }" @click="activeCategory = 'Новостройки'">Новостройки</button>
        <button class="filter-btn" :class="{ active: activeCategory === 'Коммерческая' }" @click="activeCategory = 'Коммерческая'">Коммерческая</button>
        <button class="filter-btn" :class="{ active: activeCategory === 'Ипотека' }" @click="activeCategory = 'Ипотека'">Ипотека</button>
        <button class="filter-btn" :class="{ active: activeCategory === 'Журнал' }" @click="activeCategory = 'Журнал'">Журнал</button>
        <button class="filter-btn" :class="{ active: activeCategory === 'Для бизнеса' }" @click="activeCategory = 'Для бизнеса'">Для бизнеса</button>
        <button class="filter-btn" :class="{ active: activeCategory === 'За рубежом' }" @click="activeCategory = 'За рубежом'">За рубежом</button>
      </div>
      <div class="filter-row rent-filter-row">
        <button class="rent-filter-btn rent-filter-btn-menu" @click="showFilterModal = true">
          <img src="@/assets/icons/filter_menu.svg" alt="filter" class="icon">
          Категории
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
    
    
      </div>
    </div>
    
    <!-- Карта -->
    <div class="map-container">
      <div class="map-controls-left">
        <button class="map-control-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        <button class="map-control-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        <button class="map-control-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>
      
      <div class="map-controls-right">
        <button class="map-control-btn layer-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Слой
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <!-- Карта -->
      <div class="map-content" ref="mapContainer">
        <!-- Leaflet карта будет инициализирована здесь -->
      </div>
      
      <!-- Кнопка показать объекты -->
      <div class="map-show-button">
        <button class="show-properties-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2"/>
            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2"/>
          </svg>
          Показать 815 новостроек
        </button>
      </div>
    </div>
  </div>
  
  <!-- Модальные окна -->
  <SvgModal v-model="showMetroModal">
    <svg width="300" height="120" viewBox="0 0 300 120">
      <rect x="10" y="10" width="280" height="100" rx="20" fill="#e9edf8" stroke="#3b82f6" stroke-width="4"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="#3b82f6">Карта метро</text>
    </svg>
  </SvgModal>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SvgModal from '@/components/SvgModal.vue'

const activeCategory = ref('Снять')
const selectedRooms = ref(['Студия'])
const selectedBuildingType = ref('Взнос и платеж')
const isDropdownOpen = ref(false)
const showMetroModal = ref(false)
const showFilterModal = ref(false)
const selectedProperty = ref(null)
const mapContainer = ref(null)
let map = null
let markers = []

// Координаты Ташкента
const TASHKENT_COORDS = [41.3111, 69.2797]

// Пример данных недвижимости с реальными координатами
const properties = ref([
  { 
    id: 1, 
    title: 'Улица Т.Шевченко 10/4', 
    price: '400', 
    description: '35,2 м² · 1-комнатная', 
    lat: 41.3151, 
    lng: 69.2847,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 2, 
    title: 'Проспект Навои 15/7', 
    price: '550', 
    description: '45,8 м² · 2-комнатная', 
    lat: 41.3081, 
    lng: 69.2757,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 3, 
    title: 'Улица Амира Темура 22/3', 
    price: '320', 
    description: '28,5 м² · Студия', 
    lat: 41.3141, 
    lng: 69.2897,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 4, 
    title: 'Проспект Ислама Каримова 8/12', 
    price: '680', 
    description: '52,3 м² · 3-комнатная', 
    lat: 41.3061, 
    lng: 69.2737,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 5, 
    title: 'Улица Чиланзар 5/9', 
    price: '420', 
    description: '38,7 м² · 1-комнатная', 
    lat: 41.3121, 
    lng: 69.2817,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=300&q=80'
  },
])

function toggleRoom(room) {
  const idx = selectedRooms.value.indexOf(room)
  if (idx === -1) {
    selectedRooms.value.push(room)
  } else {
    selectedRooms.value.splice(idx, 1)
  }
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function selectBuildingType(type) {
  selectedBuildingType.value = type
  isDropdownOpen.value = false
}

function selectProperty(property) {
  selectedProperty.value = selectedProperty.value === property ? null : property
}

// Инициализация карты
function initMap() {
  if (typeof window === 'undefined' || !mapContainer.value) return

  // Динамически загружаем Leaflet CSS
  if (!document.querySelector('#leaflet-css')) {
    const link = document.createElement('link')
    link.id = 'leaflet-css'
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)
  }

  // Динамически загружаем Leaflet JS
  if (typeof L === 'undefined') {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => {
      createMap()
    }
    document.head.appendChild(script)
  } else {
    createMap()
  }
}

function createMap() {
  if (!mapContainer.value || typeof L === 'undefined') return

  // Создаем карту
  map = L.map(mapContainer.value).setView(TASHKENT_COORDS, 12)

  // Добавляем слой OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)

  // Добавляем маркеры
  properties.value.forEach(property => {
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div class="marker-price">${property.price} y.e</div>`,
      iconSize: [80, 40],
      iconAnchor: [40, 20]
    })
    
    const marker = L.marker([property.lat, property.lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="map-popup">
          <div class="popup-image">
            <img src="${property.image}" alt="${property.title}" />
          </div>
          <div class="popup-content">
            <div class="popup-title">${property.title}</div>
            <div class="popup-price">${property.price} y.e</div>
            <div class="popup-desc">${property.description}</div>
          </div>
        </div>
      `)
    
    markers.push(marker)
  })
}

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
@import url('./rent.css');
.map-page-container {
  height: 85vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  overflow: hidden;
  margin-top: 30px;
}



.map-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  border: 2px solid #2563eb;
}

.map-controls-left {
  position: absolute;
  left: 16px;
  top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 20;
}

.map-controls-right {
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 20;
}

.map-control-btn {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.map-control-btn:hover {
  background: #f8fafc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.layer-btn {
  border-radius: 100px;
  width: auto;
  padding: 0 16px;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
}

.map-content {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

/* Стили для Leaflet попапов */
.map-popup {
  font-family: inherit;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.popup-image {
  width: calc(100% + 24px)!important;
  height: 140px!important;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  margin: -12px -12px 0 -12px;
  position: relative;
}

.popup-image img {
  width: 100%!important;
  height: 100%!important;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.popup-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 0 0 0;
}

.map-popup .popup-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.3;
}

.map-popup .popup-price {
  font-size: 18px;
  font-weight: 700;
  color: #3b82f6;
  margin: 0;
}

.map-popup .popup-desc {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

/* Кастомизация Leaflet попапов */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
  padding: 0 !important;
  border: none !important;
  overflow: hidden !important;
}

:deep(.leaflet-popup-content) {
  margin: 0 !important;
  font-family: inherit !important;
  min-width: 250px !important;
  max-width: 250px !important;
  overflow: hidden !important;
}

:deep(.leaflet-popup-tip) {
  background: #fff !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

:deep(.leaflet-popup-close-button) {
  color: #64748b !important;
  font-size: 20px !important;
  padding: 8px !important;
  font-weight: 300 !important;
  transition: color 0.2s !important;
  z-index: 10 !important;
}

:deep(.leaflet-popup-close-button:hover) {
  color: #1e293b !important;
}

/* Стили для кастомных маркеров */
:global(.custom-map-marker) {
  background: transparent !important;
  border: none !important;
}

:global(.marker-price) {
  background: #fff;
  color: #2563eb;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 2px solid #2563eb;
}

:global(.marker-price:hover) {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
  z-index: 1000;
}

.map-show-button {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}

.show-properties-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 100px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
}

.show-properties-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.4);
}

@media (max-width: 768px) {
  .map-filters {
    padding: 12px 16px;
  }
  
  .filter-row {
    margin-bottom: 12px;
  }
  
  .filter-btn {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  .map-filter-row {
    gap: 8px;
  }
  
  .map-filter-btn {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .map-search-input {
    min-width: 150px;
  }
  
  .search-input {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .map-controls-left,
  .map-controls-right {
    display: none;
  }
  
  .map-show-button {
    bottom: 16px;
  }
  
  .show-properties-btn {
    padding: 12px 24px;
    font-size: 14px;
  }
}
</style> 