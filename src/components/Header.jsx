import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiHeart, FiMenu, FiX, FiChevronDown, FiUser, FiTruck, FiGift } from 'react-icons/fi';
import { useApp, currencies } from '../context/AppContext';
import './Header.css';

export default function Header() {
  const { cart, wishlist, activeCurrency, setActiveCurrency } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    const storedUser = localStorage.getItem('eflower-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  const menuItems = [
    {
      title: 'Flowers',
      items: [
        { name: 'Roses', link: '/category/roses', image: 'https://images.unsplash.com/photo-1494697275817-48356942ad3d?w=200&h=200&fit=crop' },
        { name: 'Lilies', link: '/category/lilies', image: 'https://images.unsplash.com/photo-1519379853927-14917f8ae2d6?w=200&h=200&fit=crop' },
        { name: 'Orchids', link: '/category/orchids', image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=200&h=200&fit=crop' },
        { name: 'Tulips', link: '/category/tulips', image: 'https://images.unsplash.com/photo-1588628566587-30d8e5294025?w=200&h=200&fit=crop' },
        { name: 'Sunflowers', link: '/category/sunflowers', image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop' },
      ]
    },
    {
      title: 'Gifts',
      items: [
        { name: 'Hampers', link: '/category/hampers', image: 'https://images.unsplash.com/photo-1523381217754-1b4b9b6b9d2b?w=200&h=200&fit=crop' },
        { name: 'Cakes', link: '/category/cakes', image: 'https://images.unsplash.com/photo-1542826438-1b6a6f7b0c3b?w=200&h=200&fit=crop' },
        { name: 'Chocolates', link: '/category/chocolates', image: 'https://images.unsplash.com/photo-1505253758473-4f6f0e1b5d6b?w=200&h=200&fit=crop' },
        { name: 'Wine', link: '/category/wine', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop' },
        { name: 'Balloons', link: '/category/balloons', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200&h=200&fit=crop' },
      ]
    },
    {
      title: 'Plants',
      items: [
        { name: 'Indoor Plants', link: '/category/plants', image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=200&h=200&fit=crop' },
        { name: 'Succulents', link: '/category/succulents', image: 'https://images.unsplash.com/photo-1519379853927-14917f8ae2d6?w=200&h=200&fit=crop' },
        { name: 'Terrariums', link: '/category/terrariums', image: 'https://images.unsplash.com/photo-1530089706389-2c6f1f3d9a9a?w=200&h=200&fit=crop' },
      ]
    },
    {
      title: 'Jewelry',
      items: [
        { name: 'Necklaces', link: '/category/jewelry', image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=200&h=200&fit=crop' },
        { name: 'Bracelets', link: '/category/bracelets', image: 'https://images.unsplash.com/photo-1470509315330-8197aa048866?w=200&h=200&fit=crop' },
        { name: 'Rings', link: '/category/rings', image: 'https://images.unsplash.com/photo-1494697275817-48356942ad3d?w=200&h=200&fit=crop' },
        { name: 'Earrings', link: '/category/earrings', image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=200&h=200&fit=crop' },
      ]
    },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="promo-strip">
        <div className="marquee">
          <span>✨ Free shipping on orders above $50 &nbsp;|&nbsp; Use code WELCOME15 for 15% off &nbsp;|&nbsp; Same day delivery available &nbsp;|&nbsp; ✨</span>
          <span>✨ Free shipping on orders above $50 &nbsp;|&nbsp; Use code WELCOME15 for 15% off &nbsp;|&nbsp; Same day delivery available &nbsp;|&nbsp; ✨</span>
        </div>
      </div>
      
      <div className="header-main container">
        <div className="header-left">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
          <Link to="/" className="logo">E-FLOWER</Link>
        </div>

        <div className="header-center">
          <form className="search-bar" onSubmit={handleSearch}>
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for flowers, gifts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>

        <div className="header-right">
          <div className="header-utilities">
            <Link to="/same-day" className="utility-item">
              <FiTruck className="utility-icon" />
              <span className="utility-label fine-font">Same Day</span>
            </Link>
            
            <div className="utility-item currency-utility" ref={currencyRef}>
              <button 
                className="currency-btn" 
                onClick={() => setCurrencyOpen(!currencyOpen)}
              >
                <div className="currency-badge fine-font">{activeCurrency.symbol}</div>
                <span className="utility-label fine-font active-label">{activeCurrency.code}</span>
              </button>
              
              {currencyOpen && (
                <div className="currency-dropdown-box">
                  {currencies.map(curr => (
                    <button 
                      key={curr.code}
                      className={`currency-option ${curr.code === activeCurrency.code ? 'selected' : ''}`}
                      onClick={() => {
                        setActiveCurrency(curr);
                        setCurrencyOpen(false);
                      }}
                    >
                      <img src={`https://flagcdn.com/24x18/${curr.flagCode}.png`} alt={curr.code} />
                      <span className="fine-font">{curr.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/corporate" className="utility-item">
              <FiGift className="utility-icon" />
              <span className="utility-label fine-font">Corporate</span>
            </Link>
          </div>

          <div className="header-actions">
            {user ? (
              <Link to="/dashboard" className="user-btn">
                <img src={user.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'} alt={user.name} />
              </Link>
            ) : (
              <Link to="/login" className="icon-btn"><FiUser /></Link>
            )}
            <Link to="/wishlist" className="icon-btn">
              <FiHeart />
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="icon-btn cart-btn">
              <FiShoppingBag />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <div className="container nav-container">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          {menuItems.map((item, idx) => (
            <div 
              key={idx} 
              className="nav-dropdown"
              onMouseEnter={() => setOpenDropdown(idx)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span className="nav-link">
                {item.title} <FiChevronDown />
              </span>
              <div className={`dropdown-menu ${openDropdown === idx ? 'show' : ''}`}>
                <div className="dropdown-grid">
                  {item.items.map((sub, subIdx) => (
                    <Link 
                      key={subIdx} 
                      to={sub.link} 
                      className="dropdown-item"
                      onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}
                    >
                      <img src={sub.image} alt={sub.name} loading="lazy" />
                      <span>{sub.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Link to="/products" onClick={() => setMenuOpen(false)}>All Products</Link>
        </div>
      </nav>
    </header>
  );
}
