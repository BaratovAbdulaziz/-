import React, { createContext, useContext, useState, useEffect } from 'react';
import type { HomeContent } from '../types/home';

const defaultContent: HomeContent = {
  hero: {
    title: "Discover Amazing Products",
    description: "Shop the latest trends with confidence. Quality products, competitive prices.",
    buttonText: "Shop Now"
  },
  features: [
    { icon: "Truck", title: "Free Shipping", description: "On orders over $100" },
    { icon: "Shield", title: "Secure Payment", description: "100% secure checkout" },
    { icon: "Star", title: "Quality Products", description: "Curated items only" }
  ],
  featuredProducts: [
    { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", title: "Premium Watch", price: 299 },
    { image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", title: "Wireless Headphones", price: 199 },
    { image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f", title: "Camera Lens", price: 499 }
  ]
};

interface HomeContextType {
  content: HomeContent;
  updateContent: (newContent: HomeContent) => void;
}

const HomeContext = createContext<HomeContextType | null>(null);

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) throw new Error('useHome must be used within a HomeProvider');
  return context;
};

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<HomeContent>(() => {
    const saved = localStorage.getItem('homeContent');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  useEffect(() => {
    localStorage.setItem('homeContent', JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: HomeContent) => {
    setContent(newContent);
  };

  return (
    <HomeContext.Provider value={{ content, updateContent }}>
      {children}
    </HomeContext.Provider>
  );
}