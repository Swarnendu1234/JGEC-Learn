import SearchBar from './SearchBar'
import NotificationPanel from './NotificationPanel'
import MessagesPanel from './MessagesPanel'

const Header = ({ searchQuery, setSearchQuery, onMenuClick, coursesData, notifications, messages }) => {
    const {
        notifications: notificationList,
        unreadCount: notifUnreadCount,
        isOpen: notifIsOpen,
        setIsOpen: setNotifIsOpen,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll
    } = notifications

    const {
        conversations,
        activeConversation,
        setActiveConversation,
        isOpen: messagesIsOpen,
        setIsOpen: setMessagesIsOpen,
        unreadCount: messagesUnreadCount,
        sendMessage,
        markAsRead: markMessageAsRead,
        deleteConversation
    } = messages

    return (
        <div className="floating-search">
            <button className="menu-btn" onClick={onMenuClick}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                coursesData={coursesData}
            />

            <div className="header-actions">
                <button
                    className="action-btn"
                    id="notifBtn"
                    onClick={() => setNotifIsOpen(!notifIsOpen)}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    {notifUnreadCount > 0 && <span className="notif-badge">{notifUnreadCount}</span>}
                </button>

                <NotificationPanel
                    notifications={notificationList}
                    isOpen={notifIsOpen}
                    onClose={() => setNotifIsOpen(false)}
                    onMarkAsRead={markAsRead}
                    onMarkAllAsRead={markAllAsRead}
                    onDelete={deleteNotification}
                    onClearAll={clearAll}
                    unreadCount={notifUnreadCount}
                />

                <button
                    className="action-btn"
                    id="messageBtn"
                    onClick={() => setMessagesIsOpen(!messagesIsOpen)}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {messagesUnreadCount > 0 && <span className="notif-badge">{messagesUnreadCount}</span>}
                </button>

                <MessagesPanel
                    conversations={conversations}
                    activeConversation={activeConversation}
                    setActiveConversation={setActiveConversation}
                    isOpen={messagesIsOpen}
                    onClose={() => setMessagesIsOpen(false)}
                    onSendMessage={sendMessage}
                    onMarkAsRead={markMessageAsRead}
                    onDelete={deleteConversation}
                    unreadCount={messagesUnreadCount}
                />

                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nirman" alt="Profile" className="profile-avatar" />
            </div>
        </div>
    )
}

export default Header
