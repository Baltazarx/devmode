'use client'
export default function MobileMenu({ isMobileMenu }) {
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
        <>
            <nav id="main-nav-mobi" className="main-nav" style={{ display: isMobileMenu ? "block" : "none" }}>
            <ul className="menu">
                <li className="menu-item">
                    <a href="#" onClick={handleHomeClick}>Home</a>
                </li>
                <li className="menu-item">
                    <a href="/#feature">Features</a>
                </li>
                <li className="menu-item">
                    <a href="/#step">Steps</a>
                </li>
                <li className="menu-item">
                    <a href="/#chart">Chart</a>
                </li>
                <li className="menu-item">
                    <a href="/#partner">Partners</a>
                </li>
                <li className="menu-item">
                    <a href="/#faq">FAQ</a>
                </li>
            </ul>
        </nav>
        </>
    )
}
