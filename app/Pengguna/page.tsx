'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileModal from '@/components/ProfileModal';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

const PenggunaPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get('http://localhost:8000/api/admin/users', {
    headers: {
      Authorization: `Bearer ${token}`, // jika pakai auth
    }
  })
    .then(res => {
      setUsers(res.data); // <-- set state pengguna
    })
    .catch(err => {
      console.error("Gagal fetch data pengguna:", err);
    });
}, []);


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
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, users]
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
