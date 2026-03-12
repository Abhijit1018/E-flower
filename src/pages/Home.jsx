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

  const bouquetProducts = products.filter(p => ['roses', 'lilies', 'orchids', 'tulips', 'sunflowers'].includes(p.category)).slice(0, 8);
  const hamperProducts = products.filter(p => p.category === 'hampers').slice(0, 8);
  const plantProducts = products.filter(p => ['plants', 'succulents', 'terrariums'].includes(p.category)).slice(0, 8);
  const jewelryProducts = products.filter(p => p.category === 'jewelry').slice(0, 8);
  const giftProducts = products.filter(p => ['chocolates', 'wine', 'balloons', 'teddy', 'cakes'].includes(p.category)).slice(0, 8);

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
        <FeaturedProducts products={jewelryProducts} title="Elegant Jewelry Collection" id="jewelry" />
      )}
      
      <Testimonials testimonials={testimonials} />
      <Coupons coupons={coupons} />
      <Instagram images={instagramFeed} />
      <Brands brands={brands} />
    </>
  );
}
