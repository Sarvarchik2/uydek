<template>
  <div>
    <Navbar />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Manrope:wght@200..800&display=swap');

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #F8F8F8;
}
*{
  box-sizing: border-box;
}
.catalog-card-swiper{
  border-radius: 18px;
  height: 190px;
}
.listing-swiper .swiper-pagination-progressbar {
  position: absolute !important;
  left: 0;
  right: 0;
  bottom: 0 !important;
  top: auto !important;
  height: 6px;
  background: #e9edf8;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  overflow: hidden;
  z-index: 3;
} 
.catalog-card-swiper .swiper-pagination-progressbar {
  position: absolute !important;
  left: 0;
  right: 0;
  bottom: 0 !important;
  top: auto !important;
  height: 6px;
  background: #e9edf8;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  overflow: hidden;
  z-index: 2;
}
.catalog-card-swiper .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: #3b82f6;
  border-radius: 6px;
  transition: width 0.3s;
}

/* Глобальные стили для Leaflet попапов */
.leaflet-popup-content-wrapper {
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
  padding: 0 !important;
  border: none !important;
  overflow: hidden !important;
  background: #fff !important;
}

.leaflet-popup-content {
  margin: 0 !important;
  font-family: inherit !important;
  padding: 12px !important;
  min-width: 280px !important;
  max-width: 280px !important;
  overflow: hidden !important;
  background: #fff !important;
  border-radius: 12px !important;
}

.leaflet-popup-tip {
  background: #fff !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.leaflet-popup-close-button {
  color: #64748b !important;
  font-size: 20px !important;
  padding: 8px !important;
  font-weight: 300 !important;
  transition: color 0.2s !important;
  z-index: 10 !important;
}

.leaflet-popup-close-button:hover {
  color: #1e293b !important;
}

:root {
  --container-padding-x: 15px;
}

.container,
.container-fluid {
  width: 100%;
  padding-right: var(--container-padding-x);
  padding-left: var(--container-padding-x);
  margin-right: auto;
  margin-left: auto;
}


@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}
</style>