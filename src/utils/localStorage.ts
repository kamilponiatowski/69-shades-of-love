class LocalStorageUtils {
    static setItem(key: string, value: any): void {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('Błąd zapisu do localStorage:', error)
      }
    }
  
    static getItem<T>(key: string, defaultValue: T): T {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
      } catch (error) {
        console.error('Błąd odczytu z localStorage:', error)
        return defaultValue
      }
    }
  
    static removeItem(key: string): void {
      localStorage.removeItem(key)
    }
  
    static clear(): void {
      localStorage.clear()
    }
  }
  
  export default LocalStorageUtils