import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiMinus, FiPlus, FiStar, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const { addToCart, addToWishlist, wishlist, cart } = useApp();

  const isWishlisted = wishlist.some(w => w.id === parseInt(id));
  const inCart = cart.find(c => c.id === parseInt(id));

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/products?category=${data.category}`)
          .then(res => res.json())
          .then(products => {
            setSimilarProducts(products.filter(p => p.id !== parseInt(id)).slice(0, 4));
            setLoading(false);
          });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  if (loading || !product) {
    return (
      <div className="product-detail-loading">
        <div>Loading...</div>
      </div>
    );
  }

  const reviews = [
    { id: 1, user: 'Sarah M.', rating: 5, text: 'Absolutely beautiful! The flowers were fresh and delivered on time.', date: '2026-01-15' },
    { id: 2, user: 'John D.', rating: 4, text: 'Great quality, loved the packaging. Highly recommended!', date: '2026-01-10' },
    { id: 3, user: 'Emily R.', rating: 5, text: 'Perfect gift for my mom. She loved it!', date: '2026-01-05' },
  ];

  const combos = [
    { id: 101, name: 'With Chocolate Box', price: 30, image: 'https://picsum.photos/seed/choco1/200/200' },
    { id: 102, name: 'With Wine', price: 45, image: 'https://picsum.photos/seed/wine1/200/200' },
    { id: 103, name: 'With Teddy Bear', price: 25, image: 'https://picsum.photos/seed/teddy1/200/200' },
  ];

  return (
    <div className="product-detail">
      <div className="container">
        <motion.div 
          className="breadcrumb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / {product.name}
        </motion.div>

        <div className="product-main">
          <motion.div 
            className="product-gallery"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="thumbnail-row">
              {[1,2,3,4].map(i => (
                <div key={i} className="thumbnail">
                  <img src={product.image} alt={`${product.name} ${i}`} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="product-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="product-rating">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}</span>
              <span className="rating-value">{product.rating}</span>
              <span className="review-count">({reviews.length} reviews)</span>
            </div>
            <div className="product-price">${product.price}</div>
            
            <p className="product-description">
              Beautifully crafted {product.name.toLowerCase()} perfect for any occasion. 
              Hand-selected fresh flowers arranged by our expert florists.
            </p>

            <div className="quantity-selector">
              <span>Quantity:</span>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><FiPlus /></button>
              </div>
            </div>

            <div className="product-actions">
              <button 
                className={`add-to-cart ${inCart ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
              >
                <FiShoppingBag /> {inCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button 
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => addToWishlist(product)}
              >
                <FiHeart />
              </button>
            </div>

            <div className="product-features">
              <div className="feature">
                <FiTruck />
                <span>Free Delivery</span>
              </div>
              <div className="feature">
                <FiRefreshCw />
                <span>Same Day Delivery</span>
              </div>
              <div className="feature">
                <FiShield />
                <span>Freshness Guaranteed</span>
              </div>
            </div>

            <div className="combo-section">
              <h3>Make it a Combo</h3>
              <div className="combo-options">
                {combos.map(combo => (
                  <div key={combo.id} className="combo-item">
                    <img src={combo.image} alt={combo.name} />
                    <div>
                      <span>{combo.name}</span>
                      <strong>+${combo.price}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="product-tabs">
          <div className="tabs-header">
            <button 
              className={activeTab === 'description' ? 'active' : ''} 
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={activeTab === 'reviews' ? 'active' : ''} 
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'description' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="description-tab"
              >
                <h3>Product Details</h3>
                <ul>
                  <li>Fresh hand-picked {product.category}</li>
                  <li>Arranged by expert florists</li>
                  <li>Perfect for birthdays, anniversaries, and celebrations</li>
                  <li>Includes care instructions</li>
                  <li>Available for same-day delivery</li>
                </ul>
              </motion.div>
            )}
            {activeTab === 'reviews' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="reviews-tab"
              >
                {reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <span className="review-user">{review.user}</span>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <div className="review-rating">{'★'.repeat(review.rating)}</div>
                    <p>{review.text}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="similar-products">
            <h2>You May Also Like</h2>
            <div className="similar-grid">
              {similarProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="similar-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/products/${item.id}`}>
                    <img src={item.image} alt={item.name} />
                    <h4>{item.name}</h4>
                    <span className="price">${item.price}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
