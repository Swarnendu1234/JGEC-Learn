import { useState, useEffect } from 'react'
import { fetchCourses } from './services/api'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CourseLearningPage from './components/CourseLearningPage'
import PageHeader from './components/PageHeader'
import FilterChips from './components/FilterChips'
import StreakBanner from './components/StreakBanner'
import Heatmap from './components/Heatmap'
import CourseCard from './components/CourseCard'
import CourseDetailsPage from './components/CourseDetailsPage'
import RightSidebar from './components/RightSidebar'
import DarkModeToggle from './components/DarkModeToggle'
import ConfettiCanvas from './components/ConfettiCanvas'
import Toast from './components/Toast'
import AIChatbot from './components/AIChatbot'
import { useDarkMode } from './hooks/useDarkMode'
import { useToast } from './hooks/useToast'
import { useNotifications } from './hooks/useNotifications'
import { useMessages } from './hooks/useMessages'
import { useLoginStreak } from './hooks/useLoginStreak'
import { coursesData } from './data/coursesData'

function App() {
    const [isDarkMode, toggleDarkMode] = useDarkMode()
    const { toast, showToast, hideToast } = useToast()
    const notifications = useNotifications()
    const messages = useMessages()
    const loginStreak = useLoginStreak()
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('all')
    const [sortBy, setSortBy] = useState('Recent')
    const [category, setCategory] = useState('All')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [learningCourseId, setLearningCourseId] = useState(null)
    const [isChatbotOpen, setIsChatbotOpen] = useState(false)
    const [courses, setCourses] = useState([])

    // Load courses from API or use fallback
    useEffect(() => {
        const loadCourses = async () => {
            try {
                console.log('📚 Loading courses from API...');
                const data = await fetchCourses();
                
                if (!data) {
                    throw new Error('No data received from API');
                }
                
                if (!Array.isArray(data)) {
                    console.warn('⚠️ API response is not an array, using fallback data');
                    setCourses(coursesData);
                    showToast('Using offline data', 'warning');
                    return;
                }
                
                console.log('✅ Courses loaded from API:', data.length);
                setCourses(data);
            } catch (error) {
                console.error('❌ Error loading courses:', error.message);
                console.log('📦 Falling back to local data...');
                setCourses(coursesData);
                showToast('Using offline data - Backend may not be running', 'warning');
            }
        };
        
        loadCourses();
    }, []);

    // Handle course updates from AdminPanel
    const handleUpdateCourses = (updatedCourses) => {
        setCourses(updatedCourses);
    };

    // Check for 7-day streak achievement
    useEffect(() => {
        if (loginStreak.currentStreak === 7 && !loginStreak.achievementUnlocked) {
            // Delay to show after page loads
            setTimeout(() => {
                setShowConfetti(true)
                showToast('🎉 Achievement Unlocked: "Dedicated Learner" - 7 Day Streak!', 'success')
                notifications.simulateNotification('badge')
            }, 1500)
        }
    }, [loginStreak.currentStreak, loginStreak.achievementUnlocked, showToast, notifications])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ctrl/Cmd + K: Focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                document.querySelector('.search-input')?.focus()
                showToast('Search activated', 'info')
            }

            // Ctrl/Cmd + D: Toggle dark mode
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault()
                toggleDarkMode()
            }

            // Escape: Clear search
            if (e.key === 'Escape') {
                if (searchQuery) {
                    setSearchQuery('')
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [searchQuery, toggleDarkMode, showToast])

    // Filter courses
    const filteredCourses = courses.filter(course => {
        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            const matchesTitle = course.title.toLowerCase().includes(query)
            const matchesBadge = course.badge.toLowerCase().includes(query)
            const matchesTags = course.tags.some(tag => tag.toLowerCase().includes(query))
            if (!matchesTitle && !matchesBadge && !matchesTags) return false
        }

        // Status filter
        if (activeFilter !== 'all' && course.status !== activeFilter) {
            return false
        }

        return true
    })

    // Sort courses
    const sortedCourses = [...filteredCourses].sort((a, b) => {
        switch (sortBy) {
            case 'Progress':
                return b.progress - a.progress
            case 'Title':
                return a.title.localeCompare(b.title)
            default:
                return 0
        }
    })

    const handleContinueCourse = (courseId) => {
        setLearningCourseId(courseId)
    }

    const handleViewCertificate = (courseTitle) => {
        showToast(`Viewing certificate for ${courseTitle} 🎓`, 'success')
        setShowConfetti(true)
    }

    const handleAchievement = () => {
        setShowConfetti(true)
        showToast('🎉 Achievements unlocked!', 'success')
    }

    // Listen for test notification events
    useEffect(() => {
        const handleTestNotification = (e) => {
            notifications.simulateNotification(e.detail)
            showToast('New notification received!', 'info')
        }

        window.addEventListener('testNotification', handleTestNotification)
        return () => window.removeEventListener('testNotification', handleTestNotification)
    }, [notifications, showToast])

    return (
        <>
            <ConfettiCanvas show={showConfetti} onComplete={() => setShowConfetti(false)} />
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} showToast={showToast} />

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="main-content">
                <Header
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    coursesData={courses}
                    notifications={notifications}
                    messages={messages}
                    showToast={showToast}
                />                <div className="page-content">
                    <PageHeader />

                    <FilterChips
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        category={category}
                        setCategory={setCategory}
                        showToast={showToast}
                    />

                    <StreakBanner
                        onAchievementClick={handleAchievement}
                        currentStreak={loginStreak.currentStreak}
                        achievementUnlocked={loginStreak.achievementUnlocked}
                    />

                    <Heatmap
                        showToast={showToast}
                        loginDates={loginStreak.loginDates}
                        getActivityLevel={loginStreak.getActivityLevel}
                    />

                    <div className="courses-grid">
                        {sortedCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onContinue={() => handleContinueCourse(course.id)}
                                onViewCertificate={handleViewCertificate}
                                onCardClick={setSelectedCourse}
                            />
                        ))}
                    </div>

                    {sortedCourses.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                                No courses found matching your search
                            </p>
                        </div>
                    )}

                    {/* SVG Gradients for Progress Rings */}
                    <svg width="0" height="0">
                        <defs>
                            <linearGradient id="progressGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6C7383" />
                                <stop offset="100%" stopColor="#4C57FF" />
                            </linearGradient>
                            <linearGradient id="progressGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4C57FF" />
                                <stop offset="100%" stopColor="#00D4FF" />
                            </linearGradient>
                            <linearGradient id="progressGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1A3D7C" />
                                <stop offset="100%" stopColor="#4C57FF" />
                            </linearGradient>
                            <linearGradient id="progressGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10B981" />
                                <stop offset="100%" stopColor="#34D399" />
                            </linearGradient>
                            <linearGradient id="progressGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4C57FF" />
                                <stop offset="100%" stopColor="#1A3D7C" />
                            </linearGradient>
                            <linearGradient id="progressGrad6" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00D4FF" />
                                <stop offset="100%" stopColor="#4C57FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </main>

            <RightSidebar showToast={showToast} />

            {learningCourseId && (
                <CourseLearningPage
                    courseId={learningCourseId}
                    onClose={() => setLearningCourseId(null)}
                    showToast={showToast}
                />
            )}

            {selectedCourse && (
                <CourseDetailsPage
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                    showToast={showToast}
                />
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}

            {isChatbotOpen && (
                <AIChatbot 
                    onClose={() => setIsChatbotOpen(false)} 
                />
            )}

            {/* Chat with AI Button */}
            <button 
                className="chat-ai-button"
                onClick={() => setIsChatbotOpen(true)}
                title="Chat with AI"
            >
                💬 Chat with AI
            </button>
        </>
    )
}

export default App
