// jokesService.js
import { ref } from 'vue'
import TranslationService from './translationService'
import type { JokesData, JokesServiceInterface } from '@/types/jokes'

class JokesService implements JokesServiceInterface {
  private jokes: JokesData = {
    en: [
        "What do you call a duck that steals? A ROBBER DUCKY!",
        "Why did the duck cross the road? To prove he wasn't chicken!",
        "What do you call a duck that's good at math? A CALCUL-QUACKER!",
        "How does a duck pay its bills? With BILL-FOLDS!",
        "What do ducks like to eat with soup? QUACKERS!",
        "What did the duck say when it bought lipstick? Put it on my BILL!",
        "Why don't ducks tell jokes when they fly? Because they would QUACK up!",
        "What has a bill but never pays? A DUCK!",
        "How can you tell if a duck is buying a car? It keeps asking about the DOWN payment!",
        "What happens when ducks fly upside down? They QUACK up!"
    ],
    pl: [
        "Jak się nazywa kaczka, która kradnie? ZŁODZIEJSKA KACZKA!",
        "Dlaczego kaczka przeszła przez drogę? Żeby udowodnić, że nie jest kurczakiem!",
        "Jak nazywa się kaczka dobra z matematyki? KALKU-KWAK!",
        "Jak kaczka płaci rachunki? DZIOBEM!",
        "Co kaczki lubią jeść do zupy? KRAKRA-KERSY!",
        "Co powiedziała kaczka, kupując szminkę? Nałóż ją na mój DZIÓB!",
        "Dlaczego kaczki nie opowiadają żartów podczas lotu? Bo by się ZAKWAKAŁY!",
        "Co ma dziób, ale nigdy nie płaci? KACZKA!",
        "Jak poznać, że kaczka kupuje samochód? Ciągle pyta o PIE-RZASTY!",
        "Co się dzieje, gdy kaczki latają do góry nogami? ZAKWAKUJĄ SIĘ!"
    ]
  }

  private audioElement: HTMLAudioElement | null = null

  getRandomJoke(language?: string): string {
    const selectedLanguage = language || TranslationService.getCurrentLanguage()
    const jokes = this.jokes[selectedLanguage as keyof JokesData] || this.jokes.en
    return jokes[Math.floor(Math.random() * jokes.length)]
  }

  playDuckSound(): void {
    try {
      if (!this.audioElement) {
        this.audioElement = new Audio("https://www.soundjay.com/animals/sounds/duck-quack-1.mp3")
      }
      
      this.audioElement.currentTime = 0
      this.audioElement.play().catch((err: Error) => {
        console.warn("Audio play prevented:", err.message)
      })
    } catch (error) {
      console.error("Error playing duck sound:", error)
    }
  }
}

export default new JokesService()

//# sourceMappingURL=jokesService.js.map