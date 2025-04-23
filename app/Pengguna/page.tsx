'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileModal from '@/components/ProfileModal';

const dummyUsers = [
  { id: 1, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
  { id: 2, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
  { id: 3, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
  { id: 4, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
  { id: 5, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
  { id: 6, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
];

const PenggunaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfile, setShowProfile] = useState(false)

  const filteredUsers = dummyUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-900 text-black">
      <Sidebar />

      <main className="flex-1 bg-white relative overflow-y-auto">
        <Header onProfileClick={() => setShowProfile(true)} />

        <div className="p-6">
          <h2 className="text-2xl font-semibold mt-6">Data Pengguna</h2>

          {/* Search bar centered */}
          <div className="flex justify-center mt-4">
            <div className="w-full max-w-xl flex items-center rounded-full shadow-md border border-gray-300">
              <input
                type="text"
                placeholder="Cari Data..."
                className="w-full px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="bg-white px-4 py-2 rounded-r-full text-gray-500">
                🔍
              </div>
            </div>
          </div>

          {/* Tabel Pengguna */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-300 text-black text-left">
                  <th className="px-4 py-2">Id Pengguna</th>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">No.Telp</th>
                  <th className="px-4 py-2">Alamat</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2">{user.address}</td>
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

export default PenggunaPage;
