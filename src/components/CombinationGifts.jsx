import { motion } from 'framer-motion';
import { FiShoppingBag, FiHeart } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import './CombinationGifts.css';

const fallbackImage = 'https://picsum.photos/seed/fallback/400/400';

function ComboItem({ item, large }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      key={item.id}
      className={large ? 'combo-large-item' : 'combo-small-item'}
      initial={{ opacity: 0, x: large ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: large ? 0.15 : 0.1 }}
      whileHover={large ? { y: -8 } : { scale: 1.05 }}
    >
      <img 
        src={imgError ? fallbackImage : item.image} 
        alt={item.name} 
        loading="lazy"
        onError={() => setImgError(true)}
      />
      {large ? (
        <div className="combo-overlay">
          <h3>{item.name}</h3>
          <span className="combo-price">${item.price}</span>
        </div>
      ) : (
        <div className="combo-small-overlay">
          <h4>{item.name}</h4>
          <span>${item.price}</span>
        </div>
      )}
    </motion.div>
  );
}

export default function CombinationGifts({ gifts }) {
  const { addToCart } = useApp();
  const largeItems = gifts.filter(g => g.large);
  const smallItems = gifts.filter(g => !g.large);

  return (
    <section className="combination-gifts" id="combos">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Combination Gifts & Experiences
        </motion.h2>
        
        <div className="combo-layout">
          <div className="combo-large">
            {largeItems.map((item, index) => (
              <div key={item.id} onClick={() => addToCart(item)}>
                <ComboItem item={item} large={true} />
              </div>
            ))}
          </div>
          
          <div className="combo-small">
            {smallItems.map((item, index) => (
              <ComboItem key={item.id} item={item} large={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
