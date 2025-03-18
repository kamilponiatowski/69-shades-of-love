import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { INITIAL_CATEGORIES } from '@/config'
import type { Category, Task } from '@/types'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    categories: INITIAL_CATEGORIES as Category[]
  }),
  
  getters: {
    totalTasksCount(): number {
      return this.categories.reduce(
        (total, category) => total + category.tasks.length, 
        0
      )
    },
    
    completedTasksCount(): number {
      return this.categories.reduce(
        (total, category) => total + category.tasks.filter(task => task.completed).length, 
        0
      )
    }
  },
  
  actions: {
    completeTask(categoryType: string, taskId: string) {
      const category = this.categories.find(cat => cat.type === categoryType)
      if (category) {
        const task = category.tasks.find(t => t.id === taskId)
        if (task) {
          task.completed = true
        }
      }
    },
    
    uncompleteTask(categoryType: string, taskId: string) {
      const category = this.categories.find(cat => cat.type === categoryType)
      if (category) {
        const task = category.tasks.find(t => t.id === taskId)
        if (task) {
          task.completed = false
        }
      }
    },
    
    addTask(categoryType: string, taskData: Omit<Task, 'id' | 'completed'>) {
      const category = this.categories.find(cat => cat.type === categoryType)
      if (category) {
        category.tasks.push({
          id: uuidv4(),
          completed: false,
          ...taskData
        })
      }
    }
  }
})