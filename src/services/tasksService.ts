import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import StorageService from './storageService'
import { INITIAL_CATEGORIES } from '@/config'
import type { Category, Task } from '@/types'

class TasksService {
  private categories = ref<Category[]>([])

  constructor() {
    this.initializeTasks()
  }

  // Initialize tasks from storage or use defaults
  private initializeTasks(): void {
    const savedTasks = StorageService.loadTasks()
    
    if (savedTasks && Array.isArray(savedTasks)) {
      this.categories.value = savedTasks
    } else {
      // Initialize with default tasks if no saved data or invalid format
      this.categories.value = INITIAL_CATEGORIES
      this.saveTasks()
    }
  }

  // Save tasks to persistent storage
  private saveTasks(): void {
    StorageService.saveTasks(this.categories.value)
  }

  // Get all categories
  getAllCategories(): Category[] {
    return this.categories.value
  }

  // Get tasks for a specific category
  getTasksForCategory(categoryType: string): Task[] {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    return category ? category.tasks : []
  }

  // Find a specific task by ID within a category
  getTaskById(categoryType: string, taskId: string): Task | undefined {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    return category?.tasks.find(task => task.id === taskId)
  }

  // Mark a task as completed
  completeTask(categoryType: string, taskId: string): void {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (category) {
      const task = category.tasks.find(task => task.id === taskId)
      if (task) {
        task.completed = true
        this.saveTasks()
      }
    }
  }

  // Mark a task as not completed
  uncompleteTask(categoryType: string, taskId: string): void {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (category) {
      const task = category.tasks.find(task => task.id === taskId)
      if (task) {
        task.completed = false
        this.saveTasks()
      }
    }
  }

  // Generic function to add a task (supports both partial data and full Task objects)
  addTask(categoryType: string, taskDataOrTask: any): string {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (!category) return ''

    let newTask: Task;
    
    if (taskDataOrTask.id && taskDataOrTask.category) {
      // It's a complete Task object
      newTask = taskDataOrTask;
    } else {
      // It's task data that needs to be made into a Task
      newTask = {
        id: uuidv4(),
        completed: false,
        category: categoryType as 'physical' | 'mental' | 'personal' | 'relationship',
        ...taskDataOrTask
      };
    }

    category.tasks.push(newTask)
    this.saveTasks()
    
    return newTask.id
  }

  // Update a task with a complete task object
  updateTask(categoryType: string, task: Task): boolean {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (!category) return false

    const taskIndex = category.tasks.findIndex(t => t.id === task.id)
    if (taskIndex === -1) return false

    category.tasks[taskIndex] = { ...task }
    this.saveTasks()
    return true
  }
  
  // Update a task by ID with partial data
  updateTaskById(categoryType: string, taskId: string, updates: Partial<Task>): boolean {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (!category) return false

    const taskIndex = category.tasks.findIndex(task => task.id === taskId)
    if (taskIndex === -1) return false

    category.tasks[taskIndex] = {
      ...category.tasks[taskIndex],
      ...updates
    }

    this.saveTasks()
    return true
  }
  
  // Replace a task with a completely new task
  replaceTask(categoryType: string, taskId: string, newTask: Task): boolean {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (!category) return false

    const taskIndex = category.tasks.findIndex(task => task.id === taskId)
    if (taskIndex === -1) return false

    category.tasks[taskIndex] = newTask
    this.saveTasks()
    return true
  }

  // Delete a task
  deleteTask(categoryType: string, taskId: string): boolean {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (!category) return false

    const initialLength = category.tasks.length
    category.tasks = category.tasks.filter(task => task.id !== taskId)
    
    if (category.tasks.length !== initialLength) {
      this.saveTasks()
      return true
    }
    
    return false
  }

  // Get total number of tasks
  getTotalTasksCount(): number {
    return this.categories.value.reduce((total, category) => {
      return total + category.tasks.length
    }, 0)
  }

  // Get total number of completed tasks
  getTotalCompletedTasksCount(): number {
    return this.categories.value.reduce((total, category) => {
      return total + category.tasks.filter(task => task.completed).length
    }, 0)
  }

  // Get completion percentage for a category
  getCategoryProgress(categoryType: string): number {
    const category = this.categories.value.find(cat => cat.type === categoryType)
    if (!category) return 0

    const totalTasks = category.tasks.length
    if (totalTasks === 0) return 0

    const completedTasks = category.tasks.filter(task => task.completed).length
    return Math.round((completedTasks / totalTasks) * 100)
  }

  // Reset all tasks to initial state
  resetAllTasks(): void {
    this.categories.value = INITIAL_CATEGORIES
    this.saveTasks()
  }
}

// Create a single instance of the service
export default new TasksService()