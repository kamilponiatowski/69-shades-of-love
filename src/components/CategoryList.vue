<template>
    <div class="category-list">
      <div 
        v-for="category in categories" 
        :key="category.type" 
        class="category-section"
      >
        <h2 :class="category.type">{{ categoryTitle(category.type) }}</h2>
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
  
  const taskStore = useTaskStore()
  
  const categories = computed(() => taskStore.categories)
  
  const categoryTitle = (type: string) => {
    const titles: Record<string, string> = {
      physical: 'Serca Fizyczne',
      mental: 'Serca Umysłowe',
      personal: 'Serca Osobiste',
      relationship: 'Serca Relacji'
    }
    return titles[type] || type
  }
  
  const toggleTaskCompletion = (categoryType: string, taskId: string) => {
    const task = findTask(categoryType, taskId)
    if (task && !task.completed) {
      taskStore.completeTask(categoryType, taskId)
    } else {
      taskStore.uncompleteTask(categoryType, taskId)
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
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .category-section {
    background-color: white;
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .category-section h2 {
    margin-bottom: 15px;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.2rem;
  }
  
  .physical { color: #FF9F29; }
  .mental { color: #7ED957; }
  .personal { color: #FFD966; }
  .relationship { color: #FF97B7; }
  </style>