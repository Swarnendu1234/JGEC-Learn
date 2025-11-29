const FilterChips = ({ activeFilter, setActiveFilter, sortBy, setSortBy, category, setCategory, showToast }) => {
    const filters = [
        { id: 'all', label: 'All Courses' },
        { id: 'progress', label: 'In Progress' },
        { id: 'completed', label: 'Completed' },
        { id: 'not-started', label: 'Not Started' },
        { id: 'expired', label: 'Expired' },
    ]

    const handleSortChange = (e) => {
        const value = e.target.value.split(': ')[1]
        setSortBy(value)
        showToast(`Sorted by ${value}`, 'success')
    }

    return (
        <div className="filter-chips">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    className={`chip ${activeFilter === filter.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter.id)}
                >
                    {filter.label}
                </button>
            ))}

            <div className="filter-divider"></div>

            <select className="filter-select" value={`Sort: ${sortBy}`} onChange={handleSortChange}>
                <option>Sort: Recent</option>
                <option>Sort: Progress</option>
                <option>Sort: Title</option>
                <option>Sort: Deadline</option>
            </select>

            <select className="filter-select" value={`Category: ${category}`} onChange={(e) => setCategory(e.target.value.split(': ')[1])}>
                <option>Category: All</option>
                <option>Computer Science</option>
                <option>Data Science</option>
                <option>Mathematics</option>
                <option>Business</option>
            </select>
        </div>
    )
}

export default FilterChips
