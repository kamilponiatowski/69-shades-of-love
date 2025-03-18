<template>
  <div class="heart-container"></div>
  <div id="app" class="container">
    <header>
      <div class="logo-container">
        <DuckLogo class="duck-logo" />
        <h1>{{ title }}</h1>
      </div>
      <nav>
        <div class="nav-controls">
          <button @click="showSettings = true" class="settings-button">
            ⚙️ Ustawienia
          </button>
          <LanguageSelector />
        </div>
      </nav>
    </header>

    <main>
      <ProgressContainer />
      <StreakTracker />
      <CategoryList 
        @complete-task="handleTaskCompletion"
      />
    </main>

    <NotificationContainer />
    
    <AchievementModal
      v-if="showAchievement && currentAchievement"
      :achievement="currentAchievement"
      @close="showAchievement = false"
    />
    
    <DuckJokePopup
      v-if="showDuckJoke"
      :joke="currentJoke"
      @close="showDuckJoke = false"
    />
    
    <SettingsModal
      v-if="showSettings"
      @close="showSettings = false"
    />

    <footer>
      <p>&copy; 2024 What The Quack</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import DuckLogo from '@/components/DuckLogo.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
import ProgressContainer from '@/components/ProgressContainer.vue'
import CategoryList from '@/components/CategoryList.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import AchievementModal from '@/components/AchievementModal.vue'
import DuckJokePopup from '@/components/DuckJokePopup.vue'
import SettingsModal from '@/components/SettingsModal.vue'
import StreakTracker from '@/components/StreakTracker.vue'
import AchievementService from '@/services/achievementService'
import JokesService from '@/services/jokesService'
import AnimationService from '@/services/animationService'
import StreakService from '@/services/streakService'
import TasksService from '@/services/tasksService'
import type { Achievement } from '@/types'

// Store
const taskStore = useTaskStore()

// Reactive state
const title = ref('69 Shades of Love')
const showAchievement = ref(false)
const currentAchievement = ref<Achievement | null>(null)
const showDuckJoke = ref(false)
const currentJoke = ref('')
const showSettings = ref(false)

// Computed values
const completedTasksCount = computed(() => taskStore.completedTasksCount)

// Task completion handler
const handleTaskCompletion = (categoryType: string, taskId: string) => {
  // Używamy zarówno store (dla reaktywności UI), jak i serwisu (dla trwałego zapisu)
  taskStore.completeTask(categoryType, taskId)
  TasksService.completeTask(categoryType, taskId)
  
  AnimationService.triggerMultiHeartAnimation(categoryType)
  
  // Update streak
  StreakService.updateStreak()
  
  // Check for achievements
  const achievement = AchievementService.checkAchievements(completedTasksCount.value)
  if (achievement) {
    currentAchievement.value = achievement
    showAchievement.value = true
    
    // Show confetti for major achievements
    if (achievement.threshold >= 10) {
      AnimationService.createConfetti()
    }
  }
  
  // Random chance to show duck joke (20%)
  if (Math.random() < 0.2) {
    currentJoke.value = JokesService.getRandomJoke()
    showDuckJoke.value = true
    JokesService.playDuckSound()
  }
}

onMounted(() => {
  AnimationService.initializeHeartContainer()
})
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--shadow-light);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.duck-logo {
  width: 60px;
  height: 60px;
}

h1 {
  font-size: 2.2rem;
  color: var(--primary-color);
}

main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  min-height: calc(100vh - 180px);
}

footer {
  text-align: center;
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  color: var(--text-muted);
  font-size: 0.9rem;
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.settings-button {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: transparent;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.settings-button:hover {
  background-color: #f0f0f0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--shadow-light);
}
</style>