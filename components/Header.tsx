'use client'

interface HeaderProps {
  onProfileClick: () => void
}

export default function Header({ onProfileClick }: HeaderProps) {
  return (
    <div className="w-full bg-[#0097A7] text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">Selamat Datang Admin</h1>
      </div>
      <button onClick={onProfileClick} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </button>
    </div>
  )
}
