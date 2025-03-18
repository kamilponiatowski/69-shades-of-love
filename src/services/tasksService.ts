import { APP_CONFIG } from '@/config'
import type { Category, StreakInfo } from '@/types'

class StorageService {
  private storageKeys = APP_CONFIG.STORAGE_KEYS

  saveTasks(categories: Category[]): void {
    try {
      localStorage.setItem(
        this.storageKeys.TASKS, 
        JSON.stringify(categories)
      )
    } catch (error) {
      console.error('Error saving tasks:', error)
    }
  }

  loadTasks(): Category[] | null {
    try {
      const savedTasks = localStorage.getItem(this.storageKeys.TASKS)
      return savedTasks ? JSON.parse(savedTasks) : null
    } catch (error) {
      console.error('Error loading tasks:', error)
      return null
    }
  }

  saveStreak(streakInfo: StreakInfo): void {
    try {
      localStorage.setItem(
        this.storageKeys.STREAK, 
        JSON.stringify(streakInfo)
      )
    } catch (error) {
      console.error('Error saving streak:', error)
    }
  }

  loadStreak(): StreakInfo {
    try {
      const savedStreak = localStorage.getItem(this.storageKeys.STREAK)
      return savedStreak 
        ? JSON.parse(savedStreak) 
        : { days: 0, lastCheckDate: null }
    } catch (error) {
      console.error('Error loading streak:', error)
      return { days: 0, lastCheckDate: null }
    }
  }

  clearAllData(): void {
    try {
      localStorage.removeItem(this.storageKeys.TASKS)
      localStorage.removeItem(this.storageKeys.STREAK)
    } catch (error) {
      console.error('Error clearing data:', error)
    }
  }
}

export default new StorageService()