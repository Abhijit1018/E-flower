import './Brands.css';

export default function Brands({ brands }) {
  return (
    <section className="brands">
      <div className="brands-track">
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <div key={index} className="brand-item">
            <span className="brand-text">{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
