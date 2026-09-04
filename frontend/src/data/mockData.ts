export const CATEGORIES = [
  { id: "rings", name: "RINGS", image: "/images/products/rings/ring_placeholder.jpg" },
  { id: "necklaces", name: "NECKLACES", image: "/images/products/necklaces/necklace_placeholder.jpg" },
  { id: "earrings", name: "EARRINGS", image: "/images/products/earrings/earrings_placeholder.jpg" },
  { id: "bracelets", name: "BRACELETS", image: "/images/products/bracelets/bracelet_placeholder.jpg" },
  { id: "bangles", name: "BANGLES", image: "/images/products/bangles/bangle_placeholder.jpg" },
  { id: "pendants", name: "PENDANTS", image: "/images/products/pendants/pendant_placeholder.jpg" },
];

export const FEATURED_PRODUCTS = [
  {
    id: "prod-1",
    name: "Lumière Solitaire Ring",
    slug: "lumiere-solitaire-ring",
    metal: "18K Rose Gold",
    stone: "Diamond",
    category: "Rings",
    price: 85000,
    originalPrice: 125000,
    discountPercentage: 32,
    rating: 5,
    images: [
      "/images/products/rings/ring_placeholder.jpg",
      "/images/products/pendants/pendant_placeholder.jpg"
    ]
  },
  {
    id: "prod-2",
    name: "Celestial Drop Pendant",
    slug: "celestial-drop-pendant",
    metal: "18K White Gold",
    stone: "Diamond",
    category: "Necklaces",
    price: 42000,
    originalPrice: 55000,
    discountPercentage: 25,
    rating: 5,
    images: [
      "/images/products/necklaces/necklace_placeholder.jpg",
      "/images/products/earrings/earrings_placeholder.jpg"
    ]
  },
  {
    id: "prod-3",
    name: "Radiant Stud Earrings",
    slug: "radiant-stud-earrings",
    metal: "18K Gold",
    stone: "Diamond",
    category: "Earrings",
    price: 35000,
    originalPrice: 45000,
    discountPercentage: 22,
    rating: 5,
    images: [
      "/images/products/earrings/earrings_placeholder.jpg",
      "/images/products/rings/ring_placeholder.jpg"
    ]
  },
  {
    id: "prod-4",
    name: "Eternity Bracelet",
    slug: "eternity-bracelet",
    metal: "18K Rose Gold",
    stone: "Diamond",
    category: "Bracelets",
    price: 95000,
    originalPrice: 110000,
    discountPercentage: 15,
    rating: 5,
    images: [
      "/images/products/bracelets/bracelet_placeholder.jpg",
      "/images/products/bangles/bangle_placeholder.jpg"
    ]
  },
  {
    id: "prod-5",
    name: "Royal Heritage Bangle",
    slug: "royal-heritage-bangle",
    metal: "22K Gold",
    stone: "Uncut Diamonds",
    category: "Bangles",
    price: 135000,
    originalPrice: 160000,
    discountPercentage: 15,
    rating: 5,
    images: [
      "/images/products/bangles/bangle_placeholder.jpg",
      "/images/products/bangles/bangle_placeholder.jpg"
    ]
  },
  {
    id: "prod-6",
    name: "Aura Solitaire Pendant",
    slug: "aura-solitaire-pendant",
    metal: "18K Yellow Gold",
    stone: "Diamond",
    category: "Pendents",
    price: 68000,
    originalPrice: 82000,
    discountPercentage: 17,
    rating: 5,
    images: [
      "/images/products/pendants/pendant_placeholder.jpg",
      "/images/products/pendants/pendant_placeholder.jpg"
    ]
  },
  {
    id: "prod-7",
    name: "Graceful Teardrop Pendant",
    slug: "graceful-teardrop-pendant",
    metal: "18K Rose Gold",
    stone: "Natural Diamonds",
    category: "Necklaces",
    price: 79999,
    originalPrice: 95000,
    discountPercentage: 15,
    rating: 5,
    images: [
      "/images/products/necklaces/necklace_placeholder.jpg",
      "/images/products/necklaces/necklace_placeholder.jpg"
    ]
  },
  {
    id: "prod-8",
    name: "Eternal Bloom Ring",
    slug: "eternal-bloom-ring",
    metal: "18K Yellow Gold",
    stone: "Natural Diamonds",
    category: "Rings",
    price: 84999,
    originalPrice: 105000,
    discountPercentage: 19,
    rating: 5,
    images: [
      "/images/products/rings/ring_placeholder.jpg",
      "/images/products/rings/ring_placeholder.jpg"
    ]
  },
  {
    id: "prod-9",
    name: "Radiant Floral Studs",
    slug: "radiant-floral-studs",
    metal: "18K Yellow Gold",
    stone: "Natural Diamonds",
    category: "Earrings",
    price: 42999,
    originalPrice: 52000,
    discountPercentage: 17,
    rating: 5,
    images: [
      "/images/products/earrings/earrings_placeholder.jpg",
      "/images/products/earrings/earrings_placeholder.jpg"
    ]
  },
  {
    id: "prod-10",
    name: "Sovereign Diamond Cuff",
    slug: "sovereign-diamond-cuff",
    metal: "18K Platinum",
    stone: "Pavé Diamonds",
    category: "Bracelets",
    price: 175000,
    originalPrice: 210000,
    discountPercentage: 16,
    rating: 5,
    images: [
      "/images/products/bracelets/bracelet_placeholder.jpg",
      "/images/products/bracelets/bracelet_placeholder.jpg"
    ]
  }
];

// Validation function as requested to prevent random image assignments
export function validateProductImages(product: any) {
  if (!product || !product.images) return;
  
  const expectedCategory = product.category?.toLowerCase();
  
  product.images.forEach((img: string) => {
    // If the image is a local product image path, validate it matches the category folder
    if (img.startsWith('/images/products/')) {
      const parts = img.split('/');
      const imageCategoryFolder = parts[3]; // ['', 'images', 'products', 'rings', ...]
      
      if (imageCategoryFolder !== expectedCategory && expectedCategory) {
        console.warn(
          `[DEVELOPMENT WARNING] Invalid product image:\n` +
          `Product: ${product.name}\n` +
          `Expected category: ${expectedCategory}\n` +
          `Image folder: ${imageCategoryFolder}\n` +
          `Image path: ${img}`
        );
      }
    }
  });
}

// Validate all mock data on load during development
if (process.env.NODE_ENV === 'development') {
  FEATURED_PRODUCTS.forEach(validateProductImages);
}
