<template>
    <div class="progress-container">
      <div class="progress-header">
        <h2>Postęp Twojej Podróży Samorozwoju</h2>
        <div class="progress-stats">
          {{ completedTasks }}/{{ totalTasks }} ({{ progressPercentage }}%)
        </div>
      </div>
  
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
  
      <div class="category-progress">
        <CategoryProgress 
          v-for="category in categories" 
          :key="category.type" 
          :category="category"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import CategoryProgressItem from './CategoryProgressItem.vue'
  import { useTaskStore } from '@/stores/taskStore'
  
  const taskStore = useTaskStore()
  
  const categories = computed(() => taskStore.categories)
  const totalTasks = computed(() => taskStore.totalTasksCount)
  const completedTasks = computed(() => taskStore.completedTasksCount)
  const progressPercentage = computed(() => {
    return Math.round((completedTasks.value / totalTasks.value) * 100) || 0
  })
  </script>
  
  <style scoped>
  .progress-container {
    background-color: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .progress-bar {
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, #FF9F29, #7ED957, #FFD966, #FF97B7);
    transition: width 0.5s ease;
  }
  </style>