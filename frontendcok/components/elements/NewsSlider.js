'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useState, useRef } from "react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    loop: false,
    spaceBetween: 16,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination-news",
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 1,
            spaceBetween: 16,
        },
    },
}

const newsData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
        title: "Ugly Dog Token Launches Latest Update",
        date: "25 January 2025",
        description: "Ugly Dog Token announces the latest blockchain update that will increase transaction speed and reduce gas fees."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a38?w=400&h=300&fit=crop",
        title: "Ugly Dog Community Reaches 10,000 Members",
        date: "24 January 2025",
        description: "The Ugly Dog Token community reaches a new milestone with over 10,000 active members worldwide."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        title: "Strategic Partnership with Major Exchanges",
        date: "23 January 2025",
        description: "Ugly Dog Token announces strategic partnerships with several major exchanges to facilitate trading."
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop",
        title: "Ugly Dog NFT Game Opens for Beta Testing",
        date: "22 January 2025",
        description: "The first NFT game from the Ugly Dog ecosystem is now available for beta testing with attractive rewards."
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1639322537231-2b0e48cd0fe0?w=400&h=300&fit=crop",
        title: "Ugly Dog Token Airdrop for Early Adopters",
        date: "20 January 2025",
        description: "Special airdrop program for early adopters who join before the deadline with millions of token rewards."
    }
]

export default function NewsSlider({ screenSize = 'desktop' }) {
    const [activeSlide, setActiveSlide] = useState(0)
    const swiperRef = useRef(null)

    const handleSlideChange = (swiper) => {
        setActiveSlide(swiper.activeIndex)
    }

    const goToSlide = (index) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index)
        }
    }

    return (
        <>
            <link rel="stylesheet" href="https://unpkg.com/swiper@11/swiper-bundle.min.css" />
            <style jsx>{`
                .news-slider-container {
                    width: 100%;
                    max-width: 1000px;
                    margin: 0 auto;
                }
                .news-slide {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 12px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                    height: 300px;
                    min-height: 300px;
                    max-height: 300px;
                }
                
                /* Desktop specific styling */
                @media (min-width: 768px) {
                    .news-slide {
                        height: 180px;
                        min-height: 180px;
                        max-height: 180px;
                        padding: 16px;
                        gap: 20px;
                    }
                    .news-image-container {
                        width: 100px;
                        min-width: 100px;
                        height: 100px;
                    }
                    .news-title {
                        font-size: 16px;
                    }
                    .news-description {
                        font-size: 13px;
                    }
                    .news-date {
                        font-size: 12px;
                    }
                }
                .news-slide:hover {
                    background: rgba(255, 255, 255, 0.06);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(134, 255, 0, 0.15);
                    border-color: rgba(134, 255, 0, 0.2);
                }
                .news-image-container {
                    width: 120px;
                    min-width: 120px;
                    height: 120px;
                    border-radius: 8px;
                    overflow: hidden;
                    position: relative;
                    flex-shrink: 0;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                }
                .news-image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .news-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    justify-content: center;
                    height: 100%;
                    overflow: hidden;
                }
                .news-date {
                    font-size: 11px;
                    color: #94A3B8;
                    font-weight: 400;
                    margin-bottom: 2px;
                    opacity: 0.8;
                }
                .news-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #FFFFFF;
                    line-height: 1.3;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .news-description {
                    font-size: 12px;
                    color: #CBD5E1;
                    line-height: 1.4;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    opacity: 0.9;
                }
                .swiper-pagination-news {
                    position: relative;
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    padding: 10px 0;
                }
                .swiper-pagination-news .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: #94A3B8;
                    opacity: 0.5;
                    transition: all 0.3s ease;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .swiper-pagination-news .swiper-pagination-bullet:hover {
                    background: #86FF00;
                    opacity: 0.8;
                    transform: scale(1.1);
                }
                .swiper-pagination-news .swiper-pagination-bullet-active {
                    background: #86FF00;
                    opacity: 1;
                    width: 30px;
                    border-radius: 5px;
                    border-color: rgba(134, 255, 0, 0.5);
                    box-shadow: 0 0 8px rgba(134, 255, 0, 0.4);
                }
                
                /* Manual pagination dots */
                .manual-pagination {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin-top: -10px;
                    padding: 0px 0;
                }
                .manual-dot {
                    width: 10px;
                    height: 10px;
                    background: #94A3B8;
                    opacity: 0.5;
                    transition: all 0.3s ease;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .manual-dot:hover {
                    background: #86FF00;
                    opacity: 0.8;
                    transform: scale(1.1);
                }
                .manual-dot.active {
                    background: #86FF00;
                    opacity: 1;
                    width: 30px;
                    border-radius: 5px;
                    border-color: rgba(134, 255, 0, 0.5);
                    box-shadow: 0 0 8px rgba(134, 255, 0, 0.4);
                }
                @media (max-width: 767px) {
                    .news-slide {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;
                        padding: 10px;
                    }
                    .news-image-container {
                        width: 100%;
                        height: 160px;
                        min-width: 100%;
                    }
                    .news-content {
                        width: 100%;
                    }
                    .news-title {
                        font-size: 14px;
                    }
                    .news-description {
                        font-size: 11px;
                    }
                }
            `}</style>
            <div className="news-slider-container">
                <Swiper 
                    {...swiperOptions} 
                    className="swiper-wrapper"
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    onSlideChange={handleSlideChange}
                >
                    {newsData.map((news) => (
                        <SwiperSlide key={news.id}>
                            <div className="news-slide">
                                <div className="news-image-container">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="news-content">
                                    <div className="news-date">{news.date}</div>
                                    <h3 className="news-title">{news.title}</h3>
                                    <p className="news-description">{news.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-pagination-news"></div>
                
                {/* Manual pagination dots as fallback */}
                <div className="manual-pagination">
                    {newsData.map((_, index) => (
                        <span 
                            key={index} 
                            className={`manual-dot ${index === activeSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </>
    )
}

