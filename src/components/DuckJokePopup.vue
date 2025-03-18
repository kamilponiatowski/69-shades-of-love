<template>
    <div class="duck-joke-popup">
      <div class="duck-joke-content">
        <div class="duck-emoji">🦆</div>
        <p class="duck-joke-text">{{ joke }}</p>
        <button @click="$emit('close')" class="close-joke-button">
          Zamknij
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    joke: string
  }>()
  
  defineEmits(['close'])
  </script>
  
  <style scoped>
  .duck-joke-popup {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
  }
  
  .duck-joke-content {
    background-color: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    animation: slideUp 0.5s ease-out;
  }
  
  .duck-emoji {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 10px;
  }
  
  .duck-joke-text {
    color: #8A2BE2;
    text-align: center;
    margin-bottom: 15px;
    font-style: italic;
  }
  
  .close-joke-button {
    display: block;
    width: 100%;
    background-color: #8A2BE2;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .close-joke-button:hover {
    background-color: #6A1B9A;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>