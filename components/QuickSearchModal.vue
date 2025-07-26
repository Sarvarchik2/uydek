<template>
  <div v-if="modelValue" :class="['quick-search-overlay', `step-${currentStep}`]" @click.self="close">
    <div class="quick-search-modal">
      <!-- Шаг 1: Комнатность -->
      <div v-if="currentStep === 1" class="quick-search-step">
        <div class="step-header">
          <div class="step-logo">
            <img src="@/assets/logo.svg" alt="Udek" />
          </div>
          <!-- <div class="step-indicator">Easy Search {{ currentStep }}/4</div> -->
        </div>
        
        <div class="step-content">
          <h2 class="step-title">Какую комнатность рассматриваете?</h2>
          <p class="step-subtitle">Шаг 1 из 4</p>
          
          <div class="options-grid">
            <button 
              v-for="option in roomOptions" 
              :key="option"
              class="option-btn"
              :class="{ active: selectedRoom === option }"
              @click="selectedRoom = option"
            >
              {{ option }}
            </button>
          </div>
          
          <div class="checkbox-option">
            <label class="checkbox-label">
              <input type="checkbox" v-model="searchWithoutApartments" />
              <span class="checkmark"></span>
              Нежелое помещение
            </label>
          </div>
          
          <button class="continue-btn" @click="nextStep" :disabled="!selectedRoom">
            Продолжить
          </button>
        </div>
      </div>

      <!-- Шаг 2: Удаленность от метро -->
      <div v-if="currentStep === 2" class="quick-search-step">
        <div class="step-header">
          <div class="step-logo">
            <img src="@/assets/logo.svg" alt="Udek" />
          </div>
          <!-- <div class="step-indicator">Easy Search {{ currentStep }}/4</div> -->
        </div>
        
        <div class="step-content">
          <h2 class="step-title">Удаленность от метро. Какая она должна быть?</h2>
          <p class="step-subtitle">Шаг 2 из 4</p>
          
          <div class="options-grid">
            <button 
              v-for="option in metroOptions" 
              :key="option"
              class="option-btn"
              :class="{ active: selectedMetro === option }"
              @click="selectedMetro = option"
            >
              {{ option }}
            </button>
          </div>
          
          <div class="step-buttons">
            <button class="back-btn" @click="prevStep">Назад</button>
            <button class="continue-btn" @click="nextStep" :disabled="!selectedMetro">
              Продолжить
            </button>
          </div>
        </div>
      </div>

      <!-- Шаг 3: Бюджет -->
      <div v-if="currentStep === 3" class="quick-search-step">
        <div class="step-header">
          <div class="step-logo">
            <img src="@/assets/logo.svg" alt="Udek" />
          </div>
          <!-- <div class="step-indicator">Easy Search {{ currentStep }}/4</div> -->
        </div>
        
        <div class="step-content">
          <h2 class="step-title">На какой бюджет рассчитываете?</h2>
          <p class="step-subtitle">Шаг 3 из 4</p>
          
          <div class="options-grid">
            <button 
              v-for="option in budgetOptions" 
              :key="option"
              class="option-btn"
              :class="{ active: selectedBudget === option }"
              @click="selectedBudget = option"
            >
              {{ option }}
            </button>
          </div>
          
          <div class="step-buttons">
            <button class="back-btn" @click="prevStep">Назад</button>
            <button class="continue-btn" @click="nextStep" :disabled="!selectedBudget">
              Продолжить
            </button>
          </div>
        </div>
      </div>

      <!-- Шаг 4: Срок переезда -->
      <div v-if="currentStep === 4" class="quick-search-step">
        <div class="step-header">
          <div class="step-logo">
            <img src="@/assets/logo.svg" alt="Udek" />
          </div>
          <!-- <div class="step-indicator">Easy Search {{ currentStep }}/4</div> -->
        </div>
        
        <div class="step-content">
          <h2 class="step-title">Хотите переехать сразу или готовы подождать?</h2>
          <p class="step-subtitle">Шаг 4 из 4</p>
          
          <div class="options-grid">
            <button 
              v-for="option in timeOptions" 
              :key="option"
              class="option-btn"
              :class="{ active: selectedTime === option }"
              @click="selectedTime = option"
            >
              {{ option }}
            </button>
          </div>
          
          <div class="step-buttons">
            <button class="back-btn" @click="prevStep">Назад</button>
            <button class="continue-btn" @click="finishSearch" :disabled="!selectedTime">
              Продолжить
            </button>
          </div>
        </div>
      </div>

      <!-- Финальный шаг: Номер телефона -->
      <div v-if="currentStep === 5" class="quick-search-step">
        <div class="step-header">
          <div class="step-logo">
            <img src="@/assets/logo.svg" alt="Udek" />
          </div>
        </div>
        
        <div class="step-content">
          <h2 class="step-title">Что дальше?</h2>
          <p class="step-description">
            Наши алгоритмы нашли подходящие ЖК.<br>
            Мы проверим результаты поиска<br>
            и дополним предложениями эксперта
          </p>
          
          <div class="phone-input">
            <input 
              type="tel" 
              v-model="phoneNumber"
              placeholder="Номер телефона"
              class="phone-field"
            />
          </div>
          
          <div class="step-buttons">
            <button class="back-btn" @click="prevStep">Назад</button>
            <button class="continue-btn" @click="submitSearch" :disabled="!phoneNumber">
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  searchType: {
    type: String,
    default: 'buy', // 'buy' или 'rent'
    validator: (value) => ['buy', 'rent'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'search-complete'])

// Состояние опросника
const currentStep = ref(1)
const selectedRoom = ref('')
const selectedMetro = ref('')
const selectedBudget = ref('')
const selectedTime = ref('')
const phoneNumber = ref('')
const searchWithoutApartments = ref(false)

// Опции для каждого шага
const roomOptions = ['Студия', '1 комната', '2 комнаты', '3 комнаты', '4 комнаты и более']
const metroOptions = ['Неважно', '~5 минут', '~10 минут', '~15 минут']
const budgetOptions = [
  'Неважно', 
  'до 100 млн сум', 
  'до 200 млн сум', 
  'до 300 млн сум', 
  'до 400 млн сум',
  'Более 400 млн сум'
]
const timeOptions = ['Неважно', 'Сразу', 'До 1 года', 'До 3 лет']

function close() {
  emit('update:modelValue', false)
  resetForm()
}

function resetForm() {
  currentStep.value = 1
  selectedRoom.value = ''
  selectedMetro.value = ''
  selectedBudget.value = ''
  selectedTime.value = ''
  phoneNumber.value = ''
  searchWithoutApartments.value = false
}

function nextStep() {
  if (currentStep.value < 5) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function finishSearch() {
  nextStep()
}

function submitSearch() {
  const searchData = {
    type: props.searchType,
    room: selectedRoom.value,
    metro: selectedMetro.value,
    budget: selectedBudget.value,
    time: selectedTime.value,
    phone: phoneNumber.value,
    withoutApartments: searchWithoutApartments.value
  }
  
  emit('search-complete', searchData)
  close()
}
</script>

<style scoped>
.quick-search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
}

.quick-search-overlay.step-1 {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1)), 
              url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1920&q=80');
}

.quick-search-overlay.step-2 {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1)), 
              url('https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1920&q=80');
}

.quick-search-overlay.step-3 {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1)), 
              url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80');
}

.quick-search-overlay.step-4 {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1)), 
              url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80');
}

.quick-search-overlay.step-5 {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1)), 
              url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80');
}

.quick-search-modal {
  background: #2564eb43;
  backdrop-filter: blur(3px);
  border-radius: 32px;
  width: 50%;
  height: max-content;
  max-width: 600px;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  position: relative;
  margin: 0;
  margin-left: 30px;
}

.quick-search-step {
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  max-width: 600px;
}

.step-logo {
  width: 70px;
  height: 45px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.step-logo img {
  width: 45px;
  height: 28px;
}

.step-indicator {
  font-size: 16px;
  color: #64748b;
  font-weight: 600;
}

.step-content {
  text-align: left;
  width: 100%;
  max-width: 500px;
}

.step-title {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.2;
}

.step-subtitle {
  font-size: 18px;
  color: #c5ced9;
  margin-bottom: 48px;
}

.step-description {
  font-size: 16px;
  color: #64748b;
  margin-bottom: 32px;
  line-height: 1.5;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 40px;
  width: 100%;
}

.option-btn {
  background: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px 16px;
  font-size: 16px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.option-btn:hover {
  background: #f8fafc;
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
}

.option-btn.active {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
}

.checkbox-option {
  margin-bottom: 48px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  color: #c4cdd9;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s;
}

.checkbox-label input:checked + .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 12px;
  font-weight: bold;
}

.phone-input {
  margin-bottom: 48px;
}

.phone-field {
  width: 100%;
  padding: 20px 24px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 18px;
  outline: none;
  transition: all 0.3s;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.phone-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}

.phone-field::placeholder {
  color: #94a3b8;
}

.step-buttons {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  width: 100%;
}

.back-btn {
  background: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 18px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 140px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-btn:hover {
  background: #f8fafc;
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
}

.continue-btn {
  background: #3b82f6;
  border: none;
  border-radius: 16px;
  padding: 18px 40px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 160px;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.continue-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-3px);
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.4);
}

.continue-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .quick-search-modal {
    margin: 0;
    width: 100%;
    height: max-content;
    border-radius: 0;
  }
  
  .quick-search-step {
    padding: 40px 20px;
    min-height: 100vh;
    align-items: center;
    text-align: center;
  }
  
  .step-content {
    text-align: center;
  }
  
  .step-buttons {
    justify-content: center;
  }
  
  .step-title {
    font-size: 28px;
  }
  
  .step-subtitle {
    font-size: 16px;
  }
  
  .options-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .option-btn {
    min-height: 56px;
    padding: 16px 20px;
    font-size: 15px;
  }
  
  .step-buttons {
    flex-direction: column;
    gap: 12px;
  }
  
  .back-btn,
  .continue-btn {
    width: 100%;
    padding: 16px 24px;
  }
  
  .phone-field {
    padding: 16px 20px;
    font-size: 16px;
  }
}
</style> 