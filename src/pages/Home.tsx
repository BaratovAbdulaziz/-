import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useHome } from '../context/HomeContext';

export default function Home() {
  const { content } = useHome();
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center">
          <div className="px-8 md:px-16 space-y-6 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/90">
              {content.hero.description}
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {content.hero.buttonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.features.map((feature, index) => {
          const IconComponent = Icons[feature.icon as keyof typeof Icons];
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                {IconComponent && <IconComponent className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Products */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.featuredProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm group">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-lg font-bold text-blue-600">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}