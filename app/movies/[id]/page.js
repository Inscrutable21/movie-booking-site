'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Film, Calendar, Activity, Video } from 'lucide-react';
import MovieList from '@/components/MovieList';
import Footer from '@/components/Footer';

export default function MovieDetails({ params }) {
  const { id } = params;
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`);
        if (!res.ok) throw new Error('Failed to fetch movie details');
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);

        // Fetch related movies
        const relatedRes = await fetch('/api/movies');
        if (!relatedRes.ok) throw new Error('Failed to fetch related movies');
        const relatedData = await relatedRes.json();
        setRelatedMovies(relatedData.filter(m => m.id !== id).slice(0, 4));
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-10 bg-gray-800 rounded-lg p-6 shadow-lg text-white"
        >
          <Film size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
          <p className="text-gray-400">{error || "We couldn't find the movie you're looking for."}</p>
          <Link href="/movies" className="mt-4 inline-block text-blue-400 hover:underline">
            Back to Movies
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="relative w-full h-screen">
        <div 
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${movie.poster || '/images/default-movie-poster.jpg'})`,
            backgroundColor: '#051131',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-red-500"
            >
              {movie.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 sm:gap-6 mb-6 text-sm sm:text-base"
            >
              <div className="flex items-center">
                <Star className="text-yellow-400 mr-2" />
                <span>{movie.rating?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-blue-400 mr-2" />
                <span>{movie.duration} min</span>
              </div>
              <div className="flex items-center">
                <Activity className="text-green-400 mr-2" />
                <span>{movie.genre}</span>
              </div>
              {movie.releaseDate && (
                <div className="flex items-center">
                  <Calendar className="text-purple-400 mr-2" />
                  <span>{movie.releaseDate}</span>
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {movie.trailerLink && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center text-sm sm:text-base"
                >
                  <Video className="mr-2" size={16} />
                  Watch Trailer
                </button>
              )}
              <Link
                href={`/movies/${id}/theatres`}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base"
              >
                Book Tickets
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-red-500">Movie Details</h2>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{movie.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-red-500">You May Also Like</h2>
          <MovieList movies={relatedMovies} />
        </motion.div>
      </div>

      <AnimatePresence>
        {showTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTrailer(false)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="bg-gray-900 p-4 rounded-lg w-full max-w-3xl"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Movie Trailer</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={getYouTubeEmbedUrl(movie.trailerLink)}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}