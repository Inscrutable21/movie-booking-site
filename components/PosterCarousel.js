import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const movies = [
  { id: 1, title: "Dhoom 3", poster: "/a.jpg", video: "/a.mp4" },
  { id: 2, title: "2 States", poster: "/2 states.jpg", video: "/2states.mp4" },
  { id: 3, title: "Shandaar", poster: "/saandaar.jpg", video: "/saandar.mp4" },
  { id: 4, title: "Housefull 2", poster: "/ousefukk2.jpg", video: "/full2.mp4" },
  { id: 5, title: "Singham Returns", poster: "/sinam.jpg", video: "/Singham returns.mp4" },
  { id: 6, title: "Welcome to New York", poster: "/welcome to yotkr.jpg", video: "/welcome to new york.mp4" },
  { id: 7, title: "Padmaavat", poster: "/padmmavat.jpg", video: "/vat.mp4" },
  { id: 8, title: "Welcome", poster: "/welcome.jpg", video: "/welcomee.mp4" },
]

export default function PosterCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const carouselRef = useRef(null)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, autoPlay])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = movies[currentIndex].video
      videoRef.current.play().catch(error => console.error("Video playback failed:", error))
    }
  }, [currentIndex])

  const handlePosterClick = (index) => {
    setCurrentIndex(index)
    setAutoPlay(false)
  }

  return (
    <div ref={containerRef} className="relative w-screen h-[80vh] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <motion.video
            ref={videoRef}
            style={{ y }}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" 
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <motion.div 
          ref={carouselRef}
          className="flex space-x-4 overflow-hidden pb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <LayoutGroup>
            <motion.div
              drag="x"
              dragConstraints={carouselRef}
              className="flex space-x-4"
            >
              {movies.map((movie, index) => (
                <motion.div
                  layout
                  key={movie.id}
                  className={`flex-shrink-0 cursor-pointer relative ${index === currentIndex ? 'border-2 border-red-600' : ''}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePosterClick(index)}
                  style={{
                    width: index === currentIndex ? 160 : 128,
                    height: index === currentIndex ? 240 : 192,
                    transition: 'width 0.3s, height 0.3s'
                  }}
                >
                  <motion.img
                    layout
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-md"
                    whileHover={{ brightness: 1.2 }}
                  />
                  <AnimatePresence>
                    {index === currentIndex && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2"
                      >
                        <p className="text-white text-sm font-bold">{movie.title}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </LayoutGroup>
        </motion.div>
      </div>


    </div>
  )
}