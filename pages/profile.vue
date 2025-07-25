<template>
  <ProfileContainer active="profile">
    <div class="profile-header">
      <img class="avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="avatar" />
      <div>
        <h2>Журабаев Асадбек <span class="role">Арендатор</span> <span class="verified">✔</span></h2>
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
      <button type="submit" class="save-btn">Сохранить</button>
    </form>
  </ProfileContainer>
</template>

<script setup>
import ProfileContainer from '@/components/ProfileContainer.vue';
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
</style> 