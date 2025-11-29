import { useEffect, useState } from 'react'

const Heatmap = ({ showToast, loginDates = [], getActivityLevel }) => {
    const [heatmapData, setHeatmapData] = useState([])

    useEffect(() => {
        // Generate 30 days of activity data based on real login dates
        const data = []
        for (let i = 0; i < 30; i++) {
            const date = new Date()
            date.setDate(date.getDate() - (29 - i))
            const dateStr = date.toISOString().split('T')[0]

            // Use real activity level if getActivityLevel is provided, otherwise use 0
            const level = getActivityLevel ? getActivityLevel(dateStr) : 0

            data.push({
                date: date.toLocaleDateString(),
                dateStr,
                level,
                activity: getActivityText(level),
                hasLogin: loginDates.includes(dateStr)
            })
        }
        setHeatmapData(data)
    }, [loginDates, getActivityLevel])

    const getActivityText = (level) => {
        const activities = ['No activity', 'Light activity', 'Moderate activity', 'High activity', 'Very high activity']
        return activities[level]
    }

    const handleDayClick = (day) => {
        if (day.hasLogin) {
            showToast(`✅ Logged in on ${day.date}`, 'success')
        } else {
            showToast(`${day.date}: ${day.activity}`, 'info')
        }
    }

    return (
        <div className="heatmap-section">
            <div className="heatmap-header">
                <h3>Learning Activity</h3>
                <span className="heatmap-subtitle">Last 30 days</span>
            </div>
            <div className="heatmap-grid">
                {heatmapData.map((day, index) => (
                    <div
                        key={index}
                        className="heatmap-day"
                        data-level={day.level}
                        title={`${day.date}: ${day.activity}`}
                        onClick={() => handleDayClick(day)}
                    />
                ))}
            </div>
            <div className="heatmap-legend">
                <span>Less</span>
                <div className="legend-box" data-level="0"></div>
                <div className="legend-box" data-level="1"></div>
                <div className="legend-box" data-level="2"></div>
                <div className="legend-box" data-level="3"></div>
                <div className="legend-box" data-level="4"></div>
                <span>More</span>
            </div>
        </div>
    )
}

export default Heatmap
