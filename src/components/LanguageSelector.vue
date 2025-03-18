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
import { APP_CONFIG } from '@/config'

const availableLanguages = APP_CONFIG.LANGUAGES
const currentLanguage = ref(TranslationService.getCurrentLanguage())

type Language = typeof APP_CONFIG.LANGUAGES[number]

const changeLanguage = (lang: Language) => {
  TranslationService.setLanguage(lang)
  currentLanguage.value = lang
  // Odświeżmy stronę aby zastosować zmiany językowe
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
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.language-selector button:hover:not(.active) {
  background-color: #f0f0f0;
}
</style>