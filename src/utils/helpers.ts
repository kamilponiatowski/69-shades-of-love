export function debounce<F extends (...args: any[]) => any>(
    func: F, 
    delay: number = 300
  ): (...args: Parameters<F>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<F>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  
  export function generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  export function truncateText(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  export function calculatePercentage(part: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
  }
  
  export function groupBy<T>(
    array: T[], 
    key: (item: T) => string
  ): Record<string, T[]> {
    return array.reduce((result, currentValue) => {
      const groupKey = key(currentValue);
      
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      
      result[groupKey].push(currentValue);
      
      return result;
    }, {} as Record<string, T[]>);
  }
  
  export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
  
  export function sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }