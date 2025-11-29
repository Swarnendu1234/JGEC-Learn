import { useEffect, useRef } from 'react'

const NotificationPanel = ({
    notifications,
    isOpen,
    onClose,
    onMarkAsRead,
    onMarkAllAsRead,
    onDelete,
    onClearAll,
    unreadCount
}) => {
    const panelRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                const notifButton = document.getElementById('notifBtn')
                if (notifButton && !notifButton.contains(event.target)) {
                    onClose()
                }
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, onClose])

    const getTimeAgo = (timestamp) => {
        const now = new Date()
        const diff = now - new Date(timestamp)
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'Just now'
        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        if (days < 7) return `${days}d ago`
        return new Date(timestamp).toLocaleDateString()
    }

    const getIconPath = (icon) => {
        const icons = {
            'check-circle': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
            'award': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
            'certificate': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z M9 15l2 2 4-4',
            'clock': 'M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z M12 6v6l4 2',
            'lightbulb': 'M9 18h6 M10 22h4 M15 8a3 3 0 0 0-6 0c0 2 3 3 3 5',
            'user-plus': 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8.5 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z M20 8v6 M23 11h-6',
            'shopping-cart': 'M9 2L1 4v2h18l-3 9H5L2 4 M7 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4z M17 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4z',
            'alert-triangle': 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01',
            'message-circle': 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'
        }
        return icons[icon] || icons['check-circle']
    }

    const getNotificationColor = (type) => {
        const colors = {
            success: 'var(--success)',
            achievement: '#F59E0B',
            certificate: 'var(--primary-indigo)',
            reminder: 'var(--accent-aqua)',
            info: 'var(--info)',
            warning: 'var(--warning)',
            error: 'var(--error)'
        }
        return colors[type] || colors.info
    }

    if (!isOpen) return null

    return (
        <div className="notification-panel" ref={panelRef}>
            <div className="notification-header">
                <div>
                    <h3>Notifications</h3>
                    {unreadCount > 0 && (
                        <span className="unread-count-text">{unreadCount} unread</span>
                    )}
                </div>
                <div className="notification-actions">
                    {unreadCount > 0 && (
                        <button className="mark-all-btn" onClick={onMarkAllAsRead}>
                            Mark all read
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button className="clear-all-btn" onClick={onClearAll}>
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            <div className="notification-list">
                {notifications.length === 0 ? (
                    <div className="no-notifications">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <p>No notifications yet</p>
                        <span>We'll notify you when something arrives</span>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                            onClick={() => !notification.read && onMarkAsRead(notification.id)}
                        >
                            <div
                                className="notification-icon"
                                style={{ backgroundColor: `${getNotificationColor(notification.type)}15` }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke={getNotificationColor(notification.type)}
                                    strokeWidth="2"
                                >
                                    <path d={getIconPath(notification.icon)} />
                                </svg>
                            </div>

                            <div className="notification-content">
                                <div className="notification-title">{notification.title}</div>
                                <div className="notification-message">{notification.message}</div>
                                <div className="notification-meta">
                                    <span className="notification-time">{getTimeAgo(notification.timestamp)}</span>
                                    {notification.action && (
                                        <button className="notification-action-btn">
                                            {notification.action.label}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <button
                                className="notification-delete"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete(notification.id)
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Test notification buttons for demo */}
            <div className="notification-test-section">
                <div className="test-section-title">Try Test Notifications:</div>
                <div className="test-buttons">
                    <button onClick={() => window.dispatchEvent(new CustomEvent('testNotification', { detail: 'registration' }))}>
                        Registration
                    </button>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('testNotification', { detail: 'purchase' }))}>
                        Purchase
                    </button>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('testNotification', { detail: 'completion' }))}>
                        Completion
                    </button>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('testNotification', { detail: 'badge' }))}>
                        Badge
                    </button>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('testNotification', { detail: 'message' }))}>
                        Message
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotificationPanel
