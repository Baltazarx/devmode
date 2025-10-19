'use client'
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Partner3() {
    const partnerRowRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Data partner untuk mobile slider
    const partners = [
        {
            name: "CoinGecko",
            image: "/assets/images/partner/06.png",
            link: "https://www.coingecko.com/en/coins/ugly-dog"
        },
        {
            name: "AscendEX",
            image: "/assets/images/partner/07.png",
            link: "https://www.ascendex.com/"
        },
        {
            name: "Kulino House",
            image: "/assets/images/partner/11.png",
            link: "https://kulinohouse.com/"
        },
        {
            name: "Raydium",
            image: "/assets/images/partner/08.png",
            link: "https://v2.raydium.io/swap/?inputCurrency=sol&outputCurrency=74Rq6Bmckiq8qvARhdqxPfQtkQsxsqVKCbDQL5PKpump"
        },
        {
            name: "Orca",
            image: "/assets/images/partner/10.png",
            link: "https://www.orca.so/?tokenIn=So11111111111111111111111111111111111111112&tokenOut=74Rq6Bmckiq8qvARhdqxPfQtkQsxsqVKCbDQL5PKpump"
        },
        {
            name: "Meteora",
            image: "/assets/images/partner/09.png",
            link: "https://app.meteora.ag/pools/CafWuKH9pji8LJ7QmQjtG4VZqqGJP6aNf3F1kbyzSxt6"
        }
    ];

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto slider untuk mobile
    useEffect(() => {
        if (!isMobile) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % partners.length);
        }, 3000); // Ganti slide setiap 3 detik

        return () => clearInterval(interval);
    }, [isMobile, partners.length]);

    // Handle touch/swipe untuk mobile
    const handleTouchStart = (e) => {
        if (!isMobile) return;
        const touchStartX = e.touches[0].clientX;
        const touchStartY = e.touches[0].clientY;
        
        const handleTouchEnd = (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Hanya respon jika swipe horizontal lebih besar dari vertikal
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // Swipe kanan - slide sebelumnya
                    setCurrentSlide((prev) => prev === 0 ? partners.length - 1 : prev - 1);
                } else {
                    // Swipe kiri - slide berikutnya
                    setCurrentSlide((prev) => (prev + 1) % partners.length);
                }
            }
            
            document.removeEventListener('touchend', handleTouchEnd);
        };
        
        document.addEventListener('touchend', handleTouchEnd);
    };

    // Desktop animation
    useEffect(() => {
        if (isMobile) return;

        const partnerRow = partnerRowRef.current;
        if (!partnerRow) return;

        const animate = () => {
            let position = 0;

            const move = () => {
                // Check again in case screen size changed
                const isMobileNow = window.innerWidth <= 768;
                if (isMobileNow) {
                    partnerRow.style.transform = 'translateX(0px)';
                    return;
                }

                // Adjust speed based on screen size
                const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
                const speed = isTablet ? 0.7 : 1;

                position -= speed;
                const totalWidth = partnerRow.scrollWidth;

                // Reset position when we've moved past one full set (accounting for 3 sets)
                if (Math.abs(position) >= totalWidth / 3) {
                    position = 0;
                }

                partnerRow.style.transform = `translateX(${position}px)`;
                requestAnimationFrame(move);
            };

            move();
        };

        animate();

        // Re-animate on window resize
        const handleResize = () => animate();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    return (
        <>
            <style jsx global>{`
                @media (max-width: 768px) {
                    .col-md-12 {
                        padding: 0 20px !important;
                        overflow: hidden;
                    }

                    .mobile-slider-container {
                        position: relative;
                        width: 100%;
                        height: 220px;
                        overflow: hidden;
                        border-radius: 16px;
                        background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
                        border: 1px solid rgba(255,255,255,0.2);
                        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        margin: 0 auto;
                        max-width: 400px;
                    }

                    .mobile-slider-wrapper {
                        display: flex;
                        width: 100%;
                        height: 100%;
                        transition: transform 0.5s ease-in-out;
                    }

                    .mobile-slide {
                        min-width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 15px;
                    }

                    .mobile-slide-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        max-width: 200px;
                        gap: 12px;
                    }

                    .mobile-slide img {
                        width: 120px;
                        height: 120px;
                        border-radius: 50%;
                        object-fit: cover;
                        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
                        flex-shrink: 0;
                    }

                    .mobile-slide .partner-name {
                        color: #fff;
                        font-size: 20px;
                        font-weight: 700;
                        letter-spacing: -0.02em;
                        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                        text-align: center;
                        margin: 0;
                        line-height: 1.2;
                    }

                    .slider-dots {
                        position: absolute;
                        bottom: 15px;
                        left: 50%;
                        transform: translateX(-50%);
                        display: flex;
                        gap: 8px;
                        z-index: 10;
                    }

                    .slider-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: rgba(255,255,255,0.3);
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .slider-dot.active {
                        background: rgba(255,255,255,0.9);
                        transform: scale(1.2);
                    }

                    /* Hide desktop content on mobile */
                    .desktop-only {
                        display: none !important;
                    }
                }

                @media (max-width: 480px) {
                    .mobile-slider-container {
                        width: calc(100% - 30px);
                        height: 200px;
                        max-width: 350px;
                    }

                    .mobile-slide-content {
                        max-width: 180px;
                        gap: 10px;
                    }

                    .mobile-slide img {
                        width: 100px;
                        height: 100px;
                    }

                    .mobile-slide .partner-name {
                        font-size: 18px;
                    }

                    .slider-dots {
                        bottom: 12px;
                    }

                    .slider-dot {
                        width: 6px;
                        height: 6px;
                    }
                }

                @media (max-width: 360px) {
                    .mobile-slider-container {
                        width: calc(100% - 20px);
                        height: 180px;
                        max-width: 320px;
                    }

                    .mobile-slide-content {
                        max-width: 160px;
                        gap: 8px;
                    }

                    .mobile-slide img {
                        width: 90px;
                        height: 90px;
                    }

                    .mobile-slide .partner-name {
                        font-size: 16px;
                    }
                }
            `}</style>
            <style jsx>{`
                .partner-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    max-width: none;
                    margin: 0 auto;
                    overflow: hidden;
                    position: relative;
                    padding: 40px 20px;

                    .partner-row {
                        display: flex;
                        justify-content: flex-start;
                        gap: 50px;
                        white-space: nowrap;
                        flex-wrap: nowrap;
                        will-change: transform;
                    }

                    /* Hover pause removed for smoother animation */

                    .image {
                        flex: 0 0 140px;
                        width: 140px;
                        height: 140px;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: transparent;
                        border-radius: 50% !important;
                        overflow: hidden !important;

                        a {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            height: 100%;
                            border-radius: 50% !important;
                        }

                        img {
                            width: 100% !important;
                            height: 100% !important;
                            object-fit: cover !important;
                            border-radius: 50% !important;
                        }

                    }
                }

                @media (max-width: 768px) {
                    .partner-wrapper {
                        padding: 0 !important;
                        background: transparent !important;
                        backdrop-filter: none !important;
                        -webkit-backdrop-filter: none !important;
                        border-radius: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                        position: relative !important;
                        overflow: visible !important;

                        * {
                            border-radius: 0 !important;
                        }

                        .partner-row {
                            display: flex !important;
                            flex-direction: column !important;
                            gap: 20px !important;
                            width: 100% !important;
                            position: relative !important;
                            z-index: 2 !important;
                            padding: 0 !important;
                            align-items: center !important;
                            justify-content: center !important;
                        }

                        .image {
                            flex: none !important;
                            width: 100% !important;
                            max-width: 350px !important;
                            height: 120px !important;
                            border-radius: 16px !important;
                            background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%) !important;
                            border: 1px solid rgba(255,255,255,0.2) !important;
                            padding: 0 24px !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: space-between !important;
                            gap: 20px !important;
                            position: relative !important;
                            overflow: hidden !important;
                            margin: 0 auto !important;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
                            backdrop-filter: blur(10px) !important;
                            -webkit-backdrop-filter: blur(10px) !important;

                            a {
                                border-radius: 0 !important;
                                background: transparent !important;
                                background-color: transparent !important;
                                background-image: none !important;
                                background-clip: padding-box !important;
                                background-origin: padding-box !important;
                                background-attachment: scroll !important;
                                background-repeat: no-repeat !important;
                                background-size: auto !important;
                                background-position: 0% 0% !important;
                                padding: 0 !important;
                                margin: 0 !important;
                                border: none !important;
                                outline: none !important;
                                outline-width: 0 !important;
                                outline-style: none !important;
                                outline-color: transparent !important;
                                outline-offset: 0 !important;
                                box-shadow: none !important;
                                text-decoration: none !important;
                                display: flex !important;
                                align-items: center !important;
                                justify-content: center !important;
                                width: 80px !important;
                                height: 80px !important;
                                flex-shrink: 0 !important;
                            }

                            img {
                                width: 80px !important;
                                height: 80px !important;
                                border-radius: 50% !important;
                                object-fit: cover !important;
                                position: relative !important;
                                z-index: 2 !important;
                                filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2)) !important;
                                background: transparent !important;
                                background-color: transparent !important;
                                background-image: none !important;
                                background-clip: padding-box !important;
                                background-origin: padding-box !important;
                                background-attachment: scroll !important;
                                background-repeat: no-repeat !important;
                                background-size: auto !important;
                                background-position: 0% 0% !important;
                                padding: 0 !important;
                                margin: 0 !important;
                                border: none !important;
                                outline: none !important;
                                outline-width: 0 !important;
                                outline-style: none !important;
                                outline-color: transparent !important;
                                outline-offset: 0 !important;
                                box-shadow: none !important;
                                display: block !important;
                                flex-shrink: 0 !important;
                                align-self: center !important;
                            }

                            .partner-name {
                                color: #fff !important;
                                font-size: 18px !important;
                                font-weight: 700 !important;
                                margin: 0 !important;
                                letter-spacing: -0.02em !important;
                                flex: 1 !important;
                                position: relative !important;
                                z-index: 2 !important;
                                text-align: right !important;
                                text-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
                            }

                            &.desktop-only {
                                display: none !important;
                            }
                        }
                    }
                }

                @media (min-width: 769px) {
                    .partner-wrapper {
                        .image {
                            .partner-name {
                                display: none !important;
                            }
                        }
                    }
                }

                @media (max-width: 480px) {
                    .partner-wrapper {
                        padding: 15px !important;

                        .partner-row {
                            gap: 25px;
                            justify-content: flex-start;
                            flex-wrap: nowrap;
                            width: max-content;
                        }

                        .image {
                            flex: 0 0 90px;
                            width: 90px;
                            height: 90px;
                            border-radius: 50% !important;
                        }
                    }
                }
            `}</style>

            <section id="partner" className="tf-section tf_partner" style={{overflow: 'visible', width: '100%'}}>
                <div className="overlay" style={{background: 'rgba(0,0,0,0.3)'}}>
                </div>
                <div className="container-fluid" style={{maxWidth: '100%', padding: '0'}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-title" data-aos="fade-up" data-aos-duration={800}>
                                <h2 className="title" style={{
                                    background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                }}>
                                    Our Partners
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {/* Mobile Slider */}
                            {isMobile ? (
                                <div 
                                    className="mobile-slider-container" 
                                    data-aos="fade-up" 
                                    data-aos-duration={800}
                                    onTouchStart={handleTouchStart}
                                >
                                    <div 
                                        className="mobile-slider-wrapper"
                                        style={{
                                            transform: `translateX(-${currentSlide * 100}%)`
                                        }}
                                    >
                                        {partners.map((partner, index) => (
                                            <div key={index} className="mobile-slide">
                                                <div className="mobile-slide-content">
                                                    <Link href={partner.link}>
                                                        <img src={partner.image} alt={partner.name} />
                                                    </Link>
                                                    <span className="partner-name">{partner.name}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Slider Dots */}
                                    <div className="slider-dots">
                                        {partners.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                                                onClick={() => setCurrentSlide(index)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="partner-wrapper style3" data-aos="fade-up" data-aos-duration={800} style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    borderRadius: '16px',
                                    padding: '30px 60px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    margin: '0 20px'
                                }}>
                                    <div className="partner-row" ref={partnerRowRef}>
                                    {/* Logo untuk running text - diulang untuk efek continuous */}
                                    <div className="image">
                                        <Link href="https://www.coingecko.com/en/coins/ugly-dog">
                                            <img src="/assets/images/partner/06.png" alt="CoinGecko" />
                                        </Link>
                                        <span className="partner-name">CoinGecko</span>
                                    </div>
                                    <div className="image">
                                        <Link href="https://www.ascendex.com/">
                                            <img src="/assets/images/partner/07.png" alt="AscendEX" />
                                        </Link>
                                        <span className="partner-name">AscendEX</span>
                                    </div>
                                    <div className="image">
                                        <Link href="https://kulinohouse.com/">
                                            <img src="/assets/images/partner/11.png" alt="Kulino House" />
                                        </Link>
                                        <span className="partner-name">Kulino House</span>
                                    </div>
                                    <div className="image">
                                        <Link href="https://v2.raydium.io/swap/?inputCurrency=sol&outputCurrency=74Rq6Bmckiq8qvARhdqxPfQtkQsxsqVKCbDQL5PKpump">
                                            <img src="/assets/images/partner/08.png" alt="Raydium" />
                                        </Link>
                                        <span className="partner-name">Raydium</span>
                                    </div>
                                    <div className="image">
                                        <Link href="https://www.orca.so/?tokenIn=So11111111111111111111111111111111111111112&tokenOut=74Rq6Bmckiq8qvARhdqxPfQtkQsxsqVKCbDQL5PKpump">
                                            <img src="/assets/images/partner/10.png" alt="Orca" />
                                        </Link>
                                        <span className="partner-name">Orca</span>
                                    </div>
                                    <div className="image">
                                        <Link href="https://app.meteora.ag/pools/CafWuKH9pji8LJ7QmQjtG4VZqqGJP6aNf3F1kbyzSxt6">
                                            <img src="/assets/images/partner/09.png" alt="Meteora" />
                                        </Link>
                                        <span className="partner-name">Meteora</span>
                                    </div>

                                    {/* Duplikasi untuk efek continuous scroll - hanya untuk desktop */}
                                    <div className="image desktop-only">
                                        <Link href="https://www.coingecko.com/en/coins/ugly-dog">
                                            <img src="/assets/images/partner/06.png" alt="CoinGecko" />
                                        </Link>
                                    </div>
                                    <div className="image desktop-only">
                                        <Link href="https://www.ascendex.com/">
                                            <img src="/assets/images/partner/07.png" alt="AscendEX" />
                                        </Link>
                                    </div>
                                    <div className="image desktop-only">
                                        <Link href="https://kulinohouse.com/">
                                            <img src="/assets/images/partner/11.png" alt="Kulino House" />
                                        </Link>
                                    </div>
                                    <div className="image desktop-only">
                                        <Link href="https://v2.raydium.io/swap/?inputCurrency=sol&outputCurrency=74Rq6Bmckiq8qvARhdqxPfQtkQsxsqVKCbDQL5PKpump">
                                            <img src="/assets/images/partner/08.png" alt="Raydium" />
                                        </Link>
                                    </div>
                                    <div className="image desktop-only">
                                        <Link href="https://www.orca.so/?tokenIn=So11111111111111111111111111111111111111112&tokenOut=74Rq6Bmckiq8qvARhdqxPfQtkQsxsqVKCbDQL5PKpump">
                                            <img src="/assets/images/partner/10.png" alt="Orca" />
                                        </Link>
                                    </div>
                                    <div className="image desktop-only">
                                        <Link href="https://app.meteora.ag/pools/CafWuKH9pji8LJ7QmQjtG4VZqqGJP6aNf3F1kbyzSxt6">
                                            <img src="/assets/images/partner/09.png" alt="Meteora" />
                                        </Link>
                                    </div>
                                    
                                    {/* Duplikasi untuk efek continuous scroll - hanya untuk desktop */}
                                    <div className="image desktop-only">
                                        <Link href="https://www.coingecko.com/en/coins/ugly-dog">
                                            <img src="/assets/images/partner/06.png" alt="CoinGecko" />
                                        </Link>
                                    </div>
                                    <div className="image desktop-only">
                                        <Link href="https://www.ascendex.com/">
                                            <img src="/assets/images/partner/07.png" alt="AscendEX" />
                                        </Link>
                                    </div>
                                    <div className="image desktop-only">
                                        <Link href="https://kulinohouse.com/">
                                            <img src="/assets/images/partner/11.png" alt="Kulino House" />
                                        </Link>
                                    </div>
                                    <div className="image desktop-only">
                                        <Link href="https://v2.raydium.io/swap/?inputCurrency=sol&outputCurrency=74Rq6Bmckiq8qvARhdqxPfQtkQsxsqVKCbDQL5PKpump">
                                            <img src="/assets/images/partner/08.png" alt="Raydium" />
                                        </Link>
                                    </div>
                                    <div className="image desktop-only">
                                        <Link href="https://www.orca.so/?tokenIn=So11111111111111111111111111111111111111112&tokenOut=74Rq6Bmckiq8qvARhdqxPfQtkQsxsqVKCbDQL5PKpump">
                                            <img src="/assets/images/partner/10.png" alt="Orca" />
                                        </Link>
                                    </div>
                                    <div className="image desktop-only">
                                        <Link href="https://app.meteora.ag/pools/CafWuKH9pji8LJ7QmQjtG4VZqqGJP6aNf3F1kbyzSxt6">
                                            <img src="/assets/images/partner/09.png" alt="Meteora" />
                                        </Link>
                                    </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
