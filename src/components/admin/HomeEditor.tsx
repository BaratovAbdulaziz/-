import React, { useState } from 'react';
import { useHome } from '../../context/HomeContext';
import type { HomeContent, Feature, FeaturedProduct } from '../../types/home';

export default function HomeEditor() {
  const { content, updateContent } = useHome();
  const [editedContent, setEditedContent] = useState<HomeContent>(content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(editedContent);
    alert('Home page content updated successfully!');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Edit Home Page</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Hero Section</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={editedContent.hero.title}
              onChange={(e) => setEditedContent({
                ...editedContent,
                hero: { ...editedContent.hero, title: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={editedContent.hero.description}
              onChange={(e) => setEditedContent({
                ...editedContent,
                hero: { ...editedContent.hero, description: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              value={editedContent.hero.buttonText}
              onChange={(e) => setEditedContent({
                ...editedContent,
                hero: { ...editedContent.hero, buttonText: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Features</h3>
          {editedContent.features.map((feature, index) => (
            <div key={index} className="space-y-2 p-4 border rounded">
              <div>
                <label className="block text-sm font-medium text-gray-700">Icon</label>
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => {
                    const newFeatures = [...editedContent.features];
                    newFeatures[index] = { ...feature, icon: e.target.value };
                    setEditedContent({ ...editedContent, features: newFeatures });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...editedContent.features];
                    newFeatures[index] = { ...feature, title: e.target.value };
                    setEditedContent({ ...editedContent, features: newFeatures });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={feature.description}
                  onChange={(e) => {
                    const newFeatures = [...editedContent.features];
                    newFeatures[index] = { ...feature, description: e.target.value };
                    setEditedContent({ ...editedContent, features: newFeatures });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Featured Products</h3>
          {editedContent.featuredProducts.map((product, index) => (
            <div key={index} className="space-y-2 p-4 border rounded">
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={product.image}
                  onChange={(e) => {
                    const newProducts = [...editedContent.featuredProducts];
                    newProducts[index] = { ...product, image: e.target.value };
                    setEditedContent({ ...editedContent, featuredProducts: newProducts });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => {
                    const newProducts = [...editedContent.featuredProducts];
                    newProducts[index] = { ...product, title: e.target.value };
                    setEditedContent({ ...editedContent, featuredProducts: newProducts });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => {
                    const newProducts = [...editedContent.featuredProducts];
                    newProducts[index] = { ...product, price: Number(e.target.value) };
                    setEditedContent({ ...editedContent, featuredProducts: newProducts });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}