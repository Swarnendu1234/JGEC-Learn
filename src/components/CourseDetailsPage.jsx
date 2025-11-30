import { useState } from 'react'
import PaymentModal from './PaymentModal'

const CourseDetailsPage = ({ course, onClose, showToast }) => {
    const [expandedModule, setExpandedModule] = useState(null)
    const [showPaymentModal, setShowPaymentModal] = useState(false)

    const toggleModule = (moduleId) => {
        // Check if course access is expired or locked
        if (course.status === 'expired' || course.isPaid) {
            showToast('Full access requires payment. Please upgrade to continue. / সম্পূর্ণ অ্যাক্সেসের জন্য পেমেন্ট প্রয়োজন। অনুগ্রহ করে আপগ্রেড করুন।', 'warning')
            setShowPaymentModal(true)
            return
        }
        setExpandedModule(expandedModule === moduleId ? null : moduleId)
    }

    const handleResumeCourse = () => {
        if (course.status === 'expired' || course.isPaid) {
            showToast('This is a premium course. Upgrade to access all content. / এটি একটি প্রিমিয়াম কোর্স। সমস্ত কন্টেন্ট অ্যাক্সেস করতে আপগ্রেড করুন।', 'warning')
            setShowPaymentModal(true)
            return
        }
        showToast(`Resuming ${course.title}...`, 'success')
        // Navigate to course player
    }

    const handleUpgradeAccess = () => {
        setShowPaymentModal(true)
        showToast('Opening payment options... / পেমেন্ট অপশন খোলা হচ্ছে...', 'info')
        // Open payment modal
    }

    const handleViewCourse = () => {
        if (course.status === 'expired' || course.isPaid) {
            showToast('Full access requires payment to unlock all modules / সমস্ত মডিউল আনলক করতে পেমেন্ট প্রয়োজন', 'warning')
        }
        // Navigate to course viewer with limited access
    }

    const handleDownloadResource = (resource) => {
        if (course.status === 'expired' || course.isPaid) {
            showToast('Upgrade to download resources / রিসোর্স ডাউনলোড করতে আপগ্রেড করুন', 'warning')
            setShowPaymentModal(true)
            return
        }
        showToast(`Downloading ${resource.name}...`, 'info')
    }

    return (
        <>
            {showPaymentModal && (
                <PaymentModal
                    course={course}
                    onClose={() => setShowPaymentModal(false)}
                    showToast={showToast}
                />
            )}

            <div className="course-details-overlay" onClick={onClose}>
                {/* SVG Gradient Definitions */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4F46E5" />
                            <stop offset="100%" stopColor="#7C3AED" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="course-details-container" onClick={(e) => e.stopPropagation()}>
                    {/* Close Button */}
                    <button className="course-details-close" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Banner Section */}
                    <div className="course-banner-premium">
                        <img src={course.bannerImage} alt={course.title} />

                        {/* University Badge */}
                        <div className="university-badge-premium">
                            <div className="badge-logo">{course.badge}</div>
                        </div>

                        {/* Access Status Tag */}
                        {(course.status === 'expired' || course.isPaid) && (
                            <div className={`access-status-tag ${course.status === 'expired' ? 'expired' : 'paid'}`}>
                                {course.status === 'expired' ? (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                        </svg>
                                        Access Expired
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                        </svg>
                                        Premium Course
                                    </>
                                )}
                            </div>
                        )}

                        <div className="course-banner-overlay-premium">
                            <div className="course-banner-content-premium">
                                <h1 className="course-title-premium">{course.title}</h1>

                                <div className="course-meta-row">
                                    <div className="meta-item-premium">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                        <span>{course.enrolled} enrolled</span>
                                    </div>
                                    <div className="meta-item-premium">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="meta-item-premium rating-premium">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span>{course.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="course-details-content">
                        {/* Sidebar */}
                        <div className="course-sidebar-premium">
                            {/* Progress Card Premium */}
                            <div className="course-progress-card-premium">
                                <div className="progress-header">
                                    <h3>Course Progress / কোর্স অগ্রগতি</h3>
                                    {(course.status === 'expired' || course.isPaid) && (
                                        <div className="lock-indicator">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="progress-visual-premium">
                                    <div className="progress-circle-large">
                                        <svg viewBox="0 0 120 120">
                                            <circle cx="60" cy="60" r="54" className="progress-bg-premium" />
                                            <circle
                                                cx="60"
                                                cy="60"
                                                r="54"
                                                className="progress-fill-premium"
                                                strokeDasharray={`${course.progress * 3.39} 339`}
                                            />
                                            <text x="60" y="60" className="progress-text-premium">
                                                <tspan x="60" dy="8">{course.progress}%</tspan>
                                            </text>
                                        </svg>
                                    </div>
                                    <div className="progress-stats-premium">
                                        <p className="modules-completed">{course.modules.completed}/{course.modules.total} modules completed / মডিউল সম্পন্ন</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tags Card */}
                            <div className="tags-card-premium">
                                <h3>Course Topics / কোর্স বিষয়</h3>
                                <div className="tags-wrapper">
                                    {course.tags.map((tag, index) => (
                                        <span key={index} className="tag-pill-premium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Buttons Card */}
                            <div className="cta-card-premium">
                                <button className="btn-upgrade-premium" onClick={handleUpgradeAccess}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <span>Upgrade Access / আপগ্রেড করুন</span>
                                </button>
                                <button className="btn-view-course-premium" onClick={handleViewCourse}>
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    <span>View Course / কোর্স দেখুন</span>
                                </button>
                            </div>

                            {/* Instructors Card */}
                            <div className="instructors-card">
                                <h3>Instructors</h3>
                                {course.instructors.map((instructor, index) => (
                                    <div key={index} className="instructor-item">
                                        <img src={instructor.image} alt={instructor.name} />
                                        <div className="instructor-info">
                                            <h4>{instructor.name}</h4>
                                            <p>{instructor.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Download Resources Card */}
                            <div className="resources-card">
                                <h3>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                    Download Resources
                                </h3>
                                <div className="resources-list">
                                    {course.resources.map((resource, index) => (
                                        <div
                                            key={index}
                                            className="resource-item"
                                            onClick={() => handleDownloadResource(resource)}
                                        >
                                            <div className="resource-icon" data-type={resource.type}>
                                                {resource.type === 'pdf' ? (
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                                                        <path d="M14 2v6h6M10 13h4M10 17h4M10 9h2" />
                                                    </svg>
                                                ) : (
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                                                        <path d="M12 18l-4-4h3V9h2v5h3l-4 4z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="resource-info">
                                                <h4>{resource.name}</h4>
                                                <p>{resource.size}</p>
                                            </div>
                                            <svg className="download-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M7 10l5 5 5-5" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="course-main-content">
                            {/* About Section */}
                            <section className="content-section">
                                <h2>About This Course</h2>
                                <p className="course-description">{course.about}</p>
                            </section>

                            {/* Learning Outcomes */}
                            <section className="content-section">
                                <h2>What You Will Learn</h2>
                                <div className="learning-outcomes">
                                    {course.learningOutcomes.map((outcome, index) => (
                                        <div key={index} className="outcome-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                            <p>{outcome}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Course Syllabus */}
                            <section className="content-section">
                                <h2>Course Syllabus</h2>
                                <div className="syllabus-container">
                                    {course.syllabus.map((module) => (
                                        <div
                                            key={module.id}
                                            className={`syllabus-module ${module.completed ? 'completed' : ''} ${expandedModule === module.id ? 'expanded' : ''}`}
                                        >
                                            <div
                                                className="module-header"
                                                onClick={() => toggleModule(module.id)}
                                            >
                                                <div className="module-status">
                                                    {module.completed ? (
                                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    ) : (
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="module-info">
                                                    <h3>{module.title}</h3>
                                                    <p>
                                                        {module.lectures} lectures • {module.duration}
                                                        {module.completed && <span className="completed-badge">Completed</span>}
                                                    </p>
                                                </div>
                                                <svg
                                                    className="module-toggle"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            <div className="module-content">
                                                <ul className="module-topics">
                                                    {module.topics.map((topic, index) => (
                                                        <li key={index}>
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M9 12l2 2 4-4" />
                                                            </svg>
                                                            {topic}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseDetailsPage
