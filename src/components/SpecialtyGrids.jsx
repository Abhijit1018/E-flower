import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import './SpecialtyGrids.css';

export default function SpecialtyGrids({ products }) {
  const makeSection = (seedCats = [], desired = 8, productsList = products, minPerRow = 4) => {
    const base = productsList.filter(p => seedCats.includes(p.category));
    const taken = new Set(base.map(p => p.id));
    const filler = productsList.filter(p => !taken.has(p.id));
    const result = [...base];
    let fi = 0;
    while (result.length < Math.min(desired, productsList.length) && fi < filler.length) {
      result.push(filler[fi++]);
    }
    if (result.length > 0) {
      const mod = result.length % minPerRow;
      if (mod !== 0) {
        const need = minPerRow - mod;
        let j = 0;
        while (j < need && fi < filler.length) {
          result.push(filler[fi++]);
          j++;
        }
      }
    }
    return result.slice(0, desired);
  };

  const hampers = makeSection(['hampers', 'arrangements'], 8);
  const plants = makeSection(['plants', 'indoor'], 8);
  const jewelry = makeSection(['jewelry', 'bouquets', 'accessories'], 8);
  const succulents = makeSection(['succulents', 'wedding'], 8);
  const terrariums = makeSection(['terrariums', 'dried'], 8);

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
