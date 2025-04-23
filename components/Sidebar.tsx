'use client';

import React from "react";
import Image from "next/image";
import { FaTachometerAlt, FaBoxOpen } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-45 bg-gray-900 text-white flex flex-col items-center justify-between py-4">
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/Logomitra.jpg" alt="Logo" width={100} height={100} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 text-lg font-semibold mt-6">
          <a href="/Dashboard" className="flex items-center gap-2 hover:underline">
            <FaTachometerAlt /> Dashboard
          </a>
          <a href="/Produk" className="flex items-center gap-2 hover:underline">
            <FaBoxOpen /> Produk
          </a>
          <a href="/Pengguna" className="flex items-center gap-2 hover:underline">
            <FaBoxOpen /> Pengguna
          </a>
          <a href="/Pesanan" className="flex items-center gap-2 hover:underline">
            <FaBoxOpen /> Pesanan
          </a>
        </nav>
      </div>

      {/* Logout */}
      <button className="text-sm text-white hover:underline">Logout</button>
    </aside>
  );
};

export default Sidebar;
