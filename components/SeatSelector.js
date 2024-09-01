import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Info } from 'lucide-react';

export default function SeatSelector({ seats = [], onSelect, selectedSeats, onBookTickets }) {
  const [zoom, setZoom] = useState(1);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const seatsByRow = useMemo(() => {
    return (seats || []).reduce((acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = [];
      acc[seat.row].push(seat);
      return acc;
    }, {});
  }, [seats]);

  const renderSeat = (seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    const isAvailable = seat.isAvailable && !seat.isReserved;

    return (
      <motion.button
        key={seat.id}
        onClick={() => isAvailable && onSelect(seat)}
        onMouseEnter={() => setHoveredSeat(seat)}
        onMouseLeave={() => setHoveredSeat(null)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-7 h-7 m-0.5 flex items-center justify-center text-xs font-medium rounded-sm transition-colors duration-200
          ${isAvailable 
            ? isSelected
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : `${seat.type === 'Standard' ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : ''}
                 ${seat.type === 'Premium' ? 'bg-green-100 hover:bg-green-200 text-green-800' : ''} 
                 ${seat.type === 'VIP' ? 'bg-purple-100 hover:bg-purple-200 text-purple-800' : ''}`
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        disabled={!isAvailable}
        title={`${seat.row}${seat.number} - ${seat.type} - $${seat.price}`}
      >
        {seat.number}
      </motion.button>
    );
  };

  const renderRow = (row, seats) => {
    const sortedSeats = seats.sort((a, b) => a.number - b.number);

    return (
      <div key={row} className="flex items-center justify-center mb-2">
        <div className="w-6 text-center font-bold mr-2 text-gray-600">{row}</div>
        <div className="flex flex-wrap justify-center">
          {sortedSeats.map(renderSeat)}
        </div>
      </div>
    );
  };

  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div className="seat-selector bg-gray-800 p-6 rounded-lg shadow-lg relative">
      <div className="mb-6 flex justify-center items-center flex-wrap">
        <div className="flex space-x-4 flex-wrap justify-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-100 mr-2 border border-gray-300"></div>
            <span className="text-sm text-gray-600">Standard</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 mr-2 border border-green-300"></div>
            <span className="text-sm text-gray-600">Premium</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-100 mr-2 border border-purple-300"></div>
            <span className="text-sm text-gray-600">VIP</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 mr-2"></div>
            <span className="text-sm text-gray-600">Unavailable</span>
          </div>
        </div>
      </div>
      <div className="w-full h-8 bg-gray-200 flex items-center justify-center text-gray-600 text-sm mb-8 rounded">
        SCREEN
      </div>
      <motion.div 
        className="seat-grid max-w-3xl mx-auto"
        style={{ scale: zoom }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {sortedRows.map(row => renderRow(row, seatsByRow[row]))}
      </motion.div>
      <div className="absolute top-4 right-4 flex space-x-2">
        <button onClick={() => setZoom(z => Math.min(z + 0.1, 1.5))} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <ZoomIn size={20} />
        </button>
        <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <ZoomOut size={20} />
        </button>
      </div>
      {hoveredSeat && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded shadow-lg text-sm"
        >
          Seat {hoveredSeat.row}{hoveredSeat.number} - {hoveredSeat.type} - ${hoveredSeat.price}
        </motion.div>
      )}
      <div className="absolute bottom-4 right-4">
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200" title="Seat Selection Tips">
          <Info size={20} />
        </button>
      </div>
      <div className="mt-6 flex justify-center">
        <motion.button 
          onClick={onBookTickets}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 text-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={selectedSeats.length === 0}
        >
          Book Tickets
        </motion.button>
      </div>
    </div>
  );
}