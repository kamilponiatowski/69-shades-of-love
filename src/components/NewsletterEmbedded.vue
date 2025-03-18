<template>
    <div class="newsletter-embedded">
      <div class="newsletter-content">
        <div class="newsletter-header">
          <DuckLogo class="duck-logo" />
          <div class="header-text">
            <h3>Dołącz do Naszego Stada Rozwoju!</h3>
            <p>Otrzymuj cotygodniowe wskazówki do samorozwoju</p>
          </div>
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
            Dołącz
          </button>
        </form>
  
        <div class="newsletter-promise">
          <p>🦆 Bez spamu, tylko wartościowe treści!</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import DuckLogo from '@/components/DuckLogo.vue'
  import NotificationService from '@/services/notificationService'
  
  const email = ref('')
  
  const submitNewsletter = async () => {
    if (!email.value) return
  
    try {
      // TODO: Dodaj integrację z usługą mailową
      NotificationService.add({
        type: 'success',
        message: 'Dziękujemy za dołączenie do stada! 🦆'
      })
      
      // Reset formularza
      email.value = ''
    } catch (error) {
      NotificationService.add({
        type: 'error',
        message: 'Coś poszło nie tak. Spróbuj ponownie.'
      })
    }
  }
  </script>
  
  <style scoped>
  .newsletter-embedded {
    background-color: var(--background-color);
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 20px auto;
  }
  
  .newsletter-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .duck-logo {
    width: 80px;
    height: 80px;
    margin-right: 15px;
  }
  
  .header-text h3 {
    color: var(--primary-color);
    margin-bottom: 5px;
  }
  
  .header-text p {
    color: var(--text-muted);
    font-size: 0.9rem;
  }
  
  .newsletter-form {
    display: flex;
    margin-bottom: 15px;
  }
  
  .email-input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid var(--secondary-color);
    border-radius: 5px 0 0 5px;
  }
  
  .submit-button {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #6A1B9A;
  }
  
  .newsletter-promise {
    text-align: center;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  </style>