<template>
    <div class="notification-container">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        class="notification"
        :class="notification.type"
      >
        {{ notification.message }}
        <button 
          @click="removeNotification(notification.id)"
          aria-label="Zamknij powiadomienie"
        >
          ✕
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import NotificationService from '@/services/notificationService'
  
  const notifications = computed(() => 
    NotificationService.getNotifications()
  )
  
  const removeNotification = (id: string) => {
    NotificationService.remove(id)
  }
  </script>
  
  <style scoped>
  .notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
  
  .notification {
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 10px 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease-out;
  }
  
  .notification.success {
    background-color: #dff0d8;
    color: #3c763d;
  }
  
  .notification.warning {
    background-color: #fcf8e3;
    color: #8a6d3b;
  }
  
  .notification.error {
    background-color: #f2dede;
    color: #a94442;
  }
  
  .notification button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    margin-left: 10px;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  </style>