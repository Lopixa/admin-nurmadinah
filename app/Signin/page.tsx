'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();

  // Klik tombol langsung redirect tanpa validasi
  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/Dashboard"); // langsung ke dashboard
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg flex w-3/5">
        {/* Form Section */}
        <div className="w-1/2 p-5 flex flex-col justify-center text-black">
          <h2 className="text-2xl font-bold mb-2 text-black">Hello Admin</h2>
          <p className="mb-5 text-black">Please enter your details</p>

            <input
                type="email"
                placeholder="Enter your email"
                className="input w-full mb-3 text-black border-2 border-black rounded-md shadow-md"
            />
            
            <input
                type="password"
                placeholder="Enter your password"
                className="input w-full mb-3 text-black border-2 border-black rounded-md shadow-md"
            />
          <button
            className="bg-black text-white py-2 px-4 rounded w-full mb-3 hover:bg-gray-800 transition"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>

        {/* Image Section */}
        <div className="w-1/2 flex items-center justify-center">
          <Image src="/signin.jpg" alt="Sign In Illustration" width={400} height={400} />
        </div>
      </div>
    </div>
  );
}
