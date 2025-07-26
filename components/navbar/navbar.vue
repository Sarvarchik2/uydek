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
        <div class="mobile-menu-logo">
          <img src="@/assets/logo.svg" alt="logo" />
        </div>
        <div class="mobile-menu-close" @click="toggleMobileMenu">
          <span>&times;</span>
        </div>
      </div>
      <div class="mobile-menu-content">
        <NuxtLink to="/" class="mobile-menu-btn mobile-menu-btn-rent" @click="toggleMobileMenu">
          Аренда
        </NuxtLink>
        <NuxtLink to="/" class="mobile-menu-btn mobile-menu-btn-sale" @click="toggleMobileMenu">
          Продажа
        </NuxtLink>
        <NuxtLink to="/chat" class="mobile-menu-btn mobile-menu-btn-link" @click="toggleMobileMenu">
          Сообщения
        </NuxtLink>
        <NuxtLink v-if="isAdminPage" to="/profile" class="mobile-menu-btn mobile-menu-btn-link" @click="toggleMobileMenu">
          Профиль
        </NuxtLink>
        <NuxtLink v-if="isAdminPage" to="/favorite" class="mobile-menu-btn mobile-menu-btn-link" @click="toggleMobileMenu">
          Избранное
        </NuxtLink>
        <NuxtLink v-if="isAdminPage" to="/reviews" class="mobile-menu-btn mobile-menu-btn-link" @click="toggleMobileMenu">
          Отзывы
        </NuxtLink>
        <NuxtLink v-if="isAdminPage" to="/booking" class="mobile-menu-btn mobile-menu-btn-link" @click="toggleMobileMenu">
          Бронирование
        </NuxtLink>
      </div>
      <!-- <div class="mobile-menu-footer">
        <NuxtLink to="/chat" class="mobile-menu-btn mobile-menu-btn-link" @click="toggleMobileMenu">
          Сообщения
        </NuxtLink>
        <NuxtLink v-if="isAdminPage" to="/profile" class="mobile-menu-btn mobile-menu-btn-link" @click="toggleMobileMenu">
          Профиль
        </NuxtLink>
        <NuxtLink v-if="isAdminPage" to="/favorite" class="mobile-menu-btn mobile-menu-btn-link" @click="toggleMobileMenu">
          Избранное
        </NuxtLink>
        <NuxtLink v-if="isAdminPage" to="/reviews" class="mobile-menu-btn mobile-menu-btn-link" @click="toggleMobileMenu">
          Отзывы
        </NuxtLink>
        <NuxtLink v-if="isAdminPage" to="/booking" class="mobile-menu-btn mobile-menu-btn-link" @click="toggleMobileMenu">
          Бронирование
        </NuxtLink>
        <div class="mobile-language">
          <span>Язык</span>
          <div>
            <a href="#">Русский</a>
            <a href="#">English</a>
            <a href="#">O'zbekcha</a>
          </div>
        </div>
      </div> -->
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
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  } else {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = '';
    }
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
  if (typeof window !== 'undefined') {
    document.body.style.overflow = '';
  }
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
  color: #000;
  text-decoration: none;
}
.admin-link img {
  width: 22px;
  height: 22px;
}
</style>