'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileModal from '@/components/ProfileModal';

type Order = {
  id: number;
  item_id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  hargatotal: string;
  status: string;
  unit: string;
};

const dummyOrdersInitial: Order[] = [
  {
    id: 1,
    item_id: 101,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
    hargatotal: 'Rp 50.000',
    status: 'Menunggu',
    unit: 'Menunggu',
  },
  {
    id: 2,
    item_id: 102,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
    hargatotal: 'Rp 70.000',
    status: 'Diproses',
    unit: 'Diproses',
  },
  {
    id: 3,
    item_id: 103,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
    hargatotal: 'Rp 100.000',
    status: 'Diantar',
    unit: 'Diantar',
  },
  {
    id: 4,
    item_id: 104,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
    hargatotal: 'Rp 25.000',
    status: 'Selesai',
    unit: 'Selesai',
  },
  {
    id: 5,
    item_id: 105,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
    hargatotal: 'Rp 90.000',
    status: 'Dibatalkan',
    unit: 'Dibatalkan',
  },
  {
    id: 6,
    item_id: 106,
    name: 'Arum Rahmadhani',
    email: 'araaa852@gmail.com',
    phone: '08123456789',
    address: 'Pasuruan',
    hargatotal: 'Rp 30.000',
    status: 'Dikembalikan',
    unit: 'Dikembalikan',
  },
];

const PesananPage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [dummyOrders, setDummyOrders] = useState<Order[]>(dummyOrdersInitial);

  const updateUnit = (itemId: number, newStatus: string) => {
    const updatedOrders = dummyOrders.map((order) =>
      order.item_id === itemId ? { ...order, unit: newStatus } : order
    );
    setDummyOrders(updatedOrders);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-black">
      <Sidebar />

      <main className="flex-1 bg-white relative overflow-y-auto">
        <Header onProfileClick={() => setShowProfile(true)} />

        <div className="p-6">
          <h2 className="text-2xl font-semibold mt-6">Data Pesanan</h2>

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

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-300 text-black text-left">
                  <th className="px-4 py-2">Id Pesanan</th>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Detail Pesanan</th>
                  <th className="px-4 py-2">Harga Total</th>
                  <th className="px-4 py-2">No.Telp</th>
                  <th className="px-4 py-2">Alamat</th>
                  <th className="px-4 py-2">Status</th>
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
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2">{order.hargatotal}</td>
                    <td className="px-4 py-2">{order.phone}</td>
                    <td className="px-4 py-2">{order.address}</td>
                    <td className="px-4 py-2">
                      <select
                        className="border rounded px-2 py-1"
                        value={order.unit}
                        onChange={(e) => updateUnit(order.item_id, e.target.value)}
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Diantar">Diantar</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                        <option value="Dikembalikan">Dikembalikan</option>
                      </select>
                    </td>
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
