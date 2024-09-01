import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Film, AlertCircle } from 'lucide-react';

export default function TheatreSelector({ movieId, movieTitle, onSelect }) {
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (movieId) {
      setLoading(true);
      fetch(`/api/movies/${movieId}/theatres`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch theatres');
          return res.json();
        })
        .then(data => {
          setTheatres(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching theatres:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [movieId]);

  const handleTheatreSelect = (theatreId) => {
    setSelectedTheatre(theatreId);
    onSelect(theatreId);
    setIsOpen(false);
  };

  if (loading) return <SimpleMovieTitleLoading title={movieTitle} />;
  if (error) return <ErrorMessage message={error} />;
  if (theatres.length === 0) return <NoTheatresMessage />;

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div 
        className="mb-6 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-lg font-medium text-red-400 mb-2">
          Select Theatre
        </label>
        <div className="relative">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left bg-gray-800 text-white py-3 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="block truncate">
              {selectedTheatre ? 
                theatres.find(t => t.id === selectedTheatre)?.name : 
                'Choose a theatre'
              }
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <ChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {theatres.map((theatre) => (
                  <motion.li
                    key={theatre.id}
                    onClick={() => handleTheatreSelect(theatre.id)}
                    className="text-white cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-700"
                    whileHover={{ backgroundColor: '#4A5568' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="block truncate">{theatre.name}</span>
                    {selectedTheatre === theatre.id && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-red-400">
                        <Film className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

const SimpleMovieTitleLoading = ({ title }) => (
  <div className="flex justify-center items-center py-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-xl font-semibold text-red-400 mb-2">{title}</h2>
      <p className="text-gray-400">Loading theatres...</p>
    </motion.div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-red-500 text-center py-4 flex items-center justify-center"
  >
    <AlertCircle className="mr-2" />
    Error: {message}
  </motion.div>
);

const NoTheatresMessage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-gray-400 text-center py-4 flex flex-col items-center"
  >
    <Film className="h-12 w-12 mb-2 text-red-500" />
    <p>No theatres available for this movie.</p>
  </motion.div>
);