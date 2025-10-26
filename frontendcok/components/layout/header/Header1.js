'use client'
import Link from "next/link"
import { useEffect, useState } from 'react'
import MobileMenu from '../MobileMenu'
import api from '@/api'
import { useRouter } from 'next/navigation' // Import useRouter
import { useAuth } from '@/contexts/AuthContext';

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, handleConnect }) {
    const [isMobile, setIsMobile] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.dropdown')) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    const handleLogout = async () => {
        await logout();
        setIsDropdownOpen(false);
    }

    const handleConnectPage = () => {
        router.push('/login');
    }

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    const handleEditProfile = () => {
        router.push('/profile');
        setIsDropdownOpen(false);
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        // Check if we're on the home page
        if (window.location.pathname === '/') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Navigate to home page
            window.location.href = '/';
        }
    };

    return (
        <header id="header_main" className={`header ${scroll ? "is-fixed is-small" : ""}`}>
            <div className="container">
                <div id="site-header-inner">
                    <div className="header__logo">
                        <a href="#" onClick={handleHomeClick} style={{ textDecoration: 'none' }}>
                            <img src="assets/images/logo/Group 2.png" alt="Logo" />
                        </a>
                    </div>

                    {isMobile ? (
                        <MobileMenu isMobileMenu={isMobileMenu} />
                    ) : (
                        <nav id="main-nav" className="main-nav">
                            <ul id="menu-primary-menu" className="menu">
                                <li className="menu-item"><a href="#" className="nav-link" onClick={handleHomeClick}>Home</a></li>
                                <li className="menu-item"><a href="/#feature" className="nav-link">Features</a></li>
                                <li className="menu-item"><a href="/#step" className="nav-link">Steps</a></li>
                                <li className="menu-item"><a href="/#chart" className="nav-link">Chart</a></li>
                                <li className="menu-item"><a href="/#partner" className="nav-link">Partners</a></li>
                                <li className="menu-item"><a href="/#faq" className="nav-link">FAQ</a></li>
                            </ul>
                        </nav>
                    )}

                    <div className="header-buttons">
                        {isAuthenticated ? (
                            <div className="dropdown relative"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button 
                                    className="tf-button style2" 
                                    style={{
                                        minWidth: '80px',
                                        padding: '8px 16px',
                                        textAlign: 'center'
                                    }}
                                >
                                    {user?.name || 'Profil'}
                                </button>
                                {isDropdownOpen && (
                                    <div className="dropdown-content p-3 rounded shadow-lg bg-gray-800 absolute right-0 z-50 text-white border border-gray-700"
                                    style={{ minWidth: '150px' }}>
                                        <Link 
                                            href="/profile"
                                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded mb-2"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Edit Profil
                                        </Link>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLogout();
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded"
                                        >
                                            Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={handleConnectPage} className="tf-button style2">
                                Login
                            </button>
                        )}

                        <div className={`mobile-button ${isMobileMenu ? "active" : ""}`} onClick={handleMobileMenu}>
                            <span />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}