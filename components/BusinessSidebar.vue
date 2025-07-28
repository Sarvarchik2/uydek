<template>
  <aside class="sidebar" :class="{ open: showSidebar }">
    <nav>
      <ul>
        <NuxtLink to="/bussines/profile" :class="{ active: active === 'profile' }">
          <li>
            <svg class="sidebar-icon" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>Профиль</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/bussines/statistics" :class="{ active: active === 'statistics' }">
          <li>
            <svg class="sidebar-icon" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            <span>Статистика</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/bussines/sales" :class="{ active: active === 'sales' }">
          <li>
            <svg class="sidebar-icon" viewBox="0 0 24 24">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            <span>Продажи</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/bussines/reports" :class="{ active: active === 'reports' }">
          <li>
            <svg class="sidebar-icon" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            <span>Отчеты</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/bussines/ads" :class="{ active: active === 'ads' }">
          <li>
            <svg class="sidebar-icon" viewBox="0 0 24 24">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"/>
            </svg>
            <span>Объявления</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/bussines/booking" :class="{ active: active === 'booking' }">
          <li>
            <svg class="sidebar-icon" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>Бронирования</span>
          </li>
        </NuxtLink>
      </ul>
    </nav>
    <div class="sidebar-overlay" v-if="showSidebar" @click="showSidebar = false"></div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  active: {
    type: String,
    default: 'profile',
  },
});
const showSidebar = ref(false);
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: #fff;
  border-radius: 16px;
  padding: 32px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: left 0.3s, box-shadow 0.3s;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar li {
  display: flex;
  align-items: center;
  padding: 16px 32px;
  cursor: pointer;
  font-size: 16px;
  color: #888;
  border-left: 4px solid transparent;
  transition: background 0.2s, color 0.2s;
}
.sidebar .active li,
.sidebar li:hover {
  background: #f0f4ff;
  color: #2563eb;
  border-left: 4px solid #2563eb;
}
.sidebar-icon {
  width: 22px;
  height: 22px;
  margin-right: 16px;
  fill: #888;
  transition: fill 0.2s;
}
.sidebar .active .sidebar-icon,
.sidebar li:hover .sidebar-icon {
  fill: #2563eb;
}
.sidebar a {
  text-decoration: none;
  color: inherit;
  display: block;
}
.sidebar-overlay {
  display: none;
}
@media (max-width: 900px) {
  .sidebar {
    display: none !important;
  }
  .sidebar-overlay {
    display: none !important;
  }
}
</style> 