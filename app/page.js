'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MovieTimeline from '@/components/MovieTimeline'
import About from '@/components/About'

import { ChevronRight } from 'lucide-react'

const MovieList = dynamic(() => import('@/components/MovieList'), { ssr: false })
const PosterCarousel = dynamic(() => import('@/components/PosterCarousel'), { ssr: false })

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [movies, setMovies] = useState([])
  const [featuredMovie, setFeaturedMovie] = useState(null)

  useEffect(() => {
    setIsClient(true)
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const res = await fetch('/api/movies')
      if (!res.ok) {
        throw new Error('Failed to fetch movies')
      }
      const data = await res.json()
      setMovies(data)
      setFeaturedMovie(data[0])
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-sans">
      <Navbar />
      <main className="w-full">
        {isClient && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PosterCarousel />

              <div className="container mx-auto px-4">
                {featuredMovie && (
                  <motion.section
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-12"
                  >
                    <h2 className="text-5xl font-bold mb-6 text-center text-red-600 tracking-wide">Featured Movie</h2>
                    {/* Add featured movie content here */}
                  </motion.section>
                )}

                <motion.section
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mb-12"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-red-600 tracking-wide">Now Showing</h2>
                    <motion.a
                      href="/movies"
                      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
                      whileHover={{ x: 5 }}
                    >
                      View All <ChevronRight className="ml-1" />
                    </motion.a>
                  </div>
                  <MovieList movies={movies.slice(0, 8)} />
                </motion.section>

                <motion.section
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold mb-6 text-red-600 tracking-wide">Movie Timeline</h2>
                  <MovieTimeline />
                </motion.section>

                <motion.section
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <About />
                </motion.section>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
      <Footer />
    </div>
  )
}