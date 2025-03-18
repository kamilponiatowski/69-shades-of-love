export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  category: 'physical' | 'mental' | 'personal' | 'relationship'
}

export interface Category {
  id: string
  name: string
  type: 'physical' | 'mental' | 'personal' | 'relationship'
  tasks: Task[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  threshold: number
}

export interface BilingualTranslation {
  pl: string
  en: string
}

export interface TranslationMap {
  mainTitle: BilingualTranslation
  subtitle: BilingualTranslation
  aboutTitle: BilingualTranslation
  aboutContent: BilingualTranslation
  supportButton: BilingualTranslation
  achievements: {
    starter: BilingualTranslation
    warrior: BilingualTranslation
    hero: BilingualTranslation
    master: BilingualTranslation
    supreme: BilingualTranslation
  }
  categories: {
    physical: BilingualTranslation
    mental: BilingualTranslation
    personal: BilingualTranslation
    relationship: BilingualTranslation
  }
  progress: BilingualTranslation
  streakDays: BilingualTranslation
}

export interface StreakInfo {
  days: number
  lastCheckDate: string | null
}

export interface StreakServiceInterface {
  getStreakDays(): number
  updateStreak(completionDate: Date): void
  resetStreak(): void
}