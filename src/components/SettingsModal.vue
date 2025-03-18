<template>
    <div class="settings-modal" @click.self="close">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Ustawienia</h2>
          <button @click="close" aria-label="Zamknij">✕</button>
        </div>
        <div class="modal-body">
          <div class="settings-section">
            <h3>Język</h3>
            <div class="language-options">
              <button 
                v-for="lang in availableLanguages" 
                :key="lang"
                @click="changeLanguage(lang)"
                :class="{ active: currentLanguage === lang }"
              >
                {{ lang === 'pl' ? 'Polski' : 'English' }}
              </button>
            </div>
          </div>
          
          <div class="settings-section">
            <h3>Dane</h3>
            <button @click="resetData" class="reset-button">
              Zresetuj wszystkie dane
            </button>
            <p class="warning-text">Uwaga: Ta operacja nie może być cofnięta!</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { APP_CONFIG } from '@/config'
  import TranslationService from '@/services/translationService'
  import TasksService from '@/services/tasksService'
  import StreakService from '@/services/streakService'
  
  type Language = typeof APP_CONFIG.LANGUAGES[number]
  
  const availableLanguages = APP_CONFIG.LANGUAGES
  const currentLanguage = ref(TranslationService.getCurrentLanguage())
  
  const emit = defineEmits<{
    (e: 'close'): void
  }>()
  
  const close = () => {
    emit('close')
  }
  
  const changeLanguage = (lang: Language) => {
    TranslationService.setLanguage(lang)
    currentLanguage.value = lang
    // Pokaż powiadomienie o potrzebie odświeżenia strony
    alert('Zmiana języka wymaga odświeżenia strony. Strona zostanie przeładowana.')
    window.location.reload()
  }
  
  const resetData = () => {
    if (confirm('Czy na pewno chcesz zresetować wszystkie dane? Ta operacja nie może być cofnięta.')) {
      // Resetujemy wszystkie dane
      TasksService.resetAllTasks()
      StreakService.resetStreak()
      alert('Wszystkie dane zostały zresetowane.')
      window.location.reload()
    }
  }
  </script>
  
  <style scoped>
  .settings-modal {
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
    border-radius: var(--border-radius);
    width: 90%;
    max-width: 500px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .modal-header h2 {
    color: var(--primary-color);
    margin: 0;
  }
  
  .modal-header button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
  }
  
  .settings-section {
    margin-bottom: 25px;
  }
  
  .settings-section h3 {
    margin-bottom: 15px;
    font-size: 1.2rem;
    color: var(--text-color);
  }
  
  .language-options {
    display: flex;
    gap: 10px;
  }
  
  .language-options button {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .language-options button.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .reset-button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .reset-button:hover {
    background-color: #ff3333;
  }
  
  .warning-text {
    color: #ff4d4d;
    font-size: 0.8rem;
    margin-top: 5px;
  }
  </style>