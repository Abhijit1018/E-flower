import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './SuggestionCatalog.css';

export default function SuggestionCatalog({ catalog }) {
  return (
    <section className="suggestion-catalog">
      <div className="container">
        <motion.div
          className="catalog-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Banner */}
          <Link to={catalog.link} className="catalog-banner" style={{ background: catalog.bgGradient }}>
            <div className="banner-image">
              <img src={catalog.bannerImage} alt={catalog.title} />
            </div>
            <div className="banner-text">
              <h3 style={{ color: catalog.accentColor }}>{catalog.title}</h3>
              <p>{catalog.subtitle}</p>
              <span className="banner-arrow" style={{ background: catalog.accentColor }}>
                <FiArrowRight />
              </span>
            </div>
          </Link>

          {/* Right Grid */}
          <div className={`catalog-grid shape-${catalog.shape}`}>
            {catalog.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <Link to={item.link} className="catalog-item">
                  <div className={`catalog-item-image shape-${catalog.shape}`}>
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <span className="catalog-item-name">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
