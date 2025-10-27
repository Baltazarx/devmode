'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination-news",
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
    },
}

const newsData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
        title: "Ugly Dog Token Meluncurkan Update Terbaru",
        date: "25-01-2025",
        description: "Ugly Dog Token mengumumkan update blockchain terbaru yang akan meningkatkan kecepatan transaksi dan mengurangi biaya gas."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a38?w=400&h=300&fit=crop",
        title: "Community Ugly Dog Mencapai 10.000 Member",
        date: "24-01-2025",
        description: "Komunitas Ugly Dog Token mencapai milestone baru dengan lebih dari 10.000 member aktif di seluruh dunia."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        title: "Partnership Strategis dengan Exchange Utama",
        date: "23-01-2025",
        description: "Ugly Dog Token mengumumkan kerjasama strategis dengan beberapa exchange ternama untuk memudahkan trading."
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop",
        title: "Game NFT Ugly Dog Dibuka untuk Beta Testing",
        date: "22-01-2025",
        description: "Game NFT pertama dari ecosystem Ugly Dog sudah tersedia untuk beta testing dengan rewards menarik."
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1639322537231-2b0e48cd0fe0?w=400&h=300&fit=crop",
        title: "Airdrop Ugly Dog Token untuk Early Adopters",
        date: "20-01-2025",
        description: "Program airdrop khusus untuk early adopters yang bergabung sebelum deadline tertentu dengan rewards jutaan token."
    }
]

export default function NewsSlider({ screenSize = 'desktop' }) {
    return (
        <>
            <link rel="stylesheet" href="https://unpkg.com/swiper@11/swiper-bundle.min.css" />
            <style jsx>{`
                .news-slider-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .news-slide {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .news-slide:hover {
                    background: rgba(255, 255, 255, 0.08);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(134, 255, 0, 0.1);
                }
                .news-image-container {
                    width: 140px;
                    min-width: 140px;
                    height: 140px;
                    border-radius: 10px;
                    overflow: hidden;
                    position: relative;
                    flex-shrink: 0;
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
                    gap: 10px;
                    justify-content: center;
                }
                .news-date {
                    font-size: 13px;
                    color: #94A3B8;
                    font-weight: 400;
                    margin-bottom: 4px;
                }
                .news-title {
                    font-size: 18px;
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
                    font-size: 14px;
                    color: #CBD5E1;
                    line-height: 1.5;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .swiper-pagination-news {
                    position: relative;
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                }
                .swiper-pagination-news :global(.swiper-pagination-bullet) {
                    width: 10px;
                    height: 10px;
                    background: #94A3B8;
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-news :global(.swiper-pagination-bullet-active) {
                    background: #86FF00;
                    opacity: 1;
                    width: 30px;
                    border-radius: 5px;
                }
                @media (max-width: 767px) {
                    .news-slide {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 15px;
                    }
                    .news-image-container {
                        width: 100%;
                        height: 180px;
                        min-width: 100%;
                    }
                    .news-content {
                        width: 100%;
                    }
                    .news-title {
                        font-size: 16px;
                    }
                    .news-description {
                        font-size: 13px;
                    }
                }
            `}</style>
            <div className="news-slider-container">
                <Swiper {...swiperOptions} className="swiper-wrapper">
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
            </div>
        </>
    )
}

