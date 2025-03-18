class DateUtils {
    static formatDate(date: Date, lang: 'pl' | 'en' = 'en'): string {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
  
      return date.toLocaleDateString(lang, options)
    }
  
    static getDaysDifference(date1: Date, date2: Date): number {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime())
      return Math.ceil(timeDiff / (1000 * 3600 * 24))
    }
  
    static isToday(date: Date): boolean {
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    }
  }
  
  export default DateUtils