import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit, Trash2, Clock } from 'lucide-react';

export default function TheatreList({ theatres, onSelectShowtime, isAdminView, onEdit, onDelete }) {
  if (!theatres || theatres.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 bg-gray-900 rounded-lg"
      >
        <Camera size={64} className="mx-auto text-red-500 mb-4" />
        <p className="text-2xl text-gray-400">No theatres available at the moment.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {theatres.map((theatre, index) => (
        <TheatreCard
          key={theatre.id}
          theatre={theatre}
          isAdminView={isAdminView}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelectShowtime={onSelectShowtime}
          index={index}
        />
      ))}
    </motion.div>
  );
}

const TheatreCard = ({ theatre, isAdminView, onEdit, onDelete, onSelectShowtime, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/30 transition-all duration-300"
  >
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-2 text-red-400">{theatre.name}</h3>
      <p className="text-gray-300 mb-2">{theatre.location}</p>
      <p className="text-gray-400 mb-4">Capacity: {theatre.capacity}</p>
      {isAdminView ? (
        <AdminActions theatre={theatre} onEdit={onEdit} onDelete={onDelete} />
      ) : (
        <ShowtimeList showtimes={theatre.showtimes} onSelect={(showtimeId) => onSelectShowtime(theatre.id, showtimeId)} />
      )}
    </div>
  </motion.div>
);

const AdminActions = ({ theatre, onEdit, onDelete }) => (
  <div className="flex justify-between mt-4">
    <motion.button 
      onClick={() => onEdit(theatre)} 
      className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Edit size={16} className="mr-2" />
      Edit
    </motion.button>
    <motion.button 
      onClick={() => onDelete(theatre.id)} 
      className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Trash2 size={16} className="mr-2" />
      Delete
    </motion.button>
  </div>
);

const ShowtimeList = ({ showtimes, onSelect }) => (
  <div className="space-y-3">
    {showtimes.map((showtime) => (
      <motion.button 
        key={showtime.id}
        onClick={() => onSelect(showtime.id)} 
        className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 flex justify-between items-center group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center">
          <Clock size={16} className="mr-2 group-hover:animate-pulse" />
          {new Date(showtime.datetime).toLocaleString()}
        </span>
        <span className="bg-red-800 px-3 py-1 rounded-full text-sm group-hover:bg-red-900 transition-colors">
          {showtime.availableSeats} seats
        </span>
      </motion.button>
    ))}
  </div>
);