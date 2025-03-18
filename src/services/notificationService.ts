import { ref } from 'vue'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'error'
  message: string
  duration?: number
}

class NotificationService {
  private notifications = ref<Notification[]>([])

  add(notification: Omit<Notification, 'id'>) {
    const id = `notify_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const newNotification: Notification = {
      id,
      duration: 5000,
      ...notification
    }

    this.notifications.value.push(newNotification)

    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        this.remove(id)
      }, newNotification.duration)
    }

    return id
  }

  remove(id: string) {
    this.notifications.value = this.notifications.value.filter(
      notification => notification.id !== id
    )
  }

  getNotifications() {
    return this.notifications.value
  }

  clear() {
    this.notifications.value = []
  }
}

export default new NotificationService()