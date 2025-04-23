'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileModal from '@/components/ProfileModal';

const dummyOrders = [
  {
    id: 1,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
  },
  {
    id: 2,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
  },
  {
    id: 3,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
  },
  {
    id: 4,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
  },
  {
    id: 5,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
  },
  {
    id: 6,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
  },
];

const PesananPage = () => {
  const [showProfile, setShowProfile] = useState(false)
    return (
      <div className="flex h-screen bg-gray-900 text-black">
        <Sidebar />
  
        <main className="flex-1 bg-white relative overflow-y-auto">
          {/* Header */}
          <Header onProfileClick={() => setShowProfile(true)} />
  
          <div className="p-6">
            <h2 className="text-2xl font-semibold mt-6">Data Pesanan</h2>
  
            {/* Search bar centered */}
            <div className="flex justify-center mt-4">
              <div className="w-full max-w-xl flex">
                <input
                  type="text"
                  placeholder="Cari Data..."
                  className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gray-300 rounded-r-md px-4 py-2 hover:bg-gray-400">
                  🔍
                </button>
              </div>
            </div>
  
            {/* Tabel Pesanan */}
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-300 text-black text-left">
                    <th className="px-4 py-2">Id Pesanan</th>
                    <th className="px-4 py-2">Nama</th>
                    <th className="px-4 py-2">Detail Pesanan</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">No.Telp</th>
                    <th className="px-4 py-2">Alamat</th>
                    <th className="px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                    >
                      <td className="px-4 py-2">{order.id}</td>
                      <td className="px-4 py-2">{order.name}</td>
                      <td className="px-4 py-2">
                        <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                          click here
                        </button>
                      </td>
                      <td className="px-4 py-2">{order.email}</td>
                      <td className="px-4 py-2">{order.phone}</td>
                      <td className="px-4 py-2">{order.address}</td>
                      <td className="px-4 py-2">
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
      </div>
    );
  };
  
  export default PesananPage;