import { ref } from 'vue'
import { StreakInfo, StreakServiceInterface } from '@/types'
import StorageService from './storageService'

class StreakService implements StreakServiceInterface {
  private streakInfo = ref<StreakInfo>({
    days: 0,
    lastCheckDate: null
  })

  constructor() {
    this.initializeStreak()
  }

  private initializeStreak(): void {
    const savedStreak = StorageService.loadStreak()
    this.streakInfo.value = savedStreak || {
      days: 0,
      lastCheckDate: null
    }
  }

  getStreakDays(): number {
    return this.streakInfo.value.days
  }

  updateStreak(completionDate: Date = new Date()): void {
    const today = completionDate.toDateString()
    const lastCheckDate = this.streakInfo.value.lastCheckDate

    if (!lastCheckDate) {
      // First day of tracking
      this.streakInfo.value = {
        days: 1,
        lastCheckDate: today
      }
      this.saveStreak()
      return
    }

    const lastDate = new Date(lastCheckDate)
    const timeDiff = completionDate.getTime() - lastDate.getTime()
    const dayDiff = Math.round(timeDiff / (1000 * 3600 * 24))

    if (dayDiff === 1) {
      // Consecutive day
      this.streakInfo.value.days++
    } else if (dayDiff > 1) {
      // Streak broken
      this.streakInfo.value.days = 1
    }

    this.streakInfo.value.lastCheckDate = today
    this.saveStreak()
  }

  private saveStreak(): void {
    StorageService.saveStreak(this.streakInfo.value)
  }

  resetStreak(): void {
    this.streakInfo.value = {
      days: 0,
      lastCheckDate: null
    }
    this.saveStreak()
  }
}

export default new StreakService()