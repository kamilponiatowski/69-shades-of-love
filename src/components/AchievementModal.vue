<template>
    <div class="achievement-modal" @click.self="close">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ achievement.title }}</h2>
          <button @click="close" aria-label="Zamknij">✕</button>
        </div>
        <div class="modal-body">
          <div class="achievement-icon">🏆</div>
          <p>{{ achievement.description }}</p>
        </div>
        <div class="modal-footer">
          <button @click="close">Kontynuuj</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Achievement } from '@/types'
  
  const props = defineProps<{
    achievement: Achievement
  }>()
  
  const emit = defineEmits<{
    (e: 'close'): void
  }>()
  
  const close = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  .achievement-modal {
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
  
  .modal-content {
    background-color: white;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  
  .modal-body {
    text-align: center;
    padding: 20px 0;
  }
  
  .achievement-icon {
    font-size: 4rem;
    margin-bottom: 15px;
  }
  
  .modal-footer {
    display: flex;
    justify-content: center;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>