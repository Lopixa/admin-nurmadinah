'use client';

import { FaCamera, FaPlus } from 'react-icons/fa';

interface TambahBarangModalProps {
  onClose: () => void;
}

export default function TambahBarangModal({ onClose }: TambahBarangModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[350px] p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-black">Tambah Barang</h2>

        <form className="flex flex-col gap-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 border-2 border-orange-400 rounded-lg flex items-center justify-center text-3xl text-gray-500">
              <FaCamera />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Nama Barang</label>
            <input type="text" placeholder="Value" className="w-full border border-blue-500 rounded px-3 py-2 text-black" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Harga</label>
            <input type="number" placeholder="Value" className="w-full border border-blue-500 rounded px-3 py-2 text-black" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Jumlah</label>
            <input type="number" placeholder="Value" className="w-full border border-blue-500 rounded px-3 py-2 text-black" />
          </div>

          <button type="submit" className="bg-blue-700 text-white w-full py-2 rounded flex items-center justify-center gap-2 mt-2 hover:bg-blue-800">
            <FaPlus /> Tambahkan
          </button>
        </form>

        <div className="mt-4 text-center">
          <button className="text-gray-600 hover:underline text-sm" onClick={onClose}>Batal</button>
        </div>
      </div>
    </div>
  );
}
