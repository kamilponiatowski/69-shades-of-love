<template>
    <div class="task-creator-modal" @click.self="close">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edytuj zadanie' : 'Dodaj nowe zadanie' }}</h2>
          <button @click="close" aria-label="Zamknij">✕</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveTask">
            <div class="form-group">
              <label for="task-category">Kategoria:</label>
              <select 
                id="task-category" 
                v-model="taskForm.category" 
                class="form-input"
                :class="taskForm.category"
                required
              >
                <option value="">Wybierz kategorię</option>
                <option value="physical">Fizyczne</option>
                <option value="mental">Umysłowe</option>
                <option value="personal">Osobiste</option>
                <option value="relationship">Relacje</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="task-title">Tytuł zadania:</label>
              <input 
                id="task-title" 
                type="text" 
                v-model="taskForm.title" 
                class="form-input"
                required
                maxlength="50"
                placeholder="Np. Poranna medytacja"
              >
            </div>
            
            <div class="form-group">
              <label for="task-description">Opis zadania:</label>
              <textarea 
                id="task-description" 
                v-model="taskForm.description" 
                class="form-input"
                rows="3"
                maxlength="200"
                placeholder="Np. 10 minut medytacji tuż po przebudzeniu"
              ></textarea>
            </div>
            
            <div class="form-actions">
              <button type="button" @click="close" class="cancel-button">Anuluj</button>
              <button type="submit" class="save-button">{{ isEditing ? 'Zapisz zmiany' : 'Dodaj zadanie' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { v4 as uuidv4 } from 'uuid'
  import type { Task } from '@/types'
  
  const props = defineProps<{
    task?: Task | null
    categoryType?: string
  }>()
  
  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'save', task: Task): void
  }>()
  
  // Określamy czy to tryb edycji czy tworzenia nowego zadania
  const isEditing = computed(() => !!props.task)
  
  // Formularz z danymi zadania
  const taskForm = ref({
    id: '',
    title: '',
    description: '',
    category: props.categoryType || '',
    completed: false
  })
  
  // Inicjalizacja formularza
  onMounted(() => {
    if (props.task) {
      taskForm.value = {
        id: props.task.id,
        title: props.task.title,
        description: props.task.description,
        category: props.task.category,
        completed: props.task.completed
      }
    }
  })
  
  // Zapisywanie zadania
  const saveTask = () => {
    const task: Task = {
      id: taskForm.value.id || uuidv4(),
      title: taskForm.value.title,
      description: taskForm.value.description,
      category: taskForm.value.category as 'physical' | 'mental' | 'personal' | 'relationship',
      completed: taskForm.value.completed
    }
    
    emit('save', task)
    close()
  }
  
  // Zamykanie modalu
  const close = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  .task-creator-modal {
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
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-color);
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: var(--font-family);
    font-size: 16px;
  }
  
  .form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 3px rgba(196, 30, 58, 0.3);
  }
  
  select.form-input {
    cursor: pointer;
  }
  
  .form-input.physical:focus {
    border-color: var(--physical-color);
    box-shadow: 0 0 3px rgba(255, 159, 41, 0.3);
  }
  
  .form-input.mental:focus {
    border-color: var(--mental-color);
    box-shadow: 0 0 3px rgba(126, 217, 87, 0.3);
  }
  
  .form-input.personal:focus {
    border-color: var(--personal-color);
    box-shadow: 0 0 3px rgba(255, 217, 102, 0.3);
  }
  
  .form-input.relationship:focus {
    border-color: var(--relationship-color);
    box-shadow: 0 0 3px rgba(255, 151, 183, 0.3);
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 25px;
  }
  
  .cancel-button {
    background-color: #f1f1f1;
    color: #666;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .cancel-button:hover {
    background-color: #e5e5e5;
  }
  
  .save-button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .save-button:hover {
    background-color: #a0172e;
  }
  </style>