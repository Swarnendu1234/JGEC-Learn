import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import SearchBar from './SearchBar'
import NotificationPanel from './NotificationPanel'
import MessagesPanel from './MessagesPanel'

const Header = ({ searchQuery, setSearchQuery, onMenuClick, coursesData, notifications, messages, showToast }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const { user, logout } = useAuth()
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

                <div style={{ position: 'relative' }}>
                    <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} 
                        alt="Profile" 
                        className="profile-avatar"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    />
                    
                    {isProfileOpen && (
                        <div className="profile-dropdown">
                            <div className="profile-dropdown-header">
                                <img 
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} 
                                    alt="Profile" 
                                    style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                                />
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>{user?.name || 'User'}</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Student</div>
                                </div>
                            </div>
                            
                            <div className="profile-dropdown-divider"></div>
                            
                            <button className="profile-dropdown-item" onClick={() => {
                                setIsProfileOpen(false)
                                alert('Profile page coming soon!')
                            }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <span>Profile</span>
                            </button>
                            
                            <button className="profile-dropdown-item logout" onClick={() => {
                                setIsProfileOpen(false)
                                showToast('👋 Logged out successfully', 'success')
                                setTimeout(() => logout(), 1000)
                            }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
