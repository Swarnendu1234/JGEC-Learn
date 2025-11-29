// ============================================
// JGEC Learn - Premium Learning Platform
// Interactive Features & Animations
// ============================================

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    initializeSidebar();
    initializeSearch();
    initializeFilters();
    initializeCourseCards();
    initializeProgressHeatmap();
    initializeAIAssistant();
    initializeAchievements();
    initializeAnimations();
    initializeKeyboardShortcuts();
});

// ============================================
// DARK MODE TOGGLE
// ============================================

function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'dark') {
        body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            // Save preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'dark');
                showToast('Dark mode enabled 🌙', 'info');
            } else {
                localStorage.setItem('darkMode', 'light');
                showToast('Light mode enabled ☀️', 'info');
            }

            // Smooth transition animation
            animateThemeChange();
        });
    }
}

function animateThemeChange() {
    const body = document.body;
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 500);
}

// ============================================
// SIDEBAR NAVIGATION
// ============================================

function initializeSidebar() {
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.querySelector('.sidebar');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    let searchTimeout;

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);

            searchTimeout = setTimeout(() => {
                const query = e.target.value.toLowerCase();
                performSearch(query);
            }, 300);
        });
    }
}

function performSearch(query) {
    const courseCards = document.querySelectorAll('.course-card');
    let visibleCount = 0;

    courseCards.forEach((card, index) => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const badge = card.querySelector('.card-badge').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');

        if (!query || title.includes(query) || badge.includes(query) || tags.includes(query)) {
            card.style.display = '';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
            visibleCount++;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

    if (query && visibleCount === 0) {
        showToast('No courses found matching your search', 'info');
    }
}

// ============================================
// FILTER SYSTEM
// ============================================

function initializeFilters() {
    const chips = document.querySelectorAll('.chip');
    const filterSelects = document.querySelectorAll('.filter-select');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove active class from all chips
            chips.forEach(c => c.classList.remove('active'));

            // Add active class to clicked chip
            chip.classList.add('active');

            // Apply filter
            const filter = chip.dataset.filter;
            applyFilter(filter);
        });
    });

    filterSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            applySortOrCategory(e.target.value);
        });
    });
}

function applyFilter(filter) {
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach((card, index) => {
        const status = card.dataset.status;
        let shouldShow = false;

        switch (filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'progress':
                shouldShow = status === 'progress';
                break;
            case 'completed':
                shouldShow = status === 'completed';
                break;
            case 'not-started':
                shouldShow = status === 'not-started';
                break;
            case 'expired':
                shouldShow = status === 'expired';
                break;
            default:
                shouldShow = true;
        }

        if (shouldShow) {
            card.style.display = '';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function applySortOrCategory(value) {
    const courseCards = Array.from(document.querySelectorAll('.course-card'));
    const coursesGrid = document.querySelector('.courses-grid');

    if (value.includes('Sort:')) {
        const sortType = value.split(':')[1].trim();

        courseCards.sort((a, b) => {
            switch (sortType) {
                case 'Progress':
                    const progressA = parseInt(a.querySelector('.progress-ring').dataset.progress);
                    const progressB = parseInt(b.querySelector('.progress-ring').dataset.progress);
                    return progressB - progressA;
                case 'Title':
                    const titleA = a.querySelector('.card-title').textContent;
                    const titleB = b.querySelector('.card-title').textContent;
                    return titleA.localeCompare(titleB);
                default:
                    return 0;
            }
        });

        // Re-append sorted cards with animation
        courseCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                coursesGrid.appendChild(card);
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 50);
        });

        showToast(`Sorted by ${sortType}`, 'success');
    }
}

// ============================================
// COURSE CARDS INTERACTION
// ============================================

function initializeCourseCards() {
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        // Hover effect enhancements
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        // Click handlers
        const quickAction = card.querySelector('.quick-action');
        if (quickAction) {
            quickAction.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseTitle = card.querySelector('.card-title').textContent;
                handleQuickAction(courseTitle, card);
            });
        }

        // Primary button clicks
        const primaryBtn = card.querySelector('.btn-primary');
        if (primaryBtn) {
            primaryBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseTitle = card.querySelector('.card-title').textContent;
                continueCourse(courseTitle);
            });
        }

        // Certificate button
        const certBtn = card.querySelector('.btn-secondary');
        if (certBtn && certBtn.textContent.includes('Certificate')) {
            certBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                viewCertificate(card);
            });
        }
    });

    // Animate progress rings on scroll
    animateProgressRings();
}

function handleQuickAction(courseTitle, card) {
    const status = card.dataset.status;

    if (status === 'completed') {
        viewCertificate(card);
    } else {
        continueCourse(courseTitle);
    }
}

function continueCourse(courseTitle) {
    showToast(`Launching ${courseTitle}...`, 'info');

    // Simulate loading
    setTimeout(() => {
        showToast('Course loaded! 🚀', 'success');
    }, 1500);
}

function viewCertificate(card) {
    const courseTitle = card.querySelector('.card-title').textContent;
    showToast(`Viewing certificate for ${courseTitle} 🎓`, 'success');

    // Trigger confetti animation
    launchConfetti();
}

function animateProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ring = entry.target;
                const circle = ring.querySelector('.progress-circle');
                const progress = parseInt(ring.dataset.progress);
                const circumference = 163.36;
                const offset = circumference - (circumference * progress / 100);

                circle.style.strokeDashoffset = offset;
                observer.unobserve(ring);
            }
        });
    }, {
        threshold: 0.5
    });

    progressRings.forEach(ring => observer.observe(ring));
}

// ============================================
// PROGRESS HEATMAP
// ============================================

function initializeProgressHeatmap() {
    const heatmapGrid = document.getElementById('heatmapGrid');

    if (heatmapGrid) {
        // Generate 30 days of activity data
        for (let i = 0; i < 30; i++) {
            const day = document.createElement('div');
            day.className = 'heatmap-day';

            // Random activity level (0-4)
            const level = Math.floor(Math.random() * 5);
            day.dataset.level = level;

            // Add tooltip
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            day.title = `${date.toLocaleDateString()}: ${getActivityText(level)}`;

            heatmapGrid.appendChild(day);
        }

        // Add click interaction
        const heatmapDays = document.querySelectorAll('.heatmap-day');
        heatmapDays.forEach(day => {
            day.addEventListener('click', () => {
                const level = day.dataset.level;
                showToast(`Activity: ${getActivityText(level)}`, 'info');
            });
        });
    }
}

function getActivityText(level) {
    const activities = ['No activity', 'Light activity', 'Moderate activity', 'High activity', 'Very high activity'];
    return activities[level];
}

// ============================================
// AI ASSISTANT
// ============================================

function initializeAIAssistant() {
    const aiBtn = document.querySelector('.ai-btn');
    const aiSuggestions = document.querySelectorAll('.ai-suggestion');

    if (aiBtn) {
        aiBtn.addEventListener('click', () => {
            showToast('AI Chat opening... 🤖', 'info');
            // In a real implementation, this would open a chat modal
        });
    }

    aiSuggestions.forEach(suggestion => {
        suggestion.addEventListener('click', () => {
            const title = suggestion.querySelector('h5').textContent;
            showToast(`Opening: ${title}`, 'info');
        });
    });
}

// ============================================
// ACHIEVEMENTS & CONFETTI
// ============================================

function initializeAchievements() {
    const achievementBtn = document.getElementById('achievementBtn');

    if (achievementBtn) {
        achievementBtn.addEventListener('click', () => {
            launchConfetti();
            showToast('🎉 Achievements unlocked!', 'success');
        });
    }
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#4C57FF', '#00D4FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 100,
            width: Math.random() * 10 + 5,
            height: Math.random() * 15 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            velocity: Math.random() * 3 + 2,
            sway: Math.random() * 2 - 1
        });
    }

    let animationId;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let activePieces = 0;

        confettiPieces.forEach(piece => {
            if (piece.y < canvas.height) {
                activePieces++;

                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate((piece.rotation * Math.PI) / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
                ctx.restore();

                piece.y += piece.velocity;
                piece.x += piece.sway;
                piece.rotation += piece.rotationSpeed;
                piece.velocity += 0.1;
            }
        });

        if (activePieces > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();

    // Clean up after 5 seconds
    setTimeout(() => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, 5000);
}

// ============================================
// ANIMATIONS
// ============================================

function initializeAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe course cards
    document.querySelectorAll('.course-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
        fadeObserver.observe(card);
    });

    // Animate other sections
    const sections = ['.streak-banner', '.heatmap-section', '.ai-assistant-widget', '.recommendations'];
    sections.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            fadeObserver.observe(element);
        }
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.search-input')?.focus();
            showToast('Search activated', 'info');
        }

        // Ctrl/Cmd + D: Toggle dark mode
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            document.getElementById('darkModeToggle')?.click();
        }

        // Ctrl/Cmd + A: Open AI assistant
        if ((e.ctrlKey || e.metaKey) && e.key === 'a' && e.shiftKey) {
            e.preventDefault();
            document.querySelector('.ai-btn')?.click();
        }

        // Escape: Clear search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('.search-input');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                performSearch('');
            }
        }
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#4C57FF'
    };

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: white;
        color: #1F2937;
        padding: 16px 24px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 15px;
        font-weight: 600;
        border-left: 4px solid ${colors[type]};
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        font-family: 'Inter', sans-serif;
    `;

    toast.innerHTML = `
        <div style="width: 28px; height: 28px; background: ${colors[type]}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; font-weight: 700;">
            ${icons[type]}
        </div>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    // Remove after 3.5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`✨ Page loaded in ${pageLoadTime}ms`);

        // Show welcome message
        setTimeout(() => {
            showToast('Welcome to JGEC Learn! 🎓', 'success');
        }, 500);
    }
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ============================================
// RECOMMENDATIONS INTERACTION
// ============================================

document.querySelectorAll('.recommendation-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('enroll-btn')) {
            const title = card.querySelector('h4').textContent;
            showToast(`Viewing: ${title}`, 'info');
        }
    });
});

document.querySelectorAll('.enroll-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = e.target.closest('.recommendation-card');
        const title = card.querySelector('h4').textContent;
        showToast(`Enrolling in: ${title} 🎓`, 'success');

        // Add slight animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    });
});

// ============================================
// RESPONSIVE ENHANCEMENTS
// ============================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        const canvas = document.getElementById('confettiCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Recalculate layouts if needed
        console.log('Window resized, layouts updated');
    }, 250);
});

console.log('🚀 JGEC Learn Premium - All systems initialized');
