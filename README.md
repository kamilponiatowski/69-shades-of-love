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

## 📊 Components

### App.vue
The main container component that orchestrates the entire application. It manages global state, handles achievements, animations, and renders all major UI components. It also coordinates interaction between various services.

### CategoryList.vue
Renders all self-care categories as separate sections. Each category displays its own set of tasks with completion checkboxes. The component uses custom styling for each category type (physical, mental, personal, relationship).

### CategoryProgressItem.vue
Shows progress information for a specific category, including a category-specific icon, label, and percentage-based progress bar. Progress is calculated based on the ratio of completed tasks to total tasks.

### ProgressContainer.vue
Displays overall progress information including the percentage of completed tasks, a visual progress bar, and individual category progress items. Acts as the central dashboard for users to track their self-care journey.

### TaskItem.vue
Represents an individual self-care task with a custom checkbox, title, and description. Features completion animation and styling that updates based on task completion status. Each task has category-specific styling.

### AchievementModal.vue
A modal component that displays achievement information when the user reaches milestones. Shows a trophy icon, achievement title, and description with congratulatory messaging.

### DuckJokePopup.vue
A fun, light-hearted popup that randomly appears after completing tasks. Displays duck-themed jokes with animation effects. Helps maintain user engagement through humor.

### StreakTracker.vue
Tracks and displays the user's "streak" of consecutive days with completed tasks. Features a flame icon with animation to visually represent the user's dedication to self-care.

### SettingsModal.vue
A modal interface for changing application settings like language selection and data management. Provides options to reset all app data if needed.

### LanguageSelector.vue
A simple component that allows users to switch between available languages (English and Polish). Supports internationalization throughout the application.

### NotificationContainer.vue
Manages and displays transient notifications to the user. Supports different types of notifications (success, warning, error) with corresponding styling.

### DuckLogo.vue
Renders the application's duck-themed SVG logo. Provides brand identity and a playful visual element to the app.

## 🛠️ Services

### achievementService.ts
Manages all aspects of user achievements and milestone tracking. Defines thresholds for achievements and checks when they should be awarded based on completed tasks count. Also handles category-specific milestone checking.

```typescript
// Example: Check if user reached any achievement
const achievement = AchievementService.checkAchievements(completedTasksCount);
if (achievement) {
  // Show achievement modal
}
```

### animationService.ts
Controls visual feedback animations throughout the application. Creates heart animations when tasks are completed, generates confetti for achievements, and manages other visual effects that enhance user experience.

```typescript
// Example: Create heart animations when completing a task
AnimationService.triggerMultiHeartAnimation('physical');
```

### jokesService.ts
Manages duck-themed jokes in multiple languages. Provides random jokes and handles the playback of duck sound effects. Adds an element of fun and surprise to keep users engaged.

```typescript
// Example: Get a random joke in the current language
const joke = JokesService.getRandomJoke();
```

### notificationService.ts
Handles the creation, display, and removal of notification messages. Supports different notification types (success, warning, error) and auto-dismissal timing.

```typescript
// Example: Show a success notification
NotificationService.add({
  type: 'success',
  message: 'Task completed successfully!'
});
```

### storageService.ts
Manages data persistence using browser's localStorage. Handles saving and loading of task data, streak information, and user preferences. Provides methods for data serialization and deserialization.

```typescript
// Example: Save tasks to localStorage
StorageService.saveTasks(categories);
```

### streakService.ts
Tracks the user's consecutive days of app usage. Updates, calculates, and maintains streak count based on daily task completion. Provides motivation for daily self-care habits.

```typescript
// Example: Update streak when a task is completed
StreakService.updateStreak();
```

### tasksService.ts
The core service that manages all task-related operations. Handles task completion, retrieval, category management, and task statistics. Coordinates with storage service for data persistence.

```typescript
// Example: Mark a task as complete
TasksService.completeTask('mental', 'task-123');
```

### translationService.ts
Handles internationalization throughout the application. Manages translations for all UI elements, provides language switching functionality, and maintains the current language selection.

```typescript
// Example: Translate a key with parameters
const text = TranslationService.translate('streakDays', { 0: 5 });
```

## 🧩 State Management

### taskStore.ts
Pinia store that manages the central state of all tasks and categories. Provides reactive access to task data, computed properties for statistics, and actions for modifying tasks.

```typescript
// Example: Access store in a component
const taskStore = useTaskStore();
const completedCount = computed(() => taskStore.completedTasksCount);
```

### streakStore.ts
Manages the streak tracking state using Pinia. Stores and provides reactive access to the current streak count and the last check date. Automatically persists to localStorage.

```typescript
// Example: Update streak in store
const streakStore = useStreakStore();
streakStore.updateStreak();
```

## 🎨 Styling

### variables.css
Defines global CSS variables for consistent theming throughout the application. Includes color palette definitions, typography settings, spacing values, and animation timings.

```css
:root {
  --primary-color: #C41E3A;
  --secondary-color: #8A2BE2;
  /* More variables... */
}
```

### global.css
Applies global styles, resets, and common utility classes. Imports font resources and variables, and defines animation keyframes used throughout the application.

```css
/* Example animation definition */
@keyframes float {
  0% { transform: rotate(45deg) translateY(0) scale(0.3); }
  100% { transform: rotate(45deg) translateY(-100vh) scale(1); }
}
```

## 🧠 The Philosophy Behind the App

The "69 Shades of Love" application is built around the concept that self-care is not just about physical health, but about achieving balance across multiple dimensions of well-being. The number 69 represents the harmony and reciprocity needed between different aspects of our lives.

Each category is represented by heart icons in different colors, symbolizing that love for oneself comes in many forms and should be expressed through various types of care:

- **Physical Hearts (Orange)**: Body-focused self-care activities like sleep, hydration, and movement.
- **Mental Hearts (Green)**: Mind-nourishing practices like meditation, learning, and reflection.
- **Personal Hearts (Yellow)**: Soul-feeding activities that bring joy and foster personal growth.
- **Relationship Hearts (Pink)**: Connection-building practices that strengthen your bonds with others.

## 🛠️ Technology Stack

- **Vue 3**: Composition API for reactive UI components
- **TypeScript**: Type safety and improved developer experience
- **Pinia**: State management with persistence
- **Vite**: Fast build tooling and development server
- **CSS Variables**: Dynamic theming capability

## 🔄 Workflow

1. **Task Selection**: Choose from predefined self-care tasks across four categories
2. **Task Completion**: Mark tasks as complete to track your progress
3. **Progress Tracking**: Monitor your overall and category-specific progress
4. **Achievement Unlocking**: Reach milestones to unlock achievements and visual rewards
5. **Streak Building**: Maintain daily activity to build your streak counter

## 📱 Responsive Design

The application is fully responsive and works across devices:
- **Desktop**: Full-featured experience with multi-column layout
- **Tablet**: Adaptive layout that reorganizes for medium-sized screens
- **Mobile**: Single-column stacked interface optimized for touch and smaller screens

## 🔍 Future Enhancements

- **Task Customization**: Allow users to create and edit their own tasks
- **Data Visualization**: Add charts and graphs for progress over time
- **Social Sharing**: Enable sharing achievements on social platforms
- **Push Notifications**: Add reminders for daily self-care activities
- **Cloud Sync**: Synchronize data across multiple devices

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🦆 Acknowledgments

- Created with ❤️ by WTQ (What The Quack)
- Inspired by the journey of self-care and personal growth