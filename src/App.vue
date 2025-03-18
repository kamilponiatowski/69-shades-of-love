<template>
  <div id="app" class="container">
    <header>
      <h1>{{ title }}</h1>
      <nav>
        <LanguageSelector />
      </nav>
    </header>

    <main>
      <ProgressContainer 
        :completed-count="completedCount" 
        :total-tasks="totalTasks"
        :categories="categories"
      />
      <CategoryList 
        :categories="categories"
        @complete-task="completeTask"
      />
      <NewsletterEmbedded />
      <NewsletterPopup />
    </main>

    <footer>
      <p>&copy; 2024 69 Shades of Love</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
import ProgressContainer from '@/components/ProgressContainer.vue'
import CategoryList from '@/components/CategoryList.vue'
import NewsletterEmbedded from '@/components/NewsletterEmbedded.vue'
import NewsletterPopup from '@/components/NewsletterPopup.vue'
import TasksService from '@/services/tasksService'
import type { Category } from '@/types'

// Reactive title
const title = ref('69 Shades of Love')

// Computed properties from TasksService
const categories = computed<Category[]>(() => TasksService.getAllCategories())
const totalTasks = computed(() => TasksService.getTotalTasksCount())
const completedCount = computed(() => TasksService.getTotalCompletedTasksCount())

// Task completion method
const completeTask = (categoryType: string, taskId: string) => {
  TasksService.completeTask(categoryType, taskId)
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

footer {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #eee;
}
</style>