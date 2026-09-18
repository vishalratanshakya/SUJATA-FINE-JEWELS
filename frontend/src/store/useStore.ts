import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FEATURED_PRODUCTS } from '@/data/mockData';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CategoryItem = {
  id: string;
  name: string;
  code: string;
  slug: string;
  description?: string;
  image?: string;
  itemCount: number;
  active: boolean;
};

export type Collection = {

  id: string;
  name: string;
  tagline?: string;
  description?: string;
  image?: string;
  productsCount?: number;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  metal: string;
  stone: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating?: number;
  images: string[];
  primaryImage?: string;
  hoverImage?: string;
  galleryImages?: string[];
  isSignatureCarousel?: boolean;
  isBestSeller?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  inStock?: boolean;
  stock?: number;
  occasions?: string[];
  availableSizes?: string[];
  sizeStock?: Record<string, number>;
  necklaceLength?: string[];
  earringType?: string;
  earringPairType?: string;
  pendantOptions?: string[];
  productDetails?: string;
  diamondInfo?: string;
  shippingReturns?: string;
  careInstructions?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedVariant?: string;
  selectedLength?: string;
};


export type HeroBanner = {
  id: number;
  eyebrow: string;
  heading: string;
  description: string;
  cta: string;
  ctaUrl: string;
  image: string;
  active: boolean;
};

export type AnnouncementBar = {
  message: string;
  linkText: string;
  linkUrl: string;
  bgColor: string;
  textColor: string;
  active: boolean;
};

export type Coupon = {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;           // % or ₹ depending on type
  minOrderAmount: number;
  expiryDate: string;      // ISO date string
  active: boolean;
  usageLimit: number;
  usageCount: number;
};

export type Occasion = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  trackingNumber?: string;
  trackingId?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  status: 'active' | 'inactive';
};

export type Certificate = {
  id: string;
  certificateNumber: string;
  productName: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  goldPurity: string;
  diamondCarat: string;
  gemstoneDetails?: string;
  issueDate: string;
  certifiedBy: string;
};

export type StoreSettings = {
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  flagshipAddress: string;
  gstNumber: string;
  freeShippingThreshold: number;
  currencySymbol: string;
  instagramUrl: string;
  facebookUrl: string;
  pinterestUrl: string;
};

export type DealItem = {
  id: string;
  title?: string;
  subtitle?: string;
  productName?: string;
  productId?: string;
  dealPrice: number;
  originalPrice?: number;
  discountBadge?: string;
  expiryHours?: number;
  timerHHMMSS?: string;
  image?: string;
  active: boolean;
};

export type Experience3DItem = {
  id: string;
  title: string;
  subtitle?: string;
  productName?: string;
  gltfUrl?: string;
  defaultMetal?: "gold" | "rose" | "white";
  modelUrl?: string;
  posterImage?: string;
  active: boolean;
};

export type AiStylistItem = {
  id: string;
  title?: string;
  heading?: string;
  description: string;
  badge?: string;
  ctaText?: string;
  buttonText?: string;
  quizUrl?: string;
  image?: string;
  active: boolean;
};

export type JournalArticleItem = {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  category?: string;
  image: string;
  date: string;
  author?: string;
  content?: string;
  linkUrl?: string;
  active: boolean;
};

export type CommunityPostItem = {
  id: string;
  username?: string;
  handle: string;
  userAvatar?: string;
  location?: string;
  image: string;
  caption: string;
  likes?: number;
  productTagged?: string;
  active: boolean;
};

export type ProductAccordionItem = {
  id: string;
  title: string;
  content: string;
  positionOrder: number;
  active: boolean;
};

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_HERO_BANNERS: HeroBanner[] = [
  {
    id: 1,
    eyebrow: 'TIMELESS ELEGANCE',
    heading: 'Crafted for Your Forever Moments',
    description: "Exquisite jewellery, handcrafted with passion, designed to celebrate life's most precious moments.",
    cta: 'Explore Collection',
    ctaUrl: '/shop/collections/timeless',
    image: '/images/products/rings/ring_placeholder.jpg',
    active: true,
  },
  {
    id: 2,
    eyebrow: 'THE ART OF CRAFTSMANSHIP',
    heading: 'Where Heritage Meets Brilliance',
    description: 'Every piece tells a story of generations of master artisans perfecting their craft.',
    cta: 'Discover Our Story',
    ctaUrl: '/about',
    image: '/images/products/necklaces/necklace_placeholder.jpg',
    active: true,
  },
  {
    id: 3,
    eyebrow: 'NEW COLLECTION',
    heading: 'Designed to Be Remembered',
    description: 'Discover our latest arrivals featuring modern silhouettes and classic elegance.',
    cta: 'Shop New Arrivals',
    ctaUrl: '/new-arrivals',
    image: '/images/products/earrings/earrings_placeholder.jpg',
    active: true,
  },
  {
    id: 4,
    eyebrow: 'DIAMOND STORIES',
    heading: 'A Brilliance That Lasts Forever',
    description: 'Ethically sourced, masterfully cut diamonds that capture the light and your heart.',
    cta: 'Shop Diamonds',
    ctaUrl: '/shop/diamond',
    image: '/images/products/bracelets/bracelet_placeholder.jpg',
    active: true,
  },
  {
    id: 5,
    eyebrow: 'SIGNATURE JEWELS',
    heading: 'Made for Your Most Precious Moments',
    description: 'The Sujata Signature Collection. Iconic designs for the modern visionary.',
    cta: 'View Signature Collection',
    ctaUrl: '/collections/signature',
    image: '/images/products/pendants/pendant_placeholder.jpg',
    active: true,
  },
];

const DEFAULT_ANNOUNCEMENT_BAR: AnnouncementBar = {
  message: '✨ Free shipping on orders above ₹50,000 — Use code FREESHIP',
  linkText: 'Shop Now',
  linkUrl: '/shop',
  bgColor: '#1a1a1a',
  textColor: '#d4af7a',
  active: false,
};

const DEFAULT_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderAmount: 10000,
    expiryDate: '2026-12-31',
    active: true,
    usageLimit: 100,
    usageCount: 12,
  },
  {
    id: 'coup-2',
    code: 'FLAT5000',
    type: 'fixed',
    value: 5000,
    minOrderAmount: 50000,
    expiryDate: '2026-11-30',
    active: true,
    usageLimit: 50,
    usageCount: 3,
  },
];

const DEFAULT_OCCASIONS: Occasion[] = [
  {
    id: "wedding",
    name: "Wedding Bliss",
    description: "Bridal sets, mangalsutras, and statement pieces for your special day.",
    image: "/images/products/necklaces/necklace_placeholder.jpg"
  },
  {
    id: "office",
    name: "Office Elegance",
    description: "Subtle, lightweight jewelry perfect for professional settings.",
    image: "/images/products/earrings/earrings_placeholder.jpg"
  },
  {
    id: "festive",
    name: "Festive Glamour",
    description: "Traditional and contemporary pieces to celebrate in style.",
    image: "/images/products/bangles/bangle_placeholder.jpg"
  },
  {
    id: "everyday",
    name: "Daily Radiance",
    description: "Comfortable, durable classics for everyday wear.",
    image: "/images/products/rings/ring_placeholder.jpg"
  }
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'SJ-88901',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    customerPhone: '+91 98765 43210',
    items: [
      { product: FEATURED_PRODUCTS[0], quantity: 1 },
      { product: FEATURED_PRODUCTS[2], quantity: 1 }
    ],
    totalAmount: 147000,
    status: 'delivered',
    shippingAddress: '42 Marine Drive, Flat 8A, Mumbai, Maharashtra 400020',
    paymentMethod: 'Razorpay Online',
    paymentStatus: 'paid',
    trackingId: 'BLUEDART-882193',
    createdAt: '2026-09-01T14:32:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'SJ-88902',
    customerName: 'Ananya Verma',
    customerEmail: 'ananya.v@example.com',
    customerPhone: '+91 98112 33445',
    items: [
      { product: FEATURED_PRODUCTS[1], quantity: 1 }
    ],
    totalAmount: 185000,
    status: 'processing',
    shippingAddress: '15 Jubilee Hills, Road No 36, Hyderabad, Telangana 500033',
    paymentMethod: 'Credit Card (Razorpay)',
    paymentStatus: 'paid',
    createdAt: '2026-09-06T10:15:00Z'
  },
  {
    id: 'ord-1003',
    orderNumber: 'SJ-88903',
    customerName: 'Rohan Mehta',
    customerEmail: 'rohan.mehta@example.com',
    customerPhone: '+91 99201 88765',
    items: [
      { product: FEATURED_PRODUCTS[3], quantity: 1 }
    ],
    totalAmount: 92000,
    status: 'pending',
    shippingAddress: '78 MG Road, Indiranagar, Bengaluru, Karnataka 560038',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'pending',
    createdAt: '2026-09-08T09:20:00Z'
  }
];

const DEFAULT_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    totalOrders: 3,
    totalSpent: 345000,
    joinedDate: '2026-01-15',
    status: 'active',
  },
  {
    id: 'cust-2',
    name: 'Ananya Verma',
    email: 'ananya.v@example.com',
    phone: '+91 98112 33445',
    totalOrders: 1,
    totalSpent: 185000,
    joinedDate: '2026-03-20',
    status: 'active',
  },
  {
    id: 'cust-3',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 99201 88765',
    totalOrders: 1,
    totalSpent: 92000,
    joinedDate: '2026-05-10',
    status: 'active',
  }
];

const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    certificateNumber: 'SGL-2026-8801',
    productName: 'Royal Solitaire Diamond Ring',
    productId: 'ring-1',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    goldPurity: '18K Yellow Gold (750)',
    diamondCarat: '1.25 Carat (VVS1, E Color)',
    gemstoneDetails: 'Natural Earth-Mined Diamond',
    issueDate: '2026-09-01',
    certifiedBy: 'Solitaire Gemological Laboratories (SGL)'
  },
  {
    id: 'cert-2',
    certificateNumber: 'IGI-2026-9902',
    productName: 'Regal Emerald Cut Pendant',
    productId: 'pendant-1',
    customerName: 'Ananya Verma',
    customerEmail: 'ananya.v@example.com',
    goldPurity: '18K White Gold (750)',
    diamondCarat: '0.85 Carat (VS1, F Color)',
    gemstoneDetails: 'Zambian Emerald 2.10 Ct',
    issueDate: '2026-09-06',
    certifiedBy: 'International Gemological Institute (IGI)'
  }
];

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: 'bridal',
    name: 'Bridal Heritage Collection',
    tagline: 'Regal bridal sets for unforgettable celebrations',
    description: 'Handcrafted bridal jewellery celebrating timeless Indian traditions.',
    image: '/images/products/necklaces/necklace_placeholder.jpg',
    productsCount: 12
  },
  {
    id: 'solitaire',
    name: 'Royal Solitaire Line',
    tagline: 'Certified earth-mined solitaires',
    description: 'Precision cut diamonds with GIA and IGI certificates.',
    image: '/images/products/rings/ring_placeholder.jpg',
    productsCount: 18
  }
];

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: "cat-1", name: "Rings", code: "RNG", slug: "rings", itemCount: 42, active: true, image: "/images/products/rings/ring_placeholder.jpg" },
  { id: "cat-2", name: "Necklaces", code: "NCK", slug: "necklaces", itemCount: 28, active: true, image: "/images/products/necklaces/necklace_placeholder.jpg" },
  { id: "cat-3", name: "Earrings", code: "ERG", slug: "earrings", itemCount: 35, active: true, image: "/images/products/earrings/earrings_placeholder.jpg" },
  { id: "cat-4", name: "Bracelets", code: "BRC", slug: "bracelets", itemCount: 19, active: true, image: "/images/products/bracelets/bracelet_placeholder.jpg" },
  { id: "cat-5", name: "Bangles", code: "BNG", slug: "bangles", itemCount: 15, active: true, image: "/images/products/bangles/bangle_placeholder.jpg" },
  { id: "cat-6", name: "Pendants", code: "PND", slug: "pendants", itemCount: 22, active: true, image: "/images/products/pendants/pendant_placeholder.jpg" },
];

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'SUJATA FINE JEWELS',
  contactEmail: 'concierge@sujatafinejewels.com',
  contactPhone: '+91 22 6789 0000',
  flagshipAddress: 'Sujata Fine Jewels Atelier, Bandra West, Mumbai, Maharashtra 400050',
  gstNumber: '27AAAAA0000A1Z5',
  freeShippingThreshold: 50000,
  currencySymbol: '₹',
  instagramUrl: 'https://instagram.com/sujatafinejewels',
  facebookUrl: 'https://facebook.com/sujatafinejewels',
  pinterestUrl: 'https://pinterest.com/sujatafinejewels'
};

// ─── Store Interface ───────────────────────────────────────────────────────────

interface StoreState {
  // Categories State
  categories: CategoryItem[];
  addCategory: (category: Omit<CategoryItem, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;

  // Collections State
  collections: Collection[];


  addCollection: (collection: Collection) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;

  // Admin Product State
  products: Product[];
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;


  // Orders State
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingId?: string) => void;

  // Customers State
  customers: Customer[];

  // Certificates State
  certificates: Certificate[];
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  deleteCertificate: (id: string) => void;

  // Store Settings
  storeSettings: StoreSettings;
  updateStoreSettings: (updates: Partial<StoreSettings>) => void;

  // Hero Banners
  heroBanners: HeroBanner[];
  updateHeroBanner: (id: number, updates: Partial<HeroBanner>) => void;
  reorderHeroBanners: (banners: HeroBanner[]) => void;

  // Announcement Bar
  announcementBar: AnnouncementBar;
  updateAnnouncementBar: (updates: Partial<AnnouncementBar>) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  validateCoupon: (code: string, orderAmount: number) => Coupon | null;

  // Occasions
  occasions: Occasion[];
  updateOccasion: (id: string, updates: Partial<Occasion>) => void;
  addOccasion: (occasion: Occasion) => void;
  deleteOccasion: (id: string) => void;

  // Cart State
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: { selectedSize?: string; selectedLength?: string; selectedVariant?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCart: (cart: CartItem[]) => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist State
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
  clearWishlist: () => void;
  setWishlist: (wishlist: Product[]) => void;

  // Section State Items
  deals: DealItem[];
  addDeal: (deal: Omit<DealItem, 'id'>) => void;
  updateDeal: (id: string, updates: Partial<DealItem>) => void;
  deleteDeal: (id: string) => void;

  experiences3D: Experience3DItem[];
  addExperience3D: (exp: Omit<Experience3DItem, 'id'>) => void;
  updateExperience3D: (id: string, updates: Partial<Experience3DItem>) => void;
  deleteExperience3D: (id: string) => void;

  aiStylistItems: AiStylistItem[];
  addAiStylist: (item: Omit<AiStylistItem, 'id'>) => void;
  updateAiStylist: (id: string, updates: Partial<AiStylistItem>) => void;
  deleteAiStylist: (id: string) => void;

  journalArticles: JournalArticleItem[];
  addJournalArticle: (article: Omit<JournalArticleItem, 'id'>) => void;
  updateJournalArticle: (id: string, updates: Partial<JournalArticleItem>) => void;
  deleteJournalArticle: (id: string) => void;

  communityPosts: CommunityPostItem[];
  addCommunityPost: (post: Omit<CommunityPostItem, 'id'>) => void;
  updateCommunityPost: (id: string, updates: Partial<CommunityPostItem>) => void;
  deleteCommunityPost: (id: string) => void;

  productAccordions: ProductAccordionItem[];
  addProductAccordion: (acc: Omit<ProductAccordionItem, 'id'>) => void;
  updateProductAccordion: (id: string, updates: Partial<ProductAccordionItem>) => void;
  deleteProductAccordion: (id: string) => void;

  // Recently Viewed State
  recentlyViewed: Product[];
  removeFromRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // --- Categories ---
      categories: DEFAULT_CATEGORIES,

      addCategory: (catData) => {
        const id = `cat-${Date.now()}`;
        const newCat: CategoryItem = { ...catData, id };
        set((state) => ({ categories: [...state.categories, newCat] }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
      },

      // --- Collections ---
      collections: DEFAULT_COLLECTIONS,


      addCollection: (newCol) => {
        set((state) => ({ collections: [newCol, ...state.collections] }));
      },

      updateCollection: (id, updates) => {
        set((state) => ({
          collections: state.collections.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
      },

      deleteCollection: (id) => {
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
        }));
      },

      // --- Admin Products ---
      products: FEATURED_PRODUCTS,


      addProduct: (productData) => {
        const id = productData.id || `prod-${Date.now()}`;
        const newProduct: Product = { ...productData, id };
        set((state) => ({ products: [newProduct, ...state.products] }));
        try {
          fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
          }).catch(() => {});
        } catch {
          // Ignore
        }
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
          cart: state.cart.map((item) =>
            item.product.id === id
              ? { ...item, product: { ...item.product, ...updates } }
              : item
          ),
          wishlist: state.wishlist.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
          recentlyViewed: state.recentlyViewed.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
        try {
          fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
          }).catch(() => {});
        } catch {
          // Ignore
        }
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
          cart: state.cart.filter((item) => item.product.id !== id),
          wishlist: state.wishlist.filter((p) => p.id !== id),
          recentlyViewed: state.recentlyViewed.filter((p) => p.id !== id),
        }));
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },

      // --- Orders State ---
      orders: DEFAULT_ORDERS,

      updateOrderStatus: (orderId, status, trackingId) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status,
                  ...(trackingId ? { trackingId } : {}),
                  ...(status === 'delivered' ? { paymentStatus: 'paid' as const } : {})
                }
              : o
          ),
        }));
      },

      // --- Customers State ---
      customers: DEFAULT_CUSTOMERS,

      // --- Certificates State ---
      certificates: DEFAULT_CERTIFICATES,

      addCertificate: (certData) => {
        const newCert: Certificate = {
          ...certData,
          id: `cert-${Date.now()}`,
        };
        set((state) => ({ certificates: [newCert, ...state.certificates] }));
      },

      deleteCertificate: (id) => {
        set((state) => ({
          certificates: state.certificates.filter((c) => c.id !== id),
        }));
      },

      // --- Store Settings ---
      storeSettings: DEFAULT_SETTINGS,

      updateStoreSettings: (updates) => {
        set((state) => ({
          storeSettings: { ...state.storeSettings, ...updates },
        }));
      },

      // --- Homepage Section Dynamic Items ---
      deals: [],
      addDeal: (deal) => {
        const newItem: DealItem = { ...deal, id: `deal-${Date.now()}` };
        set((state) => ({ deals: [newItem, ...state.deals] }));
      },
      updateDeal: (id, updates) => {
        set((state) => ({
          deals: state.deals.map((d) => (d.id === id ? { ...d, ...updates } : d)),
        }));
      },
      deleteDeal: (id) => {
        set((state) => ({ deals: state.deals.filter((d) => d.id !== id) }));
      },

      experiences3D: [],
      addExperience3D: (exp) => {
        const newItem: Experience3DItem = { ...exp, id: `exp3d-${Date.now()}` };
        set((state) => ({ experiences3D: [newItem, ...state.experiences3D] }));
      },
      updateExperience3D: (id, updates) => {
        set((state) => ({
          experiences3D: state.experiences3D.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        }));
      },
      deleteExperience3D: (id) => {
        set((state) => ({ experiences3D: state.experiences3D.filter((e) => e.id !== id) }));
      },

      aiStylistItems: [],
      addAiStylist: (item) => {
        const newItem: AiStylistItem = { ...item, id: `ai-${Date.now()}` };
        set((state) => ({ aiStylistItems: [newItem, ...state.aiStylistItems] }));
      },
      updateAiStylist: (id, updates) => {
        set((state) => ({
          aiStylistItems: state.aiStylistItems.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        }));
      },
      deleteAiStylist: (id) => {
        set((state) => ({ aiStylistItems: state.aiStylistItems.filter((a) => a.id !== id) }));
      },

      journalArticles: [],
      addJournalArticle: (article) => {
        const newItem: JournalArticleItem = { ...article, id: `journal-${Date.now()}` };
        set((state) => ({ journalArticles: [newItem, ...state.journalArticles] }));
      },
      updateJournalArticle: (id, updates) => {
        set((state) => ({
          journalArticles: state.journalArticles.map((j) => (j.id === id ? { ...j, ...updates } : j)),
        }));
      },
      deleteJournalArticle: (id) => {
        set((state) => ({ journalArticles: state.journalArticles.filter((j) => j.id !== id) }));
      },

      communityPosts: [],
      addCommunityPost: (post) => {
        const newItem: CommunityPostItem = { ...post, id: `post-${Date.now()}` };
        set((state) => ({ communityPosts: [newItem, ...state.communityPosts] }));
      },
      updateCommunityPost: (id, updates) => {
        set((state) => ({
          communityPosts: state.communityPosts.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },
      deleteCommunityPost: (id) => {
        set((state) => ({ communityPosts: state.communityPosts.filter((p) => p.id !== id) }));
      },

      productAccordions: [],
      addProductAccordion: (acc) => {
        const newItem: ProductAccordionItem = { ...acc, id: `acc-${Date.now()}` };
        set((state) => ({ productAccordions: [...state.productAccordions, newItem] }));
      },
      updateProductAccordion: (id, updates) => {
        set((state) => ({
          productAccordions: state.productAccordions.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        }));
      },
      deleteProductAccordion: (id) => {
        set((state) => ({ productAccordions: state.productAccordions.filter((a) => a.id !== id) }));
      },

      // --- Hero Banners ---
      heroBanners: DEFAULT_HERO_BANNERS,

      updateHeroBanner: (id, updates) => {
        set((state) => ({
          heroBanners: state.heroBanners.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        }));
      },

      reorderHeroBanners: (banners) => {
        set({ heroBanners: banners });
      },

      // --- Announcement Bar ---
      announcementBar: DEFAULT_ANNOUNCEMENT_BAR,

      updateAnnouncementBar: (updates) => {
        set((state) => ({
          announcementBar: { ...state.announcementBar, ...updates },
        }));
      },

      // --- Coupons ---
      coupons: DEFAULT_COUPONS,

      addCoupon: (coupon) => {
        const newCoupon: Coupon = {
          ...coupon,
          id: `coup-${Date.now()}`,
          usageCount: 0,
        };
        set((state) => ({ coupons: [...state.coupons, newCoupon] }));
      },

      updateCoupon: (id, updates) => {
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },

      deleteCoupon: (id) => {
        set((state) => ({
          coupons: state.coupons.filter((c) => c.id !== id),
        }));
      },

      validateCoupon: (code, orderAmount) => {
        const coupon = get().coupons.find(
          (c) =>
            c.code.toUpperCase() === code.toUpperCase() &&
            c.active &&
            orderAmount >= c.minOrderAmount &&
            new Date(c.expiryDate) >= new Date() &&
            c.usageCount < c.usageLimit
        );
        return coupon ?? null;
      },

      // --- Occasions ---
      occasions: DEFAULT_OCCASIONS,

      updateOccasion: (id, updates) => {
        set((state) => ({
          occasions: state.occasions.map((o) =>
            o.id === id ? { ...o, ...updates } : o
          ),
        }));
      },

      addOccasion: (occasion) => {
        set((state) => ({ occasions: [...state.occasions, occasion] }));
      },

      deleteOccasion: (id) => {
        set((state) => ({
          occasions: state.occasions.filter((o) => o.id !== id),
        }));
      },

      // --- Cart ---
      cart: [],

      addToCart: (product, quantity = 1, options = {}) => {
        set((state) => {
          const selectedSize = options.selectedSize;
          const selectedVariant = options.selectedVariant;
          const selectedLength = options.selectedLength;

          const existingItemIndex = state.cart.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === selectedSize &&
              item.selectedVariant === selectedVariant
          );
          if (existingItemIndex >= 0) {
            const newCart = [...state.cart];
            newCart[existingItemIndex].quantity += quantity;
            return { cart: newCart };
          }
          return {
            cart: [
              ...state.cart,
              { product, quantity, selectedSize, selectedVariant, selectedLength },
            ],
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),
      setCart: (cart) => set({ cart }),

      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // --- Wishlist ---
      wishlist: [],

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.some((p) => p.id === product.id);
          if (exists) {
            return { wishlist: state.wishlist.filter((p) => p.id !== product.id) };
          }
          return { wishlist: [...state.wishlist, product] };
        });
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      getWishlistCount: () => {
        return get().wishlist.length;
      },

      clearWishlist: () => set({ wishlist: [] }),
      setWishlist: (wishlist) => set({ wishlist }),

      // --- Recently Viewed ---
      recentlyViewed: FEATURED_PRODUCTS.slice(0, 4),

      removeFromRecentlyViewed: (productId) => {
        set((state) => ({
          recentlyViewed: state.recentlyViewed.filter((p) => p.id !== productId),
        }));
      },

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
    }),
    {
      name: 'sujata-store',
      storage: {
        getItem: (name) => {
          try {
            const str = localStorage.getItem(name);
            return str ? JSON.parse(str) : null;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            const sanitizeProduct = (p: any) => {
              const sanitizeUrl = (url: string | undefined) => {
                if (!url) return '';
                if (url.startsWith('data:') && url.length > 50000) {
                  return '/images/products/rings/ring_placeholder.jpg';
                }
                return url;
              };
              return {
                ...p,
                primaryImage: sanitizeUrl(p.primaryImage),
                hoverImage: sanitizeUrl(p.hoverImage),
                images: (p.images || []).map(sanitizeUrl),
                galleryImages: (p.galleryImages || []).map(sanitizeUrl),
              };
            };

            const sanitizedValue = {
              ...value,
              state: {
                ...value?.state,
                products: (value?.state?.products || []).map(sanitizeProduct),
                cart: (value?.state?.cart || []).map((item: any) => ({
                  ...item,
                  product: sanitizeProduct(item.product)
                })),
                wishlist: (value?.state?.wishlist || []).map(sanitizeProduct),
              },
            };
            localStorage.setItem(name, JSON.stringify(sanitizedValue));
          } catch (e) {
            console.warn('LocalStorage write failed completely.', e);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch {
            // Ignore
          }
        },
      },
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<StoreState>;
        const persistedProducts = persisted.products || [];
        const currentProducts = currentState.products || [];
        const mergedProductMap = new Map<string, any>();
        
        currentProducts.forEach(p => mergedProductMap.set(p.id, p));
        persistedProducts.forEach(p => mergedProductMap.set(p.id, p));
        
        const mergedProducts = Array.from(mergedProductMap.values());

        return {
          ...currentState,
          ...persisted,
          products: mergedProducts.length > 0 ? mergedProducts : FEATURED_PRODUCTS,
          heroBanners:
            persisted.heroBanners && persisted.heroBanners.length > 0
              ? persisted.heroBanners
              : DEFAULT_HERO_BANNERS,
          announcementBar: persisted.announcementBar ?? DEFAULT_ANNOUNCEMENT_BAR,
          coupons:
            persisted.coupons && persisted.coupons.length > 0
              ? persisted.coupons
              : DEFAULT_COUPONS,
          recentlyViewed:
            persisted.recentlyViewed !== undefined
              ? persisted.recentlyViewed
              : FEATURED_PRODUCTS.slice(0, 4),
          occasions:
            persisted.occasions && persisted.occasions.length > 0
              ? persisted.occasions
              : DEFAULT_OCCASIONS,
          cart: [],
          wishlist: []
        };
      },
    }
  )
);
