<template>
  <div v-if="modelValue" class="rent-filter-modal-overlay" @click.self="close">
    <div class="rent-filter-modal-content container">
      <div class="rent-filter-modal-header">
        <span class="rent-filter-modal-title">Категории</span>
        <button class="rent-filter-modal-close" @click="close">&times;</button>
      </div>
      <div class="rent-filter-modal-tabs">
        <button :class="{active: tab==='Квартира'}" @click="tab='Квартира'">Квартира</button>
        <button :class="{active: tab==='Дом'}" @click="tab='Дом'">Дом</button>
        <button :class="{active: tab==='Расположение'}" @click="tab='Расположение'">Расположение</button>
      </div>
      <div class="rent-filter-modal-fields">
        <div class="rent-filter-modal-row">
          <span>Цена</span>
          <div class="rent-filter-modal-row-buttons">
            <input type="text" placeholder="От: --" class="rent-filter-modal-input" />
            <input type="text" placeholder="До: --" class="rent-filter-modal-input" />
          </div>
        </div>
        <div class="rent-filter-modal-row">
          <span>Площадь</span>
          <div class="rent-filter-modal-row-buttons">
            <input type="text" placeholder="От: --" class="rent-filter-modal-input" />
            <input type="text" placeholder="До: --" class="rent-filter-modal-input" />
          </div>
        </div>
        <div class="rent-filter-modal-row">
          <span>Балкон</span>
          <div class="rent-filter-modal-row-buttons">
            <button class="rent-filter-modal-btn">Балкон</button>
            <button class="rent-filter-modal-btn">Лоджия</button>
            <button class="rent-filter-modal-btn">Балкон т лоджия</button>
          </div>
        </div>
        <div class="rent-filter-modal-row">
          <span>Этаж</span>
          <div class="rent-filter-modal-row-buttons">
            <input type="text" placeholder="С: --" class="rent-filter-modal-input short" />
            <input type="text" placeholder="По: --" class="rent-filter-modal-input short" />
            <button class="rent-filter-modal-btn">Не первый</button>
            <button class="rent-filter-modal-btn">Последний</button>
          </div>
        </div>
        <div class="rent-filter-modal-row">
          <span>Ремонт</span>
          <div class="rent-filter-modal-row-buttons">
            <button class="rent-filter-modal-btn">Косметический</button>
            <button class="rent-filter-modal-btn">Евро</button>
            <button class="rent-filter-modal-btn">Современный</button>
            <button class="rent-filter-modal-btn">Требует ремонта</button>
          </div>
        </div>
        <div class="rent-filter-modal-row">
          <span>Животные</span>
          <div class="rent-filter-modal-row-buttons">
            <button class="rent-filter-modal-btn">Можно с животными</button>
            <button class="rent-filter-modal-btn">Нельзя с животными</button>
          </div>
        </div>
        <div class="rent-filter-modal-row">
          <span>Удобства</span>
          <div class="rent-filter-modal-row-buttons">
            <button class="rent-filter-modal-btn">Холодильник</button>
            <button class="rent-filter-modal-btn">Стиральная машина</button>
            <button class="rent-filter-modal-btn">Телевизор</button>
            <button class="rent-filter-modal-btn">Посудомойка</button>
            <button class="rent-filter-modal-btn">Кондиционер</button>
          </div>
        </div>
        <div class="rent-filter-modal-row">
          <span>Мебель</span>
          <div class="rent-filter-modal-row-buttons">
            <button class="rent-filter-modal-btn">Есть</button>
            <button class="rent-filter-modal-btn">Нет</button>
          </div>
        </div>
        <div class="rent-filter-modal-row">
          <span>Кухня</span>
          <div class="rent-filter-modal-row-buttons">
            <button class="rent-filter-modal-btn">от 6м²</button>
            <button class="rent-filter-modal-btn">от 7м²</button>
            <button class="rent-filter-modal-btn">от 8м²</button>
            <button class="rent-filter-modal-btn">от 9м²</button>
            <button class="rent-filter-modal-btn">от 10м²</button>
            <button class="rent-filter-modal-btn">от 12м²</button>
            <button class="rent-filter-modal-btn">от 15м²</button>
          </div>
        </div>
        <div class="rent-filter-modal-row">
          <span>Потолок</span>
          <div class="rent-filter-modal-row-buttons">
            <button class="rent-filter-modal-btn">от 2.5 м</button>
            <button class="rent-filter-modal-btn">от 2.7 м</button>
            <button class="rent-filter-modal-btn">от 3 м</button>
            <button class="rent-filter-modal-btn">от 4 м</button>
          </div>
        </div>
      </div>
      <div class="rent-filter-modal-actions">
        <button class="rent-filter-modal-main-btn">Показать 815 объектов</button>
        <button class="rent-filter-modal-reset-btn">Сброс</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
const props = defineProps({
  modelValue: Boolean
});
const emit = defineEmits(['update:modelValue']);
const tab = ref('Квартира');
function close() {
  emit('update:modelValue', false);
}
</script>

<style scoped>
.rent-filter-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.367);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rent-filter-modal-content {
  background: #fff;
  border-radius: 24px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 32px rgba(60,100,200,0.10);
  padding: 32px 32px 24px 32px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.rent-filter-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.rent-filter-modal-title {
  font-size: 24px;
  font-weight: 700;
}
.rent-filter-modal-close {
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #222;
}
.rent-filter-modal-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 18px;
  white-space: nowrap;
  width: max-content;
  min-width: max-content;
  overflow-x: auto;
  scrollbar-width: none;
}
.rent-filter-modal-tabs::-webkit-scrollbar {
  display: none;
}
.rent-filter-modal-tabs button {
  background: none;
  border: none;
  font-size: 17px;
  font-weight: 600;
  color: #7a8bb7;
  padding: 8px 18px;
  border-radius: 100px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.rent-filter-modal-tabs button.active {
  background: #3b82f6;
  color: #fff;
}
.rent-filter-modal-fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.rent-filter-modal-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  margin-bottom: 2px;
}
.rent-filter-modal-row{
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
}
.rent-filter-modal-row::-webkit-scrollbar {
  display: none;
}
.rent-filter-modal-row span {
  min-width: 90px;
  font-size: 16px;
  color: #222;
  font-weight: 500;
}
.rent-filter-modal-input {
  background: #f5f7fa;
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 15px;
  width: 90px;
  outline: none;
}
.rent-filter-modal-input.short {
  width: 60px;
}
.rent-filter-modal-btn {
  background: #fff;
  border: 1.5px solid #3b82f6;
  color: #3b82f6;
  border-radius: 100px;
  padding: 8px 18px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
  width: max-content;
}
.rent-filter-modal-btn.active, .rent-filter-modal-btn:hover {
  background: #3b82f6;
  color: #fff;
}
.rent-filter-modal-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  justify-content: flex-end;
}
.rent-filter-modal-main-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 600;
  padding: 16px 32px;
  cursor: pointer;
  transition: background 0.2s;
}
.rent-filter-modal-main-btn:hover {
  background: #2563eb;
}
.rent-filter-modal-reset-btn {
  background: #fff;
  color: #3b82f6;
  border: 1.5px solid #3b82f6;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 600;
  padding: 16px 32px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.rent-filter-modal-reset-btn:hover {
  background: #f0f4ff;
}
.rent-filter-modal-row-buttons{
    display: flex;
    gap: 10px;
}
@media (max-width: 769px) {

  .rent-filter-modal-content {
    max-width: 100vw;
    width: 100vw;
    min-height: 100dvh;
    max-height: 100dvh;
    border-radius: 0;
    padding: 18px 8px 12px 8px;
  }
  .rent-filter-modal-actions{
    flex-direction: column;
  }
  .rent-filter-modal-row{
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
  }
  .rent-filter-modal-row span {
    min-width: 70px;
    font-size: 14px;
    flex-shrink: 0;
  }
  .rent-filter-modal-row-buttons {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;
    flex: 1;
  }
  .rent-filter-modal-row-buttons::-webkit-scrollbar {
    display: none;
  }
  .rent-filter-modal-header {
    margin-bottom: 10px;
  }
  .rent-filter-modal-title {
    font-size: 20px;
  }
  .rent-filter-modal-tabs {
    gap: 8px;
    margin-bottom: 10px;
  }
  .rent-filter-modal-tabs button {
    font-size: 15px;
    padding: 7px 10px;
  }

  .rent-filter-modal-input {
    font-size: 13px;
    padding: 7px 8px;
    width: 60px;
  }
  .rent-filter-modal-btn {
    font-size: 13px;
    padding: 7px 10px;
  }
  .rent-filter-modal-main-btn, .rent-filter-modal-reset-btn {
    font-size: 15px;
    padding: 12px 16px;
    
  }
}
</style> 