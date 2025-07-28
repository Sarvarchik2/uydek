<template>
  <div class="ads-page-wrap">
    <h1 class="ads-title container">Личный кабинет</h1>
    <BusinessContainer active="ads">
      <div class="ads-main">
        <!-- Форма добавления/редактирования -->
        <div class="ads-form-block">
          <div class="ads-tabs">
            <button :class="['ads-tab', {active: activeTab === 'add'}]" @click="activeTab = 'add'">Добавить</button>
            <button :class="['ads-tab', {active: activeTab === 'edit'}]" @click="activeTab = 'edit'">Редактировать</button>
          </div>
          <div v-if="activeTab === 'add'" class="ads-form-content">
            <div class="ads-upload-block">
              <div class="ads-upload-area">
                <span>Перетащите файл в данное поле или загрузите файл</span>
                <button class="upload-btn">Загрузить файл</button>
              </div>
            </div>
            <form class="ads-form-fields">
              <div class="form-group">
                <label>Название жилья</label>
                <input type="text" placeholder="Modera House" />
              </div>
              <div class="form-group">
                <label>Район</label>
                <select>
                  <option>Мирабадский</option>
                  <option>Юнусабадский</option>
                  <option>Чиланзарский</option>
                </select>
              </div>
              <div class="form-group">
                <label>Количество комнат</label>
                <input type="text" placeholder="1 гостиная, 1 кухня, 2 спальни, 1 ванная" />
              </div>
              <div class="form-group">
                <label>Описание</label>
                <textarea placeholder="Описание"></textarea>
              </div>
              <div class="form-group">
                <label>Цена за месяц</label>
                <input type="text" placeholder="600$" />
              </div>
              <button class="publish-btn">Опубликовать</button>
            </form>
          </div>

          <div v-else class="ads-edit-list-block">
            <div v-for="ad in ads" :key="ad.id" class="ad-edit-card">
              <img class="ad-edit-img" :src="ad.img" alt="apartment" />
              <div class="ad-edit-info">
                <div class="ad-edit-header">
                  <span :class="['ad-edit-status', ad.status]">{{ ad.statusText }}</span>
                </div>
                <div class="ad-edit-title">{{ ad.title }}</div>
                <div class="ad-edit-details">{{ ad.details }}</div>
                <div class="ad-edit-desc">{{ ad.desc }}</div>
                <div class="ad-edit-bottom">
                  <div class="ad-edit-price">{{ ad.price }}</div>
                  <div class="ad-edit-actions">
                    <button class="edit-btn">Редактировать</button>
                    <button class="delete-btn"><span class="delete-icon">🗑️</span>Удалить</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </BusinessContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BusinessContainer from '@/components/BusinessContainer.vue';
useHead({ title: 'Объявления | Uydek' });
const activeTab = ref('add');

const ads = ref([
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    statusText: 'Активно',
    title: 'Fully Furnished Studio Apartment',
    details: '2 guests | 1 bathroom | 2 bedroom',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum...',
    price: '500-800$ в месяц',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    status: 'paused',
    statusText: 'Приостановлено',
    title: 'Fully Furnished Studio Apartment',
    details: '2 guests | 1 bathroom | 2 bedroom',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum...',
    price: '500-800$ в месяц',
  }
]);
</script>

<style scoped>
.ads-page-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.ads-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;
}
.ads-main {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.ads-form-block {
  border-radius: 24px;
  margin-bottom: 12px;
}
.ads-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 32px;
  width: max-content;
  border: 1px solid #e5e7eb;
  border-radius: 32px;
  overflow: hidden;
}
.ads-tab {
  padding: 16px 64px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  background: transparent;
  color: #2563eb;
  border-radius: 32px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.ads-tab.active {
  background: #2563eb;
  color: #fff;
}
.ads-form-content {
  display: flex;
  gap: 48px;
}
.ads-upload-block {
  flex: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ads-upload-area {
  width: 100%;
  height: 100%;
  background: #f9fafb;
  border: 2.5px dashed #d1d5db;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  font-size: 18px;
  color: #888;
  box-shadow: 0 2px 12px rgba(37,99,235,0.04);
}
.upload-btn {
  background: #fff;
  color: #2563eb;
  border: 2px solid #2563eb;
  border-radius: 12px;
  padding: 14px 36px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.upload-btn:hover {
  background: #2563eb;
  color: #fff;
}
.ads-form-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group label {
  font-size: 16px;
  color: #222;
  font-weight: 600;
}
.form-group input,
.form-group select,
.form-group textarea {
  padding: 16px 20px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  background: #f9fafb;
  outline: none;
  transition: border 0.2s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border: 2px solid #2563eb;
}
.publish-btn {
  margin-top: 18px;
  padding: 16px 48px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.publish-btn:hover {
  background: #1746a2;
}
.ads-list-block {
  margin-top: 32px;
}
.ads-list-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 24px;
}
.ads-list {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}
.ad-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(37,99,235,0.08);
  border: 1.5px solid #e5e7eb;
  display: flex;
  flex-direction: row;
  width: 410px;
  min-height: 200px;
  overflow: hidden;
  transition: box-shadow 0.2s, border 0.2s;
}
.ad-card:hover {
  box-shadow: 0 8px 32px rgba(37,99,235,0.13);
  border: 1.5px solid #2563eb;
}
.ad-img {
  width: 160px;
  height: 100%;
  object-fit: cover;
  border-radius: 20px 0 0 20px;
}
.ad-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 20px 16px 20px;
  gap: 6px;
}
.ad-status,
.ad-edit-status {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  margin-bottom: 4px;
  margin-top: 2px;
  color: #fff;
}
.ad-status.active, .ad-edit-status.active {
  background: linear-gradient(90deg, #22c55e 60%, #4ade80 100%);
}
.ad-status.rejected, .ad-edit-status.rejected {
  background: linear-gradient(90deg, #ef4444 60%, #f87171 100%);
}
.ad-status.paused, .ad-edit-status.paused {
  background: linear-gradient(90deg, #fbbf24 60%, #fde68a 100%);
  color: #b45309;
}
.ad-title {
  font-size: 19px;
  font-weight: 800;
  margin-bottom: 4px;
  color: #222;
}
.ad-details {
  font-size: 15px;
  color: #666;
  margin-bottom: 2px;
}
.ad-desc {
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ad-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.ad-price {
  font-size: 18px;
  font-weight: 700;
  color: #2563eb;
}
.ad-distance {
  font-size: 14px;
  color: #888;
}
.ads-edit-list-block {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
}
.ad-edit-card {
  display: flex;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(37,99,235,0.08);
  border: 1.5px solid #e5e7eb;
  overflow: hidden;
  padding: 0;
  min-height: 220px;
  align-items: stretch;
}
.ad-edit-img {
  width: 260px;
  height: 241px;
  object-fit: cover;
  border-radius: 32px 0 0 32px;
}
.ad-edit-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 32px 24px 32px;
  position: relative;
}
.ad-edit-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 8px;
}
.ad-edit-status {
  font-size: 18px;
  font-weight: 700;
  &.active { color: #4ade80; }
  &.paused { color: #ef4444; }
}
.ad-edit-title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #222;
}
.ad-edit-details {
  font-size: 16px;
  color: #666;
  margin-bottom: 6px;
}
.ad-edit-desc {
  font-size: 15px;
  color: #888;
  margin-bottom: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ad-edit-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.ad-edit-price {
  font-size: 20px;
  font-weight: 700;
  color: #2563eb;
}
.ad-edit-actions {
  display: flex;
  gap: 18px;
}
.edit-btn {
  background: #5486f7;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 14px 38px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.edit-btn:hover {
  background: #2563eb;
}
.delete-btn {
  background: #fff;
  color: #ef4444;
  border: 2px solid #ef4444;
  border-radius: 24px;
  padding: 14px 32px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s, color 0.2s;
}
.delete-btn:hover {
  background: #ef4444;
  color: #fff;
}
.delete-icon {
  font-size: 18px;
}

@media (max-width: 1100px) {
  .ads-list {
    flex-direction: column;
    gap: 24px;
  }
  .ad-card {
    width: 100%;
    min-width: 0;
  }
}
@media (max-width: 900px) {
  .ads-title {
    margin: 18px 0 16px 0;
    margin-left: 12px;
  }
  .ads-form-block {
    padding: 18px 6px 12px 6px;
  }
  .ads-form-content {
    flex-direction: column;
    gap: 24px;
  }
  .ads-upload-area {
    min-height: 140px;
    width: 100%;
    font-size: 15px;
  }
  .ads-list-block {
    margin-top: 18px;
  }
  .ads-edit-list-block {
    gap: 18px;
    margin-top: 18px;
  }
  .ad-edit-card {
    flex-direction: column;
    align-items: stretch;
    border-radius: 20px;
    min-height: unset;
  }
  .ad-edit-img {
    width: 100%;
    height: 180px;
    border-radius: 20px 20px 0 0;
    object-fit: cover;
  }
  .ad-edit-info {
    padding: 18px 14px 14px 14px;
  }
  .ad-edit-title {
    font-size: 18px;
  }
  .ad-edit-details {
    font-size: 14px;
  }
  .ad-edit-desc {
    font-size: 13px;
    margin-bottom: 10px;
  }
  .ad-edit-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .ad-edit-price {
    font-size: 16px;
  }
  .ad-edit-actions {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  .edit-btn, .delete-btn {
    width: 100%;
    padding: 12px 0;
    font-size: 15px;
    border-radius: 16px;
  }
}
@media (max-width: 769px) {
    .ads-tabs{
        width: 100%;
        justify-content: space-between;
    }
    .ad-card{
        flex-direction: column;
    }
    .ad-img{
        width: 100%;
        height: 200px;
    }
    .delete-btn{
        text-align: center;
        display: flex;
    align-items: center;
    justify-content: center;
    }
    .ads-tab{
        padding: 20px;
        width: 50%;
    }
    .ads-upload-area{
        min-height: 160px;
    }
    .ad-edit-info{
        padding: 15px;
    }

}
@media (max-width: 600px) {
  .ads-title {
    margin-left: 6px;
  }
  .ads-form-block {
    padding: 8px 2px 8px 2px;
  }
  .ads-form-content {
    gap: 8px;
  }
  .ads-upload-area {
    font-size: 13px;
    width: 100%;
  }
  .ads-list-title {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  .ad-title {
    font-size: 15px;
  }
  .ad-details {
    font-size: 12px;
  }
  .ad-desc {
    font-size: 11px;
  }
  .ad-price {
    font-size: 14px;
  }
  .ad-edit-title {
    font-size: 15px;
  }
  .ad-edit-details {
    font-size: 12px;
  }
  .ad-edit-desc {
    font-size: 11px;
  }
  .ad-edit-price {
    font-size: 14px;
  }
}
</style> 