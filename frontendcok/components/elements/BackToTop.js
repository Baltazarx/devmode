
'use client'
import { useEffect, useState } from 'react'

export default function BackToTop({ scroll }) {
    const [isHovered, setIsHovered] = useState(false)
    
    const scrollToTop = (e) => {
        e.preventDefault()
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            {scroll && (
                <button 
                    id="scroll-top" 
                    className="show" 
                    onClick={scrollToTop}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ 
                        cursor: 'pointer',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        outline: 'none',
                        background: '#86FF00',
                        color: '#000',
                        fontSize: '18px',
                        fontWeight: '600',
                        position: 'fixed',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        zIndex: 999,
                        right: '15px',
                        bottom: '23px',
                        opacity: 1,
                        visibility: 'visible',
                        transition: 'all 0.3s ease',
                        transform: isHovered ? 'translateY(-7%)' : 'translateY(0)',
                        boxShadow: isHovered ? '0 4px 15px rgba(134, 255, 0, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}
                    title="Back to top"
                >
                    ↑
                </button>
            )}
        </>
    )
}
