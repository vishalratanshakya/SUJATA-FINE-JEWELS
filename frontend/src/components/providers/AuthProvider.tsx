"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { useStore } from "@/store/useStore";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${backendUrl}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          
          // Fetch wishlist and cart from backend to sync Zustand store
          try {
            const [wishlistRes, cartRes] = await Promise.all([
              fetch(`${backendUrl}/api/wishlist`, { headers: { Authorization: `Bearer ${token}` } }),
              fetch(`${backendUrl}/api/cart`, { headers: { Authorization: `Bearer ${token}` } })
            ]);
            
            if (wishlistRes.ok) {
              const wData = await wishlistRes.json();
              // In a real setup, backend should populate full product info or frontend must fetch it.
              // Assuming backend returns an array of product IDs in productIds, or populated products.
              const allProducts = useStore.getState().products;
              const serverWishlistIds = wData.data?.productIds || [];
              const serverWishlistProducts = allProducts.filter(p => serverWishlistIds.includes(p.id));
              useStore.getState().setWishlist(serverWishlistProducts);
            }
            if (cartRes.ok) {
              const cData = await cartRes.json();
              const allProducts = useStore.getState().products;
              const serverCartItems = cData.data?.items || [];
              
              const mappedCartItems = serverCartItems.map((item: any) => {
                const p = allProducts.find(prod => prod.id === item.productId);
                return p ? { product: p, quantity: item.quantity } : null;
              }).filter(Boolean);
              
              useStore.getState().setCart(mappedCartItems);
            }
          } catch(e) {
            console.error(e);
          }
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
