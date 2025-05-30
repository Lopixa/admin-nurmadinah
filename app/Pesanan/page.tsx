'use client';

import React, { useState, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileModal from '@/components/ProfileModal';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';

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

  const deleteOrder = (itemId: number) => {
    setDummyOrders((prev) => prev.filter((order) => order.item_id !== itemId));
  };

  const columns = useMemo<MRT_ColumnDef<Order>[]>(() => [
    {
      accessorKey: 'id',
      header: 'Id Pesanan',
    },
    {
      accessorKey: 'name',
      header: 'Nama',
    },
    {
      accessorKey: 'hargatotal',
      header: 'Harga Total',
    },
    {
      accessorKey: 'phone',
      header: 'No. Telp',
    },
    {
      accessorKey: 'address',
      header: 'Alamat',
    },
    {
      accessorKey: 'unit',
      header: 'Status',
      Cell: ({ row }) => (
        <select
          value={row.original.unit}
          onChange={(e) => updateUnit(row.original.item_id, e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="Menunggu">Menunggu</option>
          <option value="Diproses">Diproses</option>
          <option value="Diantar">Diantar</option>
          <option value="Selesai">Selesai</option>
          <option value="Dibatalkan">Dibatalkan</option>
          <option value="Dikembalikan">Dikembalikan</option>
        </select>
      ),
    },
    {
      header: 'Aksi',
      Cell: ({ row }) => (
        <button
          onClick={() => deleteOrder(row.original.item_id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      ),
    },
  ], [dummyOrders]);

  return (
    <div className="flex h-screen bg-gray-900 text-black">
      <Sidebar />

      <main className="flex-1 bg-white relative overflow-y-auto">
        <Header onProfileClick={() => setShowProfile(true)} />

        <div className="p-6">
          <h2 className="text-2xl font-semibold mt-6">Data Pesanan</h2>

          <div className="mt-6">
            <MaterialReactTable
              columns={columns}
              data={dummyOrders}
              enableColumnFilters={false}
              enableSorting
              enablePagination
              muiTableBodyProps={{
                sx: {
                  '& tr:nth-of-type(odd)': {
                    backgroundColor: '#f9f9f9',
                  },
                },
              }}
            />
          </div>
        </div>
      </main>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default PesananPage;
