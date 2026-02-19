"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface FavoriteContextType {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addFavorite = (product: Product) => {
    setFavorites((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used inside FavoriteProvider");
  }
  return context;
}