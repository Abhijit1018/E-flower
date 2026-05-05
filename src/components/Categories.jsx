import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Categories.css';

export default function Categories({ categories }) {
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
            <CategoryItem key={cat.id} cat={cat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryItem({ cat, index }) {

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
          <span className="category-emoji" aria-hidden="true">{cat.icon || '🌸'}</span>
        </div>
        <span className="category-name">{cat.name}</span>
      </Link>
    </motion.div>
  );
}
