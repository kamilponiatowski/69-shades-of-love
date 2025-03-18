<template>
  <div class="category-list">
    <div 
      v-for="category in categories" 
      :key="category.type" 
      class="category-section"
      :class="category.type"
    >
      <h2>{{ categoryTitle(category.type) }}</h2>
      <div class="tasks-container">
        <TaskItem
          v-for="task in category.tasks"
          :key="task.id"
          :task="task"
          :category-type="category.type"
          @toggle-complete="toggleTaskCompletion"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TaskItem from './TaskItem.vue'
import { useTaskStore } from '@/stores/taskStore'
import TranslationService from '@/services/translationService'

const taskStore = useTaskStore()

const categories = computed(() => taskStore.categories)

const categoryTitle = (type: string) => {
  const titles: Record<string, string> = {
    physical: TranslationService.translate('categories.physical'),
    mental: TranslationService.translate('categories.mental'),
    personal: TranslationService.translate('categories.personal'),
    relationship: TranslationService.translate('categories.relationship')
  }
  return titles[type] || type
}

const emit = defineEmits<{
  (e: 'complete-task', categoryType: string, taskId: string): void
}>()

const toggleTaskCompletion = (categoryType: string, taskId: string) => {
  const task = findTask(categoryType, taskId)
  if (task) {
    if (!task.completed) {
      emit('complete-task', categoryType, taskId)
    } else {
      taskStore.uncompleteTask(categoryType, taskId)
    }
  }
}

const findTask = (categoryType: string, taskId: string) => {
  const category = taskStore.categories.find(cat => cat.type === categoryType)
  return category?.tasks.find(task => task.id === taskId)
}
</script>

<style scoped>
.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.category-section {
  background-color: white;
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  box-shadow: 0 4px 15px var(--shadow-light);
  border-top: 5px solid;
}

.category-section.physical {
  border-color: var(--physical-color);
}

.category-section.mental {
  border-color: var(--mental-color);
}

.category-section.personal {
  border-color: var(--personal-color);
}

.category-section.relationship {
  border-color: var(--relationship-color);
}

.category-section h2 {
  margin-bottom: var(--spacing-md);
  text-align: center;
  text-transform: uppercase;
  font-size: 1.2rem;
  position: relative;
  padding-bottom: 10px;
}

.category-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
}

.physical h2 {
  color: var(--physical-color);
}
.physical h2::after {
  background-color: var(--physical-color);
}

.mental h2 {
  color: var(--mental-color);
}
.mental h2::after {
  background-color: var(--mental-color);
}

.personal h2 {
  color: var(--personal-color);
}
.personal h2::after {
  background-color: var(--personal-color);
}

.relationship h2 {
  color: var(--relationship-color);
}
.relationship h2::after {
  background-color: var(--relationship-color);
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 768px) {
  .category-list {
    grid-template-columns: 1fr;
  }
}
</style>