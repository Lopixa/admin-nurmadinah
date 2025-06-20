'use client'

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProfileModal from "@/components/ProfileModal";
import Image from "next/image";
import axios from "axios";
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    total_produk: 0,
    total_user: 0,
    total_pesanan: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin"); // redirect kalau belum login
    }

    axios.get("http://54.90.134.63:8000/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setDashboardData(res.data);
    })
    .catch((err) => {
      console.error("Gagal fetch data dashboard:", err);
    });
  }, []);

  const dataCards = [
    {
      title: "Jenis Produk",
      icon: (
        <Image
          src="/Package.png"
          alt="Jenis Produk"
          width={90}
          height={0}
        />
      ),
      value: dashboardData.total_produk,
      color: "bg-yellow-500",
      headerColor: "bg-yellow-600",
    },
    {
      title: "Total Pengguna",
      icon: (
        <Image
          src="/User.png"
          alt="Total Pengguna"
          width={70}
          height={70}
        />
      ),
      value: dashboardData.total_user,
      color: "bg-lime-400",
      headerColor: "bg-lime-600",
    },
    {
      title: "Pesanan",
      icon: (
        <Image
          src="/Inbox.png"
          alt="Pesanan"
          width={70}
          height={70}
        />
      ),
      value: dashboardData.total_pesanan,
      color: "bg-blue-600",
      headerColor: "bg-blue-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header onProfileClick={() => setShowProfile(true)} />

        <main className="bg-white p-8 mx-6 my-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-black">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCards.map((card, index) => (
              <div
                key={index}
                className={`rounded-xl shadow-md ${card.color} p-6 border border-gray-300 h-48`}
              >
                <div className={`${card.headerColor} text-black text-base px-3 py-1 rounded-md mb-4`}>
                  {card.title}
                </div>
                <div className="flex items-center justify-between px-2">
                  <div className="text-black">{card.icon}</div>
                  <div className="text-white text-4xl font-bold">{card.value}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
        
        {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
      </div>
    </div>
  );
};

export default DashboardPage;
