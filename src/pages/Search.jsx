import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX, FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Search.css';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 500,
    rating: 0,
    sort: 'relevance'
  });
  const { addToCart, addToWishlist, wishlist } = useApp();

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      searchProducts(searchQuery);
    }
  }, [searchParams]);

  const searchProducts = (searchQuery) => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/products?search=${encodeURIComponent(searchQuery)}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      searchProducts(query);
    }
  };

  const filteredProducts = products
    .filter(p => filters.category === 'all' || p.category === filters.category)
    .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    .filter(p => p.rating >= filters.rating)
    .sort((a, b) => {
      if (filters.sort === 'price-low') return a.price - b.price;
      if (filters.sort === 'price-high') return b.price - a.price;
      if (filters.sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'roses', name: 'Roses' },
    { id: 'lilies', name: 'Lilies' },
    { id: 'orchids', name: 'Orchids' },
    { id: 'hampers', name: 'Hampers' },
    { id: 'plants', name: 'Plants' },
    { id: 'jewelry', name: 'Jewelry' }
  ];

  const popularSearches = ['Rose', 'Bouquet', 'Orchid', 'Gift Box', 'Plant', 'Necklace'];

  return (
    <div className="search-page">
      <div className="container">
        <motion.div 
          className="search-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Search Products</h1>
          <form className="search-form" onSubmit={handleSearch}>
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for flowers, gifts, plants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          
          {!query && (
            <div className="popular-searches">
              <span>Popular:</span>
              {popularSearches.map(term => (
                <button 
                  key={term} 
                  onClick={() => {
                    setQuery(term);
                    setSearchParams({ q: term });
                    searchProducts(term);
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {query && (
          <>
            <div className="search-results-header">
              <p>Results for "<strong>{query}</strong>" - {filteredProducts.length} products found</p>
              <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                <FiFilter /> Filters
              </button>
            </div>

            <div className="search-layout">
              <aside className={`search-filters ${showFilters ? 'open' : ''}`}>
                <div className="filters-header">
                  <h3>Filters</h3>
                  <button onClick={() => setShowFilters(false)}><FiX /></button>
                </div>

                <div className="filter-group">
                  <h4>Category</h4>
                  <select 
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
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

                <div className="filter-group">
                  <h4>Minimum Rating</h4>
                  <div className="rating-options">
                    {[4, 3, 2, 1].map(r => (
                      <label key={r} className={filters.rating === r ? 'active' : ''}>
                        <input 
                          type="radio" 
                          name="rating" 
                          checked={filters.rating === r}
                          onChange={() => setFilters({ ...filters, rating: r })}
                        />
                        <span>{'★'.repeat(r)}{'☆'.repeat(5-r)} & up</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <h4>Sort By</h4>
                  <select 
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <button 
                  className="clear-filters"
                  onClick={() => setFilters({
                    category: 'all',
                    minPrice: 0,
                    maxPrice: 500,
                    rating: 0,
                    sort: 'relevance'
                  })}
                >
                  Clear All Filters
                </button>
              </aside>

              <main className="search-results">
                {loading ? (
                  <div className="loading">Searching...</div>
                ) : filteredProducts.length === 0 ? (
                  <div className="no-results">
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="results-grid">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        className="result-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="result-image">
                          <Link to={`/products/${product.id}`}>
                            <img src={product.image} alt={product.name} />
                          </Link>
                          <div className="result-actions">
                            <button 
                              className={wishlist.some(w => w.id === product.id) ? 'active' : ''}
                              onClick={() => addToWishlist(product)}
                            >
                              <FiHeart />
                            </button>
                            <button><FiEye /></button>
                          </div>
                        </div>
                        <div className="result-info">
                          <span className="result-category">{product.category}</span>
                          <Link to={`/products/${product.id}`}>
                            <h3>{product.name}</h3>
                          </Link>
                          <div className="result-rating">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))} ({product.rating})</div>
                          <div className="result-bottom">
                            <span className="result-price">${product.price}</span>
                            <button onClick={() => addToCart(product)}>
                              <FiShoppingBag />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </main>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
