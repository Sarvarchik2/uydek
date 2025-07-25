<template>
  <div class="profile-page-wrap">
    <h1 class="profile-title container">Избранное</h1>
    <ProfileContainer active="favorite">
      <div v-if="favorites.length === 0" class="favorite-empty">
        <svg width="120" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="120" fill="none"/>
          <path d="M30 40a10 10 0 0 1 10-10h40a10 10 0 0 1 10 10v50c0 4-4.5 6.5-8 4.2l-22-15.2-22 15.2c-3.5 2.3-8-.2-8-4.2V40Z" stroke="#6287F8" stroke-width="4" fill="none"/>
          <rect x="50" y="32" width="20" height="6" rx="3" fill="#6287F8"/>
        </svg>
        <h2>Добавьте избранное</h2>
        <p>Вы еще не добавляли в избранное какое-либо место житья</p>
      </div>
      <div v-else class="favorite-list">
        <div v-for="fav in favorites" :key="fav.id" class="favorite-card">
          <img class="favorite-img" :src="fav.img" alt="apartment" />
          <div class="favorite-info">
            <div class="favorite-title-row">
              <h3>{{ fav.title }}</h3>
              <div class="icon-btn-wrap">
                <button class="icon-btn" @click="openConfirm(fav.id)">
                  <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="13.5" stroke="#2563eb"/><path d="M14 9.5l2.09 4.24 4.66.68-3.38 3.29.8 4.65L14 18.27l-4.17 2.19.8-4.65-3.38-3.29 4.66-.68L14 9.5z" stroke="#2563eb" fill="none"/></svg>
                </button>
                <div v-if="showDropdown === fav.id">
                  <div class="dropdown-modal-overlay"></div>
                  <div class="dropdown-confirm">
                    <div class="dropdown-text">Вы точно хотите удалить из избранного?</div>
                    <div class="dropdown-actions">
                      <button class="dropdown-yes" @click="removeFavorite(fav.id)">Да</button>
                      <button class="dropdown-no" @click="showDropdown = null">Нет</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="favorite-rating-row">
              <span class="star">★</span>
              <span class="rating">4.5 +</span>
              <span class="owner">Собственник</span>
            </div>
            <div class="favorite-details">2 guests | 1 bathroom | 2 bedroom</div>
            <div class="favorite-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum...</div>
            <button class="go-btn">Перейти</button>
          </div>
        </div>
        <hr v-if="favorites.length > 1" class="favorite-divider" />
      </div>
    </ProfileContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProfileContainer from '@/components/ProfileContainer.vue';
useHead({ title: 'Избранное | Uydek' });

const favorites = ref([
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Fully Furnished Studio Apartment',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    title: 'Fully Furnished Studio Apartment',
  },
]);

const showDropdown = ref(null);

function openConfirm(id) {
  showDropdown.value = id;
}
function removeFavorite(id) {
  favorites.value = favorites.value.filter(f => f.id !== id);
  showDropdown.value = null;
}
</script>

<style scoped>
.profile-title {
  font-size: 2rem;
  font-weight: 700;
}
.favorite-list {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 0 30px 0;
  gap: 20px;
  display: flex;
  flex-direction: column;
}
.favorite-card {
  display: flex;
  align-items: flex-start;
  gap: 32px;
}
.favorite-img {
  width: 260px;
  height: 170px;
  object-fit: cover;
  border-radius: 24px;
  flex-shrink: 0;
}
.favorite-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.favorite-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.favorite-title-row h3 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}
.icon-btn-wrap {
  position: relative;
}
.icon-btn {
  background: none;
  border: 2px solid #2563eb;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  padding: 0;
}
.icon-btn:hover {
  background: #f0f4ff;
}
.dropdown-confirm {
  position: absolute;
  top: 52px;
  right: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  padding: 18px 24px 14px 24px;
  z-index: 10;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dropdown-text {
  font-size: 16px;
  color: #222;
  margin-bottom: 16px;
  text-align: center;
}
.dropdown-actions {
  display: flex;
  gap: 18px;
}
.dropdown-yes {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 7px 22px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}
.dropdown-no {
  background: #f3f4f6;
  color: #222;
  border: none;
  border-radius: 8px;
  padding: 7px 22px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}
.favorite-rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  color: #222;
  margin-bottom: 2px;
}
.star {
  color: #ffd600;
  font-size: 22px;
  margin-right: 2px;
}
.rating {
  color: #888;
  font-size: 16px;
}
.owner {
  color: #888;
  font-size: 16px;
  margin-left: 8px;
}
.favorite-details {
  color: #444;
  font-size: 16px;
  margin-bottom: 2px;
}
.favorite-desc {
  color: #888;
  font-size: 15px;
  margin-bottom: 10px;
  max-width: 600px;
}
.go-btn {
  align-self: flex-end;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 38px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.go-btn:hover {
  background: #1746a2;
}
.favorite-divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0 0 0 0;
}
.favorite-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  color: #bdbdbd;
}
.favorite-empty svg {
  margin-bottom: 18px;
}
.favorite-empty h2 {
  font-size: 32px;
  font-weight: 700;
  color: #222;
  margin-bottom: 10px;
}
.favorite-empty p {
  font-size: 22px;
  color: #bdbdbd;
  margin: 0;
}

/* --- Адаптив --- */
@media (max-width: 900px) {
    .dropdown-confirm {
    min-width: unset;
    width: 90vw;
    left: 50%;
    right: auto;
    top: 48px;
    transform: translateX(-50%);
    padding: 14px 8px 10px 8px;
  }
  .favorite-card {
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
    padding: 18px 0 12px 0;
  }
  .favorite-img {
    width: 100%;
    height: 180px;
    border-radius: 18px;
    margin-bottom: 0;
  }
  .favorite-title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .favorite-title-row h3 {
    font-size: 18px;
  }
  .icon-btn {
    width: 38px;
    height: 38px;
  }
  .favorite-rating-row {
    font-size: 15px;
  }
  .star {
    font-size: 18px;
  }
  .favorite-details, .favorite-desc {
    font-size: 14px;
  }
  .go-btn {
    width: 100%;
    font-size: 15px;
    padding: 10px 0;
    margin-top: 8px;
  }
}
@media (max-width: 600px) {
  .favorite-list {
    padding: 0 2px 18px 2px;
  }
  .favorite-img {
    height: 140px;
  }
  .favorite-title-row h3 {
    font-size: 16px;
  }
  .go-btn {
    font-size: 14px;
    padding: 8px 0;
  }
}

/* --- Адаптив для модалки --- */
.dropdown-modal-overlay {
  display: none;
}
@media (max-width: 900px) {
  .dropdown-modal-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.25);
    z-index: 1001;
  }
  .dropdown-confirm {
    position: fixed !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 92vw !important;
    min-width: unset !important;
    max-width: 400px;
    background: #fff;
    border-radius: 18px;
    z-index: 1002;
    padding: 22px 12px 16px 12px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.18);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .dropdown-text {
    font-size: 16px;
    margin-bottom: 14px;
  }
  .dropdown-actions {
    gap: 14px;
    justify-content: center;
  }
  .dropdown-yes, .dropdown-no {
    font-size: 16px;
    padding: 10px 18px;
  }
}
</style> 