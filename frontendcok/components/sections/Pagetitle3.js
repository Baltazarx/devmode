'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import CounterUp from "../elements/CounterUp"
import NewsSlider from "../elements/NewsSlider"
import { useState, useLayoutEffect } from 'react'

const scrollToUglyDogGame = () => {
    const gameSection = document.getElementById('uglydog-clicker');
    if (gameSection) {
        const elementPosition = gameSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 80; // 80px offset from top
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    } else {
        // Fallback: scroll to top if section not found
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    loop: false,
    spaceBetween: 0,
    navigation: {
        nextEl: ".btn-next-main",
        prevEl: ".btn-prev-main",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        1280: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
    },
}

export default function Pagetitle3() {
    const [screenSize, setScreenSize] = useState('desktop')

    useLayoutEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth
            if (width <= 767) {
                setScreenSize('mobile')
            } else if (width >= 768 && width <= 991) {
                setScreenSize('tablet')
            } else {
                setScreenSize('desktop')
            }
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    return (
        <>
            <style jsx global>{`
                @media (max-width: 767px) {
                    .main .page-title.st3 .box-slider .content-box h1.title {
                        text-align: center !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        transform: none !important;
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        justify-content: center !important;
                        width: 100% !important;
                        box-sizing: border-box !important;
                    }
                    .page-title.st3 {
                        padding-top: 0px !important;
                        padding-bottom: 40px !important;
                        margin-top: -50px !important;
                    }
                    .main .page-title.st3 .swiper-container {
                        margin-top: -30px !important;
                    }
                    .main .page-title.st3 .box-slider {
                        margin-top: -20px !important;
                    }
                }
                @media (min-width: 768px) {
                    .page-title.st3 {
                        padding-top: 20px !important;
                        padding-bottom: 59px !important;
                        margin-top: 0px !important;
                    }
                    .main .page-title.st3 .swiper-container {
                        margin-top: 0px !important;
                    }
                    .main .page-title.st3 .box-slider {
                        margin-top: 0px !important;
                    }
                }
            `}</style>

            <section id="home" className="page-title st3" style={{
                marginBottom: 72,
                paddingTop: screenSize === 'mobile' ? '0px' : '20px',
                paddingBottom: screenSize === 'mobile' ? '40px' : '59px',
                marginTop: screenSize === 'mobile' ? '-50px' : '0px'
            }}>
                <div className="overlay" style={{
                    background: 'linear-gradient(135deg, rgba(10,15,28,0.9) 0%, rgba(26,35,50,0.7) 50%, rgba(10,15,28,0.9) 100%)'
                }}>
                </div>
                <div className="swiper-container slider-main">
                    <Swiper {...swiperOptions} className="swiper-wrapper">
                        <SwiperSlide>
                            <div className="slider-st3">
                                <div className="container">
                                    <div className="row" style={screenSize === 'mobile' ? {
                                        display: 'flex',
                                        flexDirection: 'column'
                                    } : {}}>
                                        <div className="col-md-12">
                                            <div className="box-slider" style={screenSize === 'mobile' ? {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center'
                                            } : {}}>
                                                <div className="content-box" style={screenSize === 'mobile' ? {
                                                    order: '1',
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    textAlign: 'center'
                                                } : {}}>
                                                    <h1 className="title" style={screenSize === 'mobile' ? {
                                                        fontSize: '1.8rem',
                                                        marginBottom: '20px',
                                                        textAlign: 'center',
                                                        lineHeight: '1.2',
                                                        padding: '0 20px',
                                                        wordWrap: 'break-word',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: '100%',
                                                        boxSizing: 'border-box',
                                                        marginRight: '0 !important',
                                                        marginLeft: '0 !important',
                                                        transform: 'none !important'
                                                    } : {}}>Turning Chaos into Crypto: Meet Ugly Dog</h1>
                                                    
                                                    {/* Deskripsi untuk desktop */}
                                                    <p className="sub-title" style={screenSize === 'mobile' ? { display: 'none' } : {}}>Ugly Dog isn't just another meme coin – 
                                                        it's a wild ride into the metaverse with real community power and crazy potential.</p>
                                                    
                                                    {/* Button untuk desktop */}
                                                    <div className="wrap-btn" style={screenSize === 'mobile' ? { display: 'none' } : {}}>
                                                        <Link href="#" className="tf-button style2">
                                                            Buy Uglydog
                                                        </Link>
                                                        <button
                                                            onClick={scrollToUglyDogGame}
                                                            className="tf-button style2"
                                                            style={{ marginLeft: '1rem' }}
                                                        >
                                                            Start Game
                                                        </button>
                                                    </div>
                                                    <div className="flat-box" style={screenSize === 'mobile' ? { display: 'none' } : {}}>
                                                        <NewsSlider screenSize={screenSize} />
                                                    </div>
                                                </div>
                                                <div className="image" style={screenSize === 'mobile' ? {
                                                    order: '2',
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    marginBottom: '20px'
                                                } : {}}>
                                                    <img className="img_main" src="assets/images/slider/Testing.png" alt="" style={screenSize === 'mobile' ? {
                                                        width: '80%',
                                                        maxWidth: '300px',
                                                        height: 'auto'
                                                    } : {}} />
                                                </div>
                                                
                                                {/* Deskripsi untuk mobile */}
                                                <div style={screenSize === 'mobile' ? {
                                                    order: '3',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    marginBottom: '25px',
                                                    padding: '0 20px'
                                                } : { display: 'none' }}>
                                                    <p style={{
                                                        fontSize: '14px',
                                                        lineHeight: '1.6',
                                                        color: '#CBD5E1',
                                                        margin: '0'
                                                    }}>Ugly Dog isn't just another meme coin – 
                                                        it's a wild ride into the metaverse with real community power and crazy potential.</p>
                                                </div>
                                                
                                                {/* Button untuk mobile */}
                                                <div style={screenSize === 'mobile' ? {
                                                    order: '4',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '15px',
                                                    width: '100%',
                                                    maxWidth: '300px',
                                                    marginBottom: '30px'
                                                } : { display: 'none' }}>
                                                    <Link href="#" className="tf-button style2" style={{
                                                        width: '100%',
                                                        textAlign: 'center',
                                                        marginLeft: '0'
                                                    }}>
                                                        Buy Uglydog
                                                    </Link>
                                                    <button
                                                        onClick={scrollToUglyDogGame}
                                                        className="tf-button style2"
                                                        style={{
                                                            width: '100%',
                                                            marginLeft: '0'
                                                        }}
                                                    >
                                                        Start Game
                                                    </button>
                                                </div>
                                                
                                                {/* News Slider untuk mobile */}
                                                <div style={screenSize === 'mobile' ? {
                                                    order: '5',
                                                    width: '100%',
                                                    padding: '0 20px'
                                                } : { display: 'none' }}>
                                                    <NewsSlider screenSize={screenSize} />
                                                </div>
                        </div>
                        </div>
                    </div>
                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    </div>
            </section>
        </>
    )
}
