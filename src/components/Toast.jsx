import { useEffect, useState } from 'react'

const Toast = ({ message, type = 'info', onClose }) => {
    const [isVisible, setIsVisible] = useState(false)

    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#4C57FF'
    }

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    }

    useEffect(() => {
        // Trigger animation
        setTimeout(() => setIsVisible(true), 10)

        // Auto-hide after 3.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onClose, 400)
        }, 3500)

        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div
            className="toast-notification"
            style={{
                position: 'fixed',
                bottom: '32px',
                left: '50%',
                transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100px)',
                background: 'white',
                color: '#1F2937',
                padding: '16px 24px',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '15px',
                fontWeight: 600,
                borderLeft: `4px solid ${colors[type]}`,
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                fontFamily: "'Inter', sans-serif"
            }}
        >
            <div
                style={{
                    width: '28px',
                    height: '28px',
                    background: colors[type],
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 700
                }}
            >
                {icons[type]}
            </div>
            <span>{message}</span>
        </div>
    )
}

export default Toast
