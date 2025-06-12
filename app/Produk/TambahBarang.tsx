'use client';

import { useState, useEffect } from 'react';
import { FaCamera, FaPlus } from 'react-icons/fa';
import axios from 'axios';

interface TambahBarangModalProps {
  onClose: () => void;
  selectedProduct?: {
    id: number;
    name: string;
    price: number;
    stock: number;
    image_url?: string;
  } | null;
}

export default function TambahBarangModal({ onClose, selectedProduct }: TambahBarangModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name || '');
      setPrice(selectedProduct.price || '');
      setStock(selectedProduct.stock || '');
    } else {
      setName('');
      setPrice('');
      setStock('');
      setImage(null);
    }
  }, [selectedProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('stock', stock.toString());
    if (image) formData.append('image', image);

    try {
      if (selectedProduct) {
        // Edit barang
        await axios.post(`http://localhost:8000/api/barang/${selectedProduct.id}?_method=PUT`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Tambah barang
        await axios.post('http://localhost:8000/api/barang', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      onClose();
    } catch (err) {
      console.error('Gagal simpan barang:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[350px] p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-black">
          {selectedProduct ? 'Edit Barang' : 'Tambah Barang'}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="w-24 h-24 border-2 border-orange-400 rounded-lg flex items-center justify-center overflow-hidden bg-gray-100">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <FaCamera className="text-3xl text-gray-500" />
                )}
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) setImage(e.target.files[0]);
                }}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Nama Barang</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-blue-500 rounded px-3 py-2 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Harga</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border border-blue-500 rounded px-3 py-2 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Jumlah</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full border border-blue-500 rounded px-3 py-2 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white w-full py-2 rounded flex items-center justify-center gap-2 mt-2 hover:bg-blue-800"
          >
            <FaPlus /> {selectedProduct ? 'Update Barang' : 'Tambahkan'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button className="text-gray-600 hover:underline text-sm" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
