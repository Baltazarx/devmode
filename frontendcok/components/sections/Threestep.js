
'use client'
    import { useState, useLayoutEffect } from 'react';

export default function Threestep() {
    const [screenSize, setScreenSize] = useState('desktop');
    const [isLoaded, setIsLoaded] = useState(false);

    useLayoutEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width <= 767) {
                setScreenSize('mobile');
            } else if (width >= 768 && width <= 991) {
                setScreenSize('tablet');
            } else {
                setScreenSize('desktop');
            }
        };

        // Check immediately
        checkScreenSize();
        setIsLoaded(true);

        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    return (
        <>
            <style jsx>{`
                .steps-container {
                    position: relative;
                    padding-left: 40px;
                }

                /* Simple mobile list styling */
                @media (max-width: 767px) {
                    /* Keep main containers centered */
                    .tf-section.three_step .container {
                        display: flex !important;
                        justify-content: center !important;
                        align-items: center !important;
                        flex-direction: column !important;
                    }

                    .tf-section.three_step .container .row {
                        justify-content: center !important;
                        align-items: center !important;
                        width: fit-content !important;
                        margin: 0 auto !important;
                    }

                    /* Steps as simple list */
                    .tf-section.three_step .steps-container {
                        width: 100% !important;
                        max-width: 400px !important;
                        margin: 0 auto !important;
                        padding: 0 20px !important;
                    }

                    .tf-section.three_step .step-item {
                        width: 100% !important;
                        max-width: 400px !important;
                        margin: 0 auto !important;
                        min-height: auto !important;
                    }

                    .tf-section.three_step .step-card {
                        width: 100% !important;
                        max-width: 400px !important;
                        min-height: auto !important;
                        padding: 20px !important;
                    }
                }

                .step-number {
                    background: linear-gradient(135deg, #86FF00, #65D800);
                    color: #0a0a0a;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 16px;
                    position: relative;
                    z-index: 2;
                    box-shadow: 0 4px 12px rgba(134, 255, 0, 0.4);
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }

                .step-number:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(134, 255, 0, 0.6);
                }

                .step-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
                    border-color: rgba(134, 255, 0, 0.3);
                }

                .step-icon:hover {
                    background: rgba(134, 255, 0, 0.2);
                    transform: scale(1.05);
                }

                .step-card {
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(10px);
                    Webkit-backdropFilter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 16px;
                    padding: 24px;
                    transition: all 0.3s ease;
                    flex: 1;
                    position: relative;
                }

                .step-card:hover {
                    background: rgba(255,255,255,0.08);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                }

                .step-icon {
                    margin-bottom: 16px;
                    text-align: center;
                }

                .step-icon img {
                    width: 48px;
                    height: 48px;
                    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
                }

                .step-content h4 {
                    color: #E2E8F0;
                    margin-bottom: 8px;
                    font-size: 18px;
                    font-weight: 600;
                }

                .step-content p {
                    color: #9CA3AF;
                    line-height: 1.6;
                    margin: 0;
                    font-size: 14px;
                }

                .step-connector {
                    position: absolute;
                    left: 17px;
                    top: 56px;
                    bottom: -30px;
                    width: 2px;
                    background: linear-gradient(to bottom, rgba(134, 255, 0, 0.6), rgba(134, 255, 0, 0.2), transparent);
                    z-index: 1;
                }

                .step-item:last-child .step-connector {
                    display: none;
                }

                /* Enhanced image styling */
                .image {
                    position: relative;
                    overflow: hidden;
                }

                .image img {
                    border-radius: 20px;
                    transition: transform 0.3s ease;
                }

                .image:hover img {
                    transform: scale(1.02);
                }

                /* Image container styling */
                .image-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    padding: 20px;
                }

                .image-wrapper {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    transition: all 0.3s ease;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .image-wrapper:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.4);
                }

                .image-wrapper img {
                    width: 100%;
                    max-width: 500px;
                    min-width: 350px;
                    height: auto;
                    border-radius: 20px;
                    display: block;
                    object-fit: cover;
                }

                .image-overlay-gradient {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(134,255,0,0.05) 0%, transparent 50%, rgba(134,255,0,0.02) 100%);
                    pointer-events: none;
                }

                .floating-accent-dots {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }

                .accent-dot {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: rgba(134, 255, 0, 0.7);
                    border-radius: 50%;
                    animation: accentFloat 4s ease-in-out infinite;
                    box-shadow: 0 0 10px rgba(134, 255, 0, 0.5);
                }

                .dot-1 {
                    top: 20%;
                    left: 15%;
                    animation-delay: 0s;
                }

                .dot-2 {
                    top: 70%;
                    right: 20%;
                    animation-delay: 1.5s;
                }

                .dot-3 {
                    bottom: 25%;
                    left: 25%;
                    animation-delay: 3s;
                }

                @keyframes accentFloat {
                    0%, 100% {
                        transform: translateY(0px) scale(1);
                        opacity: 0.7;
                    }
                    50% {
                        transform: translateY(-15px) scale(1.2);
                        opacity: 1;
                    }
                }

                    /* Responsive adjustments for larger screens */
                    @media (min-width: 992px) {
                        .tf-section.three_step .steps-container {
                            padding-left: 40px;
                        }

                        .tf-section.three_step .step-item {
                            flex-direction: row;
                            align-items: flex-start;
                            text-align: left;
                        gap: 20px;
                        }

                        .tf-section.three_step .step-number {
                            order: 0;
                            margin-bottom: 0;
                        }

                        .tf-section.three_step .step-connector {
                            display: block;
                        }

                        .tf-section.three_step .image-container {
                            margin-top: 0;
                        }

                        .tf-section.three_step .image-wrapper img {
                            max-width: 500px;
                            min-width: 350px;
                        }
                    }


            `}</style>

            <section id="step" className="tf-section three_step" style={{
                background: 'linear-gradient(135deg, rgba(10,15,28,0.8) 0%, rgba(26,35,50,0.6) 50%, rgba(10,15,28,0.8) 100%)',
                    padding: screenSize === 'tablet' ? '100px 0' : '80px 0',
                    marginBottom: '80px',
                    position: 'relative',
                    overflow: 'hidden'
            }}>
                <div className="overlay" style={{
                    background: 'linear-gradient(135deg, rgba(10,15,28,0.9) 0%, rgba(26,35,50,0.7) 50%, rgba(10,15,28,0.9) 100%)'
                }} />
                <div className="container">
                        <div className="row" style={screenSize === 'tablet' ? {
                            display: 'flex',
                            flexDirection: 'column'
                        } : screenSize === 'mobile' ? {
                            display: 'flex',
                            flexDirection: 'column' // Mengubah ke 'column' untuk urutan yang benar
                        } : {}}>
                            <div className="tf-title mb46" data-aos="fade-up" data-aos-duration={800} style={{
                                textAlign: 'center',
                                marginBottom: screenSize === 'tablet' ? '60px' : '46px',
                                order: '0' // Judul selalu paling atas
                            }}>
                            <h2 className="title" style={{
                                background: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    fontSize: screenSize === 'tablet' ? '2.5rem' : '2.2rem',
                                    fontWeight: '700',
                                    letterSpacing: '-0.02em',
                                    marginBottom: '0'
                            }}>
                                Easy to join Ugly Dog with 4 steps
                            </h2>
                                <div style={{
                                    width: '80px',
                                    height: '4px',
                                    background: 'linear-gradient(135deg, #86FF00, #65D800)',
                                    margin: '20px auto 0',
                                    borderRadius: '2px',
                                    boxShadow: '0 2px 10px rgba(134, 255, 0, 0.3)'
                                }}></div>
                        </div>
                            <div className="col-md-6" style={screenSize === 'tablet' ? {
                                order: '2',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            } : screenSize === 'mobile' ? {
                                order: '2', // Steps setelah gambar
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            } : {
                                order: '1'
                            }}>
                                <div className="steps-container" style={screenSize === 'tablet' ? {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '30px',
                                    padding: '0 30px',
                                    maxWidth: '900px',
                                    width: '100%',
                                    margin: '0 auto'
                            } : screenSize === 'mobile' ? {
                                marginTop: '40px',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '40px',
                                padding: '0 25px'
                            } : {}}>
                                    <div className="step-item" data-aos="fade-up" data-aos-duration={800} data-aos-delay={100} style={screenSize === 'tablet' ? {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        gap: '18px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '16px',
                                        padding: '0',
                                        width: '100%',
                                        border: '1px solid rgba(134, 255, 0, 0.1)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'default'
                                } : screenSize === 'mobile' ? {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    gap: '40px',
                                    width: '100%',
                                    maxWidth: '420px',
                                    margin: '0 auto',
                                    padding: '0'
                                } : {}}>
                                        <div className="step-number" style={screenSize === 'tablet' ? {
                                        position: 'relative',
                                        marginBottom: '15px',
                                        marginTop: '20px',
                                            background: 'linear-gradient(135deg, #86FF00, #65D800)',
                                            color: '#0a0a0a',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                            boxShadow: '0 6px 20px rgba(134, 255, 0, 0.4)',
                                            border: '2px solid rgba(255, 255, 255, 0.1)'
                                    } : screenSize === 'mobile' ? {
                                        position: 'absolute',
                                        top: '-20px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'linear-gradient(135deg, #86FF00, #65D800)',
                                        color: '#0a0a0a',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        boxShadow: '0 4px 15px rgba(134, 255, 0, 0.3)',
                                        border: '2px solid rgba(134, 255, 0, 0.2)',
                                        transition: 'all 0.3s ease',
                                        zIndex: '10'
                                    } : {
                                        position: 'relative'
                                    }}>1</div>
                                        <div className="step-card elegant-hover" style={screenSize === 'tablet' ? {
                                            background: 'transparent',
                                            border: 'none',
                                            padding: '30px 25px',
                                            minHeight: '220px',
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative'
                                    } : screenSize === 'mobile' ? {
                                        padding: '40px 25px 30px 25px',
                                        width: '100%',
                                        maxWidth: '420px',
                                        minHeight: 'auto',
                                        margin: '0 auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        position: 'relative',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(134, 255, 0, 0.15)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    } : {}}>
                                        <div className="step-icon" style={screenSize === 'mobile' ? {
                                            marginBottom: '20px',
                                            marginTop: '30px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '60px',
                                            height: '60px',
                                            background: 'rgba(134, 255, 0, 0.1)',
                                            borderRadius: '50%',
                                            border: '1px solid rgba(134, 255, 0, 0.2)',
                                            margin: '0 auto'
                                        } : {}}>
                                                <img src="/assets/images/common/icon_9.png" alt="Create Wallet" style={screenSize === 'mobile' ? {
                                                    width: '32px',
                                                    height: '32px',
                                                    filter: 'brightness(1.2)'
                                                } : {}} />
                                    </div>
                                            <div className="step-content">
                                            <h4 style={screenSize === 'mobile' ? {
                                                fontSize: '18px',
                                                marginBottom: '15px',
                                                marginTop: '0px',
                                                color: '#F1F5F9',
                                                fontWeight: '700',
                                                textAlign: 'center',
                                                letterSpacing: '-0.01em'
                                            } : {
                                                marginBottom: '12px',
                                                color: '#E2E8F0',
                                                fontWeight: '600'
                                            }}>Create Wallet</h4>
                                                <p style={screenSize === 'mobile' ? {
                                                    fontSize: '14px',
                                                    lineHeight: '1.7',
                                                    color: '#CBD5E1',
                                                    margin: '0',
                                                    textAlign: 'left',
                                                    fontWeight: '400'
                                                } : {
                                                    lineHeight: '1.6',
                                                    color: '#9CA3AF',
                                                    margin: '0'
                                                }}>First, you need a digital wallet that supports the Solana network. You can download one as a browser extension or a mobile app. Follow the setup instructions to create your new wallet. It is crucial to write down your unique recovery phrase and store it somewhere safe and offline. This phrase is the only way to access your funds if you forget your password or lose your device.</p>
                                </div>
                            </div>
                        </div>

                                    <div className="step-item" data-aos="fade-up" data-aos-duration={800} data-aos-delay={200} style={screenSize === 'tablet' ? {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        gap: '18px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '16px',
                                        padding: '0',
                                        width: '100%',
                                        border: '1px solid rgba(134, 255, 0, 0.1)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'default'
                                } : screenSize === 'mobile' ? {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    gap: '40px',
                                    width: '100%',
                                    maxWidth: '420px',
                                    margin: '0 auto',
                                    padding: '0'
                                } : {}}>
                                        <div className="step-number" style={screenSize === 'tablet' ? {
                                        position: 'relative',
                                        marginBottom: '15px',
                                        marginTop: '20px',
                                            background: 'linear-gradient(135deg, #86FF00, #65D800)',
                                            color: '#0a0a0a',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                            boxShadow: '0 6px 20px rgba(134, 255, 0, 0.4)',
                                            border: '2px solid rgba(255, 255, 255, 0.1)'
                                        } : screenSize === 'mobile' ? {
                                            position: 'absolute',
                                            top: '-20px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'linear-gradient(135deg, #86FF00, #65D800)',
                                            color: '#0a0a0a',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '16px',
                                            fontWeight: '700',
                                            boxShadow: '0 4px 15px rgba(134, 255, 0, 0.3)',
                                            border: '2px solid rgba(134, 255, 0, 0.2)',
                                            transition: 'all 0.3s ease',
                                            zIndex: '10'
                                        } : {}}>2</div>
                                        <div className="step-card elegant-hover" style={screenSize === 'tablet' ? {
                                            background: 'transparent',
                                            border: 'none',
                                            padding: '30px 25px',
                                            minHeight: '220px',
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative'
                                    } : screenSize === 'mobile' ? {
                                        padding: '40px 25px 30px 25px',
                                        width: '100%',
                                        maxWidth: '420px',
                                        minHeight: 'auto',
                                        margin: '0 auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        position: 'relative',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(134, 255, 0, 0.15)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    } : {}}>
                                        <div className="step-icon" style={screenSize === 'mobile' ? {
                                            marginBottom: '20px',
                                            marginTop: '30px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '60px',
                                            height: '60px',
                                            background: 'rgba(134, 255, 0, 0.1)',
                                            borderRadius: '50%',
                                            border: '1px solid rgba(134, 255, 0, 0.2)',
                                            margin: '0 auto'
                                        } : {}}>
                                                <img src="/assets/images/common/icon_9.png" alt="Get SOL" style={screenSize === 'mobile' ? {
                                                    width: '40px',
                                                    height: '40px'
                                                } : {}} />
                                            </div>
                                            <div className="step-content">
                                                <h4 style={screenSize === 'mobile' ? {
                                                    fontSize: '16px',
                                                    marginBottom: '12px',
                                                    color: '#E2E8F0',
                                                    fontWeight: '600'
                                                } : {
                                                    marginBottom: '12px',
                                                    color: '#E2E8F0',
                                                    fontWeight: '600'
                                                }}>Get $SOL (Solana)</h4>
                                                <p style={screenSize === 'mobile' ? {
                                                    fontSize: '14px',
                                                    lineHeight: '1.7',
                                                    color: '#CBD5E1',
                                                    margin: '0',
                                                    textAlign: 'left',
                                                    fontWeight: '400'
                                                } : {
                                                    lineHeight: '1.6',
                                                    color: '#9CA3AF',
                                                    margin: '0'
                                                }}>To get started, you'll need SOL in your wallet for the swap and to cover network fees. You can purchase SOL on a major cryptocurrency exchange and then transfer it to your personal wallet address. Some wallets also offer the option to buy crypto directly using a card or bank transfer.</p>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="step-item" data-aos="fade-up" data-aos-duration={800} data-aos-delay={300} style={screenSize === 'tablet' ? {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        gap: '18px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '16px',
                                        padding: '0',
                                        width: '100%',
                                        border: '1px solid rgba(134, 255, 0, 0.1)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'default'
                                } : screenSize === 'mobile' ? {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    gap: '40px',
                                    width: '100%',
                                    maxWidth: '420px',
                                    margin: '0 auto',
                                    padding: '0'
                                } : {}}>
                                        <div className="step-number" style={screenSize === 'tablet' ? {
                                        position: 'relative',
                                        marginBottom: '15px',
                                        marginTop: '20px',
                                            background: 'linear-gradient(135deg, #86FF00, #65D800)',
                                            color: '#0a0a0a',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                            boxShadow: '0 6px 20px rgba(134, 255, 0, 0.4)',
                                            border: '2px solid rgba(255, 255, 255, 0.1)'
                                        } : screenSize === 'mobile' ? {
                                            position: 'absolute',
                                            top: '-20px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'linear-gradient(135deg, #86FF00, #65D800)',
                                            color: '#0a0a0a',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '16px',
                                            fontWeight: '700',
                                            boxShadow: '0 4px 15px rgba(134, 255, 0, 0.3)',
                                            border: '2px solid rgba(134, 255, 0, 0.2)',
                                            transition: 'all 0.3s ease',
                                            zIndex: '10'
                                        } : {}}>3</div>
                                        <div className="step-card elegant-hover" style={screenSize === 'tablet' ? {
                                            background: 'transparent',
                                            border: 'none',
                                            padding: '30px 25px',
                                            minHeight: '220px',
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative'
                                    } : screenSize === 'mobile' ? {
                                        padding: '40px 25px 30px 25px',
                                        width: '100%',
                                        maxWidth: '420px',
                                        minHeight: 'auto',
                                        margin: '0 auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        position: 'relative',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(134, 255, 0, 0.15)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    } : {}}>
                                        <div className="step-icon" style={screenSize === 'mobile' ? {
                                            marginBottom: '20px',
                                            marginTop: '30px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '60px',
                                            height: '60px',
                                            background: 'rgba(134, 255, 0, 0.1)',
                                            borderRadius: '50%',
                                            border: '1px solid rgba(134, 255, 0, 0.2)',
                                            margin: '0 auto'
                                        } : {}}>
                                                <img src="/assets/images/common/icon_10.png" alt="Swap SOL" style={screenSize === 'mobile' ? {
                                                    width: '40px',
                                                    height: '40px'
                                                } : {}} />
                                </div>
                                            <div className="step-content">
                                                <h4 style={screenSize === 'mobile' ? {
                                                    fontSize: '16px',
                                                    marginBottom: '12px',
                                                    color: '#E2E8F0',
                                                    fontWeight: '600'
                                                } : {
                                                    marginBottom: '12px',
                                                    color: '#E2E8F0',
                                                    fontWeight: '600'
                                            }}>Swap $SOL for $UGLYDOG</h4>
                                            <p style={screenSize === 'mobile' ? {
                                                fontSize: '14px',
                                                lineHeight: '1.7',
                                                color: '#CBD5E1',
                                                margin: '0',
                                                textAlign: 'left',
                                                fontWeight: '400'
                                            } : {
                                                    lineHeight: '1.6',
                                                    color: '#9CA3AF',
                                                    margin: '0'
                                                }}>Navigate to a decentralized exchange (DEX) that operates on the Solana network. Once there, connect your wallet. In the swap section, choose SOL as the currency you're trading from and search for $UGLYDOG as the currency you want to receive. Input the desired amount, review the details, and approve the transaction in your wallet.</p>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="step-item" data-aos="fade-up" data-aos-duration={800} data-aos-delay={400} style={screenSize === 'tablet' ? {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        gap: '18px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '16px',
                                        padding: '0',
                                        width: '100%',
                                        border: '1px solid rgba(134, 255, 0, 0.1)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'default'
                                } : screenSize === 'mobile' ? {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    gap: '40px',
                                    width: '100%',
                                    maxWidth: '420px',
                                    margin: '0 auto',
                                    padding: '0'
                                } : {}}>
                                        <div className="step-number" style={screenSize === 'tablet' ? {
                                        position: 'relative',
                                        marginBottom: '15px',
                                        marginTop: '20px',
                                            background: 'linear-gradient(135deg, #86FF00, #65D800)',
                                            color: '#0a0a0a',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                            boxShadow: '0 6px 20px rgba(134, 255, 0, 0.4)',
                                            border: '2px solid rgba(255, 255, 255, 0.1)'
                                        } : screenSize === 'mobile' ? {
                                            position: 'absolute',
                                            top: '-20px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'linear-gradient(135deg, #86FF00, #65D800)',
                                            color: '#0a0a0a',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '16px',
                                            fontWeight: '700',
                                            boxShadow: '0 4px 15px rgba(134, 255, 0, 0.3)',
                                            border: '2px solid rgba(134, 255, 0, 0.2)',
                                            transition: 'all 0.3s ease',
                                            zIndex: '10'
                                        } : {}}>4</div>
                                        <div className="step-card elegant-hover" style={screenSize === 'tablet' ? {
                                            background: 'transparent',
                                            border: 'none',
                                            padding: '30px 25px',
                                            minHeight: '220px',
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative'
                                    } : screenSize === 'mobile' ? {
                                        padding: '40px 25px 30px 25px',
                                        width: '100%',
                                        maxWidth: '420px',
                                        minHeight: 'auto',
                                        margin: '0 auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        position: 'relative',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(134, 255, 0, 0.15)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    } : {}}>
                                        <div className="step-icon" style={screenSize === 'mobile' ? {
                                            marginBottom: '20px',
                                            marginTop: '30px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '60px',
                                            height: '60px',
                                            background: 'rgba(134, 255, 0, 0.1)',
                                            borderRadius: '50%',
                                            border: '1px solid rgba(134, 255, 0, 0.2)',
                                            margin: '0 auto'
                                        } : {}}>
                                                <img src="/assets/images/common/icon_11.png" alt="Congratulations" style={screenSize === 'mobile' ? {
                                                    width: '40px',
                                                    height: '40px'
                                                } : {}} />
                                </div>
                                            <div className="step-content">
                                                <h4 style={screenSize === 'mobile' ? {
                                                    fontSize: '16px',
                                                    marginBottom: '12px',
                                                    color: '#E2E8F0',
                                                    fontWeight: '600'
                                                } : {
                                                    marginBottom: '12px',
                                                    color: '#E2E8F0',
                                                    fontWeight: '600'
                                            }}>Congrats on being a $UGLYDOG holder</h4>
                                            <p style={screenSize === 'mobile' ? {
                                                fontSize: '14px',
                                                lineHeight: '1.7',
                                                color: '#CBD5E1',
                                                margin: '0',
                                                textAlign: 'left',
                                                fontWeight: '400'
                                            } : {
                                                    lineHeight: '1.6',
                                                    color: '#9CA3AF',
                                                    margin: '0'
                                                }}>Congratulations and welcome to the community! You are now an official holder of $UGLYDOG. You can track the value of your tokens in your wallet. Be sure to join our social media channels to stay updated on the latest news and announcements.</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                        </div>
                            <div className="col-md-6" style={screenSize === 'tablet' ? {
                                order: '1',
                                width: '100%',
                                marginBottom: '60px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            } : screenSize === 'mobile' ? {
                                order: '1', // Gambar setelah judul
                                width: '100%',
                                marginBottom: '40px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            } : {
                                order: '2'
                            }}>
                                <div className="image-container" data-aos="fade-left" data-aos-duration={800} data-aos-delay={300} style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '0 auto',
                                    maxWidth: screenSize === 'tablet' ? '480px' : screenSize === 'mobile' ? '350px' : 'none'
                                }}>
                                    <div className="image-wrapper" style={screenSize === 'tablet' ? {
                                        width: '100%',
                                        maxWidth: '480px',
                                        borderRadius: '25px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                        border: '2px solid rgba(134, 255, 0, 0.1)',
                                        background: 'rgba(255,255,255,0.02)'
                                    } : screenSize === 'mobile' ? {
                                        width: '100%',
                                        maxWidth: '350px'
                                    } : {}}>
                                        <img src="/assets/images/common/img_step.png" alt="Ugly Dog Steps Process" style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: screenSize === 'tablet' ? '20px' : '0',
                                            display: 'block'
                                        }} />
                                        <div className="image-overlay-gradient"></div>
                                        <div className="floating-accent-dots">
                                            <div className="accent-dot dot-1"></div>
                                            <div className="accent-dot dot-2"></div>
                                            <div className="accent-dot dot-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
