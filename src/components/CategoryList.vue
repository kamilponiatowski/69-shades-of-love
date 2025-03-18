<template>
  <div class="category-list">
    <div 
      v-for="category in categories" 
      :key="category.type" 
      class="category-section"
      :class="category.type"
    >
      <div class="category-header">
        <h2>{{ categoryTitle(category.type) }}</h2>
        <button 
          class="add-task-button" 
          @click="openTaskCreator(category.type)"
          :aria-label="`Dodaj nowe zadanie do kategorii ${categoryTitle(category.type)}`"
        >
          <span class="add-icon">+</span>
          <span class="add-text">Dodaj zadanie</span>
        </button>
      </div>
      
      <div class="tasks-container">
        <TaskItem
          v-for="(task, index) in visibleTasks(category)"
          :key="task.id"
          :task="task"
          :category-type="category.type"
          @toggle-complete="toggleTaskCompletion"
          @edit-task="editTask"
          @delete-task="deleteTask"
          @swap-task="swapTask"
        />
        
        <div v-if="category.tasks.length > defaultVisibleTasks" class="show-more-container">
          <button 
            class="show-more-button"
            @click="toggleShowMore(category.type)"
            :aria-label="isExpanded(category.type) ? 'Pokaż mniej zadań' : 'Pokaż więcej zadań'"
          >
            {{ isExpanded(category.type) ? 'Pokaż mniej' : `Pokaż więcej (${category.tasks.length - defaultVisibleTasks})` }}
            <span class="arrow-icon" :class="{ 'expanded': isExpanded(category.type) }">
              ▼
            </span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modal do tworzenia/edycji zadań -->
    <TaskCreatorModal
      v-if="showTaskCreator"
      :task="currentEditingTask"
      :category-type="currentCategoryType"
      @close="showTaskCreator = false"
      @save="saveTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TaskItem from './TaskItem.vue'
import TaskCreatorModal from './TaskCreatorModal.vue'
import { useTaskStore } from '@/stores/taskStore'
import TranslationService from '@/services/translationService'
import TasksService from '@/services/tasksService'
import { v4 as uuidv4 } from 'uuid'
import type { Task, Category } from '@/types'

const taskStore = useTaskStore()
const defaultVisibleTasks = 5 // Domyślna liczba widocznych zadań

// Stan dla zwijania/rozwijania kategorii
const expandedCategories = ref<Set<string>>(new Set())

// Stan dla modalu tworzenia/edycji zadań
const showTaskCreator = ref(false)
const currentEditingTask = ref<Task | null>(null)
const currentCategoryType = ref<string>('')

const categories = computed(() => taskStore.categories)

const categoryTitle = (type: string) => {
  const titles: Record<string, string> = {
    physical: TranslationService.translate('categories.physical'),
    mental: TranslationService.translate('categories.mental'),
    personal: TranslationService.translate('categories.personal'),
    relationship: TranslationService.translate('categories.relationship')
  }
  return titles[type] || type
}

const emit = defineEmits<{
  (e: 'complete-task', categoryType: string, taskId: string): void
}>()

// Funkcja zwracająca widoczne zadania (wszystkie lub tylko domyślną liczbę)
const visibleTasks = (category: Category) => {
  if (isExpanded(category.type)) {
    return category.tasks
  } else {
    return category.tasks.slice(0, defaultVisibleTasks)
  }
}

// Sprawdza czy kategoria jest rozwinięta
const isExpanded = (categoryType: string) => {
  return expandedCategories.value.has(categoryType)
}

// Przełącza stan rozwinięcia kategorii
const toggleShowMore = (categoryType: string) => {
  if (isExpanded(categoryType)) {
    expandedCategories.value.delete(categoryType)
  } else {
    expandedCategories.value.add(categoryType)
  }
}

// Obsługa kompletności zadania
const toggleTaskCompletion = (categoryType: string, taskId: string) => {
  const task = findTask(categoryType, taskId)
  if (task) {
    if (!task.completed) {
      emit('complete-task', categoryType, taskId)
    } else {
      taskStore.uncompleteTask(categoryType, taskId)
    }
  }
}

// Otwarcie modalu edycji zadania
const editTask = (categoryType: string, taskId: string) => {
  const task = findTask(categoryType, taskId)
  if (task) {
    currentEditingTask.value = { ...task }
    currentCategoryType.value = categoryType
    showTaskCreator.value = true
  }
}

// Otwarcie modalu tworzenia nowego zadania
const openTaskCreator = (categoryType: string) => {
  currentEditingTask.value = null
  currentCategoryType.value = categoryType
  showTaskCreator.value = true
}

// Usunięcie zadania
const deleteTask = (categoryType: string, taskId: string) => {
  if (confirm('Czy na pewno chcesz usunąć to zadanie?')) {
    taskStore.deleteTask(categoryType, taskId)
    TasksService.deleteTask(categoryType, taskId)
  }
}

// Zamiana zadania na inne
const swapTask = (categoryType: string, taskId: string) => {
  // Przykładowa pula zadań zastępczych
  const replacementTasks = {
    physical: [
      { title: "Zrób 20 przysiadów", description: "Szybka dawka ruchu dla nóg" },
      { title: "5 minut rozciągania", description: "Popraw elastyczność mięśni" },
      { title: "Spacer na świeżym powietrzu", description: "Minimum 10 minut" }
    ],
    mental: [
      { title: "Rozwiąż łamigłówkę", description: "Trening dla umysłu" },
      { title: "Mindfulness", description: "5 minut świadomego oddychania" },
      { title: "Naucz się czegoś nowego", description: "Spędź 15 minut na nauce" }
    ],
    personal: [
      { title: "Czas na hobby", description: "Zrób coś tylko dla siebie" },
      { title: "Kompletna cisza", description: "10 minut bez bodźców" },
      { title: "Ulubiona muzyka", description: "Posłuchaj piosenki, która cię uskrzydla" }
    ],
    relationship: [
      { title: "Zadzwoń do przyjaciela", description: "Porozmawiaj z bliską osobą" },
      { title: "Komplement dla kogoś", description: "Powiedz komuś coś miłego" },
      { title: "Wspólna aktywność", description: "Zrób coś razem z bliską osobą" }
    ]
  }

  // Losowanie nowego zadania
  const categoryPool = replacementTasks[categoryType as keyof typeof replacementTasks] || []
  if (categoryPool.length > 0) {
    const randomIndex = Math.floor(Math.random() * categoryPool.length)
    const newTaskData = categoryPool[randomIndex]
    
    const newTask: Task = {
      id: uuidv4(),
      title: newTaskData.title,
      description: newTaskData.description,
      completed: false,
      category: categoryType as 'physical' | 'mental' | 'personal' | 'relationship'
    }
    
    taskStore.replaceTask(categoryType, taskId, newTask)
    TasksService.replaceTask(categoryType, taskId, newTask)
  }
}

// Zapisanie zadania (nowego lub edytowanego)
const saveTask = (task: Task) => {
  const isNewTask = !findTask(task.category, task.id)
  
  if (isNewTask) {
    taskStore.addTask(task.category, task)
    TasksService.addTask(task.category, task)
  } else {
    taskStore.updateTask(task.category, task)
    TasksService.updateTask(task.category, task)
  }
}

// Pomocnicza funkcja do odnajdywania zadania
const findTask = (categoryType: string, taskId: string) => {
  const category = taskStore.categories.find(cat => cat.type === categoryType)
  return category?.tasks.find(task => task.id === taskId)
}
</script>

<style scoped>
.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.category-section {
  background-color: white;
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  box-shadow: 0 4px 15px var(--shadow-light);
  border-top: 5px solid;
}

.category-section.physical {
  border-color: var(--physical-color);
}

.category-section.mental {
  border-color: var(--mental-color);
}

.category-section.personal {
  border-color: var(--personal-color);
}

.category-section.relationship {
  border-color: var(--relationship-color);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.category-header h2 {
  margin: 0;
  text-transform: uppercase;
  font-size: 1.2rem;
  position: relative;
}

.category-header h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 50px;
  height: 3px;
}

.physical h2 {
  color: var(--physical-color);
}
.physical h2::after {
  background-color: var(--physical-color);
}

.mental h2 {
  color: var(--mental-color);
}
.mental h2::after {
  background-color: var(--mental-color);
}

.personal h2 {
  color: var(--personal-color);
}
.personal h2::after {
  background-color: var(--personal-color);
}

.relationship h2 {
  color: var(--relationship-color);
}
.relationship h2::after {
  background-color: var(--relationship-color);
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add-task-button {
  display: flex;
  align-items: center;
  background: none;
  border: 1px dashed #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.9rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-task-button:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.add-icon {
  font-size: 1.2rem;
  margin-right: 5px;
}

.show-more-container {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.show-more-button {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.show-more-button:hover {
  background-color: rgba(196, 30, 58, 0.1);
}

.arrow-icon {
  display: inline-block;
  margin-left: 5px;
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.arrow-icon.expanded {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .category-list {
    grid-template-columns: 1fr;
  }
  
  .add-text {
    display: none;
  }
  
  .add-icon {
    margin-right: 0;
  }
}
</style>