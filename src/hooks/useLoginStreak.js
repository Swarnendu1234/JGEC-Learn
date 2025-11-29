import { useState, useEffect } from 'react'

export const useLoginStreak = () => {
    const STORAGE_KEY = 'learning_streak_data'

    const getStreakData = () => {
        const data = localStorage.getItem(STORAGE_KEY)
        if (data) {
            return JSON.parse(data)
        }
        return {
            currentStreak: 0,
            lastLoginDate: null,
            achievementUnlocked: false,
            loginDates: []
        }
    }

    const [streakData, setStreakData] = useState(getStreakData())

    // Check and update streak on component mount
    useEffect(() => {
        const checkAndUpdateStreak = () => {
            const today = new Date().toISOString().split('T')[0] // Use ISO format YYYY-MM-DD
            const data = getStreakData()

            // If already logged in today, don't update
            if (data.lastLoginDate === today) {
                return data
            }

            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            const yesterdayStr = yesterday.toISOString().split('T')[0]

            let newStreak = data.currentStreak
            let newLoginDates = [...data.loginDates]

            // Check if last login was yesterday (streak continues)
            if (data.lastLoginDate === yesterdayStr) {
                newStreak += 1
            }
            // Check if last login was today (already counted)
            else if (data.lastLoginDate === today) {
                newStreak = data.currentStreak
            }
            // Streak broken, start new streak
            else {
                newStreak = 1
                newLoginDates = []
            }

            // Add today's login
            const todayFormatted = today
            if (!newLoginDates.includes(todayFormatted)) {
                newLoginDates.push(todayFormatted)
            }

            // Keep only last 30 days
            if (newLoginDates.length > 30) {
                newLoginDates = newLoginDates.slice(-30)
            }

            const newData = {
                currentStreak: newStreak,
                lastLoginDate: today,
                achievementUnlocked: data.achievementUnlocked || newStreak >= 7,
                loginDates: newLoginDates
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
            setStreakData(newData)

            return newData
        }

        checkAndUpdateStreak()
    }, [])

    const resetStreak = () => {
        const newData = {
            currentStreak: 0,
            lastLoginDate: null,
            achievementUnlocked: false,
            loginDates: []
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
        setStreakData(newData)
    }

    const getActivityLevel = (dateStr) => {
        // This can be enhanced to track actual activity
        // For now, just check if user logged in that day
        return streakData.loginDates.includes(dateStr) ? 3 : 0
    }

    return {
        currentStreak: streakData.currentStreak,
        lastLoginDate: streakData.lastLoginDate,
        achievementUnlocked: streakData.achievementUnlocked,
        loginDates: streakData.loginDates,
        resetStreak,
        getActivityLevel,
        shouldShowAchievement: streakData.currentStreak === 7 && !streakData.achievementUnlocked
    }
}
