import { useEffect, useRef } from 'react'
import CircularProgress from './CircularProgress'

const CourseCard = ({ course, onContinue, onViewCertificate, onCardClick }) => {
    const progressRef = useRef(null)

    useEffect(() => {
        // Animate progress ring
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const circle = entry.target.querySelector('.progress-circle')
                        if (circle) {
                            const circumference = 163.36
                            const offset = circumference - (circumference * course.progress / 100)
                            circle.style.strokeDashoffset = offset
                        }
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.5 }
        )

        if (progressRef.current) {
            observer.observe(progressRef.current)
        }

        return () => observer.disconnect()
    }, [course.progress])

    const handlePrimaryAction = () => {
        if (course.status === 'completed') {
            onViewCertificate(course.title)
        } else {
            onContinue(course.title)
        }
    }

    return (
        <div
            className={`course-card ${course.isActive ? 'active' : ''} ${course.status === 'completed' ? 'completed' : ''}`}
            data-status={course.status}
            onClick={() => onCardClick && onCardClick(course)}
        >
            <div className="card-image">
                <img src={course.image} alt={course.title} />
                <div className={`card-badge ${course.badgeColor}`}>{course.badge}</div>
                <div className={`status-label ${course.status === 'progress' ? 'active' : course.status}`}>
                    {course.status === 'expired' ? 'Access Expired' :
                        course.status === 'progress' ? 'In Progress' :
                            course.status === 'completed' ? 'Completed' : 'Not Started'}
                </div>
                {course.certificateEarned && (
                    <div className="certificate-badge">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}
                <div className="card-overlay">
                    
                </div>
            </div>

            <div className="card-content">
                <h3 className="card-title">{course.title}</h3>

                <div className="card-meta">
                    {course.enrolled && (
                        <>
                            <span className="meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                {course.enrolled}
                            </span>
                            <span className="meta-divider">·</span>
                        </>
                    )}
                    {course.duration && (
                        <>
                            <span className="meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {course.duration}
                            </span>
                        </>
                    )}
                    {course.rating && (
                        <>
                            <span className="meta-divider">·</span>
                            <span className="meta-item rating">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                {course.rating}
                            </span>
                        </>
                    )}
                </div>

                <div className="progress-section">
                    <div className="progress-ring-wrapper">
                        <CircularProgress progress={course.progress} size={60} strokeWidth={4} />
                    </div>
                    <div className="progress-details">
                        <div className="progress-label">
                            {course.status === 'completed' ? 'Course Completed' : 'Course Progress'}
                        </div>
                        <div className="progress-stats">
                            {course.status === 'completed' ? 'All modules finished' : `${course.modules.completed}/${course.modules.total} modules completed`}
                        </div>
                    </div>
                </div>

                <div className="card-tags">
                    {course.tags.map((tag, index) => (
                        <span
                            key={index}
                            className={`tag ${tag === 'Trending' ? 'hot' : tag === 'Certified' ? 'certified' : ''}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="card-actions">
                    {course.status === 'expired' ? (
                        <>
                            <button className="btn-secondary">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                Upgrade Access
                            </button>
                            <button className="btn-primary" onClick={() => onContinue(course.title)}>View Course</button>
                        </>
                    ) : course.status === 'completed' ? (
                        <>
                            <button className="btn-secondary" onClick={() => onViewCertificate(course.title)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                                View Certificate
                            </button>
                            <button className="btn-primary" onClick={() => onContinue(course.title)}>Review Course</button>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default CourseCard
