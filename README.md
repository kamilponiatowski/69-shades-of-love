# 69 Shades of Love: Self-Care Application

## Project Overview

The 69 Shades of Love is a comprehensive self-care tracking application designed to help users maintain and improve their physical, mental, personal, and relationship well-being through a structured, engaging approach.

## Modular Architecture

### Architecture Principles
- **Separation of Concerns**: Each module handles a specific aspect of the application
- **Dependency Injection**: Services are decoupled and can be easily maintained or replaced
- **Single Responsibility Principle**: Each class and service has a clear, focused purpose

### Core Modules

1. **Configuration Module** (`config.js`)
   - Centralized application constants
   - Color palette definitions
   - Global configuration settings

2. **Translation Service** (`translationService.js`)
   - Manages multi-language support
   - Handles text translations
   - Detects user's preferred language

3. **Storage Service** (`storageService.js`)
   - Manages local storage interactions
   - Handles data persistence
   - Provides methods for saving and loading application state

4. **Tasks Service** (`tasksService.js`)
   - Manages task-related operations
   - Tracks task completion
   - Calculates progress and statistics

5. **Achievement Service** (`achievementService.js`)
   - Manages achievement and milestone tracking
   - Generates achievement notifications
   - Handles special rewards

6. **Animation Service** (`animationService.js`)
   - Manages visual animations
   - Handles heart and confetti animations
   - Provides visual feedback for user interactions

7. **Jokes Service** (`jokesService.js`)
   - Manages duck-themed jokes
   - Provides audio playback
   - Supports multi-language joke selection

8. **Streak Service** (`streakService.js`)
   - Tracks user's consecutive day streaks
   - Manages streak-related calculations

9. **Main Application Controller** (`app.js`)
   - Coordinates interactions between services
   - Manages application state
   - Handles core application logic

## Key Features

- Multi-language support
- Comprehensive self-care task tracking
- Achievement and milestone system
- Persistent local storage
- Engaging animations and rewards
- Streak tracking

## Technology Stack

- Vue.js 3
- JavaScript (ES6+)
- Local Storage API

## Getting Started

### Prerequisites
- Node.js
- Vue.js 3
- Modern web browser

### Installation
1. Clone the repository
2. Install dependencies
3. Run the application

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

- Created with ❤️ by WTQ (What The Quack)
- Inspired by the journey of self-care and personal growth