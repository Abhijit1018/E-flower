import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiShoppingBag, FiMapPin, FiCreditCard, FiSettings, 
  FiLogOut, FiMenu, FiX, FiChevronRight, FiPackage, FiHeart,
  FiDollarSign, FiBell
} from 'react-icons/fi';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('eflower-user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('eflower-user');
    navigate('/login');
  };

  const menuItems = [
    { id: 'profile', icon: FiUser, label: 'My Profile', path: '/dashboard/profile' },
    { id: 'orders', icon: FiShoppingBag, label: 'My Orders', path: '/dashboard/orders' },
    { id: 'addresses', icon: FiMapPin, label: 'My Addresses', path: '/dashboard/addresses' },
    { id: 'wallet', icon: FiCreditCard, label: 'My Wallet', path: '/dashboard/wallet' },
    { id: 'wishlist', icon: FiHeart, label: 'My Wishlist', path: '/wishlist' },
    { id: 'settings', icon: FiSettings, label: 'Settings', path: '/dashboard/settings' },
  ];

  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        <h1>My Account</h1>
      </div>

      <div className="dashboard-layout">
        <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-user">
            <img src={user.avatar || 'https://picsum.photos/seed/user/100/100'} alt={user.name} />
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <nav className="sidebar-menu">
            {menuItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              >
                <item.icon />
                <span>{item.label}</span>
                <FiChevronRight className="arrow" />
              </Link>
            ))}
            <button className="menu-item logout" onClick={handleLogout}>
              <FiLogOut />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <main className="dashboard-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="content-card"
            >
              {activeTab === 'profile' && <ProfileSection user={user} />}
              {activeTab === 'orders' && <OrdersSection />}
              {activeTab === 'addresses' && <AddressesSection />}
              {activeTab === 'wallet' && <WalletSection />}
              {activeTab === 'settings' && <SettingsSection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function ProfileSection({ user }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  return (
    <div className="dashboard-section">
      <h2>My Profile</h2>
      <p className="section-desc">Manage your personal information</p>

      <div className="profile-header">
        <img src={user?.avatar || 'https://picsum.photos/seed/user/100/100'} alt="Profile" />
        <div>
          <button className="upload-btn">Change Photo</button>
          <p>JPG, PNG. Max 2MB</p>
        </div>
      </div>

      <form className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" />
          </div>
        </div>
        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
}

function OrdersSection() {
  const orders = [
    { id: 'ORD-001', date: '2026-03-10', status: 'Delivered', total: 189, items: 3 },
    { id: 'ORD-002', date: '2026-03-05', status: 'Processing', total: 95, items: 2 },
    { id: 'ORD-003', date: '2026-02-28', status: 'Delivered', total: 250, items: 5 },
  ];

  return (
    <div className="dashboard-section">
      <h2>My Orders</h2>
      <p className="section-desc">Track and manage your orders</p>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">{order.id}</span>
              <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
            </div>
            <div className="order-details">
              <div>
                <span className="label">Date</span>
                <span>{order.date}</span>
              </div>
              <div>
                <span className="label">Items</span>
                <span>{order.items} products</span>
              </div>
              <div>
                <span className="label">Total</span>
                <span className="price">${order.total}</span>
              </div>
            </div>
            <button className="view-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressesSection() {
  const addresses = [
    { id: 1, type: 'Home', name: 'John Doe', address: '123 Main Street, Apt 4B', city: 'New York, NY 10001', phone: '+1 234 567 8900', default: true },
    { id: 2, type: 'Office', name: 'John Doe', address: '456 Business Park, Floor 10', city: 'New York, NY 10002', phone: '+1 234 567 8901', default: false },
  ];

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <div>
          <h2>My Addresses</h2>
          <p className="section-desc">Manage your delivery addresses</p>
        </div>
        <button className="add-btn">+ Add New</button>
      </div>

      <div className="addresses-grid">
        {addresses.map(addr => (
          <div key={addr.id} className={`address-card ${addr.default ? 'default' : ''}`}>
            {addr.default && <span className="default-badge">Default</span>}
            <span className="address-type">{addr.type}</span>
            <h4>{addr.name}</h4>
            <p>{addr.address}</p>
            <p>{addr.city}</p>
            <p className="phone">{addr.phone}</p>
            <div className="address-actions">
              <button>Edit</button>
              <button className="delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletSection() {
  return (
    <div className="dashboard-section">
      <h2>My Wallet</h2>
      <p className="section-desc">Manage your payments and wallet</p>

      <div className="wallet-cards">
        <div className="wallet-card balance">
          <div className="wallet-icon"><FiDollarSign /></div>
          <div>
            <span className="label">Available Balance</span>
            <h3>$250.00</h3>
          </div>
        </div>
        <div className="wallet-card points">
          <div className="wallet-icon"><FiPackage /></div>
          <div>
            <span className="label">Reward Points</span>
            <h3>1,250 pts</h3>
          </div>
        </div>
      </div>

      <div className="payment-methods">
        <h3>Payment Methods</h3>
        <div className="cards-list">
          <div className="payment-card">
            <div className="card-icon">VISA</div>
            <div>
              <span>**** **** **** 4242</span>
              <p>Expires 12/28</p>
            </div>
            <span className="default">Default</span>
          </div>
          <div className="payment-card">
            <div className="card-icon">MC</div>
            <div>
              <span>**** **** **** 8888</span>
              <p>Expires 06/27</p>
            </div>
          </div>
        </div>
        <button className="add-card-btn">+ Add New Card</button>
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="dashboard-section">
      <h2>Settings</h2>
      <p className="section-desc">Manage your account preferences</p>

      <div className="settings-list">
        <div className="setting-item">
          <div>
            <h4>Email Notifications</h4>
            <p>Receive updates about your orders</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div>
            <h4>SMS Notifications</h4>
            <p>Get SMS alerts for delivery updates</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div>
            <h4>Push Notifications</h4>
            <p>Receive push notifications on your device</p>
          </div>
          <label className="toggle">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div>
            <h4>Newsletter</h4>
            <p>Subscribe to our newsletter for deals</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <button className="delete-account">Delete My Account</button>
      </div>
    </div>
  );
}
