<template>
    <div class="profile-layout container">
      <ProfileSidebar :active="active" />
      <main class="profile-main">
        <slot />
      </main>
    </div>
  </template>
  
  <script setup>
  import ProfileSidebar from '~/components/Sidebar.vue';
  const props = defineProps({
    active: {
      type: String,
      default: 'profile',
    },
  });
  </script>
  
  <style scoped>
  .profile-layout {
    display: flex;
    background: #fafafa;
    margin-top: 30px;
    gap: 20px;
  }
  .profile-main {
    flex: 1;
    background: #fff;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  </style>
  