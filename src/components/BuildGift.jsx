import { motion } from 'framer-motion';
import { useState } from 'react';
import './BuildGift.css';

const fallbackImage = 'https://picsum.photos/seed/fallback/300/300';

function GiftSet({ set, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      key={set.id}
      className="gift-set"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ y: -12 }}
    >
      <div className="gift-set-image">
        <img 
          src={imgError ? fallbackImage : set.image} 
          alt={set.name}
          onError={() => setImgError(true)}
        />
        <div className="floating-hearts">
          {set.hearts.map((heart, i) => (
            <motion.span
              key={i}
              className="floating-heart"
              animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, delay: i * 0.3, duration: 2 }}
              style={{ left: `${20 + i * 25}%`, top: `${10 + i * 15}%` }}
            >
              {heart}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="gift-set-info">
        <h3>{set.name}</h3>
        <button className="gift-set-btn">Customize Now</button>
      </div>
    </motion.div>
  );
}

export default function BuildGift({ sets }) {
  return (
    <section className="build-gift" id="build">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Build Your Perfect Gift
        </motion.h2>
        
        <motion.div 
          className="gift-configurator"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {sets.map((set, index) => (
            <GiftSet key={set.id} set={set} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
