"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

export function StoreInitializer({ products }: { products: any[] }) {
  const initialized = useRef(false);
  
  if (!initialized.current) {
    // We intentionally call this during render to initialize the store synchronously before other components mount.
    // However, Zustand updates might warn if called during render. 
    // To be safe, we also use useEffect.
    useStore.setState({ products });
    initialized.current = true;
  }

  useEffect(() => {
    useStore.getState().setProducts(products);
  }, [products]);

  return null;
}
