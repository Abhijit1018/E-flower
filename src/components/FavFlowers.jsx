import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './FavFlowers.css';

export default function FavFlowers({ flowers }) {
  return (
    <section className="fav-flowers">
      <div className="container">
        <motion.h2
          className="fav-flowers-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Pick Their Fav Flowers
        </motion.h2>

        <motion.div
          className="fav-flowers-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {flowers.map((flower, index) => (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Link to={flower.link} className="fav-flower-card">
                <div className="fav-flower-image">
                  <img src={flower.image} alt={flower.name} loading="lazy" />
                </div>
                <span className="fav-flower-name">{flower.name}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
