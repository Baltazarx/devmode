'use client'
import { useEffect, useState } from 'react'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }) {
    const [isAnimating, setIsAnimating] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        if (isMobileMenu) {
            setShouldRender(true)
            // Small delay to ensure DOM is ready
            setTimeout(() => setIsAnimating(true), 10)
        } else {
            setIsAnimating(false)
            // Wait for animation to complete before removing from DOM
            setTimeout(() => setShouldRender(false), 300)
        }
    }, [isMobileMenu])

    const handleHomeClick = (e) => {
        e.preventDefault();
        // Close the menu first
        handleMenuClick();
        
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

    const handleMenuClick = () => {
        // Close the menu by calling parent function
        if (handleMobileMenu) {
            handleMobileMenu()
        }
    };

    if (!shouldRender) return null;

    return (
        <>
            <style jsx>{`
                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(5px);
                    z-index: 998;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .mobile-menu-overlay.show {
                    opacity: 1;
                }

                .mobile-menu-nav {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 280px;
                    height: 100vh;
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-left: 1px solid rgba(134, 255, 0, 0.2);
                    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
                    z-index: 999;
                    transform: translateX(100%);
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow-y: auto;
                }

                .mobile-menu-nav.show {
                    transform: translateX(0);
                }

                .mobile-menu-header {
                    padding: 20px;
                    border-bottom: 1px solid rgba(134, 255, 0, 0.2);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .mobile-menu-logo {
                    color: #86FF00;
                    font-size: 18px;
                    font-weight: 700;
                    text-decoration: none;
                }

                .mobile-menu-close {
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                }

                .mobile-menu-close:hover {
                    background: rgba(134, 255, 0, 0.1);
                    color: #86FF00;
                }

                .mobile-menu-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .mobile-menu-item {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    opacity: 0;
                    transform: translateX(20px);
                    transition: all 0.3s ease;
                }

                .mobile-menu-item.show {
                    opacity: 1;
                    transform: translateX(0);
                }

                .mobile-menu-item:nth-child(1) { transition-delay: 0.1s; }
                .mobile-menu-item:nth-child(2) { transition-delay: 0.15s; }
                .mobile-menu-item:nth-child(3) { transition-delay: 0.2s; }
                .mobile-menu-item:nth-child(4) { transition-delay: 0.25s; }
                .mobile-menu-item:nth-child(5) { transition-delay: 0.3s; }
                .mobile-menu-item:nth-child(6) { transition-delay: 0.35s; }

                .mobile-menu-link {
                    display: block;
                    padding: 18px 25px;
                    color: #fff;
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .mobile-menu-link:hover {
                    background: rgba(134, 255, 0, 0.1);
                    color: #86FF00;
                    padding-left: 35px;
                }

                .mobile-menu-link::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background: #86FF00;
                    transform: scaleY(0);
                    transition: transform 0.3s ease;
                }

                .mobile-menu-link:hover::before {
                    transform: scaleY(1);
                }

                @media (max-width: 480px) {
                    .mobile-menu-nav {
                        width: 100%;
                        border-left: none;
                        border-top: 1px solid rgba(134, 255, 0, 0.2);
                    }
                }
            `}</style>

            {/* Overlay */}
            <div 
                className={`mobile-menu-overlay ${isAnimating ? 'show' : ''}`}
                onClick={handleMenuClick}
            />

            {/* Mobile Menu */}
            <nav className={`mobile-menu-nav ${isAnimating ? 'show' : ''}`}>
                <div className="mobile-menu-header">
                    <a href="#" className="mobile-menu-logo" onClick={handleHomeClick}>
                        Ugly Dog
                    </a>
                    <button 
                        className="mobile-menu-close"
                        onClick={handleMenuClick}
                        aria-label="Close menu"
                    >
                        ×
                    </button>
                </div>
                
                <ul className="mobile-menu-list">
                    <li className={`mobile-menu-item ${isAnimating ? 'show' : ''}`}>
                        <a href="#" className="mobile-menu-link" onClick={handleHomeClick}>
                            Home
                        </a>
                    </li>
                    <li className={`mobile-menu-item ${isAnimating ? 'show' : ''}`}>
                        <a href="/#feature" className="mobile-menu-link" onClick={handleMenuClick}>
                            Features
                        </a>
                    </li>
                    <li className={`mobile-menu-item ${isAnimating ? 'show' : ''}`}>
                        <a href="/#step" className="mobile-menu-link" onClick={handleMenuClick}>
                            Steps
                        </a>
                    </li>
                    <li className={`mobile-menu-item ${isAnimating ? 'show' : ''}`}>
                        <a href="/#chart" className="mobile-menu-link" onClick={handleMenuClick}>
                            Chart
                        </a>
                    </li>
                    <li className={`mobile-menu-item ${isAnimating ? 'show' : ''}`}>
                        <a href="/#partner" className="mobile-menu-link" onClick={handleMenuClick}>
                            Partners
                        </a>
                    </li>
                    <li className={`mobile-menu-item ${isAnimating ? 'show' : ''}`}>
                        <a href="/#faq" className="mobile-menu-link" onClick={handleMenuClick}>
                            FAQ
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
