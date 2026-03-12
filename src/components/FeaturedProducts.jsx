import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import './FeaturedProducts.css';

export default function FeaturedProducts({ products, title, id }) {
  return (
    <section className="featured-products" id={id}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
