const RightSidebar = ({ showToast }) => {
    const recommendations = [
        {
            id: 1,
            title: "CS50's Introduction to Artificial Intelligence",
            institution: "Harvard University",
            duration: "7 weeks",
            rating: 4.8,
            enrolled: "25K+",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg/200px-Harvard_University_logo.svg.png"
        },
        {
            id: 2,
            title: "CS50's Introduction to Computer Science",
            institution: "Harvard University",
            duration: "12 weeks",
            rating: 4.9,
            enrolled: "50K+",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg/200px-Harvard_University_logo.svg.png"
        },
        {
            id: 3,
            title: "IBM Data Science Professional Certificate",
            institution: "IBM",
            duration: "3-6 months",
            rating: 4.7,
            enrolled: "35K+",
            isIBM: true
        }
    ]

    const aiSuggestions = [
        {
            icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
            title: "Continue Python Course",
            description: "You're 42% done. Next: Functions & Modules"
        },
        {
            icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
            title: "Boost Your Streak",
            description: "Study for 30 min today to maintain your 7-day streak"
        },
        {
            icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01 9 11.01",
            title: "Complete IBM Course",
            description: "Only 14 modules left. Est. completion: 2 weeks"
        }
    ]

    const handleEnroll = (title) => {
        showToast(`Enrolling in: ${title} 🎓`, 'success')
    }

    const handleAISuggestion = (title) => {
        showToast(`Opening: ${title}`, 'info')
    }

    const handleAIChat = () => {
        showToast('AI Chat opening... 🤖', 'info')
    }

    return (
        <aside className="right-sidebar">
            {/* AI Assistant Widget */}
            <div className="ai-assistant-widget">
                <div className="ai-header">
                    <div className="ai-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                        <span className="ai-pulse"></span>
                    </div>
                    <div className="ai-info">
                        <h4>AI Study Assistant</h4>
                        <p>Smart recommendations for you</p>
                    </div>
                </div>

                <div className="ai-suggestions">
                    {aiSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="ai-suggestion"
                            onClick={() => handleAISuggestion(suggestion.title)}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d={suggestion.icon} />
                            </svg>
                            <div>
                                <h5>{suggestion.title}</h5>
                                <p>{suggestion.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Smart Recommendations */}
            <div className="recommendations">
                <div className="recommendations-header">
                    <h3>Recommendations for you</h3>
                    <button className="see-all">See all</button>
                </div>

                {recommendations.map((rec) => (
                    <div
                        key={rec.id}
                        className="recommendation-card"
                        onClick={(e) => {
                            if (!e.target.classList.contains('enroll-btn')) {
                                showToast(`Viewing: ${rec.title}`, 'info')
                            }
                        }}
                    >
                        <div className={`rec-image ${rec.isIBM ? 'ibm-logo' : ''}`}>
                            {rec.isIBM ? (
                                <span>IBM</span>
                            ) : (
                                <img src={rec.image} alt={rec.institution} />
                            )}
                        </div>
                        <h4>{rec.title}</h4>
                        <p>{rec.institution} · {rec.duration}</p>
                        <div className="rec-stats">
                            <span>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                {rec.rating}
                            </span>
                            <span>{rec.enrolled} enrolled</span>
                        </div>
                        <button
                            className="enroll-btn"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleEnroll(rec.title)
                            }}
                        >
                            Enroll Now
                        </button>
                    </div>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
                <h3>Your Progress</h3>
                <div className="stat-row">
                    <div className="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                    <div className="stat-info">
                        <div className="stat-value">18</div>
                        <div className="stat-label">Courses Completed</div>
                    </div>
                </div>

                <div className="stat-row">
                    <div className="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                    <div className="stat-info">
                        <div className="stat-value">12</div>
                        <div className="stat-label">Certificates Earned</div>
                    </div>
                </div>

                <div className="stat-row">
                    <div className="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div className="stat-info">
                        <div className="stat-value">142h</div>
                        <div className="stat-label">Total Study Time</div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default RightSidebar
