import { FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaPinterestP } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>E-FLOWER</h3>
            <p>Premium florist delivering joy since 2015. Handcrafted arrangements for every occasion.</p>
            <div className="footer-social">
              <a href="#"><FiInstagram /></a>
              <a href="#"><FiFacebook /></a>
              <a href="#"><FaPinterestP /></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Help & FAQs</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Shipping Info</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li><a href="#">Bouquets</a></li>
              <li><a href="#">Combos</a></li>
              <li><a href="#">Plants</a></li>
              <li><a href="#">Jewelry</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="contact-list">
              <li><FiMapPin /> 123 Flower Street, NY</li>
              <li><FiPhone /> +1 (555) 123-4567</li>
              <li><FiMail /> hello@eflower.com</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 E-FLOWER. All rights reserved.</p>
          <div className="payment-icons">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Amex</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
