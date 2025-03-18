<template>
  <div 
    class="task-item" 
    :class="{ 
      'completed': task.completed, 
      [categoryType]: true 
    }"
  >
    <div class="checkbox-container">
      <input 
        type="checkbox" 
        :id="task.id"
        :checked="task.completed"
        @change="toggleComplete"
        class="task-checkbox"
      />
      <span class="checkmark"></span>
    </div>
    <label :for="task.id" class="task-label">
      <span class="task-title">{{ task.title }}</span>
      <span class="task-description">{{ task.description }}</span>
    </label>
    <div class="task-actions">
      <button 
        @click.stop="editTask" 
        class="action-button edit-button" 
        :disabled="task.completed"
        :aria-label="'Edytuj zadanie: ' + task.title"
      >
        ✏️
      </button>
      <button 
        @click.stop="swapTask" 
        class="action-button swap-button" 
        :disabled="task.completed"
        :aria-label="'Zamień zadanie: ' + task.title"
      >
        🔄
      </button>
      <button 
        @click.stop="deleteTask" 
        class="action-button delete-button"
        :aria-label="'Usuń zadanie: ' + task.title"
      >
        🗑️
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

const editTask = () => {
  if (!props.task.completed) {
    emit('edit-task', props.categoryType, props.task.id)
  }
}

const deleteTask = () => {
  emit('delete-task', props.categoryType, props.task.id)
}

const swapTask = () => {
  if (!props.task.completed) {
    emit('swap-task', props.categoryType, props.task.id)
  }
}
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
  position: relative;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px var(--shadow-light);
}

.task-item:hover .task-actions {
  opacity: 1;
  transform: translateX(0);
}

.checkbox-container {
  position: relative;
  margin-right: 15px;
  min-width: 22px;
  height: 22px;
  margin-top: 2px;
}

.task-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  border: 2px solid;
  transition: all 0.2s ease;
}

.physical .checkmark {
  border-color: var(--physical-color);
}

.mental .checkmark {
  border-color: var(--mental-color);
}

.personal .checkmark {
  border-color: var(--personal-color);
}

.relationship .checkmark {
  border-color: var(--relationship-color);
}

.task-checkbox:checked ~ .checkmark {
  background-color: currentColor;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.task-checkbox:checked ~ .checkmark:after {
  display: block;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.task-label {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  flex: 1;
  padding-right: 35px; /* Miejsce na przyciski akcji */
}

.task-title {
  font-weight: 500;
  margin-bottom: 3px;
  line-height: 1.3;
}

.task-description {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.completed {
  background-color: #f4f4f4;
}

.completed .task-title {
  text-decoration: line-through;
  color: #888;
}

.completed .task-description {
  text-decoration: line-through;
  color: #999;
}

/* Animation for completion */
.completed .checkmark {
  animation: pulse 0.6s ease-in-out;
}

.task-actions {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) translateX(10px);
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: all 0.3s ease;
}

.action-button {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.action-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.edit-button:hover {
  transform: scale(1.1);
}

.delete-button:hover {
  transform: scale(1.1);
  color: #ff3333;
}

.swap-button:hover {
  transform: scale(1.1) rotate(180deg);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 480px) {
  .task-actions {
    opacity: 0.7;
    transform: translateY(-50%) translateX(0);
  }
  
  .action-button {
    font-size: 0.9rem;
  }
}
</style>