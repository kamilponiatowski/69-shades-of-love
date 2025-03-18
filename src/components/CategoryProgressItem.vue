<template>
  <div class="category-progress-item">
    <div class="category-info">
      <div 
        class="category-icon"
        :class="categoryType"
      >
        {{ getCategoryIcon(categoryType) }}
      </div>
      <div class="category-details">
        <div class="category-label">
          {{ categoryLabel }}
        </div>
        <div class="category-progress-bar">
          <div 
            class="category-progress-fill" 
            :class="categoryType"
            :style="{ width: `${categoryProgress}%` }"
          ></div>
        </div>
      </div>
    </div>
    <div 
      class="category-percentage" 
      :class="categoryType"
    >
      {{ categoryProgress }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TranslationService from '@/services/translationService'
import type { Category } from '@/types'

const props = defineProps<{
  category: Category
}>()

const categoryType = computed(() => props.category.type)

const categoryLabel = computed(() => {
  const key = `categories.${props.category.type}`;
  return TranslationService.translate(key);
})

const categoryProgress = computed(() => {
  const completedTasks = props.category.tasks.filter(task => task.completed).length
  const totalTasks = props.category.tasks.length
  return Math.round((completedTasks / totalTasks) * 100) || 0
})

const getCategoryIcon = (type: string) => {
  const icons: Record<string, string> = {
    physical: '💪',
    mental: '🧠',
    personal: '❤️',
    relationship: '👥'
  }
  return icons[type] || '✅'
}
</script>

<style scoped>
.category-progress-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.category-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 16px;
}

.category-icon.physical {
  background-color: rgba(255, 159, 41, 0.2);
}

.category-icon.mental {
  background-color: rgba(126, 217, 87, 0.2);
}

.category-icon.personal {
  background-color: rgba(255, 217, 102, 0.2);
}

.category-icon.relationship {
  background-color: rgba(255, 151, 183, 0.2);
}

.category-details {
  flex: 1;
}

.category-label {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 5px;
}

.category-progress-bar {
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  width: 100%;
  overflow: hidden;
}

.category-progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.category-progress-fill.physical {
  background-color: var(--physical-color);
}

.category-progress-fill.mental {
  background-color: var(--mental-color);
}

.category-progress-fill.personal {
  background-color: var(--personal-color);
}

.category-progress-fill.relationship {
  background-color: var(--relationship-color);
}

.category-percentage {
  font-weight: 600;
  font-size: 0.9rem;
  min-width: 40px;
  text-align: right;
}

.category-percentage.physical {
  color: var(--physical-color);
}

.category-percentage.mental {
  color: var(--mental-color);
}

.category-percentage.personal {
  color: var(--personal-color);
}

.category-percentage.relationship {
  color: var(--relationship-color);
}
</style>