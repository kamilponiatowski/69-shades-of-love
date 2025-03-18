import { COLOR_PALETTE } from '@/config'

class AnimationService {
  private heartContainer: HTMLElement | null = null

  initializeHeartContainer(): void {
    this.heartContainer = document.querySelector('.heart-container')
  }

  createHeart(category: string): void {
    if (!this.heartContainer) {
      this.initializeHeartContainer()
    }

    if (!this.heartContainer) return

    const heart = document.createElement('div')
    heart.className = 'heart'
    
    const colorMap: Record<string, string> = {
      'physical': COLOR_PALETTE.PHYSICAL,
      'mental': COLOR_PALETTE.MENTAL,
      'personal': COLOR_PALETTE.PERSONAL,
      'relationship': COLOR_PALETTE.RELATIONSHIP
    }
    heart.style.backgroundColor = colorMap[category] || COLOR_PALETTE.MAIN
    
    const x = Math.random() * window.innerWidth
    heart.style.left = `${x}px`
    heart.style.bottom = '0'
    
    this.heartContainer.appendChild(heart)
    
    setTimeout(() => {
      heart.classList.add('animate')
    }, 10)
    
    setTimeout(() => {
      heart.remove()
    }, 4000)
  }

  createConfetti(): void {
    const colors = [
      COLOR_PALETTE.PHYSICAL, 
      COLOR_PALETTE.MENTAL, 
      COLOR_PALETTE.PERSONAL, 
      COLOR_PALETTE.RELATIONSHIP, 
      COLOR_PALETTE.MAIN
    ]
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.left = `${Math.random() * window.innerWidth}px`
        
        document.body.appendChild(confetti)
        
        setTimeout(() => {
          confetti.remove()
        }, 3000)
      }, i * 50)
    }
  }

  triggerMultiHeartAnimation(category: string): void {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.createHeart(category)
      }, i * 300)
    }
  }

  playSound(soundUrl: string): void {
    try {
      const audio = new Audio(soundUrl)
      audio.play().catch(error => {
        console.warn('Błąd odtwarzania dźwięku:', error)
      })
    } catch (error) {
      console.error('Niepowodzenie odtwarzania dźwięku:', error)
    }
  }
}

export default new AnimationService()