export interface JokesData {
    en: string[]
    pl: string[]
  }
  
  export interface JokesServiceInterface {
    getRandomJoke(language?: string): string
    playDuckSound(): void
  }