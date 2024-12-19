import React from 'react';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

export default function ProductCard({ id, name, price, description, image, stock }: ProductCardProps) {
  const { addToCart } = useShop();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm group">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">${price}</span>
          <button
            onClick={() => addToCart(id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={stock === 0}
          >
            {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}