import { useState, useEffect } from 'react'

export const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved === 'dark'
    })

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode')
            document.body.classList.remove('light-mode')
            localStorage.setItem('darkMode', 'dark')
        } else {
            document.body.classList.add('light-mode')
            document.body.classList.remove('dark-mode')
            localStorage.setItem('darkMode', 'light')
        }
    }, [isDarkMode])

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

    return [isDarkMode, toggleDarkMode]
}
