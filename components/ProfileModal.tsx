'use client'

import { FaEdit, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'

interface ProfileModalProps {
  onClose: () => void
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[350px] p-6 relative">
        <h2 className="text-2xl font-semibold mb-4 text-black">Profile</h2>

        <div className="flex flex-col items-center space-y-4">
          <FaUserCircle size={80} className="text-black" />

          <button className="bg-white shadow px-4 py-2 rounded-md text-black flex items-center gap-2 border">
            Edit <FaEdit />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-black block">Username</label>
            <input
              type="text"
              value="Admin"
              className="w-full border border-blue-400 rounded px-3 py-2 text-black"
              readOnly
            />
          </div>
          <div>
            <label className="text-sm text-black block">Email</label>
            <input
              type="text"
              value="nurmadinah@gmail.com"
              className="w-full border border-blue-400 rounded px-3 py-2 text-black"
              readOnly
            />
          </div>
          <div>
            <label className="text-sm text-black block">No.HP</label>
            <input
              type="text"
              value="081432344323443"
              className="w-full border border-blue-400 rounded px-3 py-2 text-black"
              readOnly
            />
          </div>
          <div>
            <label className="text-sm text-black block">Role</label>
            <input
              type="text"
              value="Admin"
              className="w-full border border-blue-400 rounded px-3 py-2 text-black"
              readOnly
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:underline"
          >
            Tutup
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
            Logout <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  )
}
