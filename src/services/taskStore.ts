import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { INITIAL_CATEGORIES } from '@/config'
import type { Category, Task } from '@/types'

// Define the store without explicit type parameters to allow proper inference
export const useTaskStore = defineStore('tasks', {
  state: () => ({
    categories: INITIAL_CATEGORIES as Category[]
  }),
  
  getters: {
    totalTasksCount: (state) => {
      return state.categories.reduce(
        (total, category) => total + category.tasks.length, 
        0
      )
    },
    
    completedTasksCount: (state) => {
      return state.categories.reduce(
        (total, category) => total + category.tasks.filter(task => task.completed).length, 
        0
      )
    }
  },
  
  actions: {
    // Mark a task as completed
    completeTask(categoryType: string, taskId: string) {
      const category = this.categories.find(cat => cat.type === categoryType)
      if (category) {
        const task = category.tasks.find(t => t.id === taskId)
        if (task) {
          task.completed = true
        }
      }
    },
    
    // Mark a task as not completed
    uncompleteTask(categoryType: string, taskId: string) {
      const category = this.categories.find(cat => cat.type === categoryType)
      if (category) {
        const task = category.tasks.find(t => t.id === taskId)
        if (task) {
          task.completed = false
        }
      }
    },
    
    // Add a new task from partial data
    addTask(categoryType: string, taskData: any) {
      const category = this.categories.find(cat => cat.type === categoryType)
      if (!category) return
      
      // Handle different input types
      if (taskData.id && taskData.category) {
        // It's already a Task object
        category.tasks.push(taskData)
      } else {
        // It's data to create a new task
        category.tasks.push({
          id: uuidv4(),
          completed: false,
          ...taskData
        })
      }
    },
    
    // Replace a task with a completely new one
    replaceTask(categoryType: string, taskId: string, updatedTask: Task) {
      const category = this.categories.find(cat => cat.type === categoryType)
      if (category) {
        const taskIndex = category.tasks.findIndex(t => t.id === taskId)
        if (taskIndex !== -1) {
          category.tasks[taskIndex] = updatedTask
        }
      }
    },
    
    // Update a task with a complete Task object
    updateTask(categoryType: string, task: Task) {
      const category = this.categories.find(cat => cat.type === categoryType)
      if (category) {
        const taskIndex = category.tasks.findIndex(t => t.id === task.id)
        if (taskIndex !== -1) {
          category.tasks[taskIndex] = { ...task }
        }
      }
    },
    
    // Update a task by ID with partial data
    updateTaskById(categoryType: string, taskId: string, updates: Partial<Task>) {
      const category = this.categories.find(cat => cat.type === categoryType)
      if (category) {
        const taskIndex = category.tasks.findIndex(t => t.id === taskId)
        if (taskIndex !== -1) {
          category.tasks[taskIndex] = {
            ...category.tasks[taskIndex],
            ...updates
          }
        }
      }
    },
    
    // Delete a task
    deleteTask(categoryType: string, taskId: string) {
      const category = this.categories.find(cat => cat.type === categoryType)
      if (category) {
        category.tasks = category.tasks.filter(task => task.id !== taskId)
      }
    }
  }
})