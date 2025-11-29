import { useEffect, useRef } from 'react'

const CourseCard = ({ course, onContinue, onViewCertificate }) => {
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
        <div className={`course-card ${course.isActive ? 'active' : ''} ${course.status === 'completed' ? 'completed' : ''}`} data-status={course.status}>
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
                    <button className="quick-action" onClick={handlePrimaryAction}>
                        {course.status === 'completed' ? 'View Certificate' : 'Continue Learning'}
                    </button>
                </div>
            </div>

            <div className="card-content">
                <h3 className="card-title">{course.title}</h3>

                <div className="card-meta">
                    {course.courseCode && (
                        <>
                            <span className="meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {course.courseCode}
                            </span>
                            <span className="meta-divider">·</span>
                        </>
                    )}
                    {course.expiryDate && <span className="meta-item">Expired: {course.expiryDate}</span>}
                    {course.enrolled && <span className="meta-item">{course.enrolled}</span>}
                    {course.instructor && <span className="meta-item">{course.instructor}</span>}
                    {course.courses && <span className="meta-item">{course.courses}</span>}
                    {course.duration && (
                        <>
                            {(course.enrolled || course.instructor || course.courses) && <span className="meta-divider">·</span>}
                            <span className="meta-item">{course.duration}</span>
                        </>
                    )}
                    {course.level && <span className="meta-item">{course.level}</span>}
                    {course.certificateEarned && (
                        <>
                            <span className="meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Certificate earned
                            </span>
                            <span className="meta-divider">·</span>
                            <span className="meta-item">{course.duration}</span>
                        </>
                    )}
                </div>

                <div className="progress-section">
                    <div
                        ref={progressRef}
                        className={`progress-ring ${course.isActive ? 'active' : ''} ${course.status === 'completed' ? 'completed' : ''}`}
                        data-progress={course.progress}
                    >
                        <svg width="60" height="60">
                            <circle cx="30" cy="30" r="26" stroke="var(--gray-100)" strokeWidth="4" fill="none" />
                            <circle
                                className="progress-circle"
                                cx="30" cy="30"
                                r="26"
                                stroke={`url(#${course.progressGradient})`}
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                style={{
                                    strokeDasharray: 163.36,
                                    strokeDashoffset: 163.36,
                                    transition: 'stroke-dashoffset 1s ease-out'
                                }}
                            />
                        </svg>
                        <span className="progress-text">
                            {course.status === 'completed' ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                `${course.progress}%`
                            )}
                        </span>
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
                    ) : (
                        <button className="btn-primary full-width" onClick={handlePrimaryAction}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Continue Learning
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseCard
