'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Ticket, MapPin, Camera, Film } from 'lucide-react';
import Footer from '@/components/Footer';  // Import the Footer component
import { Bebas_Neue, Roboto } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});
export default function MovieTheatres({ params }) {
  const [theatres, setTheatres] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [movieData, theatresData] = await Promise.all([
          fetch(`/api/movies/${id}`).then(res => res.json()),
          fetch(`/api/movies/${id}/theatres`).then(res => res.json())
        ]);
        setMovie(movieData);
        setTheatres(theatresData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <CinematicLoading />;
  if (error) return <CinematicError message={error} />;
  if (!movie) return <CinematicNotFound message="Movie not found" />;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
    <div className="relative flex-grow">
      <motion.div 
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ 
          backgroundImage:  `url(${movie.poster || '/images/default-movie-poster.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5 }}
      />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-90" />
        <div className="relative z-10 container mx-auto px-4 py-12">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${bebasNeue.className} text-7xl font-bold mb-4 text-center text-red-500 drop-shadow-lg tracking-wider`}
            style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.7)' }}
          >
            {movie.title}
          </motion.h1>
          <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="flex justify-center items-center mb-12"
         >
           <Star className="text-yellow-400 mr-2 animate-pulse" />
           <span className="text-2xl font-bold">{movie.rating}/10</span>
         </motion.div>
         <AnimatePresence>
            {theatres.length === 0 ? (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-3xl text-red-400"
              >
                No theatres currently showing this movie.
              </motion.p>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {theatres.map((theatre, index) => (
                  <TheatreCard key={theatre.id} theatre={theatre} movie={movie} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const TheatreCard = ({ theatre, movie, index }) => (
  <motion.div 
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -50 }}
  transition={{ delay: index * 0.1 }}
  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(220, 38, 38, 0.7)' }}
  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-300"
>
  <div className="relative h-48 overflow-hidden">
    <motion.img
      src={theatre.image || '/default-theatre.jpg'}
      alt={theatre.name}
      className="w-full h-full object-cover"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
    <h2 className={`${bebasNeue.className} absolute bottom-4 left-4 text-2xl font-semibold text-white drop-shadow-lg tracking-wide`}>
      {theatre.name}
    </h2>
  </div>
  <div className="p-6">
    <p className="text-gray-400 mb-4 flex items-center">
      <MapPin size={16} className="mr-2 text-red-500" />
      {theatre.location}
    </p>
    <h3 className={`${bebasNeue.className} text-xl font-medium mb-4 text-red-300 flex items-center tracking-wide`}>
      <Ticket size={20} className="mr-2 animate-bounce" />
      Showtimes:
    </h3>
    <ul className="space-y-3">
      {theatre.showtimes.map(showtime => (
        <li key={showtime.id}>
          <Link 
            href={`/booking/${movie.id}/${theatre.id}/${showtime.id}`}
            className={`${bebasNeue.className} block bg-red-600 text-white text-center py-3 rounded-lg hover:bg-red-700 transition-colors relative overflow-hidden group tracking-wide`}
          >
            <span className="relative z-10">
              {new Date(showtime.datetime).toLocaleString()}
            </span>
            <motion.div 
              className="absolute inset-0 bg-red-800"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ type: 'tween' }}
            />
          </Link>
        </li>
      ))}
    </ul>
  </div>
</motion.div>
);

const CinematicLoading = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-black">
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}
      className="w-16 h-16 bg-red-600"
    />
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-white text-xl mt-4"
    >
      Loading...
    </motion.p>
  </div>
);

const CinematicError = ({ message }) => (
  <div className="flex justify-center items-center h-screen bg-black">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-red-600 text-white px-8 py-6 rounded-lg shadow-lg text-center"
    >
      <Film className="w-16 h-16 mx-auto mb-4 animate-spin" />
      <h2 className="text-2xl font-bold mb-2">Oops!</h2>
      <p className="text-xl">{message}</p>
    </motion.div>
  </div>
);

const CinematicNotFound = ({ message }) => (
  <div className="flex justify-center items-center h-screen bg-black">
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <Camera className="w-24 h-24 mx-auto text-red-500 mb-4" />
      <h2 className="text-6xl font-bold text-red-500 mb-4">404</h2>
      <p className="text-2xl text-white">{message}</p>
    </motion.div>
  </div>
);