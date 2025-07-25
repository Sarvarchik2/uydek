<template>
  <div class="chat-page-layout container">
    <Sidebar class="sidebar-left" :active="'chat'" />
    <div class="chat-content">
      <!-- Мобильная логика -->
      <template v-if="isMobile">
        <div v-if="!selectedChatId" class="chat-sidebar mobile-full">
          <template v-if="chats.length > 0">
            <div v-for="chat in chats" :key="chat.id" class="chat-item" @click="selectChat(chat.id)">
              <img :src="chat.avatar" class="avatar" />
              <div class="chat-info">
                <div class="chat-name">{{ chat.name }}</div>
                <div class="chat-last">{{ chat.lastMessage }}</div>
              </div>
              <div class="chat-time">9:15</div>
            </div>
          </template>
          <template v-else>
            <div class="no-chats-placeholder">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="8" width="48" height="48" rx="12" fill="#F0F4FF"/>
                <path d="M32 20C27.5817 20 24 23.5817 24 28C24 32.4183 27.5817 36 32 36C36.4183 36 40 32.4183 40 28C40 23.5817 36.4183 20 32 20ZM32 34C28.6863 34 26 31.3137 26 28C26 24.6863 28.6863 22 32 22C35.3137 22 38 24.6863 38 28C38 31.3137 35.3137 34 32 34Z" fill="#3B82F6"/>
                <rect x="30" y="38" width="4" height="12" rx="2" fill="#3B82F6"/>
              </svg>
              <div class="no-chats-text">Отправьте сообщение пользователю чтобы начать общение</div>
            </div>
          </template>
        </div>
        <div v-else class="chat-main mobile-full">
          <div class="chat-header-mobile">
            <button class="back-btn" @click="selectedChatId = null">
              <svg width="28" height="28" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
            </button>
            <img :src="selectedChat?.avatar" class="avatar" />
            <span class="chat-name">{{ selectedChat?.name }}</span>
          </div>
          <div class="messages">
            <div v-for="msg in selectedChat.messages" :key="msg.id" class="message" :class="msg.fromMe ? 'from-me' : 'from-them'">
              {{ msg.text }}
            </div>
          </div>
          <div class="chat-input">
            <input v-model="newMessage" placeholder="Сообщение" @keyup.enter="sendMessage" />
            <button @click="sendMessage">Отправить</button>
          </div>
        </div>
      </template>
      <!-- Десктопная логика -->
      <template v-else>
        <div class="chat-sidebar">
          <template v-if="chats.length > 0">
            <div v-for="chat in chats" :key="chat.id" class="chat-item" :class="{ active: chat.id === selectedChatId }" @click="selectChat(chat.id)">
              <img :src="chat.avatar" class="avatar" />
              <div class="chat-info">
                <div class="chat-name">{{ chat.name }}</div>
                <div class="chat-last">{{ chat.lastMessage }}</div>
              </div>
              <div class="chat-time">9:15</div>
            </div>
          </template>
          <template v-else>
            <div class="no-chats-placeholder">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="8" width="48" height="48" rx="12" fill="#F0F4FF"/>
                <path d="M32 20C27.5817 20 24 23.5817 24 28C24 32.4183 27.5817 36 32 36C36.4183 36 40 32.4183 40 28C40 23.5817 36.4183 20 32 20ZM32 34C28.6863 34 26 31.3137 26 28C26 24.6863 28.6863 22 32 22C35.3137 22 38 24.6863 38 28C38 31.3137 35.3137 34 32 34Z" fill="#3B82F6"/>
                <rect x="30" y="38" width="4" height="12" rx="2" fill="#3B82F6"/>
              </svg>
              <div class="no-chats-text">Отправьте сообщение пользователю чтобы начать общение</div>
            </div>
          </template>
        </div>
        <div class="chat-main">
          <div v-if="selectedChat" class="messages">
            <div v-for="msg in selectedChat.messages" :key="msg.id" class="message" :class="msg.fromMe ? 'from-me' : 'from-them'">
              {{ msg.text }}
            </div>
          </div>
          <div v-else class="empty-chat">
            <div class="empty-icon">💬</div>
            <div class="empty-title">Начните общение</div>
            <div class="empty-desc">Выберите один из чатов в списке чтобы начать общение</div>
          </div>
          <div class="chat-input">
            <input v-model="newMessage" placeholder="Сообщение" @keyup.enter="sendMessage" />
            <button @click="sendMessage">Отправить</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import Sidebar from '@/components/Sidebar.vue';

const chats = ref([
  { id: 1, name: 'Сарвар', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', lastMessage: 'Мы с нетерпением ждем вас.....', messages: [
    { id: 1, text: 'Lorem ipsum de lar', fromMe: true },
    { id: 2, text: 'Ipsum de moral fasol', fromMe: true },
    { id: 3, text: 'Lea de sor', fromMe: false },
  ] },
  { id: 2, name: 'Феруза', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', lastMessage: 'Мы с нетерпением ждем вас.....', messages: [] },
  { id: 3, name: 'Малик', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', lastMessage: 'Мы с нетерпением ждем вас.....', messages: [] },
]);

const selectedChatId = ref(null);
const newMessage = ref('');

const selectedChat = computed(() => chats.value.find(c => c.id === selectedChatId.value));

const isMobile = ref(false);

function handleResize() {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 900;
  }
}

onMounted(() => {
  handleResize();
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
  }
  if (isMobile.value) {
    selectedChatId.value = null;
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }
});

watch(isMobile, (val) => {
  if (val) {
    selectedChatId.value = null;
  }
});

function selectChat(id) {
  selectedChatId.value = id;
}

function sendMessage() {
  if (newMessage.value.trim() && selectedChat.value) {
    selectedChat.value.messages.push({
      id: Date.now(),
      text: newMessage.value,
      fromMe: true,
    });
    newMessage.value = '';
  }
}
</script>

<style scoped>
.chat-page-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: #fafafa;
  gap: 20px;
  margin-top: 20px;
}
.sidebar-left {
  height: 80vh;
  border-radius:16px;
}
.chat-content {
  display: flex;
  flex-direction: row;
  flex: 1;
  height:80vh;
  background: #fafafa;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}
.chat-sidebar {
  width: 320px;
  background: #fff;
  border-right: 1px solid #eee;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s;
}
.chat-sidebar.mobile-visible {
  transform: translateX(0);
}
.chat-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: background 0.2s;
}
.chat-item.active, .chat-item:hover {
  background: #f0f4ff;
}
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 16px;
}
.chat-info {
  flex: 1;
}
.chat-name {
  font-weight: 600;
  font-size: 16px;
}
.chat-last {
  color: #888;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chat-time {
  color: #aaa;
  font-size: 12px;
}
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fcfcfc;
  position: relative;
}
.messages {
  flex: 1;
  padding: 32px 24px 80px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.message {
  max-width: 60%;
  padding: 12px 18px;
  border-radius: 16px;
  font-size: 15px;
  background: #e6edff;
  align-self: flex-start;
}
.message.from-me {
  background: #b3cfff;
  align-self: flex-end;
}
.empty-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #aaa;
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}
.empty-title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 6px;
  color: #222;
}
.empty-desc {
  font-size: 15px;
}
.chat-input {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 16px 24px;
  background: #fff;
  border-top: 1px solid #eee;
}
.chat-input input {
  flex: 1;
  border: none;
  background: #f5f7fa;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 15px;
  margin-right: 12px;
  outline: none;
}
.chat-input button {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
.chat-input button:hover {
  background: #2563eb;
}
.no-chats-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 0;
  color: #b0b0b0;
}
.no-chats-placeholder svg {
  margin-bottom: 16px;
}
.no-chats-text {
  font-size: 16px;
  color: #888;
  text-align: center;
}
.mobile-sidebar-btn {
  display: none;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 20;
  background: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 6px;
  cursor: pointer;
}
.mobile-sidebar-overlay {
  display: none;
}
@media (max-width: 900px) {
  .chat-page-layout {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    min-height: 0;
    gap: 0;
    margin-top: 0;
  }
  .sidebar-left {
    display: none !important;
  }
  .chat-content {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    border-radius: 0;
    position: relative;
    height: auto;
  }
  .chat-sidebar {
    width: 100vw;
    min-width: 0;
    border-right: none;
    border-bottom: 1px solid #eee;
    padding: 8px 0;
    border-radius: 0;
    position: static;
    height: 100%;
    z-index: auto;
  }
  .chat-sidebar.mobile-visible {
    transform: translateX(0);
  }
  .chat-sidebar.mobile-full {
    width: 100vw;
    height: 100%;
    background: #fff;
    box-shadow: 2px 0 16px rgba(0,0,0,0.08);
    border-radius: 0;
    overflow-y: auto;
  }
  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fcfcfc;
    position: relative;
    min-height: 0;
    height: 100%;
    border-radius: 0;
  }
  .chat-main.mobile-full {
    min-width: 0;
    height: 100%;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    background: #fcfcfc;
    position: relative;
  }
  .chat-header-mobile {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #fff;
    border-bottom: 1px solid #eee;
    top: 0;
  }
  .chat-header-mobile .avatar {
    width: 36px;
    height: 36px;
    margin-right: 0;
  }
  .chat-header-mobile .chat-name {
    font-size: 16px;
    font-weight: 600;
    color: #222;
  }
  .back-btn {
    background: none;
    border: none;
    padding: 0 8px 0 0;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .messages {
    flex: 1;
    padding: 16px 8px 80px 8px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #fcfcfc;
    min-height: 0;
  }
  .chat-input {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding: 10px 8px;
    background: #fff;
    border-top: 1px solid #eee;
    z-index: 20;
  }
  .mobile-sidebar-btn {
    display: block;
  }
}
@media (max-width: 600px) {
  .chat-sidebar {
    width: 100vw;
    padding: 4px 0;
  }
  .chat-item {
    font-size: 14px;
    padding: 8px 6px;
  }
  .chat-name {
    font-size: 14px;
  }
  .chat-last {
    font-size: 11px;
  }
  .chat-time {
    font-size: 10px;
  }
  .avatar {
    width: 28px;
    height: 28px;
    margin-right: 6px;
  }
  .chat-main {
    min-height: 200px;
  }
  .messages {
    padding: 8px 2px 60px 2px;
    font-size: 13px;
  }
  .chat-input input, .chat-input button {
    font-size: 13px;
    padding: 8px 8px;
  }
}
</style> 