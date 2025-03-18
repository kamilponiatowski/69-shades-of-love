<template>
  <div class="progress-container">
    <div class="progress-header">
      <h2>{{ $t('progress') }}</h2>
      <div class="progress-stats">
        <span class="completed-count">{{ completedTasks }}</span>
        <span class="separator">/</span>
        <span class="total-count">{{ totalTasks }}</span>
        <span class="percentage">({{ progressPercentage }}%)</span>
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
    </div>

    <div class="category-progress">
      <CategoryProgressItem 
        v-for="category in categories" 
        :key="category.type" 
        :category="category"
      />
    </div>
    
    <div v-if="streakDays > 0" class="streak-container">
      <div class="streak-icon">🔥</div>
      <div class="streak-text">
        {{ $t('streakDays', { 0: streakDays }) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CategoryProgressItem from './CategoryProgressItem.vue'
import { useTaskStore } from '@/stores/taskStore'
import TranslationService from '@/services/translationService'
import StreakService from '@/services/streakService'

// Translation helper
const $t = (key: string, params?: any) => TranslationService.translate(key, params)

const taskStore = useTaskStore()

const categories = computed(() => taskStore.categories)
const totalTasks = computed(() => taskStore.totalTasksCount)
const completedTasks = computed(() => taskStore.completedTasksCount)
const progressPercentage = computed(() => {
  return Math.round((completedTasks.value / totalTasks.value) * 100) || 0
})
const streakDays = computed(() => StreakService.getStreakDays())
</script>

<style scoped>
.progress-container {
  background-color: white;
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  box-shadow: 0 5px 15px var(--shadow-light);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.progress-header h2 {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.progress-stats {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.completed-count {
  color: var(--primary-color);
  font-weight: bold;
}

.total-count {
  color: var(--text-color);
}

.percentage {
  color: var(--text-muted);
  font-size: 1rem;
}

.progress-bar-container {
  margin-bottom: var(--spacing-md);
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

.category-progress {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.streak-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm);
  background-color: #FFF8DC;
  border-radius: var(--border-radius);
  border: 1px dashed #FFD700;
}

.streak-icon {
  font-size: 1.5rem;
  animation: flame 1s infinite alternate;
}

.streak-text {
  font-weight: 500;
  color: #FF4500;
}

@keyframes flame {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}

@media (max-width: 768px) {
  .progress-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .category-progress {
    grid-template-columns: 1fr;
  }
}
</style>