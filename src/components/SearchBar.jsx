import { useState, useEffect, useRef } from 'react'

const SearchBar = ({ searchQuery, setSearchQuery, coursesData }) => {
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const searchRef = useRef(null)
    const suggestionsRef = useRef(null)

    // Generate suggestions based on input
    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            const query = searchQuery.toLowerCase()
            const allSuggestions = []

            // Search in course titles
            coursesData.forEach(course => {
                if (course.title.toLowerCase().includes(query)) {
                    allSuggestions.push({
                        type: 'course',
                        text: course.title,
                        badge: course.badge,
                        icon: 'book'
                    })
                }

                // Search in tags
                course.tags.forEach(tag => {
                    if (tag.toLowerCase().includes(query) &&
                        !allSuggestions.find(s => s.text === tag)) {
                        allSuggestions.push({
                            type: 'tag',
                            text: tag,
                            icon: 'tag'
                        })
                    }
                })

                // Search in institutions/badges
                if (course.badge.toLowerCase().includes(query) &&
                    !allSuggestions.find(s => s.text === course.badge)) {
                    allSuggestions.push({
                        type: 'institution',
                        text: course.badge,
                        icon: 'university'
                    })
                }
            })

            // Limit to 8 suggestions
            setSuggestions(allSuggestions.slice(0, 8))
            setShowSuggestions(allSuggestions.length > 0)
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
        setSelectedIndex(-1)
    }, [searchQuery, coursesData])

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!showSuggestions) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
                break
            case 'Enter':
                e.preventDefault()
                if (selectedIndex >= 0) {
                    handleSuggestionClick(suggestions[selectedIndex])
                }
                break
            case 'Escape':
                setShowSuggestions(false)
                setSelectedIndex(-1)
                break
            default:
                break
        }
    }

    // Scroll selected item into view
    useEffect(() => {
        if (selectedIndex >= 0 && suggestionsRef.current) {
            const selectedElement = suggestionsRef.current.children[selectedIndex]
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth'
                })
            }
        }
    }, [selectedIndex])

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.text)
        setShowSuggestions(false)
        setSelectedIndex(-1)
    }

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
        if (e.target.value.trim().length > 0) {
            setShowSuggestions(true)
        }
    }

    const handleInputFocus = () => {
        if (searchQuery.trim().length > 0 && suggestions.length > 0) {
            setShowSuggestions(true)
        }
    }

    const getIconPath = (iconType) => {
        switch (iconType) {
            case 'book':
                return 'M2 7h20v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7zm14-2V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v0'
            case 'tag':
                return 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01'
            case 'university':
                return 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
            default:
                return 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        }
    }

    const getTypeLabel = (type) => {
        switch (type) {
            case 'course':
                return 'Course'
            case 'tag':
                return 'Tag'
            case 'institution':
                return 'Institution'
            default:
                return ''
        }
    }

    return (
        <div className="search-container" ref={searchRef}>
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
            </svg>
            <input
                type="text"
                placeholder="Search courses, subjects, or instructors..."
                className="search-input"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                autoComplete="off"
            />
            <kbd className="search-kbd">Ctrl+K</kbd>

            {showSuggestions && suggestions.length > 0 && (
                <div className="search-suggestions" ref={suggestionsRef}>
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`search-suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <div className="suggestion-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d={getIconPath(suggestion.icon)} />
                                </svg>
                            </div>
                            <div className="suggestion-content">
                                <div className="suggestion-text">{suggestion.text}</div>
                                <div className="suggestion-type">{getTypeLabel(suggestion.type)}</div>
                            </div>
                            {suggestion.badge && (
                                <div className="suggestion-badge">{suggestion.badge}</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchBar
