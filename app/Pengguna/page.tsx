'use client';

import React, { useMemo, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileModal from '@/components/ProfileModal';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';

const dummyUsers = [
  { id: 1, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
  { id: 2, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
  { id: 3, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
  { id: 4, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
  { id: 5, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
  { id: 6, name: 'Arum Rahmadhani', email: 'araaa852@gmail.com', phone: '08123456789', address: 'Pasuruan' },
];

type User = typeof dummyUsers[0];

const PenggunaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      { accessorKey: 'id', header: 'Id Pengguna' },
      { accessorKey: 'name', header: 'Nama' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone', header: 'No. Telp' },
      { accessorKey: 'address', header: 'Alamat' },
    ],
    []
  );

  const filteredUsers = useMemo(
    () =>
      dummyUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  return (
    <div className="flex h-screen bg-gray-900 text-black">
      <Sidebar />

      <main className="flex-1 bg-white relative overflow-y-auto">
        <Header onProfileClick={() => setShowProfile(true)} />

        <div className="p-6">
          <h2 className="text-2xl font-semibold mt-6">Data Pengguna</h2>

          {/* Material React Table */}
          <div className="mt-6">
            <MaterialReactTable columns={columns} data={filteredUsers} />
          </div>
        </div>
      </main>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default PenggunaPage;
