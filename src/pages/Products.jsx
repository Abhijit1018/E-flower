import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiList, FiFilter, FiX, FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Products.css';

export default function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: category || 'all',
    minPrice: 0,
    maxPrice: 500,
    sort: 'default'
  });
  const { addToCart, addToWishlist, wishlist } = useApp();

  useEffect(() => {
    setLoading(true);
    let url = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/products`;
    if (category && category !== 'all') {
      url += `?category=${category}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [category]);

  const filteredProducts = products
    .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    .sort((a, b) => {
      if (filters.sort === 'price-low') return a.price - b.price;
      if (filters.sort === 'price-high') return b.price - a.price;
      if (filters.sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'roses', name: 'Roses' },
    { id: 'lilies', name: 'Lilies' },
    { id: 'orchids', name: 'Orchids' },
    { id: 'hampers', name: 'Hampers' },
    { id: 'plants', name: 'Plants' },
    { id: 'jewelry', name: 'Jewelry' }
  ];

  const pageTitle = category ? categories.find(c => c.id === category)?.name || 'Products' : 'All Products';

  return (
    <div className="products-page">
      <div className="container">
        <motion.div 
          className="products-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>{pageTitle}</h1>
            <p>{filteredProducts.length} products</p>
          </div>
          <div className="products-controls">
            <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
              <FiFilter /> Filters
            </button>
            <div className="view-toggle">
              <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>
                <FiGrid />
              </button>
              <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>
                <FiList />
              </button>
            </div>
            <select 
              value={filters.sort} 
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="sort-select"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </motion.div>

        <div className="products-layout">
          <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={() => setShowFilters(false)}><FiX /></button>
            </div>
            
            <div className="filter-section">
              <h4>Category</h4>
              <div className="filter-options">
                {categories.map(cat => (
                  <Link 
                    key={cat.id} 
                    to={cat.id === 'all' ? '/products' : `/category/${cat.id}`}
                    className={`filter-option ${(category || 'all') === cat.id ? 'active' : ''}`}
                    onClick={() => setShowFilters(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input 
                  type="number" 
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                  placeholder="Min"
                />
                <span>-</span>
                <input 
                  type="number" 
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="filter-section">
              <h4>Rating</h4>
              <div className="rating-filters">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="rating-option">
                    <input type="checkbox" />
                    <span>{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
                    <span>& up</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <main className="products-main">
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className={`products-grid ${viewMode}`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="product-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="product-image">
                      <Link to={`/products/${product.id}`}>
                        <img src={product.image} alt={product.name} loading="lazy" />
                      </Link>
                      <div className="product-actions">
                        <button 
                          className={wishlist.some(w => w.id === product.id) ? 'active' : ''}
                          onClick={() => addToWishlist(product)}
                        >
                          <FiHeart />
                        </button>
                        <button><FiEye /></button>
                      </div>
                    </div>
                    <div className="product-info">
                      <span className="product-category">{product.category}</span>
                      <Link to={`/products/${product.id}`}>
                        <h3>{product.name}</h3>
                      </Link>
                      <div className="product-rating">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))} ({product.rating})</div>
                      <div className="product-bottom">
                        <span className="product-price">${product.price}</span>
                        <button onClick={() => addToCart(product)}><FiShoppingBag /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
