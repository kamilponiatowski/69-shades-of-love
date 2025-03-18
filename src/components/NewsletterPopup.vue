<template>
    <div 
      v-if="isVisible" 
      class="newsletter-popup"
      @click.self="closePopup"
    >
      <div class="popup-content">
        <button 
          class="close-button" 
          @click="closePopup"
          aria-label="Zamknij newsletter"
        >
          ✕
        </button>
  
        <div class="popup-header">
          <DuckLogo class="duck-logo" />
          <h2>Dołącz do Naszego Stada! 🦆</h2>
          <p>Bądź na bieżąco z najlepszymi wskazówkami do samorozwoju</p>
        </div>
  
        <form @submit.prevent="submitNewsletter" class="newsletter-form">
          <input 
            type="email" 
            v-model="email"
            placeholder="Twój email" 
            required
            class="email-input"
          />
          <button type="submit" class="submit-button">
            Dołącz do stada!
          </button>
        </form>
  
        <div class="newsletter-benefits">
          <div class="benefit">
            <span>🌟</span>
            <p>Ekskluzywne treści</p>
          </div>
          <div class="benefit">
            <span>🚀</span>
            <p>Wskazówki rozwojowe</p>
          </div>
          <div class="benefit">
            <span>🤝</span>
            <p>Bez spamu</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import DuckLogo from '@/components/DuckLogo.vue'
  import NotificationService from '@/services/notificationService'
  
  const isVisible = ref(false)
  const email = ref('')
  
  const openPopup = () => {
    isVisible.value = true
  }
  
  const closePopup = () => {
    isVisible.value = false
  }
  
  const submitNewsletter = async () => {
    if (!email.value) return
  
    try {
      // TODO: Dodaj integrację z usługą mailową
      NotificationService.add({
        type: 'success',
        message: 'Dziękujemy za dołączenie do stada! 🦆'
      })
      
      // Reset formularza i zamknięcie popupu
      email.value = ''
      closePopup()
    } catch (error) {
      NotificationService.add({
        type: 'error',
        message: 'Coś poszło nie tak. Spróbuj ponownie.'
      })
    }
  }
  
  // Pokazuj popup co jakiś czas lub przy określonych warunkach
  onMounted(() => {
    // Przykład: pokaż popup po 5 sekundach
    const showDelay = setTimeout(() => {
      openPopup()
      clearTimeout(showDelay)
    }, 5000)
  
    // Opcjonalnie: popup przy opuszczaniu strony
    const exitIntentHandler = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        openPopup()
        window.removeEventListener('mouseleave', exitIntentHandler)
      }
    }
  
    window.addEventListener('mouseleave', exitIntentHandler)
  })
  </script>
  
  <style scoped>
  .newsletter-popup {
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
  
  .popup-content {
    background-color: var(--background-color);
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    padding: 30px;
    position: relative;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-color);
  }
  
  .duck-logo {
    width: 100px;
    height: 100px;
    margin: 0 auto 20px;
  }
  
  .popup-header h2 {
    color: var(--primary-color);
    margin-bottom: 10px;
  }
  
  .popup-header p {
    color: var(--text-muted);
    margin-bottom: 20px;
  }
  
  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .email-input {
    padding: 10px;
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
  }
  
  .submit-button {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #6A1B9A;
  }
  
  .newsletter-benefits {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .benefit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .benefit span {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .benefit p {
    color: var(--text-muted);
    font-size: 0.8rem;
  }
  </style>