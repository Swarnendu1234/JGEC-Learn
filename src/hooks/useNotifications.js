import { useState, useEffect } from 'react'

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'success',
            title: 'Course Enrollment Successful',
            message: 'You have successfully enrolled in CS50\'s Introduction to Python',
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            read: false,
            icon: 'check-circle',
            action: { label: 'View Course', link: '#' }
        },
        {
            id: 2,
            type: 'achievement',
            title: '7-Day Streak! 🔥',
            message: 'Congratulations! You\'ve maintained a 7-day learning streak',
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            read: false,
            icon: 'award',
            action: { label: 'View Achievements', link: '#' }
        },
        {
            id: 3,
            type: 'certificate',
            title: 'Certificate Ready',
            message: 'Your Machine Learning Specialization certificate is ready to download',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            read: false,
            icon: 'certificate',
            action: { label: 'Download', link: '#' }
        },
        {
            id: 4,
            type: 'reminder',
            title: 'Course Deadline Approaching',
            message: 'MIT Probability course access expires in 3 days',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            read: true,
            icon: 'clock',
            action: { label: 'Continue Course', link: '#' }
        },
        {
            id: 5,
            type: 'info',
            title: 'New Course Recommendation',
            message: 'Based on your progress, we recommend: Advanced Data Structures',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            read: true,
            icon: 'lightbulb',
            action: { label: 'View Course', link: '#' }
        }
    ])

    const [isOpen, setIsOpen] = useState(false)

    const unreadCount = notifications.filter(n => !n.read).length

    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now(),
            timestamp: new Date(),
            read: false,
            ...notification
        }
        setNotifications(prev => [newNotification, ...prev])
    }

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        )
    }

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        )
    }

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id))
    }

    const clearAll = () => {
        setNotifications([])
    }

    // Simulate notifications for demo purposes
    const simulateNotification = (type) => {
        const notificationTemplates = {
            registration: {
                type: 'success',
                title: 'Welcome to JGEC Learn! 🎉',
                message: 'Your account has been successfully created. Start exploring courses now!',
                icon: 'user-plus',
                action: { label: 'Explore Courses', link: '#' }
            },
            purchase: {
                type: 'success',
                title: 'Course Purchase Successful',
                message: 'You now have access to all premium features. Happy learning!',
                icon: 'shopping-cart',
                action: { label: 'Start Learning', link: '#' }
            },
            completion: {
                type: 'achievement',
                title: 'Course Completed! 🎓',
                message: 'Congratulations on completing the course. Your certificate is being prepared.',
                icon: 'check-circle',
                action: { label: 'View Certificate', link: '#' }
            },
            deadline: {
                type: 'warning',
                title: 'Assignment Due Soon',
                message: 'Your assignment is due in 2 hours. Submit before the deadline!',
                icon: 'alert-triangle',
                action: { label: 'Submit Now', link: '#' }
            },
            message: {
                type: 'info',
                title: 'New Message from Instructor',
                message: 'Prof. David Malan has responded to your question',
                icon: 'message-circle',
                action: { label: 'Read Message', link: '#' }
            },
            badge: {
                type: 'achievement',
                title: 'New Badge Earned! 🏆',
                message: 'You\'ve earned the "Dedicated Learner" badge',
                icon: 'award',
                action: { label: 'View Badges', link: '#' }
            }
        }

        const template = notificationTemplates[type]
        if (template) {
            addNotification(template)
        }
    }

    return {
        notifications,
        unreadCount,
        isOpen,
        setIsOpen,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        simulateNotification
    }
}
