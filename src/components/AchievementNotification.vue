<template>
    <div class="achievement-notification" @click="$emit('close')">
      <div class="achievement-content" @click.stop>
        <div class="achievement-icon">
          <i class="fas fa-trophy" aria-hidden="true"></i>
        </div>
        <div class="achievement-details">
          <h3 class="achievement-title">{{ title }}</h3>
          <p class="achievement-message">{{ message }}</p>
          <button @click="$emit('close')" class="close-button">
            Zamknij
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    title: string
    message: string
  }>()
  
  defineEmits(['close'])
  </script>
  
  <style scoped>
  .achievement-notification {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .achievement-content {
    background-color: white;
    border-radius: 15px;
    padding: 30px;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  .achievement-icon {
    font-size: 4rem;
    color: #FFD700;
    margin-bottom: 20px;
  }
  
  .achievement-title {
    font-size: 1.5rem;
    color: #C41E3A;
    margin-bottom: 10px;
  }
  
  .achievement-message {
    color: #333;
    margin-bottom: 20px;
  }
  
  .close-button {
    background-color: #C41E3A;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .close-button:hover {
    background-color: #a01a30;
  }
  </style>