<template>
    <div class="streak-tracker" v-if="streakDays > 0">
      <div class="streak-icon">🔥</div>
      <div class="streak-info">
        <div class="streak-count">{{ streakDays }}</div>
        <div class="streak-label">{{ streakLabel }}</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import StreakService from '@/services/streakService';
  import TranslationService from '@/services/translationService';
  
  const streakDays = computed(() => StreakService.getStreakDays());
  const streakLabel = computed(() => {
    return TranslationService.translate('streakDays', { 0: streakDays.value });
  });
  </script>
  
  <style scoped>
  .streak-tracker {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: #FFF8DC;
    border-radius: var(--border-radius);
    border: 1px dashed #FFD700;
    margin-top: 10px;
    animation: glow 2s infinite alternate;
  }
  
  .streak-icon {
    font-size: 1.8rem;
    margin-right: 15px;
    animation: flame 1s infinite alternate;
  }
  
  .streak-info {
    display: flex;
    flex-direction: column;
  }
  
  .streak-count {
    font-weight: 700;
    font-size: 1.4rem;
    color: #FF4500;
  }
  
  .streak-label {
    font-size: 0.9rem;
    color: #666;
  }
  
  @keyframes flame {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }
  
  @keyframes glow {
    0% {
      box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
    }
    100% {
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
    }
  }
  </style>