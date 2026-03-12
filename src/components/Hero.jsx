import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useRef, useEffect, useState } from 'react';
import './Hero.css';

const fallbackImage = 'https://picsum.photos/seed/fallback/800/600';

function HeroBanner({ banner, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a
      href={banner.link}
      key={`${banner.id}-${index}`}
      className={`hero-banner ${banner.dark ? 'dark' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <img 
        src={imgError ? fallbackImage : banner.image} 
        alt={banner.title} 
        loading="lazy"
        onError={() => setImgError(true)}
      />
      <div className="hero-overlay">
        <span className="hero-subtitle">{banner.subtitle}</span>
        <h2 className="hero-title">{banner.title}</h2>
        <button className="hero-cta">
          {banner.cta} <FiArrowRight />
        </button>
      </div>
    </motion.a>
  );
}

export default function Hero({ banners }) {
  const scrollRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const bannerWidth = 570;
  const extendedBanners = [...banners, ...banners, ...banners];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollLeft = bannerWidth;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const singleSetWidth = (scrollWidth / 3);
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 50) {
        container.style.transition = 'none';
        container.scrollLeft = scrollLeft - singleSetWidth;
        setTimeout(() => {
          container.style.transition = 'scroll-left 0.5s ease';
        }, 50);
      } else if (scrollLeft <= 0) {
        container.style.transition = 'none';
        container.scrollLeft = scrollLeft + singleSetWidth;
        setTimeout(() => {
          container.style.transition = 'scroll-left 0.5s ease';
        }, 50);
      }
    };

    container.style.transition = 'scroll-left 0.5s ease';
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.style.transition = 'scroll-left 0.5s ease';
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -bannerWidth : bannerWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-scroll-container">
        <button className="hero-scroll-btn left" onClick={() => scroll('left')}>‹</button>
        <div className="hero-scroll" ref={scrollRef}>
          {extendedBanners.map((banner, index) => (
            <HeroBanner banner={banner} index={index} />
          ))}
        </div>
        <button className="hero-scroll-btn right" onClick={() => scroll('right')}>›</button>
      </div>
    </section>
  );
}
