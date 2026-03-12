import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';
import './HolidayPromo.css';

const fallbackImage = 'https://picsum.photos/seed/fallback/600/600';

export default function HolidayPromo() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="holiday-promo">
      <motion.div
        className="promo-content"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="promo-text">
          <span className="promo-label">Limited Time</span>
          <h2>Valentine's Day Collection</h2>
          <p>Express your love with our handcrafted arrangements</p>
          <button className="promo-btn">
            Shop Valentine's <FiArrowRight />
          </button>
        </div>
        <div className="promo-visual">
          <motion.img
            src={imgError ? fallbackImage : "https://picsum.photos/seed/valentine/600/600"}
            alt="Valentine's"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            onError={() => setImgError(true)}
          />
        </div>
      </motion.div>
    </section>
  );
}
