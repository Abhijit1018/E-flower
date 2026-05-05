import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { useState } from 'react';
import './Testimonials.css';

const fallbackImage = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop';

function TestimonialCard({ item, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      key={`${item.id}-${index}`}
      className="testimonial-card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="testimonial-image">
        <img 
          src={imgError ? fallbackImage : item.image} 
          alt={item.name}
          onError={() => setImgError(true)}
        />
        <div className="quote-icon"><FaQuoteLeft /></div>
      </div>
      <p className="testimonial-text">{item.text}</p>
      <h4 className="testimonial-name">{item.name}</h4>
    </motion.div>
  );
}

export default function Testimonials({ testimonials }) {
  return (
    <section className="testimonials">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Choose Us
        </motion.h2>
        
        <motion.div 
          className="testimonials-track"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <TestimonialCard key={`${item.id}-${index}`} item={item} index={index % testimonials.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
