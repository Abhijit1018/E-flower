# E-Flower - Premium Florist E-Commerce Platform

## Project Overview
- **Project Name**: E-Flower
- **Type**: Full-stack E-commerce Web Application
- **Core Functionality**: Premium flower shop with gift customization, cart, wishlist, and checkout
- **Target Users**: Customers seeking premium floral arrangements and gifts

## Tech Stack
- **Frontend**: React + Vite + Framer Motion (animations)
- **Styling**: CSS Modules with custom properties
- **Backend**: Node.js + Express
- **Database**: SQLite (simple, file-based)
- **State**: React Context API

## UI/UX Specification

### Color Palette
- **Primary**: `#1A1A1A` (Dark charcoal)
- **Secondary**: `#F5F5F0` (Warm off-white)
- **Accent Gold**: `#C9A962` (Muted gold for coupons/specials)
- **Accent Rose**: `#D4A5A5` (Soft rose for categories)
- **Success**: `#4A7C59` (Sage green)
- **Text Primary**: `#1A1A1A`
- **Text Secondary**: `#6B6B6B`
- **Border**: `#E8E8E3`

### Typography
- **Headings**: 'Cormorant Garamond', serif (elegant, premium)
- **Body**: 'Outfit', sans-serif (clean, modern)
- **Sizes**:
  - H1: 48px, H2: 36px, H3: 24px, H4: 20px
  - Body: 16px, Small: 14px

### Layout
- Max width: 1400px, centered
- Section padding: 80px vertical
- Grid gap: 24px
- Border radius: 12px (cards), 8px (buttons)

## Components

### 1. Header (Fixed)
- Left: Logo "E-FLOWER" in Cormorant Garamond
- Center: Search bar with icon
- Right: Account, Cart (with badge), Wishlist icons
- Top: Promo marquee strip (animates left)

### 2. Hero Banners
- 3-column grid: 2 large hero images + 1 smaller dark card
- Hover: Scale 1.02 with shadow
- Overlay text with "Shop Now" CTA

### 3. Quick Categories
- Horizontal scroll row of circular icons
- Categories: Roses, Lilies, Orchids, Chocolates, Wine, Balloons, Teddy, Cakes
- Hover: Scale 1.1, gold ring

### 4. Featured Products (Bouquets)
- 6 vertical cards in grid
- Card: Image, Name, Price, Add to cart button
- Hover: Lift shadow, quick view icon

### 5. Combination Gifts
- Mixed grid: 3 large + 3 small
- Animation: Staggered fade-in on scroll

### 6. Build-a-Gift
- Interactive gift configurator
- Floating heart shapes with hover effects
- Multiple curated sets display

### 7. Specialty Grids (Hampers, Plants, Jewelry)
- 3 separate product grids
- Subheaders with decorative line

### 8. Holiday Promo
- Full-width themed banner (Valentine's)
- Red/gold color scheme

### 9. Why Us (Community)
- Horizontal carousel with testimonials
- Auto-scroll animation

### 10. Exclusive Offers
- 3 coupon tiles in gold/bronze
- Copy code functionality

### 11. Instagram Feed
- 4x3 grid of square images
- Hover: Overlay with heart icon

### 12. Brand Logos
- Infinite scroll animation (left)

### 13. Footer
- Dark background (#1A1A1A)
- 4 columns: About, Help, Contact, Social
- Payment icons at bottom

## Animations
- **Page load**: Staggered fade-up for sections
- **Scroll**: Elements animate in when visible
- **Hover**: Smooth scale/shadow transitions (0.3s ease)
- **Buttons**: Ripple effect on click
- **Marquee**: Continuous left scroll
- **Carousel**: Smooth auto-scroll

## Functionality

### Backend API Endpoints
- GET /api/products - List all products
- GET /api/products/:id - Get single product
- GET /api/categories - List categories
- GET /api/coupons - List active coupons
- POST /api/cart - Add to cart
- POST /api/wishlist - Add to wishlist

### Frontend Features
- Search products
- Add to cart (persists in localStorage)
- Add to wishlist
- Apply coupon codes
- Filter by category

## Acceptance Criteria
1. All 13 sections render correctly
2. Header is fixed on scroll
3. Hero banners have hover animations
4. Products can be added to cart
5. Cart shows item count badge
6. Coupon codes can be applied
7. Responsive on mobile/tablet
8. Animations are smooth (60fps)