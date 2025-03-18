import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StreakInfo } from '@/types'

export const useStreakStore = defineStore('streak', () => {
  const state = ref<StreakInfo>({
    days: 0,
    lastCheckDate: null
  })

  function updateStreak(completionDate: Date = new Date()) {
    const today = completionDate.toDateString()
    
    if (!state.value.lastCheckDate) {
      state.value = {
        days: 1,
        lastCheckDate: today
      }
      return
    }

    const lastDate = new Date(state.value.lastCheckDate)
    const timeDiff = completionDate.getTime() - lastDate.getTime()
    const dayDiff = Math.round(timeDiff / (1000 * 3600 * 24))

    if (dayDiff === 1) {
      state.value.days++
    } else if (dayDiff > 1) {
      state.value.days = 1
    }

    state.value.lastCheckDate = today
  }

  function resetStreak() {
    state.value = {
      days: 0,
      lastCheckDate: null
    }
  }

  return {
    state,
    updateStreak,
    resetStreak
  }
}, {
  persist: {
    storage: localStorage
  }
})