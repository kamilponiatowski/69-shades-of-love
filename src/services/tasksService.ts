import { ref, computed } from 'vue'
import { INITIAL_CATEGORIES } from '@/config'
import type { Category, Task } from '@/types'
import StorageService from './storageService'

class TasksService {
  private categories = ref<Category[]>([])

  constructor() {
    this.initializeTasks()
  }

  private initializeTasks(): void {
    const savedTasks = StorageService.loadTasks()
    this.categories.value = savedTasks || INITIAL_CATEGORIES
  }

  getAllCategories(): Category[] {
    return this.categories.value
  }

  getTotalTasksCount(): number {
    return this.categories.value.reduce(
      (total, category) => total + category.tasks.length, 
      0
    )
  }

  getTotalCompletedTasksCount(): number {
    return this.categories.value.reduce(
      (total, category) => total + category.tasks.filter(task => task.completed).length, 
      0
    )
  }

  completeTask(categoryType: string, taskId: string): void {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (category) {
      const task = category.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = true
        this.saveTasks()
      }
    }
  }

  uncompleteTask(categoryType: string, taskId: string): void {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (category) {
      const task = category.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = false
        this.saveTasks()
      }
    }
  }

  getCategoryProgress(categoryType: string): number {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (!category) return 0
    
    const completedTasks = category.tasks.filter(task => task.completed).length
    return Math.round((completedTasks / category.tasks.length) * 100) || 0
  }

  resetAllTasks(): void {
    this.categories.value = JSON.parse(JSON.stringify(INITIAL_CATEGORIES))
    this.saveTasks()
  }

  private saveTasks(): void {
    StorageService.saveTasks(this.categories.value)
  }
}

export default new TasksService()