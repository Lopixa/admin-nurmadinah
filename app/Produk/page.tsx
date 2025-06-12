'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileModal from '@/components/ProfileModal';
import TambahBarang from './TambahBarang';
import { FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image_url?: string;
};


const ProdukPage = () => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [showTambah, setShowTambah] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("token");
      if (!token) {
        router.push("/Signin"); // redirect kalau belum login
      }
    const res = await axios.get("http://localhost:8000/api/barang", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Coba dua kemungkinan: apakah data langsung array, atau ada di res.data.data
    const data = Array.isArray(res.data) ? res.data : res.data.data;

    if (Array.isArray(data)) {
      setProducts(data);
    } else {
      console.error("Format data tidak valid:", res.data);
      setProducts([]); // fallback
    }
  } catch (error) {
    console.error("Gagal fetch produk:", error);
    setProducts([]); // fallback on error
  }
};


  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/barang/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts(); // refresh data setelah delete
    } catch (error) {
      console.error('Gagal hapus produk:', error);
    }
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setShowTambah(true);
  };

  const handleCloseModal = () => {
    setShowTambah(false);
    setSelectedProduct(null);
    fetchProducts(); // refresh data
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col relative">
        <Header onProfileClick={() => setShowProfile(true)} />

        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-black">Produk</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => {
                setSelectedProduct(null);
                setShowTambah(true);
              }}
            >
              + Add Barang
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="bg-white p-4 border-2 border-yellow-500 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <img
                  src={product.image_url || '/placeholder.png'}
                  alt={product.name}
                  className="w-24 h-24 object-cover mb-3"
                />
                <p className="font-semibold text-black">{product.name}</p>
                <p className="text-sm text-black">Rp {product.price?.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Sisa Stok: {product.stock}</p>

                <div className="mt-3 flex space-x-2">
                  <button
                    className="bg-white border px-3 py-1 rounded-md flex items-center hover:bg-gray-200 text-black"
                    onClick={() => handleEdit(product)}
                  >
                    Edit <FaPen className="ml-2 text-sm" />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center hover:bg-red-600"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete <FaTrash className="ml-2 text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
        {showTambah && (
          <TambahBarang
            onClose={handleCloseModal}
            selectedProduct={selectedProduct}
          />
        )}

      </div>
    </div>
  );
};

export default ProdukPage;
