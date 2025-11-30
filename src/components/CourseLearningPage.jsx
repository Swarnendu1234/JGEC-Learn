import { useState, useEffect } from 'react'
import { fetchCourseDetails, updateModuleProgress, saveUserNote, fetchUserNotes } from '../services/api'
import './CourseLearningPage.css'

const CourseLearningPage = ({ courseId, onClose, showToast }) => {
    const [courseData, setCourseData] = useState(null)
    const [activeModule, setActiveModule] = useState(null)
    const [userNotes, setUserNotes] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCourseData()
    }, [courseId])

    const loadCourseData = async () => {
        try {
            const data = await fetchCourseDetails(courseId)
            setCourseData(data)
            const nextModule = data.modules.find(m => !m.isCompleted)
            setActiveModule(nextModule || data.modules[0])
            const notes = await fetchUserNotes(courseId, nextModule?.moduleId)
            setUserNotes(notes || '')
            setLoading(false)
        } catch (error) {
            showToast('Error loading course', 'error')
            setLoading(false)
        }
    }

    const handleModuleClick = async (module) => {
        if (module.isLocked) {
            showToast('This module is locked. Complete previous modules first.', 'warning')
            return
        }
        setActiveModule(module)
        const notes = await fetchUserNotes(courseId, module.moduleId)
        setUserNotes(notes || '')
    }

    const handleCompleteModule = async () => {
        try {
            await updateModuleProgress(courseId, activeModule.moduleId, true)
            showToast('Module completed! 🎉', 'success')
            loadCourseData()
        } catch (error) {
            showToast('Error updating progress', 'error')
        }
    }

    const handleSaveNotes = async () => {
        try {
            await saveUserNote(courseId, activeModule.moduleId, userNotes)
            showToast('Notes saved', 'success')
        } catch (error) {
            showToast('Error saving notes', 'error')
        }
    }

    if (loading) {
        return (
            <div className="learning-page-overlay">
                <div className="learning-loader">Loading course...</div>
            </div>
        )
    }

    if (!courseData) return null

    return (
        <div className="learning-page-overlay">
            <div className="learning-page-container">
                {/* Header */}
                <header className="learning-header">
                    <button className="learning-back-btn" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back to Courses
                    </button>
                    <div className="learning-header-info">
                        <h1>{courseData.courseTitle}</h1>
                        <span className="institution-badge">{courseData.institutionName}</span>
                    </div>
                    <div className="learning-progress-bar">
                        <div className="progress-fill" style={{ width: `${courseData.progressPercentage}%` }}></div>
                        <span className="progress-text">{courseData.progressPercentage}% Complete</span>
                    </div>
                </header>

                <div className="learning-content-wrapper">
                    {/* Sidebar Navigation */}
                    <aside className="learning-sidebar">
                        <div className="sidebar-header">
                            <h3>Course Content</h3>
                            <span>{courseData.completedModules}/{courseData.totalModules} Completed</span>
                        </div>
                        <div className="modules-list">
                            {courseData.modules.map((module, index) => (
                                <button
                                    key={module.moduleId}
                                    className={`module-item ${activeModule?.moduleId === module.moduleId ? 'active' : ''} ${module.isLocked ? 'locked' : ''}`}
                                    onClick={() => handleModuleClick(module)}
                                >
                                    <div className="module-number">{index + 1}</div>
                                    <div className="module-info">
                                        <h4>{module.moduleTitle}</h4>
                                        {module.isCompleted && <span className="completed-check">✓</span>}
                                        {module.isLocked && <span className="locked-icon">🔒</span>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Main Learning Area */}
                    <main className="learning-main">
                        <div className="video-container">
                            <iframe
                                src={activeModule.videoUrl}
                                title={activeModule.moduleTitle}
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="lesson-content">
                            <h2>{activeModule.moduleTitle}</h2>
                            <p className="lesson-summary">{activeModule.summary}</p>

                            {activeModule.keyPoints && (
                                <div className="key-points">
                                    <h3>Key Points</h3>
                                    <ul>
                                        {activeModule.keyPoints.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="notes-section">
                                <h3>Your Notes</h3>
                                <textarea
                                    value={userNotes}
                                    onChange={(e) => setUserNotes(e.target.value)}
                                    placeholder="Take notes while learning..."
                                ></textarea>
                                <button onClick={handleSaveNotes} className="save-notes-btn">Save Notes</button>
                            </div>

                            {activeModule.resources && activeModule.resources.length > 0 && (
                                <div className="resources-section">
                                    <h3>Resources</h3>
                                    {activeModule.resources.map((resource, i) => (
                                        <a key={i} href={resource.url} className="resource-link" download>
                                            📄 {resource.name}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {activeModule.quizAvailable && (
                                <button className="quiz-btn">Start Quiz</button>
                            )}

                            {!activeModule.isCompleted && (
                                <button onClick={handleCompleteModule} className="complete-btn">
                                    Mark as Complete
                                </button>
                            )}
                        </div>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="learning-right-sidebar">
                        <div className="instructor-card">
                            <h3>Instructor</h3>
                            <img src={courseData.instructor.image} alt={courseData.instructor.name} />
                            <h4>{courseData.instructor.name}</h4>
                            <p className="instructor-position">{courseData.instructor.position}</p>
                            <p className="instructor-bio">{courseData.instructor.bio}</p>
                        </div>

                        <div className="course-info-card">
                            <h3>Course Info</h3>
                            <div className="info-item">
                                <span>⭐ {courseData.courseRating}</span>
                                <span>{courseData.learnersCount} learners</span>
                            </div>
                            <div className="info-item">
                                <span>⏱️ {courseData.courseDuration}</span>
                            </div>
                            <div className="tags">
                                {courseData.tags.map((tag, i) => (
                                    <span key={i} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default CourseLearningPage
