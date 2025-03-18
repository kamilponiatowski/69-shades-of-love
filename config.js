export default {
    APP_NAME: '69 Shades of Love',
    VERSION: '2.0.0',
    ENVIRONMENT: process.env.NODE_ENV || 'development',
    API_URL: process.env.API_URL || 'https://api.example.com',
    FEATURE_FLAGS: {
      enableDuckJokes: true,
      enableStreakTracking: true,
      enableAchievements: true
    },
    TASK_CATEGORIES: [
      'physical', 
      'mental', 
      'personal', 
      'relationship'
    ],
    STORAGE_KEYS: {
      TASKS: 'selfCareData_v2',
      STREAK: 'streakData_v2',
      LANGUAGE: 'app_language'
    },
    MILESTONES: [5, 10, 25, 40, 69]
  }