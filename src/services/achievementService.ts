import { ref } from 'vue'
import type { Achievement, Category } from '@/types'

class AchievementService {
  private achievements = ref<Achievement[]>([
    {
      id: 'starter',
      title: 'Inicjator Samoopieki',
      description: 'Ukończono pierwsze 5 aktywności samorozwojowych',
      threshold: 5
    },
    {
      id: 'warrior',
      title: 'Wojownik Dobrostanu',
      description: 'Ukończono 10 aktywności samorozwojowych',
      threshold: 10
    },
    {
      id: 'hero',
      title: 'Mistrz Harmonii',
      description: 'Ukończono 25 aktywności samorozwojowych',
      threshold: 25
    },
    {
      id: 'master',
      title: 'Ekspert Równowagi',
      description: 'Ukończono 40 aktywności samorozwojowych',
      threshold: 40
    },
    {
      id: 'supreme',
      title: 'Mistrz Samomiłości',
      description: 'Ukończono wszystkie 69 aktywności samorozwojowych',
      threshold: 69
    }
  ])

  checkAchievements(completedTasksCount: number): Achievement | null {
    return this.achievements.value.find(
      achievement => achievement.threshold === completedTasksCount
    ) || null
  }

  checkCategoryMilestones(
    categories: Category[], 
    thresholdPercentage = 40
  ): Record<string, number> {
    const milestones: Record<string, number> = {}

    categories.forEach(category => {
      const completedTasks = category.tasks.filter(task => task.completed).length
      const totalTasks = category.tasks.length
      const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

      if (progressPercentage >= thresholdPercentage) {
        milestones[category.type] = progressPercentage
      }
    })

    return milestones
  }

  getFinalReward(completedTasksCount: number): { 
    title: string; 
    description: string 
  } | null {
    if (completedTasksCount === 69) {
      return {
        title: 'Mistrz Samoopieki',
        description: 'Gratulacje! Ukończyłeś wszystkie 69 aktywności samorozwojowych. Twoje zaangażowanie w osobisty rozwój jest inspirujące!'
      }
    }
    return null
  }
}

export default new AchievementService()