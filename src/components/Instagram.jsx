import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import './Instagram.css';

const fallbackImage = 'https://picsum.photos/seed/fallback/300/300';

function InstaItem({ img, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a
      key={index}
      href="#"
      className="insta-item"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src={imgError ? fallbackImage : img} 
        alt={`Instagram ${index + 1}`} 
        loading="lazy"
        onError={() => setImgError(true)}
      />
      <div className="insta-overlay">
        <FaHeart /> <span>1.2k</span>
      </div>
    </motion.a>
  );
}

export default function Instagram({ images }) {
  return (
    <section className="instagram">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          @E_Flower
        </motion.h2>
        
        <div className="instagram-grid">
          {images.map((img, index) => (
            <InstaItem key={index} img={img} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
