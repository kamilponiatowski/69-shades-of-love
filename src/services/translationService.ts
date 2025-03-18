import { APP_CONFIG } from '@/config'
import type { TranslationMap } from '@/types'

// Definiujemy typ Language na podstawie wartości w tablicy LANGUAGES
type Language = typeof APP_CONFIG.LANGUAGES[number]

class TranslationService {
  private translations: TranslationMap = {
    mainTitle: {
      pl: '69 Odcieni Miłości',
      en: '69 Shades of Love'
    },
    subtitle: {
      pl: 'Twoja Droga do Dbania o Siebie',
      en: 'Your Self-Care Journey'
    },
    aboutTitle: {
      pl: 'WTQ - Co Za Kwak!',
      en: 'WTQ - What The Quack!'
    },
    aboutContent: {
      pl: 'Cześć! Jestem cyfrową kaczką pływającą w wodach kreatywności, tworzącą cyfrowe produkty i dzielącą się narzędziami, wiedzą i wartością z niesamowitymi ludźmi takimi jak Ty.',
      en: 'Hi there! I\'m a digital duck paddling through the waters of creativity, crafting digital products, and sharing tools, knowledge, and value with awesome humans like you.'
    },
    supportButton: {
      pl: 'Wesprzyj Tę Kaczkę',
      en: 'Support This Duck'
    },
    achievements: {
      starter: {
        pl: 'Inicjator Samoopieki',
        en: 'Self-Care Starter'
      },
      warrior: {
        pl: 'Wojownik Dobrostanu',
        en: 'Wellness Warrior'
      },
      hero: {
        pl: 'Mistrz Harmonii',
        en: 'Harmony Hero'
      },
      master: {
        pl: 'Ekspert Równowagi',
        en: 'Balance Master'
      },
      supreme: {
        pl: 'Mistrz Samomiłości',
        en: 'Self-Love Supreme'
      }
    },
    categories: {
      physical: {
        pl: 'Serca Fizyczne',
        en: 'Physical Hearts'
      },
      mental: {
        pl: 'Serca Umysłowe',
        en: 'Mental Hearts'
      },
      personal: {
        pl: 'Serca Osobiste',
        en: 'Personal Hearts'
      },
      relationship: {
        pl: 'Serca Relacji',
        en: 'Relationship Hearts'
      }
    },
    progress: {
      pl: 'Twój Postęp',
      en: 'Your Progress'
    },
    streakDays: {
      pl: '{0} dni pod rząd!',
      en: '{0} day streak!'
    }
  }

  getCurrentLanguage(): Language {
    const savedLanguage = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.LANGUAGE)
    return (savedLanguage === 'pl' ? 'pl' : 'en') as Language
  }

  setLanguage(language: Language): void {
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.LANGUAGE, language)
  }

  translate(key: string, params?: Record<string, any>): string {
    const language = this.getCurrentLanguage()
    const keys = key.split('.')
    
    let translation: any = this.translations
    for (const k of keys) {
      translation = translation[k]
      if (!translation) return key
    }

    const languageTranslation = translation[language] || translation.en

    if (params) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(`{${k}}`, v),
        languageTranslation
      )
    }

    return languageTranslation
  }
  
  getAvailableLanguages(): Language[] {
    return [...APP_CONFIG.LANGUAGES]
  }
}

export default new TranslationService()