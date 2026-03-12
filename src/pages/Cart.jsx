import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Cart.css';

export default function Cart() {
  const { cart, setCart, removeFromCart, cartTotal, appliedCoupon, discount } = useApp();

  const updateQuantity = (id, change) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
    ));
  };

  const finalTotal = cartTotal - discount;

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <motion.div 
            className="empty-cart"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiShoppingBag className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet</p>
            <Link to="/products" className="shop-btn">Start Shopping</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Shopping Cart ({cart.length} items)
        </motion.h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => (
              <motion.div 
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
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
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, -1)}><FiMinus /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}><FiPlus /></button>
                </div>
                <div className="item-total">${item.price * item.qty}</div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <FiTrash2 />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="summary-row discount">
                <span>Discount ({appliedCoupon.discount}%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <Link to="/products" className="continue-btn">
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
