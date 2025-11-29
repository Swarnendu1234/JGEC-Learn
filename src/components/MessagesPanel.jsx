import { useState, useEffect, useRef } from 'react'

const MessagesPanel = ({
    conversations,
    activeConversation,
    setActiveConversation,
    isOpen,
    onClose,
    onSendMessage,
    onMarkAsRead,
    onDelete,
    unreadCount
}) => {
    const [messageText, setMessageText] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const messagesEndRef = useRef(null)
    const panelRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                const messageButton = document.getElementById('messageBtn')
                if (messageButton && !messageButton.contains(event.target)) {
                    onClose()
                }
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, onClose])

    useEffect(() => {
        scrollToBottom()
    }, [activeConversation?.messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const getTimeAgo = (timestamp) => {
        const now = new Date()
        const diff = now - new Date(timestamp)
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'Just now'
        if (minutes < 60) return `${minutes}m`
        if (hours < 24) return `${hours}h`
        if (days < 7) return `${days}d`
        return new Date(timestamp).toLocaleDateString()
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (messageText.trim() && activeConversation) {
            onSendMessage(activeConversation.id, messageText.trim())
            setMessageText('')
        }
    }

    const handleConversationClick = (conversation) => {
        setActiveConversation(conversation)
        if (conversation.lastMessage?.unread) {
            onMarkAsRead(conversation.id)
        }
    }

    const filteredConversations = conversations.filter(conv =>
        conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.participant.course.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (!isOpen) return null

    return (
        <div className="messages-panel" ref={panelRef}>
            {!activeConversation ? (
                <>
                    {/* Conversations List */}
                    <div className="messages-header">
                        <h3>Messages</h3>
                        {unreadCount > 0 && (
                            <span className="messages-unread-badge">{unreadCount}</span>
                        )}
                    </div>

                    <div className="messages-search">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="conversations-list">
                        {filteredConversations.length === 0 ? (
                            <div className="no-conversations">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <p>No conversations yet</p>
                                <span>Start connecting with tutors and students</span>
                            </div>
                        ) : (
                            filteredConversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    className={`conversation-item ${conversation.lastMessage?.unread ? 'unread' : ''}`}
                                    onClick={() => handleConversationClick(conversation)}
                                >
                                    <div className="conversation-avatar">
                                        <img src={conversation.participant.avatar} alt={conversation.participant.name} />
                                        {conversation.participant.online && <span className="online-indicator"></span>}
                                    </div>

                                    <div className="conversation-content">
                                        <div className="conversation-header">
                                            <div className="conversation-name">
                                                {conversation.participant.name}
                                                <span className={`role-badge ${conversation.participant.role.toLowerCase()}`}>
                                                    {conversation.participant.role}
                                                </span>
                                            </div>
                                            {conversation.lastMessage && (
                                                <span className="conversation-time">{getTimeAgo(conversation.lastMessage.timestamp)}</span>
                                            )}
                                        </div>
                                        <div className="conversation-course">{conversation.participant.course}</div>
                                        {conversation.lastMessage && (
                                            <div className="conversation-preview">
                                                {conversation.lastMessage.senderId === 'me' && <span className="you-label">You: </span>}
                                                {conversation.lastMessage.text}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className="conversation-delete"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onDelete(conversation.id)
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
                </>
            ) : (
                <>
                    {/* Active Conversation */}
                    <div className="chat-header">
                        <button className="back-button" onClick={() => setActiveConversation(null)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="chat-participant">
                            <img src={activeConversation.participant.avatar} alt={activeConversation.participant.name} />
                            <div className="chat-participant-info">
                                <div className="chat-participant-name">
                                    {activeConversation.participant.name}
                                    {activeConversation.participant.online && <span className="online-dot"></span>}
                                </div>
                                <div className="chat-participant-status">
                                    {activeConversation.participant.online ? 'Online' : 'Offline'} • {activeConversation.participant.course}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {activeConversation.messages.map((message) => (
                            <div
                                key={message.id}
                                className={`chat-message ${message.senderId === 'me' ? 'sent' : 'received'}`}
                            >
                                <div className="message-bubble">
                                    <div className="message-text">{message.text}</div>
                                    <div className="message-time">{getTimeAgo(message.timestamp)}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            autoFocus
                        />
                        <button type="submit" disabled={!messageText.trim()}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </form>
                </>
            )}
        </div>
    )
}

export default MessagesPanel
