import { useState } from 'react'

export const useMessages = () => {
    const [conversations, setConversations] = useState([
        {
            id: 1,
            participant: {
                name: 'Prof. Rajesh Sharma',
                role: 'Instructor',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
                course: 'CS50 Python',
                online: true
            },
            lastMessage: {
                text: 'Great question! Let me explain the concept of decorators...',
                timestamp: new Date(Date.now() - 1000 * 60 * 5),
                senderId: 'rajesh',
                unread: true
            },
            messages: [
                {
                    id: 1,
                    senderId: 'me',
                    text: 'Hi Professor! I have a question about Python decorators.',
                    timestamp: new Date(Date.now() - 1000 * 60 * 10)
                },
                {
                    id: 2,
                    senderId: 'rajesh',
                    text: 'Great question! Let me explain the concept of decorators...',
                    timestamp: new Date(Date.now() - 1000 * 60 * 5)
                }
            ]
        },
        {
            id: 2,
            participant: {
                name: 'Dr. Priya Kapoor',
                role: 'Tutor',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
                course: 'Data Science',
                online: true
            },
            lastMessage: {
                text: 'I can help you with that assignment!',
                timestamp: new Date(Date.now() - 1000 * 60 * 30),
                senderId: 'priya',
                unread: true
            },
            messages: [
                {
                    id: 1,
                    senderId: 'me',
                    text: 'Can you help me understand the data visualization assignment?',
                    timestamp: new Date(Date.now() - 1000 * 60 * 35)
                },
                {
                    id: 2,
                    senderId: 'priya',
                    text: 'I can help you with that assignment!',
                    timestamp: new Date(Date.now() - 1000 * 60 * 30)
                }
            ]
        },
        {
            id: 3,
            participant: {
                name: 'Arjun Mehta',
                role: 'Student',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
                course: 'Machine Learning',
                online: false
            },
            lastMessage: {
                text: 'Thanks for sharing those resources!',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
                senderId: 'me',
                unread: false
            },
            messages: [
                {
                    id: 1,
                    senderId: 'arjun',
                    text: 'Hey! Are you taking the ML course too?',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3)
                },
                {
                    id: 2,
                    senderId: 'me',
                    text: 'Yes! Here are some helpful resources I found.',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5)
                },
                {
                    id: 3,
                    senderId: 'arjun',
                    text: 'Thanks for sharing those resources!',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
                }
            ]
        },
        {
            id: 4,
            participant: {
                name: 'Prof. Aditya Verma',
                role: 'Instructor',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya',
                course: 'Financial Markets',
                online: false
            },
            lastMessage: {
                text: 'The assignment deadline has been extended to next Monday.',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
                senderId: 'aditya',
                unread: false
            },
            messages: [
                {
                    id: 1,
                    senderId: 'aditya',
                    text: 'The assignment deadline has been extended to next Monday.',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
                }
            ]
        },
        {
            id: 5,
            participant: {
                name: 'Kavya Reddy',
                role: 'Tutor',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya',
                course: 'Data Analytics',
                online: true
            },
            lastMessage: {
                text: 'See you in the study session tomorrow!',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
                senderId: 'kavya',
                unread: false
            },
            messages: [
                {
                    id: 1,
                    senderId: 'me',
                    text: 'Can we schedule a tutoring session?',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 49)
                },
                {
                    id: 2,
                    senderId: 'kavya',
                    text: 'See you in the study session tomorrow!',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
                }
            ]
        }
    ])

    const [activeConversation, setActiveConversation] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const unreadCount = conversations.filter(c => c.lastMessage.unread).reduce((acc) => acc + 1, 0)

    const sendMessage = (conversationId, text) => {
        const newMessage = {
            id: Date.now(),
            senderId: 'me',
            text,
            timestamp: new Date()
        }

        setConversations(prev =>
            prev.map(conv => {
                if (conv.id === conversationId) {
                    return {
                        ...conv,
                        messages: [...conv.messages, newMessage],
                        lastMessage: {
                            text,
                            timestamp: newMessage.timestamp,
                            senderId: 'me',
                            unread: false
                        }
                    }
                }
                return conv
            })
        )

        // Simulate response after 2 seconds
        setTimeout(() => {
            const responseMessage = {
                id: Date.now() + 1,
                senderId: conversations.find(c => c.id === conversationId)?.participant.name.toLowerCase().split(' ')[0],
                text: 'Thanks for your message! I\'ll get back to you shortly.',
                timestamp: new Date()
            }

            setConversations(prev =>
                prev.map(conv => {
                    if (conv.id === conversationId) {
                        return {
                            ...conv,
                            messages: [...conv.messages, responseMessage],
                            lastMessage: {
                                text: responseMessage.text,
                                timestamp: responseMessage.timestamp,
                                senderId: responseMessage.senderId,
                                unread: true
                            }
                        }
                    }
                    return conv
                })
            )
        }, 2000)
    }

    const markAsRead = (conversationId) => {
        setConversations(prev =>
            prev.map(conv => {
                if (conv.id === conversationId && conv.lastMessage.unread) {
                    return {
                        ...conv,
                        lastMessage: {
                            ...conv.lastMessage,
                            unread: false
                        }
                    }
                }
                return conv
            })
        )
    }

    const deleteConversation = (conversationId) => {
        setConversations(prev => prev.filter(conv => conv.id !== conversationId))
        if (activeConversation?.id === conversationId) {
            setActiveConversation(null)
        }
    }

    const startNewConversation = (participant) => {
        const newConversation = {
            id: Date.now(),
            participant,
            lastMessage: null,
            messages: []
        }
        setConversations(prev => [newConversation, ...prev])
        setActiveConversation(newConversation)
    }

    return {
        conversations,
        activeConversation,
        setActiveConversation,
        isOpen,
        setIsOpen,
        unreadCount,
        sendMessage,
        markAsRead,
        deleteConversation,
        startNewConversation
    }
}
