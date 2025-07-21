<template>
  <div class="container navbar-container" @click.stop>
    <div class="navbar">
      <div class="navbar-logo">
        <img src="@/assets/logo.svg" alt="logo" />
      </div>
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
      <div class="burger-menu" @click="toggleMobileMenu">
        <div :class="['burger-line', { 'open': isMobileMenuOpen }]"></div>
        <div :class="['burger-line', { 'open': isMobileMenuOpen }]"></div>
        <div :class="['burger-line', { 'open': isMobileMenuOpen }]"></div>
      </div>
    </div>
    <div :class="['mobile-menu', { 'open': isMobileMenuOpen }]">
      <div class="mobile-menu-header">
        <span class="close-icon" @click="toggleMobileMenu">&times;</span>
      </div>
      <ul>
        <li>Аренда</li>
        <li>Продажа</li>
        <li>Сообщения</li>
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
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';

const isMobileMenuOpen = ref(false);

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

onMounted(() => {
  document.addEventListener('click', closeAllDropdowns);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeAllDropdowns);
});
</script>

<style>
@import "./navbar.css";
</style>