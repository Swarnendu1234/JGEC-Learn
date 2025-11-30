import { useAuth } from '../context/AuthContext'

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth()
    const navLinks = [
        {
            name: 'My Courses',
            icon: 'M2 7h20v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7zm14-2V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v0',
            active: true,
            badge: '8'
        },
        {
            name: 'Dashboard',
            icon: 'M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zM3 14h7v7H3z',
            href: 'neurallearn.html'
        },
        {
            name: 'Subjects',
            icon: 'M2 3h6c2.2 0 4 1.8 4 4v14c0-1.7-1.3-3-3-3H2V3zm20 0h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7V3z',
            href: 'subjects.html'
        },
        {
            name: 'Programs',
            icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
        },
        {
            name: 'Certificates',
            icon: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-5 13l2 2 4-4',
            badge: '3',
            badgeColor: 'success'
        },
    ]

    const bottomLinks = [
        { name: 'Profile', icon: 'M20 21v-2c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4v2M12 7c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z' },
        { name: 'Settings', icon: 'M12 15c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm0-10V1m0 6v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2l4.2-4.2' },
    ]

    return (
        <>
            <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-logo">
                    <svg className="logo-icon" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="18" fill="url(#logoGrad)" opacity="0.2" />
                        <circle cx="20" cy="20" r="18" stroke="url(#logoGrad)" strokeWidth="2" fill="none" />
                        <path d="M20 8 L20 20 L30 20" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="20" cy="20" r="2.5" fill="url(#logoGrad)" />
                        <defs>
                            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1A3D7C" />
                                <stop offset="100%" stopColor="#4C57FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span>JGEC Learn</span>
                </div>

                <nav className="sidebar-nav">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href || '#'}
                            className={`nav-link ${link.active ? 'active' : ''}`}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d={link.icon} />
                            </svg>
                            <span>{link.name}</span>
                            {link.badge && (
                                <span className={`badge ${link.badgeColor || ''}`}>{link.badge}</span>
                            )}
                        </a>
                    ))}

                    <div className="nav-divider"></div>

                    {bottomLinks.map((link, index) => (
                        <a key={index} href="#" className="nav-link">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d={link.icon} />
                            </svg>
                            <span>{link.name}</span>
                        </a>
                    ))}
                </nav>

                <div className="sidebar-user">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} alt="User" />
                    <div className="user-info">
                        <div className="user-name">{user?.name || 'User'}</div>
                        <div className="user-role">Premium Student</div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
