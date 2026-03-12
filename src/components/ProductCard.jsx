import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ product, index }) {
  const { addToCart, addToWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const [imgError, setImgError] = useState(false);

  const fallbackImage = 'https://picsum.photos/seed/fallback/400/400';

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/products/${product.id}`} className="product-image">
        <img 
          src={imgError ? fallbackImage : product.image} 
          alt={product.name} 
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="product-actions" onClick={(e) => e.preventDefault()}>
          <button 
            className={`action-btn ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); addToWishlist(product); }}
          >
            <FiHeart />
          </button>
          <button className="action-btn" onClick={(e) => e.preventDefault()}>
            <FiEye />
          </button>
        </div>
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <div className="product-bottom">
          <span className="product-price">${product.price}</span>
          <button className="add-btn" onClick={() => addToCart(product)}>
            <FiShoppingBag />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
