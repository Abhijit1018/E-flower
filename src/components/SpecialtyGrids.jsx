import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import './SpecialtyGrids.css';

export default function SpecialtyGrids({ products }) {
  const hampers = products.filter(p => p.category === 'hampers').slice(0, 8);
  const plants = products.filter(p => p.category === 'plants').slice(0, 4);
  const jewelry = products.filter(p => p.category === 'jewelry').slice(0, 4);
  const succulents = products.filter(p => p.category === 'succulents').slice(0, 4);
  const terrariums = products.filter(p => p.category === 'terrariums').slice(0, 4);

  return (
    <section className="specialty-grids">
      <div className="container">
        <motion.div 
          className="specialty-section"
          id="hampers"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="specialty-title">Luxury Hampers</h2>
          <div className="specialty-grid">
            {hampers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="specialty-section"
          id="plants"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="specialty-title">Indoor Plants</h2>
          <div className="specialty-grid">
            {plants.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="specialty-section"
          id="jewelry"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="specialty-title">Jewelry & Accessories</h2>
          <div className="specialty-grid">
            {jewelry.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="specialty-section"
          id="succulents"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="specialty-title">Succulents</h2>
          <div className="specialty-grid">
            {succulents.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="specialty-section"
          id="terrariums"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="specialty-title">Terrariums</h2>
          <div className="specialty-grid">
            {terrariums.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
