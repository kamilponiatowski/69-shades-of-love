class PerformanceTracker {
    private static instance: PerformanceTracker
    private startTimes: Map<string, number> = new Map()
    private performanceLogs: Array<{
      operation: string
      duration: number
      timestamp: Date
    }> = []
  
    private constructor() {}
  
    public static getInstance(): PerformanceTracker {
      if (!PerformanceTracker.instance) {
        PerformanceTracker.instance = new PerformanceTracker()
      }
      return PerformanceTracker.instance
    }
  
    start(operationName: string): void {
      this.startTimes.set(operationName, performance.now())
    }
  
    end(operationName: string): number {
      const startTime = this.startTimes.get(operationName)
      
      if (!startTime) {
        console.warn(`Nie znaleziono czasu rozpoczęcia dla: ${operationName}`)
        return -1
      }
  
      const endTime = performance.now()
      const duration = endTime - startTime
  
      this.performanceLogs.push({
        operation: operationName,
        duration,
        timestamp: new Date()
      })
  
      this.startTimes.delete(operationName)
  
      return duration
    }
  
    getPerformanceLogs() {
      return [...this.performanceLogs]
    }
  
    clearLogs() {
      this.performanceLogs = []
    }
  
    logSlowOperations(thresholdMs: number = 100) {
      return this.performanceLogs
        .filter(log => log.duration > thresholdMs)
        .sort((a, b) => b.duration - a.duration)
    }
  }
  
  export default PerformanceTracker.getInstance()