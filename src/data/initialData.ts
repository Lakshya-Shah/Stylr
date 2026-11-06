import { Product, OutfitLook, PromoCampaign, StoreContent, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'French Linen Camp Collar Shirt',
    slug: 'french-linen-camp-collar-shirt',
    category: 'shirts',
    categoryName: 'Shirts',
    price: 2490,
    originalPrice: 3290,
    colors: [
      { name: 'Sand Dune', hex: '#D6C8B4' },
      { name: 'Olive Drab', hex: '#585949' },
      { name: 'Crisp White', hex: '#F9F8F6' }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 8 },
      { size: 'M', inStock: true, stockCount: 14 },
      { size: 'L', inStock: true, stockCount: 12 },
      { size: 'XL', inStock: true, stockCount: 6 },
      { size: 'XXL', inStock: false, stockCount: 0 }
    ],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Cut from premium 100% French flax linen, this relaxed camp-collar shirt is garment-washed for an effortless drape and lived-in softness. Featuring mother-of-pearl buttons and a straight hem with side vents.',
    fabric: '100% French Flax Linen (165 GSM)',
    fit: 'Relaxed contemporary cut with dropped shoulder seam',
    care: 'Machine wash cold on gentle cycle. Hang dry in shade. Warm iron if desired.',
    modelMeasurements: 'Model is 6\'1" (185cm), chest 39", wearing size M',
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    collectionSlug: 'summer-linen',
    collectionName: 'The Linen Series',
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      {
        id: 'rev-1',
        author: 'Aarav Patel',
        rating: 5,
        date: 'October 14, 2026',
        title: 'Outstanding fabric and luxury drape',
        comment: 'The linen quality is comparable to top international menswear labels. Breathable in humid weather and fits impeccably.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Rohan Mehta',
        rating: 5,
        date: 'October 28, 2026',
        title: 'Perfect cut for smart casual',
        comment: 'Wore this with the pleated ecru trousers to a dinner in Surat. Received countless compliments. Clean stitching and buttons.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Double-Pleated Wide Leg Trouser',
    slug: 'double-pleated-wide-leg-trouser',
    category: 'trousers',
    categoryName: 'Trousers',
    price: 3190,
    originalPrice: 4290,
    colors: [
      { name: 'Espresso', hex: '#35251E' },
      { name: 'Warm Charcoal', hex: '#2A2928' },
      { name: 'Stone Grey', hex: '#9C968B' }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 5 },
      { size: 'M', inStock: true, stockCount: 11 },
      { size: 'L', inStock: true, stockCount: 9 },
      { size: 'XL', inStock: true, stockCount: 4 },
      { size: 'XXL', inStock: true, stockCount: 2 }
    ],
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'An architectural silhouette crafted from a fluid wool-cotton blend. Features refined double reverse pleats, extended tab waistband with internal horn button, and a clean break at the ankle.',
    fabric: '65% Cotton, 35% Merino Wool Twill',
    fit: 'High-rise with relaxed thigh and gentle taper toward the cuff',
    care: 'Dry clean recommended or gentle cold hand wash. Lay flat to dry.',
    modelMeasurements: 'Model is 6\'2" (188cm), waist 31", wearing size M',
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    collectionSlug: 'tailored-classics',
    collectionName: 'Tailored Classics',
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: 'prod-3',
    name: 'Waffle-Knit Resort Co-ord Set',
    slug: 'waffle-knit-resort-coord-set',
    category: 'coords',
    categoryName: 'Co-ords',
    price: 3890,
    originalPrice: 4990,
    colors: [
      { name: 'Raw Ivory', hex: '#F0ECE1' },
      { name: 'Terracotta Clay', hex: '#8C5A46' },
      { name: 'Deep Sage', hex: '#4B5548' }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 7 },
      { size: 'M', inStock: true, stockCount: 16 },
      { size: 'L', inStock: true, stockCount: 10 },
      { size: 'XL', inStock: true, stockCount: 5 },
      { size: 'XXL', inStock: false, stockCount: 0 }
    ],
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'The ultimate elevated weekend uniform. A matching two-piece set including an open-collar short-sleeve shirt and relaxed drawstring shorts with deep slant pockets. Woven in breathable micro waffle cotton.',
    fabric: '100% Organic Waffle Weave Cotton (220 GSM)',
    fit: 'Relaxed leisure silhouette with elasticated waistband and cotton drawstring',
    care: 'Machine wash delicate at 30°C. Reshape while damp.',
    modelMeasurements: 'Model is 6\'0" (183cm), chest 38", wearing size M',
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    collectionSlug: 'resort-coords',
    collectionName: 'The Resort Series',
    rating: 4.9,
    reviewCount: 19
  },
  {
    id: 'prod-4',
    name: 'Heavyweight Supima Boxy Tee',
    slug: 'heavyweight-supima-boxy-tee',
    category: 't-shirts',
    categoryName: 'T-Shirts',
    price: 1490,
    originalPrice: 1990,
    colors: [
      { name: 'Off-White', hex: '#F5F3ED' },
      { name: 'Washed Ash', hex: '#4F4E4C' },
      { name: 'Rich Espresso', hex: '#31251E' }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 12 },
      { size: 'M', inStock: true, stockCount: 25 },
      { size: 'L', inStock: true, stockCount: 20 },
      { size: 'XL', inStock: true, stockCount: 15 },
      { size: 'XXL', inStock: true, stockCount: 8 }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Engineered with 280 GSM long-staple Supima cotton for structural durability without stiffness. Features a tight 1-inch rib collar that never sags, blind-stitched cuffs, and a slightly cropped boxy silhouette.',
    fabric: '100% Long-Staple Supima Cotton (280 GSM)',
    fit: 'Boxy drop-shoulder cut with structured body',
    care: 'Cold wash inside out. Tumble dry low or dry flat.',
    modelMeasurements: 'Model is 5\'11" (180cm), chest 40", wearing size L',
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    collectionSlug: 'essentials',
    collectionName: 'Modern Essentials',
    rating: 4.9,
    reviewCount: 62
  },
  {
    id: 'prod-5',
    name: 'Textured Cotton Chore Overshirt',
    slug: 'textured-cotton-chore-overshirt',
    category: 'smart-casuals',
    categoryName: 'Smart Casuals',
    price: 3690,
    originalPrice: 4790,
    colors: [
      { name: 'Tobacco Tan', hex: '#875C36' },
      { name: 'Midnight Navy', hex: '#1C2536' },
      { name: 'Ecru', hex: '#EAE5D9' }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 4 },
      { size: 'M', inStock: true, stockCount: 9 },
      { size: 'L', inStock: true, stockCount: 8 },
      { size: 'XL', inStock: true, stockCount: 3 },
      { size: 'XXL', inStock: false, stockCount: 0 }
    ],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A versatile transitional layer made with substantial herringbone cotton weave. Styled with three patch utility pockets, corozo nut buttons, and clean reinforcement at all stress points.',
    fabric: '100% Cotton Herringbone Weave (320 GSM)',
    fit: 'Regular workwear-inspired overshirt cut designed to layer over t-shirts and knitwear',
    care: 'Machine wash cold. Line dry in shade.',
    modelMeasurements: 'Model is 6\'1" (185cm), chest 39", wearing size M',
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    collectionSlug: 'tailored-classics',
    collectionName: 'Tailored Classics',
    rating: 4.7,
    reviewCount: 15
  },
  {
    id: 'prod-6',
    name: 'Straight-Leg Japanese Selvedge Denim',
    slug: 'straight-leg-japanese-selvedge-denim',
    category: 'jeans',
    categoryName: 'Jeans',
    price: 3990,
    originalPrice: 5290,
    colors: [
      { name: 'Raw Indigo', hex: '#1A2A40' },
      { name: 'Washed Charcoal', hex: '#3B3B3B' }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 6 },
      { size: 'M', inStock: true, stockCount: 14 },
      { size: 'L', inStock: true, stockCount: 11 },
      { size: 'XL', inStock: true, stockCount: 5 },
      { size: 'XXL', inStock: true, stockCount: 2 }
    ],
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Woven on vintage shuttle looms using 13.5 oz ring-spun cotton. Features a red-line selvedge ID, custom matte silver hardware, copper rivets, and a classic mid-rise straight leg silhouette.',
    fabric: '100% Selvedge Cotton (13.5 oz)',
    fit: 'Classic straight cut with moderate room through the hip and leg',
    care: 'Wash inside-out in cold water every 15-20 wears to preserve authentic fades.',
    modelMeasurements: 'Model is 6\'2" (188cm), waist 32", wearing size L',
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: false,
    collectionSlug: 'essentials',
    collectionName: 'Modern Essentials',
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'prod-7',
    name: 'Textured Knit Johnny Collar Polo',
    slug: 'textured-knit-johnny-collar-polo',
    category: 'casual-wear',
    categoryName: 'Casual Wear',
    price: 2790,
    originalPrice: 3590,
    colors: [
      { name: 'Oatmeal Heather', hex: '#DED5C8' },
      { name: 'Forest Moss', hex: '#3B4D3C' },
      { name: 'Espresso', hex: '#35251E' }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 8 },
      { size: 'M', inStock: true, stockCount: 13 },
      { size: 'L', inStock: true, stockCount: 9 },
      { size: 'XL', inStock: true, stockCount: 4 },
      { size: 'XXL', inStock: false, stockCount: 0 }
    ],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Inspired by retro Mediterranean leisurewear, this seamless knit polo features a relaxed open Johnny collar, geometric knit texture across the chest, and ribbed hems for a tapered look.',
    fabric: '70% Combed Cotton, 30% Silk-Touch Modal',
    fit: 'Clean tailored slim-straight fit',
    care: 'Hand wash cold or dry clean. Do not wring or hang wet.',
    modelMeasurements: 'Model is 6\'0" (183cm), chest 39", wearing size M',
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    collectionSlug: 'resort-coords',
    collectionName: 'The Resort Series',
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 'prod-8',
    name: 'Unstructured Linen-Cotton Blazer',
    slug: 'unstructured-linen-cotton-blazer',
    category: 'smart-casuals',
    categoryName: 'Smart Casuals',
    price: 5490,
    originalPrice: 6990,
    colors: [
      { name: 'Sand Taupe', hex: '#BFB5A5' },
      { name: 'Deep Navy', hex: '#1C2638' }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 3 },
      { size: 'M', inStock: true, stockCount: 8 },
      { size: 'L', inStock: true, stockCount: 6 },
      { size: 'XL', inStock: true, stockCount: 2 },
      { size: 'XXL', inStock: false, stockCount: 0 }
    ],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Crafted without canvas or shoulder pads for lightweight natural movement. Features patch pockets, double rear vents, and unlined interior with bound seams for maximum breathability.',
    fabric: '55% French Linen, 45% Organic Cotton',
    fit: 'Softly tailored modern profile with natural shoulder line',
    care: 'Professional dry clean only.',
    modelMeasurements: 'Model is 6\'1" (185cm), chest 40", wearing size L',
    isNewArrival: false,
    isBestSeller: false,
    isFeatured: true,
    collectionSlug: 'tailored-classics',
    collectionName: 'Tailored Classics',
    rating: 4.9,
    reviewCount: 16
  }
];

export const CATEGORIES_LIST = [
  {
    id: 'shirts',
    name: 'Shirts',
    slug: 'shirts',
    description: 'Camp collars, overshirts, and crisp poplin silhouettes.',
    itemCount: 18,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 't-shirts',
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Heavyweight boxy cuts, Supima basics, and fine gauge tees.',
    itemCount: 14,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'trousers',
    name: 'Trousers',
    slug: 'trousers',
    description: 'Architectural pleats, fluid wool blends, and relaxed chinos.',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'coords',
    name: 'Co-ords',
    slug: 'coords',
    description: 'Harmonious two-piece ensembles for effortless elegance.',
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'jeans',
    name: 'Jeans & Denim',
    slug: 'jeans',
    description: 'Japanese selvedge, raw indigo, and timeless straight cuts.',
    itemCount: 9,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'smart-casuals',
    name: 'Smart Casuals',
    slug: 'smart-casuals',
    description: 'Chore jackets, unstructured blazers, and elevated layers.',
    itemCount: 11,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=85'
  }
];

export const OUTFIT_LOOKS: OutfitLook[] = [
  {
    id: 'look-1',
    title: 'The Architectural Linen Fit',
    subtitle: 'Relaxed Tailoring for Elevated Days',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1200&q=85',
    description: 'A breathable pairing of our French Linen Camp Shirt in Sand Dune with the Double-Pleated Trouser in Espresso. Clean lines with effortless ease.',
    productIds: ['prod-1', 'prod-2']
  },
  {
    id: 'look-2',
    title: 'The Contemporary Minimalist',
    subtitle: 'Refined Everyday Uniform',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    description: 'Combining our Supima Boxy Tee with the Textured Cotton Chore Overshirt and Japanese Selvedge Denim for structural balance.',
    productIds: ['prod-4', 'prod-5', 'prod-6']
  },
  {
    id: 'look-3',
    title: 'Riviera Leisure Set',
    subtitle: 'Waffle-Knit Monochrome',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=85',
    description: 'A breezy monochrome ensemble designed for balmy evenings and resort lounging.',
    productIds: ['prod-3', 'prod-7']
  }
];

export const INITIAL_CAMPAIGNS: PromoCampaign[] = [
  {
    id: 'camp-1',
    code: 'STYLR10',
    title: 'Welcome to STYLR',
    description: 'Enjoy 10% off your inaugural order with Pan-India delivery.',
    type: 'percentage',
    value: 10,
    minSpend: 1999,
    isActive: true,
    bannerText: 'Use code STYLR10 for 10% off your first order over ₹1,999'
  },
  {
    id: 'camp-2',
    code: 'BUY2GET1',
    title: 'Curated Wardrobe: Buy 2 Get 1 Free',
    description: 'Add 3 select items to your bag and get the lowest value piece complimentary.',
    type: 'buy2get1',
    value: 100,
    isActive: true,
    bannerText: 'Limited Edit: Buy 2 Get 1 Free across select contemporary pieces with code BUY2GET1'
  },
  {
    id: 'camp-3',
    code: 'PANINDIA',
    title: 'Complimentary Express Shipping',
    description: 'Free expedited delivery on all orders above ₹2,499 across all Indian PIN codes.',
    type: 'fixed',
    value: 150,
    minSpend: 2499,
    isActive: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8921',
    orderNumber: 'STYLR-IN-8921',
    createdAt: '2026-11-04T14:32:00Z',
    items: [
      {
        productId: 'prod-1',
        name: 'French Linen Camp Collar Shirt',
        price: 2490,
        size: 'M',
        color: 'Sand Dune',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=85'
      },
      {
        productId: 'prod-2',
        name: 'Double-Pleated Wide Leg Trouser',
        price: 3190,
        size: 'M',
        color: 'Espresso',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=600&q=85'
      }
    ],
    shippingAddress: {
      fullName: 'Vikramaditya Singhania',
      phone: '9825123456',
      email: 'vikram.singhania@gmail.com',
      addressLine1: 'B-702, Florenza Residency, VIP Road',
      addressLine2: 'Near Vesu Canal Corridor',
      city: 'Surat',
      state: 'Gujarat',
      pincode: '395007'
    },
    subtotal: 5680,
    discount: 568,
    shippingFee: 0,
    total: 5112,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Dispatched',
    trackingNumber: 'DTDC-SRT-948271',
    estimatedDelivery: 'November 8, 2026'
  },
  {
    id: 'ord-8919',
    orderNumber: 'STYLR-IN-8919',
    createdAt: '2026-11-03T11:15:00Z',
    items: [
      {
        productId: 'prod-3',
        name: 'Waffle-Knit Resort Co-ord Set',
        price: 3890,
        size: 'L',
        color: 'Raw Ivory',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=85'
      }
    ],
    shippingAddress: {
      fullName: 'Karan Shah',
      phone: '9909988776',
      email: 'karan.shah@outlook.com',
      addressLine1: '42, Alkapuri Society',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015'
    },
    subtotal: 3890,
    discount: 0,
    shippingFee: 0,
    total: 3890,
    paymentMethod: 'Razorpay',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    trackingNumber: 'BLUEDART-AHM-182903',
    estimatedDelivery: 'Delivered on Nov 5, 2026'
  }
];

export const INITIAL_STORE_CONTENT: StoreContent = {
  announcementBar: {
    enabled: true,
    text: 'PAN-INDIA SHIPPING | VESU, SURAT FLAGSHIP NOW OPEN | COMPLIMENTARY EXPRESS SHIPPING OVER ₹2,499',
    linkUrl: '/shop'
  },
  hero: {
    headline: 'STYLE THAT SPEAKS.',
    subheadline: 'DEFINED BY STYLE. MADE FOR YOU.',
    description: 'Discover a refined collection of contemporary menswear designed for effortless living. Impeccable tailoring, breathable natural textiles, and understated luxury.',
    primaryButtonText: 'EXPLORE COLLECTION',
    primaryButtonLink: '/shop',
    secondaryButtonText: 'NEW ARRIVALS',
    secondaryButtonLink: '/category/shirts',
    bannerImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=88'
  },
  brandStory: {
    tagline: 'EVERYDAY STYLE. ELEVATED.',
    title: 'MORE THAN JUST CLOTHING.',
    paragraph1: 'At STYLR, we believe personal style is a reflection of individuality. Born in the vibrant textile capital of Surat, Gujarat, our collections bring together contemporary silhouettes, tactile natural fabrics, and uncompromising craftsmanship.',
    paragraph2: 'We reject the disposable nature of fast fashion in favor of considered, versatile pieces that transition seamlessly from workday meetings to coastal weekends. Every seam, cut, and texture is calibrated to make you feel confident and effortlessly refined.',
    locationNote: 'Designed with precision. Flagship studio in Vesu, Surat. Delivering across India.',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1200&q=85'
  },
  contact: {
    storeName: 'STYLR Men\'s Clothing',
    address: 'Shop 14-16, Ground Floor, Royal Arc Complex, VIP Road',
    locality: 'Vesu',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395007',
    whatsappNumber: '+919876543210',
    displayPhone: '+91 98765 43210',
    email: 'concierge@stylr.in',
    instagramHandle: '@stylrmensclothing',
    hours: 'Monday – Sunday: 11:00 AM – 9:30 PM IST'
  },
  promotionalBanner: {
    enabled: true,
    title: 'THE REFINED CASUAL EDIT',
    subtitle: 'Buy 2, Receive 1 Complimentary with Code BUY2GET1',
    ctaText: 'DISCOVER CAMPAIGN',
    ctaLink: '/shop?collection=resort-coords',
    badge: 'LIMITED EDITION CAMPAIGN',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1600&q=85'
  }
};
