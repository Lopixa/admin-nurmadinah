'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileModal from '@/components/ProfileModal';
import TambahBarang from './TambahBarang';
import { FaPen, FaTrash } from 'react-icons/fa';

const dummyProducts = [
  { id: 1, name: 'Gula', price: 30000, stock: 10, image: '/gula.jpg' },
  { id: 2, name: 'Minyak', price: 30000, stock: 15, image: '/minyak.jpg' },
  { id: 3, name: 'Beras', price: 30000, stock: 20, image: '/beras.jpg' },
  { id: 4, name: 'Indomie', price: 30000, stock: 12, image: '/indomie.jpg' },
];

const ProdukPage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showTambah, setShowTambah] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col relative">
        <Header onProfileClick={() => setShowProfile(true)} />

        <main className="p-8">
          {/* Header + Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-black">Produk</h2>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setShowTambah(true)}>
              + Add Barang
            </button>
          </div>

          {/* Produk Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover mb-3"
                />
                <p className="font-semibold text-black">{product.name}</p>
                <p className="text-sm text-black">Rp {product.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Sisa Stok: {product.stock}</p>

                <div className="mt-3 flex space-x-2">
                  <button className="bg-white border px-3 py-1 rounded-md flex items-center hover:bg-gray-200 text-black">
                    Edit <FaPen className="ml-2 text-sm" />
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center hover:bg-red-600">
                    Delete <FaTrash className="ml-2 text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
        {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
        {showTambah && <TambahBarang onClose={() => setShowTambah(false)} />}
      </div>
    </div>
  );
};

export default ProdukPage;
