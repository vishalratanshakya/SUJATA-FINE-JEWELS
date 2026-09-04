import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FEATURED_PRODUCTS } from '@/data/mockData';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Product = {
  id: string;
  name: string;
  slug: string;
  metal: string;
  stone: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating?: number;
  images: string[];
  isSignatureCarousel?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
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

// ─── Store Interface ───────────────────────────────────────────────────────────

interface StoreState {
  // Admin Product State
  products: Product[];
  updateProduct: (id: string, updates: Partial<Product>) => void;
  getProductById: (id: string) => Product | undefined;

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

  // Cart State
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist State
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
  clearWishlist: () => void;

  // Recently Viewed State
  recentlyViewed: Product[];
  removeFromRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // --- Admin Products ---
      products: FEATURED_PRODUCTS,

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
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
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

      // --- Cart ---
      cart: [],

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.product.id === product.id
          );
          if (existingItemIndex >= 0) {
            const newCart = [...state.cart];
            newCart[existingItemIndex].quantity += quantity;
            return { cart: newCart };
          }
          return { cart: [...state.cart, { product, quantity }] };
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
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<StoreState>;
        return {
          ...currentState,
          ...persisted,
          products:
            persisted.products && persisted.products.length > 0
              ? persisted.products
              : FEATURED_PRODUCTS,
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
        };
      },
    }
  )
);
