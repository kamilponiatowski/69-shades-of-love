<template>
    <div 
      class="task-item" 
      :class="{ 
        'completed': task.completed, 
        [categoryType]: true 
      }"
    >
      <input 
        type="checkbox" 
        :id="task.id"
        :checked="task.completed"
        @change="toggleComplete"
        class="task-checkbox"
      />
      <label :for="task.id" class="task-label">
        <span class="task-title">{{ task.title }}</span>
        <span class="task-description">{{ task.description }}</span>
      </label>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Task } from '@/types'
  
  const props = defineProps<{
    task: Task
    categoryType: string
  }>()
  
  const emit = defineEmits<{
    (e: 'toggle-complete', categoryType: string, taskId: string): void
  }>()
  
  const toggleComplete = () => {
    emit('toggle-complete', props.categoryType, props.task.id)
  }
  </script>
  
  <style scoped>
  .task-item {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    transition: background-color 0.3s ease;
  }
  
  .task-checkbox {
    margin-right: 15px;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .task-checkbox:checked::after {
    content: '✓';
    color: white;
  }
  
  .physical .task-checkbox { 
    border-color: #FF9F29; 
  }
  .mental .task-checkbox { 
    border-color: #7ED957; 
  }
  .personal .task-checkbox { 
    border-color: #FFD966; 
  }
  .relationship .task-checkbox { 
    border-color: #FF97B7; 
  }
  
  .task-checkbox:checked {
    background-color: currentColor;
  }
  
  .task-label {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  
  .task-title {
    font-weight: bold;
  }
  
  .task-description {
    font-size: 0.8rem;
    color: #666;
  }
  
  .completed .task-title,
  .completed .task-description {
    text-decoration: line-through;
    color: #888;
  }
  </style>