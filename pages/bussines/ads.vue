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
                    <button class="delete-btn"><span class="delete-icon"><svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99998 2.7915C9.18457 2.7915 8.48921 3.31236 8.23151 4.04145C8.11649 4.3669 7.75941 4.53747 7.43396 4.42245C7.10851 4.30742 6.93794 3.95034 7.05296 3.62489C7.48166 2.41199 8.63836 1.5415 9.99998 1.5415C11.3616 1.5415 12.5183 2.41199 12.947 3.62489C13.062 3.95034 12.8915 4.30742 12.566 4.42245C12.2406 4.53747 11.8835 4.3669 11.7685 4.04145C11.5108 3.31236 10.8154 2.7915 9.99998 2.7915Z" fill="#FF0000"/>
<path d="M2.29163 5.49984C2.29163 5.15466 2.57145 4.87484 2.91663 4.87484H17.0834C17.4285 4.87484 17.7084 5.15466 17.7084 5.49984C17.7084 5.84502 17.4285 6.12484 17.0834 6.12484H2.91663C2.57145 6.12484 2.29163 5.84502 2.29163 5.49984Z" fill="#FF0000"/>
<path d="M4.9292 7.54159C4.90624 7.19718 4.60842 6.93659 4.26401 6.95955C3.91959 6.98251 3.659 7.28033 3.68197 7.62474L4.06817 13.4179C4.13942 14.4868 4.19697 15.3503 4.33195 16.0278C4.47228 16.7322 4.71096 17.3206 5.20396 17.7819C5.69695 18.2431 6.29991 18.4421 7.01212 18.5353C7.69715 18.6249 8.56252 18.6249 9.63384 18.6248H10.3662C11.4375 18.6249 12.3029 18.6249 12.9879 18.5353C13.7001 18.4421 14.3031 18.2431 14.7961 17.7819C15.2891 17.3206 15.5278 16.7322 15.6681 16.0278C15.8031 15.3503 15.8606 14.4868 15.9319 13.4179L16.3181 7.62474C16.341 7.28033 16.0805 6.98251 15.736 6.95955C15.3916 6.93659 15.0938 7.19718 15.0709 7.54159L14.6876 13.2909C14.6127 14.4141 14.5593 15.1956 14.4422 15.7836C14.3286 16.354 14.17 16.6559 13.9421 16.869C13.7143 17.0822 13.4025 17.2204 12.8258 17.2958C12.2313 17.3736 11.448 17.3748 10.3223 17.3748H9.67779C8.55209 17.3748 7.76875 17.3736 7.17425 17.2958C6.59758 17.2204 6.28578 17.0822 6.05794 16.869C5.83009 16.6559 5.67148 16.354 5.55786 15.7836C5.44072 15.1956 5.38736 14.4141 5.31248 13.2909L4.9292 7.54159Z" fill="#FF0000"/>
<path d="M7.85451 9.04461C8.19797 9.01026 8.50425 9.26085 8.5386 9.60431L8.95526 13.771C8.98961 14.1144 8.73902 14.4207 8.39555 14.4551C8.05209 14.4894 7.74581 14.2388 7.71147 13.8954L7.2948 9.72869C7.26045 9.38523 7.51104 9.07895 7.85451 9.04461Z" fill="#FF0000"/>
<path d="M12.7053 9.72869C12.7396 9.38523 12.489 9.07895 12.1456 9.04461C11.8021 9.01026 11.4958 9.26085 11.4615 9.60431L11.0448 13.771C11.0105 14.1144 11.261 14.4207 11.6045 14.4551C11.948 14.4894 12.2542 14.2388 12.2886 13.8954L12.7053 9.72869Z" fill="#FF0000"/>
</svg>
</span>Удалить</button>
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.delete-btn svg{
  width: 24px;
  transition: background 0.2s, color 0.2s;

  height: 24px;
}
.delete-btn:hover, .delete-btn:hover svg {
  background: #ef4444;
  color: #fff;
  fill: #fff;
  stroke: #fff;
}
.delete-icon {
  width: 24px;
  height: 24px;
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