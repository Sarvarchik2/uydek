<script setup>
import { ref } from 'vue';
import ProfileContainer from '@/components/ProfileContainer.vue';
useHead({ title: 'Бронирование | Uydek' });

const bookings = ref([
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Fully Furnished Studio Apartment',
    details: '2 guests | 1 bathroom | 2 bedroom',
    start: '16.04.2025',
    end: '21.04.2025',
  },
]);
</script>

<template>
  <div class="profile-page-wrap">
    <h1 class="profile-title container">Бронирование</h1>
    <ProfileContainer active="booking">
      <div v-if="bookings.length === 0" class="booking-empty">
        <svg width="90" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 15c8.3 3.2 16.7 3.2 25 0v30c0 13.8-8.3 26.2-25 30C28.3 71.2 20 58.8 20 45V15c8.3 3.2 16.7 3.2 25 0Z" stroke="#6287F8" stroke-width="4" fill="none"/>
        </svg>
        <h2>Забронируйте жилье</h2>
        <p>Вы еще не бронировали какое-либо жилье</p>
      </div>
      <div v-else class="booking-list">
        <div class="booking-card" v-for="booking in bookings" :key="booking.id">
          <img class="booking-img" :src="booking.img" alt="apartment" />
          <div class="booking-info">
            <div class="booking-header-row">
              <h3>{{ booking.title }}</h3>
            </div>
            <div class="booking-details">{{ booking.details }}</div>
            <div class="booking-realtor">Риелтор <span class="realtor-icon">👜</span></div>
            <div class="booking-period">
              Забронировано с <span class="date green">{{ booking.start }}</span> по <span class="date red">{{ booking.end }}</span>
            </div>
            <div class="booking-dates">
              <div><span class="label">Дата бронирования</span> <span class="date green">{{ booking.start }}</span></div>
            </div>
          </div>
          <button class="booking-btn">Посмотреть</button>
        </div>
        <hr class="booking-divider" />
      </div>
    </ProfileContainer>
  </div>
</template>

<style scoped>
.profile-title {
  font-size: 2rem;
  font-weight: 700;
}
.booking-list {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 0 30px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.booking-card {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding: 32px 0 24px 0;
  position: relative;
}
.booking-img {
  width: 260px;
  height: 170px;
  object-fit: cover;
  border-radius: 24px;
  flex-shrink: 0;
}
.booking-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.booking-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.booking-header-row h3 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}
.booking-details {
  color: #888;
  font-size: 16px;
  margin-bottom: 2px;
}
.booking-realtor {
  color: #222;
  font-size: 16px;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.realtor-icon {
  font-size: 18px;
}
.booking-period {
  color: #222;
  font-size: 16px;
  margin-bottom: 2px;
}
.booking-dates {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 8px;
}
.label {
  color: #222;
  font-size: 16px;
  margin-right: 8px;
}
.date.green {
  color: #2ecc40;
  font-weight: 500;
}
.date.red {
  color: #f43f5e;
  font-weight: 500;
}
.booking-btn {
  position: absolute;
  right: 24px;
  bottom: 32px;
  background: #6287F8;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 38px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.booking-btn:hover {
  background: #1746a2;
}
.booking-divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0 0 0 0;
}
.booking-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  color: #bdbdbd;
}
.booking-empty svg {
  margin-bottom: 18px;
}
.booking-empty h2 {
  font-size: 32px;
  font-weight: 700;
  color: #222;
  margin-bottom: 10px;
}
.booking-empty p {
  font-size: 22px;
  color: #bdbdbd;
  margin: 0;
}

/* --- Адаптив --- */
@media (max-width: 900px) {
  .profile-title {
    margin: 18px 0 16px 0;
  }
  .booking-card {
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
    padding: 18px 0 12px 0;
  }
  .booking-img {
    width: 100%;
    height: 180px;
    border-radius: 18px;
    margin-bottom: 0;
  }
  .booking-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .booking-header-row h3 {
    font-size: 18px;
  }
  .booking-details, .booking-period, .booking-realtor, .label {
    font-size: 14px;
  }
  .booking-dates {
    gap: 1px;
  }
  .booking-btn {
    position: static;
    width: 100%;
    font-size: 15px;
    padding: 10px 0;
    margin-top: 8px;
    border-radius: 14px;
  }
}
@media (max-width: 600px) {
  .profile-title {
    margin: 12px 0 10px 0;
  }
  .booking-list {
    padding: 0 2px 18px 2px;
  }
  .booking-img {
    height: 140px;
  }
  .booking-header-row h3 {
    font-size: 16px;
  }
  .booking-btn {
    font-size: 14px;
    padding: 8px 0;
  }
}
</style> 