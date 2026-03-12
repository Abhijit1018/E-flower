import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiHeart, FiMenu, FiX, FiChevronDown, FiUser } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Header.css';

export default function Header() {
  const { cart, wishlist } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const storedUser = localStorage.getItem('eflower-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    return () => window.removeEventListener('scroll', handleScroll);
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
        { name: 'Roses', link: '/category/roses', image: 'https://picsum.photos/seed/rose1/200/200' },
        { name: 'Lilies', link: '/category/lilies', image: 'https://picsum.photos/seed/lily1/200/200' },
        { name: 'Orchids', link: '/category/orchids', image: 'https://picsum.photos/seed/orchid1/200/200' },
        { name: 'Tulips', link: '/category/tulips', image: 'https://picsum.photos/seed/tulip1/200/200' },
        { name: 'Sunflowers', link: '/category/sunflowers', image: 'https://picsum.photos/seed/sunflower1/200/200' },
      ]
    },
    {
      title: 'Gifts',
      items: [
        { name: 'Hampers', link: '/category/hampers', image: 'https://picsum.photos/seed/gift1/200/200' },
        { name: 'Cakes', link: '/category/cakes', image: 'https://picsum.photos/seed/cake1/200/200' },
        { name: 'Chocolates', link: '/category/chocolates', image: 'https://picsum.photos/seed/choco1/200/200' },
        { name: 'Wine', link: '/category/wine', image: 'https://picsum.photos/seed/wine1/200/200' },
        { name: 'Balloons', link: '/category/balloons', image: 'https://picsum.photos/seed/balloon1/200/200' },
      ]
    },
    {
      title: 'Plants',
      items: [
        { name: 'Indoor Plants', link: '/category/plants', image: 'https://picsum.photos/seed/plant1/200/200' },
        { name: 'Succulents', link: '/category/succulents', image: 'https://picsum.photos/seed/succulent1/200/200' },
        { name: 'Terrariums', link: '/category/terrariums', image: 'https://picsum.photos/seed/terrarium1/200/200' },
      ]
    },
    {
      title: 'Jewelry',
      items: [
        { name: 'Necklaces', link: '/category/jewelry', image: 'https://picsum.photos/seed/jewelry1/200/200' },
        { name: 'Bracelets', link: '/category/bracelets', image: 'https://picsum.photos/seed/jewelry2/200/200' },
        { name: 'Rings', link: '/category/rings', image: 'https://picsum.photos/seed/jewelry3/200/200' },
        { name: 'Earrings', link: '/category/earrings', image: 'https://picsum.photos/seed/jewelry4/200/200' },
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
          {user ? (
            <Link to="/dashboard" className="user-btn">
              <img src={user.avatar || 'https://picsum.photos/seed/user/100/100'} alt={user.name} />
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
