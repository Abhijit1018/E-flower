import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import './SpecialtyGrids.css';

export default function SpecialtyGrids({ products }) {
  const hampers = products.filter(p => p.category === 'hampers' || p.category === 'arrangements').slice(0, 8);
  const plants = products.filter(p => p.category === 'plants').slice(0, 8);
  const jewelry = products.filter(p => p.category === 'jewelry' || p.category === 'bouquets').slice(0, 8);
  const succulents = products.filter(p => p.category === 'succulents' || p.category === 'wedding').slice(0, 8);
  const terrariums = products.filter(p => p.category === 'terrariums' || p.category === 'dried').slice(0, 8);

  return (
    <section className="specialty-grids">
      <div className="container">
        {hampers.length > 0 && (
          <motion.div 
            className="specialty-section"
            id="hampers"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="specialty-title">Luxury Hampers & Arrangements</h2>
            <div className="specialty-grid">
              {hampers.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {plants.length > 0 && (
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
        )}

        {jewelry.length > 0 && (
          <motion.div 
            className="specialty-section"
            id="jewelry"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="specialty-title">Jewelry, Accessories & Bouquets</h2>
            <div className="specialty-grid">
              {jewelry.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {succulents.length > 0 && (
          <motion.div 
            className="specialty-section"
            id="succulents"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="specialty-title">Succulents & Wedding</h2>
            <div className="specialty-grid">
              {succulents.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {terrariums.length > 0 && (
          <motion.div 
            className="specialty-section"
            id="terrariums"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="specialty-title">Terrariums & Dried</h2>
            <div className="specialty-grid">
              {terrariums.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
