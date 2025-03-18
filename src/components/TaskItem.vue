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
  align-items: flex-start;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px var(--shadow-light);
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
</style>