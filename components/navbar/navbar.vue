<template>
  <div class="container navbar-container" @click.stop>
    <div class="navbar">
      <NuxtLink to="/" class="navbar-logo">
        <img src="@/assets/logo.svg" alt="logo" />
      </NuxtLink>
      <div class="navbar-search">
        <input type="text" placeholder="Поиск" />
        <img src="@/assets/icons/search.svg" alt="search" />
      </div>
      <div class="navbar-menu">
        <ul>
          <li @click="toggleDropdown('rent')">
            <span>Аренда</span>
            <img src="@/assets/icons/down.svg" alt="down" />
            <div v-if="dropdowns.rent" class="dropdown-menu">
              <a href="#">For Rent Option 1</a>
              <a href="#">For Rent Option 2</a>
            </div>
          </li>
          <li @click="toggleDropdown('sale')">
            <span>Продажа</span>
            <img src="@/assets/icons/down.svg" alt="down" />
            <div v-if="dropdowns.sale" class="dropdown-menu">
              <a href="#">For Sale Option 1</a>
              <a href="#">For Sale Option 2</a>
            </div>
          </li>
          <li>Сообщения</li>
        </ul>
      </div>
      <div class="navbar-actions">
        <div class="navbar-language" @click="toggleDropdown('lang')">
          <img src="@/assets/icons/lang.svg" alt="language" />
          <div v-if="dropdowns.lang" class="dropdown-menu">
            <a href="#">Русский</a>
            <a href="#">English</a>
            <a href="#">O'zbekcha</a>
          </div>
        </div>
        <div class="navbar-user">
          <img src="@/assets/icons/user.svg" alt="user" />
        </div>
      </div>
    </div>
    <div v-if="isMobile" class="mobile-search-row">
      <div class="mobile-search">
        <input type="text" placeholder="Поиск" />
        <img src="@/assets/icons/search.svg" alt="search" />
      </div>
      <div class="mobile-burger" @click="toggleMobileMenu">
        <div :class="['burger-line', { 'open': isMobileMenuOpen }]" />
        <div :class="['burger-line', { 'open': isMobileMenuOpen }]" />
        <div :class="['burger-line', { 'open': isMobileMenuOpen }]" />
      </div>
    </div>
    <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="toggleMobileMenu"></div>
    <div :class="['mobile-menu', { 'open': isMobileMenuOpen }]">
      <div class="mobile-menu-header">
        <span class="close-icon" @click="toggleMobileMenu">&times;</span>
      </div>
      <ul>
        <li @click="toggleMobileMenu">Аренда</li>
        <li @click="toggleMobileMenu">Продажа</li>
        <li @click="toggleMobileMenu">Сообщения</li>
        <li v-if="isAdminPage">
          <NuxtLink to="/profile" class="admin-link" @click.native="toggleMobileMenu">Профиль</NuxtLink>
        </li>
        <li v-if="isAdminPage">
          <NuxtLink to="/favorite" class="admin-link" @click.native="toggleMobileMenu">Избранное</NuxtLink>
        </li>
        <li v-if="isAdminPage">
          <NuxtLink to="/reviews" class="admin-link" @click.native="toggleMobileMenu">Отзывы</NuxtLink>
        </li>
        <li v-if="isAdminPage">
          <NuxtLink to="/booking" class="admin-link" @click.native="toggleMobileMenu">Бронирование</NuxtLink>
        </li>
        <li>
          <div class="mobile-language">
            <span>Язык</span>
            <div>
              <a href="#">Русский</a>
              <a href="#">English</a>
              <a href="#">O'zbekcha</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';

const isMobileMenuOpen = ref(false);
const isMobile = ref(false);

const dropdowns = reactive({
  rent: false,
  sale: false,
  lang: false,
});

const toggleDropdown = (menu: keyof typeof dropdowns) => {
  const currentState = dropdowns[menu];
  closeAllDropdowns();
  dropdowns[menu] = !currentState;
};

const closeAllDropdowns = () => {
  for (const key in dropdowns) {
    dropdowns[key as keyof typeof dropdowns] = false;
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if(isMobileMenuOpen.value) {
    closeAllDropdowns();
  }
};

function handleResize() {
  isMobile.value = window.innerWidth <= 992;
}

onMounted(() => {
  document.addEventListener('click', closeAllDropdowns);
  window.addEventListener('resize', handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeAllDropdowns);
  window.removeEventListener('resize', handleResize);
});

const route = useRoute();
const isAdminPage = computed(() => {
  return [
    '/profile',
    '/favorite',
    '/reviews',
    '/booking'
  ].some(path => route.path.startsWith(path));
});
</script>

<style>
@import "./navbar.css";
.mobile-menu-overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18);
  z-index: 19;
}
.admin-link {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  color: #000;
  text-decoration: none;
}
.admin-link img {
  width: 22px;
  height: 22px;
}
</style>