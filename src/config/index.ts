import { v4 as uuidv4 } from 'uuid'
import type { Category } from '@/types'

export const APP_CONFIG = {
    APP_NAME: '69 Shades of Love',
    VERSION: '2.0.0',
    LANGUAGES: ['en', 'pl'],
    TASK_CATEGORIES: ['physical', 'mental', 'personal', 'relationship'],
    MILESTONES: [5, 10, 25, 40, 69],
    STORAGE_KEYS: {
        TASKS: 'selfCareData_v2',
        STREAK: 'streakData_v2',
        LANGUAGE: 'app_language'
    }
}

export const INITIAL_CATEGORIES: Category[] = [
    {
        id: uuidv4(),
        name: "Physical",
        type: "physical",
        tasks: [
            {
                id: uuidv4(),
                title: "Sleeping Beauty Mode",
                description: "8hr minimum, no exceptions!",
                completed: false,
                category: "physical"
            },
            {
                id: uuidv4(),
                title: "Hydro Homie",
                description: "Water before coffee, always",
                completed: false,
                category: "physical"
            },
            {
                id: uuidv4(),
                title: "Morning Wiggle",
                description: "Stretching before scrolling",
                completed: false,
                category: "physical"
            },
            {
                id: uuidv4(),
                title: "Vitamin D-lightful",
                description: "Catch some rays, even briefly",
                completed: false,
                category: "physical"
            },
            {
                id: uuidv4(),
                title: "Step Master",
                description: "Walk like your ex is watching",
                completed: false,
                category: "physical"
            }
        ]
    },
    {
        id: uuidv4(),
        name: "Mental",
        type: "mental",
        tasks: [
            {
                id: uuidv4(),
                title: "Thought Vacation",
                description: "Meditation without the hashtags",
                completed: false,
                category: "mental"
            },
            {
                id: uuidv4(),
                title: "Gratitude Attitude",
                description: "Three things that don't suck today",
                completed: false,
                category: "mental"
            },
            {
                id: uuidv4(),
                title: "Digital Detox Time",
                description: "Airplane mode for sanity",
                completed: false,
                category: "mental"
            },
            {
                id: uuidv4(),
                title: "Breath of Fresh Perspective",
                description: "Deep breathing in 4-7-8",
                completed: false,
                category: "mental"
            },
            {
                id: uuidv4(),
                title: "Dear Diary Moment",
                description: "Journal the day away",
                completed: false,
                category: "mental"
            }
        ]
    },
    {
        id: uuidv4(),
        name: "Personal Joy",
        type: "personal",
        tasks: [
            {
                id: uuidv4(),
                title: "Bookworm Mode",
                description: "Get lost in pages, not feeds",
                completed: false,
                category: "personal"
            },
            {
                id: uuidv4(),
                title: "Podcast & Chill",
                description: "Learn while lounging",
                completed: false,
                category: "personal"
            },
            {
                id: uuidv4(),
                title: "Clean Slate",
                description: "Your space reflects your mind",
                completed: false,
                category: "personal"
            },
            {
                id: uuidv4(),
                title: "Hobby Happy Hour",
                description: "Do that thing you love",
                completed: false,
                category: "personal"
            },
            {
                id: uuidv4(),
                title: "Music Medicine",
                description: "Playlist therapy session",
                completed: false,
                category: "personal"
            }
        ]
    },
    {
        id: uuidv4(),
        name: "Relationship",
        type: "relationship",
        tasks: [
            {
                id: uuidv4(),
                title: "Date Night Done Right",
                description: "No phones, all presence",
                completed: false,
                category: "relationship"
            },
            {
                id: uuidv4(),
                title: "Magic Fingers",
                description: "Massage exchange with extras",
                completed: false,
                category: "relationship"
            },
            {
                id: uuidv4(),
                title: "Future Fantasy",
                description: "Plan adventures together",
                completed: false,
                category: "relationship"
            },
            {
                id: uuidv4(),
                title: "Couple's Cardio",
                description: "Walk and talk without distractions",
                completed: false,
                category: "relationship"
            },
            {
                id: uuidv4(),
                title: "Soul-Deep Chat",
                description: "Beyond \"How was your day?\"",
                completed: false,
                category: "relationship"
            }
        ]
    }
]