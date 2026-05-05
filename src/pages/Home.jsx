import { heroBanners, combinationGifts, buildGiftSets, testimonials, instagramFeed, brands, suggestionCatalogs, favFlowers } from '../data/data';
import { useProducts, useCategories, useCoupons } from '../hooks/useApi';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import CombinationGifts from '../components/CombinationGifts';
import BuildGift from '../components/BuildGift';
import SpecialtyGrids from '../components/SpecialtyGrids';
import HolidayPromo from '../components/HolidayPromo';
import Testimonials from '../components/Testimonials';
import Coupons from '../components/Coupons';
import Instagram from '../components/Instagram';
import Brands from '../components/Brands';
import SuggestionCatalog from '../components/SuggestionCatalog';
import FavFlowers from '../components/FavFlowers';

export default function Home() {
  const { products, loading } = useProducts();
  const categories = useCategories();
  const coupons = useCoupons();

  // helper: ensure section arrays have enough items and avoid odd grid rows
  const makeSection = (seedCats = [], desired = 8, productsList = products, minPerRow = 4) => {
    const base = productsList.filter(p => seedCats.includes(p.category));
    const taken = new Set(base.map(p => p.id));
    const filler = productsList.filter(p => !taken.has(p.id));
    const result = [...base];
    let fi = 0;
    while (result.length < Math.min(desired, productsList.length) && fi < filler.length) {
      result.push(filler[fi++]);
    }
    // ensure not ending with an odd row: pad to multiple of minPerRow if possible
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

  const bouquetProducts = makeSection(['roses', 'lilies', 'orchids', 'tulips', 'sunflowers'], 8);
  const hamperProducts = makeSection(['hampers', 'congratulations', 'getwellsoon', 'arrangements'], 8);
  const plantProducts = makeSection(['plants', 'succulents', 'terrariums', 'dried', 'indoor'], 8);
  const jewelryProducts = makeSection(['jewelry', 'wedding', 'sympathy', 'premium'], 8);
  const giftProducts = makeSection(['chocolates', 'wine', 'balloons', 'teddy', 'cakes', 'love', 'friendship', 'birthday', 'anniversary', 'accessories'], 8);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', paddingTop: '130px' }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', color: '#1A1A1A' }}>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Hero banners={heroBanners} />
      <Categories categories={categories} />
      
      {/* Summer Suggestion Catalog */}
      <SuggestionCatalog catalog={suggestionCatalogs[0]} />

      {bouquetProducts.length > 0 && (
        <FeaturedProducts products={bouquetProducts} title="Fresh Flowers & Bouquets" id="bouquets" />
      )}
      
      {/* Celebrate Love Suggestion Catalog */}
      <SuggestionCatalog catalog={suggestionCatalogs[1]} />

      <CombinationGifts gifts={combinationGifts} />
      
      {/* Pick Their Fav Flowers */}
      <FavFlowers flowers={favFlowers} />

      <BuildGift sets={buildGiftSets} />
      
      {giftProducts.length > 0 && (
        <FeaturedProducts products={giftProducts} title="Perfect Gifts for Every Occasion" id="gifts" />
      )}
      
      <SpecialtyGrids products={products} />
      <HolidayPromo />
      
      {plantProducts.length > 0 && (
        <FeaturedProducts products={plantProducts} title="Indoor Plants & Decor" id="plants" />
      )}
      
      {jewelryProducts.length > 0 && (
        <FeaturedProducts products={jewelryProducts} title="Wedding & Premium Collection" id="jewelry" />
      )}
      
      <Testimonials testimonials={testimonials} />
      <Coupons coupons={coupons} />
      <Instagram images={instagramFeed} />
      <Brands brands={brands} />
    </>
  );
}
