<template>
  <aside class="sidebar" :class="{ open: showSidebar }">
    <nav>
      <ul>
        <NuxtLink to="/profile" :class="{ active: active === 'profile' }">
          <li>
            <img src="@/assets/icons/user.svg" alt="Профиль" />
            <span>Профиль</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/favorite" :class="{ active: active === 'favorite' }">
          <li>
            <img src="@/assets/icons/heart.svg" alt="Избранное" />
            <span>Избранное</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/reviews" :class="{ active: active === 'reviews' }">
          <li>
            <img src="@/assets/icons/heart.svg" alt="Отзывы" />
            <span>Отзывы</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/booking" :class="{ active: active === 'booking' }">
          <li>
            <img src="@/assets/icons/filter_menu.svg" alt="Бронирование" />
            <span>Бронирование</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/chat" :class="{ active: active === 'chat' }">
          <li>
            <img src="@/assets/icons/user.svg" alt="Чат" />
            <span>Чат</span>
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
.sidebar img {
  width: 22px;
  height: 22px;
  margin-right: 16px;
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