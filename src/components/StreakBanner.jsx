const StreakBanner = ({ onAchievementClick }) => {
    return (
        <div className="streak-banner">
            <div className="streak-content">
                <div className="flame-container">
                    <svg className="flame-icon animated-flame" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2c-1.5 4-3 6-3 10a3 3 0 0 0 6 0c0-4-1.5-6-3-10z" fill="url(#flameGrad)" opacity="0.8" />
                        <path d="M12 8c-1 2.5-2 4-2 6a2 2 0 0 0 4 0c0-2-1-3.5-2-6z" fill="url(#flameGrad)" />
                        <defs>
                            <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FF6B35" />
                                <stop offset="50%" stopColor="#FFB700" />
                                <stop offset="100%" stopColor="#FFE600" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className="streak-text">
                    <h3>You're on fire! 🔥</h3>
                    <p>7 day learning streak · Complete one more course this week to earn the "Dedicated Learner" badge</p>
                </div>
            </div>
            <button className="btn-achievement" onClick={onAchievementClick}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>View Achievements</span>
            </button>
        </div>
    )
}

export default StreakBanner
