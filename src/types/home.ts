export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturedProduct {
  image: string;
  title: string;
  price: number;
}

export interface HomeContent {
  hero: {
    title: string;
    description: string;
    buttonText: string;
  };
  features: Feature[];
  featuredProducts: FeaturedProduct[];
}