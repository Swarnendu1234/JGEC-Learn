import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    })

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        return {
            user: {
                name: 'Guest User',
                email: 'guest@example.com',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest'
            },
            logout: () => {}
        }
    }
    return context
}
