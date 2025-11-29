const PageHeader = () => {
    return (
        <div className="page-header">
            <div className="header-text">
                <h1>My Courses</h1>
                <p>Continue your learning journey · 8 courses in progress</p>
            </div>

            <div className="header-buttons">
                <button className="btn-outline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    <span>Refine</span>
                </button>

                <button className="btn-outline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Export Progress</span>
                </button>
            </div>
        </div>
    )
}

export default PageHeader
