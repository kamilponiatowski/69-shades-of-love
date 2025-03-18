<template>
    <div class="task-creator-modal" @click.self="close">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditMode ? 'Edytuj zadanie' : 'Nowe zadanie' }}</h2>
          <button @click="close" class="close-button">&times;</button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="saveTask">
            <div class="form-group">
              <label for="task-title">Tytuł</label>
              <input 
                id="task-title" 
                v-model="formData.title" 
                type="text" 
                required 
                maxlength="100"
                placeholder="Krótki, treściwy tytuł zadania"
              >
            </div>
            
            <div class="form-group">
              <label for="task-description">Opis</label>
              <textarea 
                id="task-description" 
                v-model="formData.description" 
                maxlength="250"
                rows="3"
                placeholder="Opcjonalny opis zadania"
              ></textarea>
            </div>
            
            <div class="modal-footer">
              <button type="button" @click="close" class="cancel-button">Anuluj</button>
              <button type="submit" class="save-button" :disabled="!formData.title">Zapisz</button>
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
    task: Task | null
    categoryType: string
  }>()
  
  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'save', task: Task): void
  }>()
  
  const isEditMode = computed(() => !!props.task)
  
  const formData = ref({
    id: '',
    title: '',
    description: '',
    category: props.categoryType as 'physical' | 'mental' | 'personal' | 'relationship',
    completed: false
  })
  
  onMounted(() => {
    if (props.task) {
      formData.value = { ...props.task }
    } else {
      // Nowe zadanie - ustaw tylko kategorię
      formData.value = {
        id: uuidv4(),
        title: '',
        description: '',
        category: props.categoryType as 'physical' | 'mental' | 'personal' | 'relationship',
        completed: false
      }
    }
  })
  
  const close = () => {
    emit('close')
  }
  
  const saveTask = () => {
    if (!formData.value.title.trim()) return
    
    emit('save', {
      id: formData.value.id || uuidv4(),
      title: formData.value.title.trim(),
      description: formData.value.description.trim(),
      category: formData.value.category,
      completed: formData.value.completed
    })
    
    close()
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
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    border-bottom: 1px solid #eee;
  }
  
  .modal-header h2 {
    margin: 0;
    font-size: 1.2rem;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted);
  }
  
  .modal-body {
    padding: var(--spacing-md);
  }
  
  .form-group {
    margin-bottom: var(--spacing-md);
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: var(--text-color);
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(196, 30, 58, 0.2);
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: var(--spacing-md);
  }
  
  .cancel-button {
    background-color: transparent;
    border: 1px solid #ddd;
    color: var(--text-muted);
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .cancel-button:hover {
    background-color: #f5f5f5;
  }
  
  .save-button {
    background-color: var(--primary-color);
    border: none;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .save-button:hover {
    background-color: #a01a30;
  }
  
  .save-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  </style>