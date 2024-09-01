// components/AdminDashboard.js
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminDashboard() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/movies', label: 'Movies', icon: '🎬' },
    { href: '/admin/theatres', label: 'Theatres', icon: '🏢' },
    { href: '/admin/showtimes', label: 'Showtimes', icon: '🕒' },
    { href: '/admin/seats', label: 'Seats', icon: '💺' },
   
  ]

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      </div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center py-3 px-5 transition-colors duration-200 ${
              pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-5">
        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-200">
          Logout
        </button>
      </div>
    </div>
  )
}