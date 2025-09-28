<template>
  <div v-if="modelValue" class="modal-backdrop" @click.self="close">
    <div class="modal">
      <div class="modal-header">
        <h3>Консультация от застройщика</h3>
        <button class="x" @click="close">×</button>
      </div>
      <p class="desc">Специалист расскажет о скидках и акциях, квартирах в наличии и ипотечных программах</p>

      <label class="field">
        <span class="label">Время звонка</span>
        <div class="select-wrap">
          <select v-model="callTime">
            <option value="asap">Как можно скорее</option>
            <option value="today">Сегодня</option>
            <option value="tomorrow">Завтра</option>
          </select>
          <svg class="arrow" width="16" height="16" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="#666" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
        </div>
      </label>

      <div class="row">
        <input v-model="phone" class="phone" placeholder="Номер телефона" />
        <button class="cta" :disabled="!valid" @click="submit">Позвоните мне</button>
      </div>

      <p class="note">Отправляя заявку, вы даёте своё согласие на обработку персональных данных</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{ modelValue: boolean; buildingName?: string }>()
const emit = defineEmits<{ (e:'update:modelValue', v:boolean):void; (e:'submit', data:{ phone:string; callTime:string }):void }>()

const phone = ref('')
const callTime = ref('asap')
const valid = computed(() => /[0-9]{7,}/.test(phone.value.replace(/\D/g,'')))

function close(){ emit('update:modelValue', false) }
function submit(){ if(!valid.value) return; emit('submit', { phone: phone.value, callTime: callTime.value }); close() }

watch(() => props.modelValue, (v) => { if(v){ phone.value=''; callTime.value='asap' } })
</script>

<style scoped>
.modal-backdrop { position:fixed; inset:0; background: rgba(0,0,0,.45); display:flex; align-items:center; justify-content:center; z-index:1000; }
.modal { width: min(680px, 92vw); background:#fff; border-radius:20px; padding:22px; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
.modal-header { display:flex; justify-content:space-between; align-items:center; }
h3 { margin:0; font-size:24px; font-weight:800; }
.x { background:#f1f3f8; width:32px; height:32px; border:none; border-radius:50%; cursor:pointer; font-size:18px; }
.desc { color:#4b5563; margin:10px 0 16px; }
.field { display:flex; flex-direction:column; gap:8px; margin-bottom:14px; }
.label { color:#9aa2b2; font-weight:600; font-size:12px; }
.select-wrap { position:relative; }
select { width:100%; padding:14px 42px 14px 14px; border-radius:12px; border:1px solid #e1e6f3; background:#f7f9ff; appearance:none; font-weight:600; }
.arrow { position:absolute; right:12px; top:50%; transform:translateY(-50%); pointer-events:none; }
.row { display:grid; grid-template-columns: 1fr 220px; gap:12px; }
.phone { padding:14px; border-radius:12px; border:1px solid #e1e6f3; background:#fff; }
.cta { background:#3b82f6; border:none; border-radius:12px; font-weight:800; cursor:pointer; }
.cta:disabled { opacity:.6; cursor:not-allowed; }
.note { color:#7a8bb7; font-size:12px; margin-top:10px; }
@media (max-width: 560px){ .row { grid-template-columns: 1fr; } }
</style>
