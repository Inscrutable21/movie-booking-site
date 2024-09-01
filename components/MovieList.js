import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Edit2, Trash2, Clock, Calendar, Star } from 'lucide-react';

export default function MovieList({ movies, onEdit, onDelete, isAdminView }) {
  if (!movies || movies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-10 bg-gray-800 rounded-lg shadow-md"
      >
        <p className="text-xl text-gray-300">No movies available.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie, index) => (
        <motion.div 
          key={movie.id} 
          className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="relative h-64 overflow-hidden">
            <img 
              src={movie.poster || '/placeholder-movie.jpg'} 
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white line-clamp-2">{movie.title}</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 bg-gray-700 px-2 py-1 rounded-full">{movie.genre}</span>
              <div className="flex items-center text-gray-400">
                <Clock size={14} className="mr-1" />
                <span className="text-xs">{movie.duration} min</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs mb-3 line-clamp-2">{movie.description}</p>
            <div className="flex items-center justify-between mb-3">
              {movie.releaseDate && (
                <div className="flex items-center text-gray-400">
                  <Calendar size={14} className="mr-1" />
                  <span className="text-xs">{movie.releaseDate}</span>
                </div>
              )}
              {movie.rating && (
                <div className="flex items-center text-yellow-400">
                  <Star size={14} className="mr-1" />
                  <span className="text-xs font-semibold">{movie.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              {isAdminView ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEdit(movie)} 
                    className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => onDelete(movie.id)} 
                    className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : (
                <Link 
                  href={`/movies/${movie.id}`} 
                  className="inline-block bg-blue-500 text-white px-3 py-1 text-sm rounded-full hover:bg-blue-600 transition-colors duration-300"
                >
                  View Details
                </Link>
              )}
              {movie.trailerLink && (
                <Link 
                  href={movie.trailerLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-red-500 text-white px-3 py-1 text-sm rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                  Watch Trailer
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}