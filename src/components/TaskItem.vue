<template>
  <div 
    class="task-item" 
    :class="{ 
      'completed': task.completed, 
      [categoryType]: true 
    }"
  >
    <div class="task-content">
      <input 
        type="checkbox" 
        :id="task.id"
        :checked="task.completed"
        @change="toggleComplete"
        class="task-checkbox"
      />
      <label :for="task.id" class="task-label">
        <span class="task-title">{{ task.title }}</span>
        <span v-if="task.description" class="task-description">{{ task.description }}</span>
      </label>
    </div>
    
    <div class="task-actions">
      <button 
        class="action-button edit-button" 
        @click="$emit('edit-task', categoryType, task.id)"
        :aria-label="'Edytuj zadanie: ' + task.title"
      >
        <span class="action-icon">✎</span>
      </button>
      
      <button 
        class="action-button swap-button" 
        @click="$emit('swap-task', categoryType, task.id)"
        :aria-label="'Zamień zadanie: ' + task.title"
      >
        <span class="action-icon">↻</span>
      </button>
      
      <button 
        class="action-button delete-button" 
        @click="$emit('delete-task', categoryType, task.id)"
        :aria-label="'Usuń zadanie: ' + task.title"
      >
        <span class="action-icon">×</span>
      </button>
    </div>
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
  (e: 'edit-task', categoryType: string, taskId: string): void
  (e: 'delete-task', categoryType: string, taskId: string): void
  (e: 'swap-task', categoryType: string, taskId: string): void
}>()

const toggleComplete = () => {
  emit('toggle-complete', props.categoryType, props.task.id)
}
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: var(--border-radius);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px var(--shadow-light);
  transition: all 0.3s ease;
  overflow: hidden;
}

.task-item:hover {
  box-shadow: 0 4px 8px var(--shadow-light);
}

.task-content {
  display: flex;
  align-items: flex-start;
  flex: 1;
  min-width: 0; /* Prevent text overflow */
}

.task-checkbox {
  margin-right: 15px;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.task-checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: white;
}

.physical .task-checkbox { 
  border-color: var(--physical-color); 
}
.mental .task-checkbox { 
  border-color: var(--mental-color); 
}
.personal .task-checkbox { 
  border-color: var(--personal-color); 
}
.relationship .task-checkbox { 
  border-color: var(--relationship-color); 
}

.task-checkbox:checked {
  background-color: currentColor;
}

.physical .task-checkbox:checked { 
  background-color: var(--physical-color); 
}
.mental .task-checkbox:checked { 
  background-color: var(--mental-color); 
}
.personal .task-checkbox:checked { 
  background-color: var(--personal-color); 
}
.relationship .task-checkbox:checked { 
  background-color: var(--relationship-color); 
}

.task-label {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  flex: 1;
  min-width: 0; /* Prevent text overflow */
}

.task-title {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-description {
  font-size: 0.8rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.completed .task-title,
.completed .task-description {
  text-decoration: line-through;
  color: var(--text-muted);
}

.task-actions {
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.task-item:hover .task-actions {
  opacity: 1;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.action-icon {
  font-size: 14px;
}

.edit-button {
  color: #3498db;
}

.edit-button:hover {
  background-color: rgba(52, 152, 219, 0.1);
}

.swap-button {
  color: #f39c12;
}

.swap-button:hover {
  background-color: rgba(243, 156, 18, 0.1);
}

.delete-button {
  color: #e74c3c;
}

.delete-button:hover {
  background-color: rgba(231, 76, 60, 0.1);
}

@media (max-width: 768px) {
  .task-actions {
    opacity: 1;
  }
}
</style>