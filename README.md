# 69 Shades of Love - Self-Care Tracking Application

![69 Shades of Love Banner](https://i.ibb.co/k2TMGWD/banner.png)

A comprehensive self-care tracking application designed to help users maintain and improve their physical, mental, personal, and relationship well-being through a structured, engaging approach.

## ✨ Features

- **Multi-Language Support**: Switch between English and Polish
- **Category-Based Tasks**: Organized into Physical, Mental, Personal, and Relationship categories
- **Progress Tracking**: Visual progress bars and completion statistics
- **Achievement System**: Get rewarded for reaching milestones
- **Persistence**: All data saves to local storage automatically
- **Streak Tracking**: Maintain your daily self-care routine
- **Interactive Elements**: Engaging animations and duck jokes

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/69-shades-of-love.git
   cd 69-shades-of-love
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🏗️ Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── assets/         # Application assets
│   │   └── styles/     # Global CSS styles
│   ├── components/     # Vue components
│   ├── config/         # Application configuration
│   ├── services/       # Service modules
│   ├── stores/         # Pinia stores
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.vue         # Main application component
│   └── main.ts         # Application entry point
├── index.html          # HTML entry
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🧩 Modular Architecture

- **Configuration Module**: Centralized application constants
- **Translation Service**: Manages multi-language support (EN/PL)
- **Storage Service**: Manages local storage persistence
- **Tasks Service**: Handles task-related operations
- **Achievement Service**: Tracks milestones and achievements
- **Animation Service**: Provides visual feedback animations
- **Jokes Service**: Delivers duck-themed jokes
- **Streak Service**: Tracks consecutive day streaks

## 🧠 The Philosophy Behind the App

The "69 Shades of Love" application is built around the concept that self-care is not just about physical health, but about achieving balance across multiple dimensions of well-being. The number 69 represents the harmony and reciprocity needed between different aspects of our lives.

Each category is represented by heart icons in different colors, symbolizing that love for oneself comes in many forms and should be expressed through various types of care.

## 🛠️ Technology Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia for state management
- Vite as build tool
- CSS with custom variables for theming

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🦆 Acknowledgments

- Created with ❤️ by WTQ (What The Quack)
- Inspired by the journey of self-care and personal growth