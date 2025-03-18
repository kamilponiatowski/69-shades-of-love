<template>
    <div class="category-progress-item">
      <div class="category-label">
        {{ categoryLabel }}
      </div>
      <div 
        class="category-percentage" 
        :style="{ color: categoryColor }"
      >
        {{ categoryProgress }}%
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { COLOR_PALETTE } from '@/config'
  
  const props = defineProps<{
    category: {
      type: string
      tasks: Array<{completed: boolean}>
    }
  }>()
  
  const categoryLabel = computed(() => {
    const labels: Record<string, string> = {
      physical: 'Fizyczne',
      mental: 'Umysłowe', 
      personal: 'Osobiste',
      relationship: 'Relacje'
    }
    return labels[props.category.type] || props.category.type
  })
  
  const categoryColor = computed(() => {
    const colors: Record<string, string> = {
      physical: COLOR_PALETTE.PHYSICAL,
      mental: COLOR_PALETTE.MENTAL,
      personal: COLOR_PALETTE.PERSONAL,
      relationship: COLOR_PALETTE.RELATIONSHIP
    }
    return colors[props.category.type] || COLOR_PALETTE.MAIN
  })
  
  const categoryProgress = computed(() => {
    const completedTasks = props.category.tasks.filter(task => task.completed).length
    const totalTasks = props.category.tasks.length
    return Math.round((completedTasks / totalTasks) * 100) || 0
  })
  </script>
  
  <style scoped>
  .category-progress-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  
  .category-label {
    font-size: 0.9rem;
    text-transform: uppercase;
  }
  
  .category-percentage {
    font-weight: bold;
    font-size: 1rem;
  }
  </style>