import type { Task, Category } from '@/types'

export class ValidationUtils {
  static validateTask(task: Task): boolean {
    const titleValidation = this.validateTitle(task.title)
    const descriptionValidation = this.validateDescription(task.description)
    const categoryValidation = this.validateCategory(task.category)

    return titleValidation && descriptionValidation && categoryValidation
  }

  private static validateTitle(title: string): boolean {
    return title.trim().length >= 3 && title.trim().length <= 100
  }

  private static validateDescription(description: string): boolean {
    return description.trim().length <= 250
  }

  private static validateCategory(category: string): boolean {
    const validCategories = ['physical', 'mental', 'personal', 'relationship']
    return validCategories.includes(category)
  }

  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
  }

  static validateCategoryStructure(category: Category): boolean {
    return (
      category.id.length > 0 &&
      category.name.length > 0 &&
      category.tasks.every(this.validateTask)
    )
  }
}