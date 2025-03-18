// src/services/storageService.ts
import { APP_CONFIG } from '@/config';
import type { Category, StreakInfo } from '@/types';

class StorageService {
  private storageKeys = APP_CONFIG.storageKeys;

  saveTasks(categories: Category[]): void {
    try {
      localStorage.setItem(
        this.storageKeys.tasks, 
        JSON.stringify(categories)
      );
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  loadTasks(): Category[] | null {
    try {
      const savedTasks = localStorage.getItem(this.storageKeys.tasks);
      return savedTasks ? JSON.parse(savedTasks) : null;
    } catch (error) {
      console.error('Error loading tasks:', error);
      return null;
    }
  }

  saveStreak(streakInfo: StreakInfo): void {
    try {
      localStorage.setItem(
        this.storageKeys.streak, 
        JSON.stringify(streakInfo)
      );
    } catch (error) {
      console.error('Error saving streak:', error);
    }
  }

  loadStreak(): StreakInfo {
    try {
      const savedStreak = localStorage.getItem(this.storageKeys.streak);
      return savedStreak 
        ? JSON.parse(savedStreak) 
        : { days: 0, lastCheckDate: null };
    } catch (error) {
      console.error('Error loading streak:', error);
      return { days: 0, lastCheckDate: null };
    }
  }

  clearAllData(): void {
    try {
      localStorage.removeItem(this.storageKeys.tasks);
      localStorage.removeItem(this.storageKeys.streak);
      localStorage.removeItem(this.storageKeys.lastCheckDate);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }
}

export default new StorageService();