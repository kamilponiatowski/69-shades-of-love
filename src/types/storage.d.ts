declare module '@/services/storageService' {
    import type { Category, StreakInfo } from '@/types'
  
    export interface StorageServiceInterface {
      saveTasks(categories: Category[]): void
      loadTasks(): Category[] | null
      saveStreak(streakInfo: StreakInfo): void
      loadStreak(): StreakInfo
      clearAllData(): void
    }
  
    const storageService: StorageServiceInterface
    export default storageService
  }