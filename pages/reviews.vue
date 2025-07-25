<template>
  <div class="profile-page-wrap">
    <h1 class="profile-title container">Отзывы</h1>
    <ProfileContainer active="reviews">
      <div v-if="reviews.length === 0" class="reviews-empty">
        <svg width="120" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 18c2.2 0 4.2 1.2 5.2 3.1l8.7 17.7c0.7 1.4 2 2.4 3.5 2.6l19.5 2.8c4.7 0.7 6.6 6.5 3.2 9.8l-14.1 13.7c-1.1 1.1-1.6 2.7-1.3 4.2l3.3 19.4c0.8 4.7-4.1 8.2-8.3 6l-17.4-9.1c-1.4-0.7-3-0.7-4.4 0l-17.4 9.1c-4.2 2.2-9.1-1.3-8.3-6l3.3-19.4c0.3-1.5-0.2-3.1-1.3-4.2L19.1 54c-3.4-3.3-1.5-9.1 3.2-9.8l19.5-2.8c1.5-0.2 2.8-1.2 3.5-2.6l8.7-17.7C55.8 19.2 57.8 18 60 18Z" stroke="#6287F8" stroke-width="4" fill="none"/>
        </svg>
        <h2>Оставьте отзыв</h2>
        <p>Вы еще не оставляли отзыв, после покупки, аренды оставьте отзыв.</p>
      </div>
      <div v-else class="reviews-list">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <img class="review-img" :src="review.img" alt="apartment" />
          <div class="review-info">
            <div class="review-header-row">
              <h3>{{ review.title }}</h3>
              <span class="review-date">{{ review.date }}</span>
            </div>
            <div class="review-details">{{ review.details }}</div>
            <div class="review-desc">{{ review.desc }}</div>
            <div class="review-rating-row">
              <span v-for="i in review.rating" :key="'star'+i" class="star">★</span><span v-for="i in review.maxRating - review.rating" :key="'gray'+i" class="star gray">★</span>
              <span class="review-rating">{{ review.rating }}.0</span>
            </div>
          </div>
          <button class="review-btn">Посмотреть</button>
        </div>
        <hr class="review-divider" />
      </div>
    </ProfileContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProfileContainer from '@/components/ProfileContainer.vue';
useHead({ title: 'Отзывы | Uydek' });

const reviews = ref([
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Fully Furnished Studio Apartment',
    date: '16.04.2025',
    details: '2 guests | 1 bathroom | 2 bedroom',
    desc: 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
    rating: 4,
    maxRating: 5,
  },
]);
</script>

<style scoped>
.profile-title {
  font-size: 2rem;
  font-weight: 700;
}
.reviews-list {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 0 30px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.review-card {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding: 32px 0 24px 0;
  position: relative;
}
.review-img {
  width: 260px;
  height: 170px;
  object-fit: cover;
  border-radius: 24px;
  flex-shrink: 0;
}
.review-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.review-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.review-header-row h3 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}
.review-date {
  color: #888;
  font-size: 18px;
  margin-top: 4px;
}
.review-details {
  color: #888;
  font-size: 16px;
  margin-bottom: 2px;
}
.review-desc {
  color: #222;
  font-size: 16px;
  margin-bottom: 10px;
  max-width: 600px;
}
.review-rating-row {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 22px;
  margin-top: 8px;
}
.star {
  color: #ffd600;
  font-size: 22px;
}
.star.gray {
  color: #ccc;
}
.review-rating {
  color: #222;
  font-size: 20px;
  font-weight: 500;
  margin-left: 12px;
}
.review-btn {
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
.review-btn:hover {
  background: #1746a2;
}
.review-divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0 0 0 0;
}
.reviews-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  color: #bdbdbd;
}
.reviews-empty svg {
  margin-bottom: 18px;
}
.reviews-empty h2 {
  font-size: 32px;
  font-weight: 700;
  color: #222;
  margin-bottom: 10px;
}
.reviews-empty p {
  font-size: 22px;
  color: #bdbdbd;
  margin: 0;
}

/* --- Адаптив --- */
@media (max-width: 900px) {
  .profile-title {
    margin: 18px 0 16px 0;
  }
  .review-card {
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
    padding: 18px 0 12px 0;
  }
  .review-img {
    width: 100%;
    height: 180px;
    border-radius: 18px;
    margin-bottom: 0;
  }
  .review-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .review-header-row h3 {
    font-size: 18px;
  }
  .review-date {
    font-size: 15px;
  }
  .review-details, .review-desc {
    font-size: 14px;
  }
  .review-rating-row {
    font-size: 18px;
  }
  .star {
    font-size: 18px;
  }
  .review-btn {
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
  .reviews-list {
    padding: 0 2px 18px 2px;
  }
  .review-img {
    height: 140px;
  }
  .review-header-row h3 {
    font-size: 16px;
  }
  .review-btn {
    font-size: 14px;
    padding: 8px 0;
  }
}
</style> 