<template>
    <div class="language-selector">
      <button 
        v-for="lang in availableLanguages" 
        :key="lang"
        @click="changeLanguage(lang)"
        :class="{ active: currentLanguage === lang }"
        :aria-label="`Zmień język na ${lang}`"
      >
        {{ lang.toUpperCase() }}
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import TranslationService from '@/services/translationService'
  
  const availableLanguages = TranslationService.getAvailableLanguages()
  const currentLanguage = ref(TranslationService.getCurrentLanguage())
  
  const changeLanguage = (lang: 'pl' | 'en') => {
    TranslationService.setLanguage(lang)
    currentLanguage.value = lang
    // Opcjonalnie: dodaj logikę odświeżenia interfejsu
    window.location.reload()
  }
  
  onMounted(() => {
    currentLanguage.value = TranslationService.getCurrentLanguage()
  })
  </script>
  
  <style scoped>
  .language-selector {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .language-selector button {
    background-color: transparent;
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .language-selector button.active {
    background-color: #4CAF50;
    color: white;
    border-color: #4CAF50;
  }
  
  .language-selector button:hover {
    background-color: #f0f0f0;
  }
  </style>