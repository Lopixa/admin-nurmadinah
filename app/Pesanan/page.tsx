'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileModal from '@/components/ProfileModal';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Order = {
  id: number;
  nama_toko: string;
  no_hp: string;
  alamat: string;
  status: string;
  total: string;
};

const PesananPage = () => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/Signin"); // redirect kalau belum login
      }
      const res = await axios.get('http://localhost:8000/api/pesanan', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.data || res.data);
    } catch (error) {
      console.error('Gagal mengambil pesanan:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateUnit = async (orderId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8000/api/pesanan/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Gagal memperbarui status:', error);
    }
  };

  const deleteOrder = async (orderId: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/pesanan/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Gagal menghapus pesanan:', error);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Order>[]>(() => [
    {
      accessorKey: 'id',
      header: 'Id Pesanan',
    },
    {
      accessorKey: 'nama_toko',
      header: 'Nama',
    },
    {
  accessorKey: 'orders',
  header: 'List Barang',
  Cell: ({ cell }) => {
    let value = cell.getValue();
    try {
      if (typeof value === 'string') {
        value = JSON.parse(value);
      }
    } catch {
      value = [];
    }

    const orders = Array.isArray(value) ? value : [];

    return orders.map((item: any) => item.name).join(', ');
  },
},

    {
      accessorKey: 'total',
      header: 'Harga Total',
      Cell: ({ row }) => {
        const details = row.original as any;
        // Hitung total dari detail pesanan
        const total = details?.details?.reduce((acc: number, item: any) => acc + (item.harga * item.jumlah), 0);
        return <>{total ? `Rp ${total.toLocaleString()}` : '-'}</>;
      }
    },
    {
      accessorKey: 'no_hp',
      header: 'No. Telp',
    },
    {
      accessorKey: 'alamat',
      header: 'Alamat',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ row }) => (
        <select
          value={row.original.status}
          onChange={(e) => updateUnit(row.original.id, e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="pending">Menunggu</option>
          <option value="processing">Diproses</option>
          <option value="delivered">Diantar</option>
          <option value="completed">Selesai</option>
          <option value="canceled">Dibatalkan</option>
          <option value="returned">Dikembalikan</option>
        </select>
      ),
    },
    {
      header: 'Aksi',
      Cell: ({ row }) => (
        <button
          onClick={() => deleteOrder(row.original.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      ),
    },
  ], [orders]);

  return (
    <div className="flex h-screen bg-gray-900 text-black">
      <Sidebar />

      <main className="flex-1 bg-gray-200 relative overflow-y-auto">
        <Header onProfileClick={() => setShowProfile(true)} />

        <div className="mx-6 my-6 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mt-6">Data Pesanan</h2>

          <div className="mt-6">
            {loading ? (
              <p>Memuat data pesanan...</p>
            ) : (
              <MaterialReactTable
                columns={columns}
                data={orders}
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
            )}
          </div>
        </div>
      </main>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default PesananPage;
