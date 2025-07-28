<template>
  <div class="reports-page-wrap">
    <h1 class="reports-title container">Личный кабинет</h1>
    <BusinessContainer active="reports">
      <div class="reports-section">
        <h2 class="reports-header">Отчеты по продажам</h2>
        <div class="reports-table-wrap">
          <div class="reports-table">
            <div class="reports-row reports-header-row">
              <div class="reports-cell">Дата и время</div>
              <div class="reports-cell">Название жилья</div>
              <div class="reports-cell">Тип жилья</div>
              <div class="reports-cell">Цена</div>
              <div class="reports-cell">Метод оплаты</div>
              <div class="reports-cell">Статус оплаты</div>
            </div>
            <div class="reports-row">
              <div class="reports-cell">01.12.2025 13:24</div>
              <div class="reports-cell">Modera Tower</div>
              <div class="reports-cell">Аренда</div>
              <div class="reports-cell">1200$</div>
              <div class="reports-cell">PayMe</div>
              <div class="reports-cell success">Успешный</div>
            </div>
            <div class="reports-row">
              <div class="reports-cell">01.12.2025 13:24</div>
              <div class="reports-cell">Modera Tower</div>
              <div class="reports-cell">Покупка</div>
              <div class="reports-cell">150000$</div>
              <div class="reports-cell">Click</div>
              <div class="reports-cell success">Успешный</div>
            </div>
            <div class="reports-row">
              <div class="reports-cell">01.12.2025 13:24</div>
              <div class="reports-cell">Modera Tower</div>
              <div class="reports-cell">Аренда</div>
              <div class="reports-cell">1200$</div>
              <div class="reports-cell">PayMe</div>
              <div class="reports-cell success">Успешный</div>
            </div>
            <div class="reports-row">
              <div class="reports-cell">01.12.2025 13:24</div>
              <div class="reports-cell">Modera Tower</div>
              <div class="reports-cell">Аренда</div>
              <div class="reports-cell">1200$</div>
              <div class="reports-cell">Click</div>
              <div class="reports-cell success">Успешный</div>
            </div>
            <div class="reports-row">
              <div class="reports-cell">01.12.2025 13:24</div>
              <div class="reports-cell">Modera Tower</div>
              <div class="reports-cell">Аренда</div>
              <div class="reports-cell">1200$</div>
              <div class="reports-cell">PayMe</div>
              <div class="reports-cell success">Успешный</div>
            </div>
          </div>
        </div>
        <button class="download-btn">
          <img src="@/assets/icons/filter_menu.svg" alt="Скачать" />
          Скачать отчет
        </button>
      </div>
    </BusinessContainer>
  </div>
</template>

<script setup>
import BusinessContainer from '@/components/BusinessContainer.vue';
useHead({ title: 'Отчеты | Uydek' });
</script>

<style scoped>
.reports-page-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.reports-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;
}

.reports-section {
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px 24px 24px;
  border: 1px solid #e5e7eb;
  margin-top: 12px;
}

.reports-header {
  color: #2563eb;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}

.reports-table-wrap {
  overflow-x: auto;
  margin-bottom: 24px;
}

.reports-table {
  min-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reports-row {
  display: flex;
  border-radius: 24px;
  border: 1.5px solid #2563eb;
  background: #fff;
  align-items: center;
  min-height: 48px;
  font-size: 15px;
  font-weight: 500;
}

.reports-header-row {
  background: #f8faff;
  color: #2563eb;
  font-size: 16px;
  font-weight: 600;
  border: 1.5px solid #2563eb;
}

.reports-cell {
  flex: 1;
  padding: 12px 8px;
  text-align: center;
  white-space: nowrap;
}

.success {
  color: #059669;
}

.download-btn {
  margin-top: 18px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.download-btn img {
  width: 20px;
  height: 20px;
}
.download-btn:hover {
  background: #1746a2;
}

@media (max-width: 900px) {
  .reports-title {
    margin: 18px 0 16px 0;
    margin-left: 12px;
  }
  .reports-section {
    padding: 18px 6px 12px 6px;
  }
  .reports-header {
    font-size: 17px;
    margin-bottom: 14px;
  }
  .reports-table {
    min-width: 600px;
    gap: 8px;
  }
  .reports-row {
    font-size: 14px;
    min-height: 38px;
  }
  .reports-header-row {
    font-size: 15px;
  }
  .download-btn {
    font-size: 15px;
    padding: 10px 18px;
  }
}
@media (max-width: 600px) {
  .reports-title {
    margin-left: 6px;
  }
  .reports-section {
    padding: 8px 2px 8px 2px;
  }
  .reports-header {
    font-size: 15px;
    margin-bottom: 10px;
  }
  .reports-table {
    min-width: 400px;
    gap: 6px;
  }
  .reports-row {
    font-size: 13px;
    min-height: 30px;
  }
  .reports-header-row {
    font-size: 13px;
  }
  .download-btn {
    font-size: 14px;
    padding: 8px 10px;
  }
}
</style> 