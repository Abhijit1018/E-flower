import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Coupons.css';

export default function Coupons({ coupons }) {
  const { applyCoupon, appliedCoupon } = useApp();
  const [copied, setCopied] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
    applyCoupon(code);
  };

  return (
    <section className="coupons" id="offers">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Exclusive Offers
        </motion.h2>
        
        <div className="coupons-grid">
          {coupons.map((coupon, index) => (
            <motion.div
              key={coupon.code}
              className={`coupon-card ${appliedCoupon?.code === coupon.code ? 'applied' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="coupon-discount">{coupon.discount}%</div>
              <div className="coupon-details">
                <h3>{coupon.description}</h3>
                <div className="coupon-code-row">
                  <span className="coupon-code">{coupon.code}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => handleCopy(coupon.code)}
                  >
                    {copied === coupon.code ? <FiCheck /> : <FiCopy />}
                    {copied === coupon.code ? 'Applied!' : 'Apply'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
