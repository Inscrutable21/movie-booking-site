'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { data: session } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      setIsScrolled(scrollPosition > windowHeight * 0.1)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap" rel="stylesheet" />
      
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="text-3xl font-bold text-red-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            CineStream
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/movies" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Movies
            </Link>
            
            {session ? (
              <div className="relative">
                <motion.button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-1 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>{session.user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </motion.button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 text-gray-300"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Profile
                      </Link>
                      <button 
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-x-4">
                <Link href="/login" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Login
                </Link>
                <Link href="/register" className="bg-transparent border border-red-600 px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  )
}