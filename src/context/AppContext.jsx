import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('eflower-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('eflower-wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('eflower-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('eflower-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist(prev => [...prev, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const applyCoupon = (code) => {
    const coupons = {
      'WELCOME15': { discount: 15, description: '15% OFF for New Users' },
      'BIRTHDAY20': { discount: 20, description: '20% OFF Birthday Flowers' },
      'FIRST10': { discount: 10, description: '10% OFF First Order' },
    };
    if (coupons[code]) {
      setAppliedCoupon(coupons[code]);
      return true;
    }
    return false;
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = appliedCoupon ? cartTotal * appliedCoupon.discount / 100 : 0;

  return (
    <AppContext.Provider value={{
      cart, setCart, addToCart, removeFromCart,
      wishlist, addToWishlist, removeFromWishlist,
      searchQuery, setSearchQuery,
      appliedCoupon, applyCoupon,
      cartTotal, discount
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
