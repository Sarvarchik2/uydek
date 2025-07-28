<template>
  <div class="profile-page-wrap">
    <h1 class="profile-title container">Личный кабинет</h1>
    <BusinessContainer active="profile">
      <div class="profile-header">
        <img class="avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="avatar" />
        <div>
          <h2>Журабаев Асадбек <span class="role">Риелтор</span> <span class="verified">✔</span></h2>
          <div class="photo-actions">
            <a href="#" class="upload">Загрузить фото</a>
            <a href="#" class="delete">Удалить фото</a>
          </div>
        </div>
      </div>
      <form class="profile-form">
        <div class="form-row">
          <div class="form-group">
            <label>Имя</label>
            <input type="text" placeholder="Асадбек" />
          </div>
          <div class="form-group">
            <label>Фамилия</label>
            <input type="text" placeholder="Журабаев" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Телефон</label>
            <input type="tel" placeholder="+998 99 873 44 22" />
          </div>
          <div class="form-group">
            <label>Почта</label>
            <input type="email" placeholder="veloakbarov52@gmail.com" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Дата рождения</label>
            <input type="text" placeholder="день/мес/год" />
          </div>
          <div class="form-group">
            <label>Пол</label>
            <input type="text" placeholder="Пол" />
          </div>
        </div>
        
        <!-- Календарь занятости -->
        <div class="availability-section">
          <h3>Календарь занятости</h3>
          <div class="availability-grid">
            <div class="availability-item">
              <div class="availability-header">
                <img src="@/assets/icons/filter_menu.svg" alt="Календарь" />
                <span>пн-пт</span>
              </div>
              <div class="availability-status open">Открыто</div>
            </div>
            <div class="availability-item">
              <div class="availability-header">
                <img src="@/assets/icons/filter_menu.svg" alt="Календарь" />
                <span>сб-вс</span>
              </div>
              <div class="availability-status closed">Закрыто</div>
            </div>
          </div>
        </div>

        <!-- Временные слоты -->
        <div class="time-slots-section">
          <h3>Временные слоты</h3>
          <div class="time-slots-grid">
            <div class="time-slot-item">
              <div class="time-slot-header">
                <img src="@/assets/icons/filter_menu.svg" alt="Время" />
                <span>9:00 - 20:00</span>
              </div>
              <div class="time-slot-status open">Открыто</div>
            </div>
            <div class="time-slot-item">
              <div class="time-slot-header">
                <img src="@/assets/icons/filter_menu.svg" alt="Время" />
                <span>20:00 - 6:00</span>
              </div>
              <div class="time-slot-status closed">Закрыто</div>
            </div>
          </div>
        </div>

        <button type="submit" class="save-btn">Сохранить</button>
      </form>
    </BusinessContainer>
  </div>
</template>

<script setup>
import BusinessContainer from '@/components/BusinessContainer.vue';
useHead({ title: 'Профиль | Uydek' });
</script>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 32px;
  border: 2px solid #e5e7eb;
}
.profile-header h2 {
  margin: 0 0 8px 0;
  font-size: 22px;
  font-weight: 600;
}
.role {
  font-size: 16px;
  color: #2563eb;
  margin-left: 8px;
}
.verified {
  color: #2563eb;
  font-size: 18px;
  margin-left: 4px;
}
.photo-actions {
  margin-top: 4px;
}
.photo-actions .upload {
  color: #2563eb;
  margin-right: 16px;
  font-size: 14px;
  cursor: pointer;
}
.photo-actions .delete {
  color: #f43f5e;
  font-size: 14px;
  cursor: pointer;
}
.profile-form {
  margin-top: 16px;
}
.form-row {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
}
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-size: 15px;
  margin-bottom: 8px;
  color: #222;
}
.form-group input {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  background: #f9fafb;
  outline: none;
  transition: border 0.2s;
}
.form-group input:focus {
  border: 1.5px solid #2563eb;
}

/* Календарь занятости */
.availability-section {
  margin-top: 32px;
  margin-bottom: 24px;
}
.availability-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #222;
}
.availability-grid {
  display: flex;
  gap: 16px;
}
.availability-item {
  flex: 1;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}
.availability-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.availability-header img {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}
.availability-header span {
  font-size: 14px;
  color: #666;
}
.availability-status {
  font-size: 14px;
  font-weight: 500;
}
.availability-status.open {
  color: #059669;
}
.availability-status.closed {
  color: #dc2626;
}

/* Временные слоты */
.time-slots-section {
  margin-top: 32px;
  margin-bottom: 24px;
}
.time-slots-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #222;
}
.time-slots-grid {
  display: flex;
  gap: 16px;
}
.time-slot-item {
  flex: 1;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}
.time-slot-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.time-slot-header img {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}
.time-slot-header span {
  font-size: 14px;
  color: #666;
}
.time-slot-status {
  font-size: 14px;
  font-weight: 500;
}
.time-slot-status.open {
  color: #059669;
}
.time-slot-status.closed {
  color: #dc2626;
}

.save-btn {
  margin-top: 16px;
  padding: 12px 36px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.save-btn:hover {
  background: #1746a2;
}

/* --- Адаптив --- */
@media (max-width: 900px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
    text-align: center;
  }
  .avatar {
    margin-right: 0;
    margin-bottom: 12px;
    width: 64px;
    height: 64px;
  }
  .profile-header h2 {
    font-size: 18px;
  }
  .profile-form {
    margin-top: 8px;
  }
  .form-row {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
  }
  .form-group label {
    font-size: 14px;
    margin-bottom: 6px;
  }
  .form-group input {
    font-size: 14px;
    padding: 10px 12px;
  }
  .availability-grid,
  .time-slots-grid {
    flex-direction: column;
    gap: 12px;
  }
  .save-btn {
    width: 100%;
    padding: 12px 0;
    font-size: 15px;
    margin-top: 12px;
  }
}
@media (max-width: 600px) {
  .profile-header {
    margin-bottom: 16px;
  }
  .profile-form {
    padding: 0 2px;
  }
  .save-btn {
    font-size: 14px;
    padding: 10px 0;
  }
}
.profile-page-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.profile-title {
  font-size: 2rem;
  font-weight: 700;
}
@media (max-width: 900px) {
  .profile-title {
    margin: 18px 0 16px 0;
    margin-left: 12px;
  }
}
@media (max-width: 600px) {
  .profile-title {
    margin-left: 6px;
  }
}
</style> 