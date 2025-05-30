'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUser,
  FaClipboardList,
} from 'react-icons/fa';

const navItems = [
  { label: 'Dashboard', href: '/Dashboard', icon: <FaTachometerAlt /> },
  { label: 'Produk', href: '/Produk', icon: <FaBoxOpen /> },
  { label: 'Pengguna', href: '/Pengguna', icon: <FaUser /> },
  { label: 'Pesanan', href: '/Pesanan', icon: <FaClipboardList /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-48 bg-[#2C3E50] text-white flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8">
        <Image src="/Logomitra.jpg" alt="Logo" width={100} height={100} />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 w-full px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-white text-[#2C3E50] font-bold shadow-md'
                  : 'hover:bg-[#34495E]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
