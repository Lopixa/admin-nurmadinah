'use client';

import React from "react";
import Image from "next/image";
import { FaTachometerAlt, FaBoxOpen, FaUser, FaClipboardList } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-45 bg-[#2C3E50] text-white flex flex-col items-center justify-between py-4">
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/Logomitra.jpg" alt="Logo" width={100} height={100} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 text-lg font-semibold mt-6">
          <a href="/Dashboard" className="flex items-center gap-2 hover:underline">
            <FaTachometerAlt /> Dashboard
          </a>
          <a href="/Produk" className="flex items-center gap-2 hover:underline">
            <FaBoxOpen /> Produk
          </a>
          <a href="/Pengguna" className="flex items-center gap-2 hover:underline">
            <FaUser /> Pengguna
          </a>
          <a href="/Pesanan" className="flex items-center gap-2 hover:underline">
            <FaClipboardList /> Pesanan
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
