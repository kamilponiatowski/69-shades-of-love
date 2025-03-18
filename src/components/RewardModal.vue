<template>
    <div class="reward-modal" @click="$emit('close')">
      <div class="reward-content" @click.stop>
        <div class="reward-icon">
          <i class="fas fa-crown" aria-hidden="true"></i>
        </div>
        <h2 class="reward-title">{{ title }}</h2>
        <p class="reward-description">{{ description }}</p>
        <button 
          class="continue-button" 
          @click="$emit('close')"
        >
          Kontynuuj przygodę
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    title: string
    description: string
  }>()
  
  defineEmits(['close'])
  </script>
  
  <style scoped>
  .reward-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .reward-content {
    background-color: white;
    border-radius: 20px;
    padding: 40px;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  }
  
  .reward-icon {
    font-size: 5rem;
    color: #FFD700;
    margin-bottom: 20px;
    animation: pulse 1.5s infinite alternate;
  }
  
  .reward-title {
    color: #C41E3A;
    font-size: 2rem;
    margin-bottom: 15px;
  }
  
  .reward-description {
    color: #333;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 25px;
  }
  
  .continue-button {
    background-color: #8A2BE2;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .continue-button:hover {
    background-color: #6A1B9A;
    transform: translateY(-3px);
  }
  
  @keyframes pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
  </style>