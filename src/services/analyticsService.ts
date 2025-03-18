import type { Task, Category } from '@/types'

class AnalyticsService {
  calculateCategoryProgress(category: Category): number {
    const completedTasks = category.tasks.filter(task => task.completed)
    return Math.round(
      (completedTasks.length / category.tasks.length) * 100
    )
  }

  generateWeeklyReport(categories: Category[]): Record<string, any> {
    const categoryProgressMap = categories.map(category => ({
      name: category.name,
      progress: this.calculateCategoryProgress(category)
    }))

    const totalProgress = Math.round(
      categoryProgressMap.reduce((sum, cat) => sum + cat.progress, 0) / 
      categories.length
    )

    return {
      weeklyProgress: totalProgress,
      categoryBreakdown: categoryProgressMap,
      bestPerformingCategory: categoryProgressMap.reduce(
        (prev, current) => 
          (prev.progress > current.progress) ? prev : current
      )
    }
  }

  identifyMostChallenginTasks(categories: Category[]): Task[] {
    const allTasks = categories.flatMap(category => category.tasks)
    
    return allTasks
      .filter(task => !task.completed)
      .sort((a, b) => {
        // Można dodać dodatkowe kryteria sortowania
        return a.title.localeCompare(b.title)
      })
      .slice(0, 5) // Pierwsze 5 najtrudniejszych zadań
  }
}

export default new AnalyticsService()