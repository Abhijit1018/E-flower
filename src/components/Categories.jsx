import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Categories.css';

export default function Categories({ categories }) {
  const fallbackImage = 'https://picsum.photos/seed/fallback/200/200';

  return (
    <section className="categories">
      <div className="container">
        <motion.div 
          className="categories-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((cat, index) => (
            <CategoryItem key={cat.id} cat={cat} index={index} fallbackImage={fallbackImage} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryItem({ cat, index, fallbackImage }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      key={cat.id}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.1 }}
    >
      <Link
        to={`/category/${cat.name.toLowerCase()}`}
        className="category-item"
      >
        <div className="category-icon">
          <img 
            src={imgError ? fallbackImage : cat.image} 
            alt={cat.name} 
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </div>
        <span className="category-name">{cat.name}</span>
      </Link>
    </motion.div>
  );
}
