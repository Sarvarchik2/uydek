<template>
  <div class="booking-page-wrap">
    <h1 class="booking-title container">Сообщения</h1>
    <BusinessContainer active="booking">
      <div class="booking-main">
        <!-- Tabs -->
        <div class="booking-tabs">
          <button class="booking-tab">Чаты</button>
          <button class="booking-tab">Запросы</button>
          <button class="booking-tab active">Бронирования</button>
          <button class="booking-tab">Отзывы</button>
        </div>
        <!-- Фильтр и поиск -->
        <div class="booking-filters-row">
          <div class="booking-date-range">
            <label>От
              <input type="date" class="booking-date-input" />
            </label>
            <span class="booking-date-dash">—</span>
            <label>До
              <input type="date" class="booking-date-input" />
            </label>
          </div>
          <div class="booking-search-wrap">
            <span class="booking-search-icon">🔍</span>
            <input class="booking-search-input" type="text" placeholder="Поиск по бронированиям..." />
          </div>
        </div>
        <div class="booking-list">
          <div class="booking-card-design">
            <div class="booking-card-top">
              <img class="booking-avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" />
              <div class="booking-user-block">
                <div class="booking-user-name">Феруза</div>
                <div class="booking-user-msg">Roem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              </div>
              <div class="booking-pay-type">PayMe</div>
              <div class="booking-status-badge">Оплачено</div>
              <div class="booking-amount-green">4200$</div>
            </div>
            <div class="booking-card-bottom">
              <img class="booking-flat-img" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="flat" />
              <div class="booking-flat-block">
                <div class="booking-flat-title">Fully Furnished Studio Apartment</div>
                <div class="booking-flat-details">2 guests | 1 bathroom | 2 bedroom</div>
                <div class="booking-flat-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum...</div>
                <div class="booking-flat-bottom-row">
                  <div class="booking-flat-price">4200$ - 16 месяцев</div>
                  <div class="booking-flat-views">
                    <span class="booking-eye">👁️</span> 113K
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="booking-card-design">
            <div class="booking-card-top">
              <img class="booking-avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" />
              <div class="booking-user-block">
                <div class="booking-user-name">Феруза</div>
                <div class="booking-user-msg">Roem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              </div>
              <div class="booking-pay-type">PayMe</div>
              <div class="booking-status-badge">Оплачено</div>
              <div class="booking-amount-green">4200$</div>
            </div>
            <div class="booking-card-bottom">
              <img class="booking-flat-img" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="flat" />
              <div class="booking-flat-block">
                <div class="booking-flat-title">Fully Furnished Studio Apartment</div>
                <div class="booking-flat-details">2 guests | 1 bathroom | 2 bedroom</div>
                <div class="booking-flat-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum...</div>
                <div class="booking-flat-bottom-row">
                  <div class="booking-flat-price">4200$ - 16 месяцев</div>
                  <div class="booking-flat-views">
                    <span class="booking-eye">👁️</span> 113K
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
import BusinessContainer from '@/components/BusinessContainer.vue';
useHead({ title: 'Бронирования | Uydek' });
</script>

<style scoped>
.booking-page-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.booking-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;
}
.booking-main {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.booking-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 32px;
  background: #f6f8fa;
  border-radius: 32px;
  padding: 6px;
  width: 100%;
  justify-content: flex-start;
}
.booking-tab {
  flex: 1;
  padding: 14px 0;
  font-size: 16px;
  font-weight: 600;
  border: none;
  background: transparent;
  color: #666;
  border-radius: 32px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.booking-tab:hover {
    background: #2563eb;
    color: #fff;
}
.booking-tab.active {
  background: #2563eb;
  color: #fff;
}
.booking-filters-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}
.booking-date-range {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: #222;
}
.booking-date-input {
  padding: 8px 14px;
  border: 1.5px solid #666;
  border-radius: 10px;
  font-size: 15px;
  background: #fff;
  color: #666;
  font-weight: 600;
  outline: none;
  min-width: 120px;
  margin-left: 4px;
  margin-right: 4px;
  transition: border 0.2s;
}
.booking-date-input:focus {
  border: 2px solid #1746a2;
}
.booking-date-dash {
  font-size: 18px;
  color: #888;
  margin: 0 6px;
}
.booking-search-wrap {
  display: flex;
  align-items: center;
  background: #f6f8fa;
  border-radius: 12px;
  padding: 0 12px;
  border: 1.5px solid #e5e7eb;
  min-width: 220px;
}
.booking-search-icon {
  font-size: 18px;
  color: #2563eb;
  margin-right: 6px;
}
.booking-search-input {
  border: none;
  background: transparent;
  font-size: 15px;
  padding: 10px 0;
  outline: none;
  width: 160px;
}
.booking-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.booking-card-design {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(37,99,235,0.08);
  padding: 24px 28px 18px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.booking-card-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}
.booking-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}
.booking-user-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.booking-user-name {
  font-size: 16px;
  font-weight: 700;
}
.booking-user-msg {
  font-size: 14px;
  color: #666;
}
.booking-pay-type {
  font-size: 15px;
  color: #222;
  font-weight: 600;
  margin-left: 8px;
}
.booking-status-badge {
  background: #e7fbe9;
  color: #22c55e;
  font-size: 15px;
  font-weight: 700;
  border-radius: 12px;
  padding: 4px 16px;
  margin-left: 12px;
}
.booking-amount-green {
  color: #22c55e;
  font-weight: 700;
  margin-left: 12px;
  font-size: 17px;
}
.booking-card-bottom {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}
.booking-flat-img {
  width: 110px;
  height: 80px;
  border-radius: 14px;
  object-fit: cover;
  flex-shrink: 0;
}
.booking-flat-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.booking-flat-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
}
.booking-flat-details {
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
}
.booking-flat-desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.booking-flat-bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.booking-flat-price {
  font-size: 15px;
  font-weight: 600;
  color: #2563eb;
}
.booking-flat-views {
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 4px;
}
.booking-eye {
  font-size: 16px;
}
@media (max-width: 900px) {
  .booking-title {
    margin: 18px 0 16px 0;
    margin-left: 12px;
  }
  .booking-main {
    gap: 18px;
  }
  .booking-tabs {
    flex-direction: column;
    gap: 10px;
    padding: 0;
    border-radius: 0;
    background: none;
  }
  .booking-tab {
    width: 100%;
    border-radius: 16px;
    padding: 14px 0;
    font-size: 15px;
  }
  .booking-filters-row {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .booking-date-range {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  .booking-list-title {
    margin-bottom: 10px;
  }
  .booking-card-design {
    padding: 14px 8px 10px 8px;
    max-width: 100%;
  }
  .booking-card-top {
    gap: 8px;
  }
  .booking-flat-img {
    width: 70px;
    height: 50px;
    border-radius: 8px;
  }
}
@media (max-width: 600px) {
  .booking-title {
    margin-left: 6px;
  }
  .booking-main {
    gap: 8px;
  }
  .booking-tabs {
    gap: 6px;
  }
  .booking-tab {
    font-size: 14px;
    padding: 10px 0;
  }
  .booking-filters-row {
    gap: 6px;
  }
  .booking-date-range {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .booking-list-title {
    font-size: 1rem;
  }
  .booking-card-design {
    padding: 8px 2px 6px 2px;
  }
  .booking-card-top {
    gap: 4px;
  }
  .booking-flat-img {
    width: 48px;
    height: 32px;
    border-radius: 5px;
  }
  .booking-flat-title {
    font-size: 13px;
  }
  .booking-flat-details {
    font-size: 12px;
  }
  .booking-flat-desc {
    font-size: 10px;
  }
  .booking-flat-price {
    font-size: 12px;
  }
  .booking-flat-views {
    font-size: 11px;
  }
}
</style> 