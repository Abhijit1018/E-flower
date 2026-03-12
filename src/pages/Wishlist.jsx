import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="container">
          <motion.div 
            className="empty-wishlist"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiHeart className="empty-icon" />
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite items for later</p>
            <Link to="/products" className="shop-btn">Browse Products</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Wishlist ({wishlist.length} items)
        </motion.h1>

        <div className="wishlist-grid">
          {wishlist.map((item, index) => (
            <motion.div 
              key={item.id}
              className="wishlist-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/products/${item.id}`} className="item-image">
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="item-details">
                <Link to={`/products/${item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <span className="item-category">{item.category}</span>
                <div className="item-price">${item.price}</div>
              </div>
              <div className="item-actions">
                <button className="add-btn" onClick={() => addToCart(item)}>
                  <FiShoppingBag /> Add to Cart
                </button>
                <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <Link to="/products" className="back-btn">
          <FiArrowLeft /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
