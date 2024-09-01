'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SeatSelector from '@/components/SeatSelector';
import { motion } from 'framer-motion';
import { Clock, MapPin, Calendar, Users } from 'lucide-react';

export default function BookingPage({ params }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const router = useRouter();
  const { movieId, theatreId, showtimeId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/showtimes/${showtimeId}/seats`);
        if (!response.ok) {
          throw new Error('Failed to fetch seats');
        }
        const data = await response.json();
        setSeats(data.seats);
        setShowtime(data.showtime);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showtimeId]);

  const handleSeatSelection = (seat) => {
    setSelectedSeats(prevSelected => {
      const isAlreadySelected = prevSelected.some(s => s.id === seat.id);
      if (isAlreadySelected) {
        return prevSelected.filter(s => s.id !== seat.id);
      } else {
        return [...prevSelected, seat];
      }
    });
  };

  const handleBookTickets = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    
    // Navigate to the confirmation page
    router.push(`/booking/${movieId}/${theatreId}/${showtimeId}/confirmation?seats=${selectedSeats.map(s => s.id).join(',')}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {showtime && showtime.movie && (
            <>
              <div className="lg:w-1/3">
                <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-2xl mb-6">
                  {showtime.movie.poster.startsWith('http') ? (
                    <img
                      src={showtime.movie.poster}
                      alt={showtime.movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={showtime.movie.poster}
                      alt={showtime.movie.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h1 className="text-3xl font-bold mb-2">{showtime.movie.title}</h1>
                    <p className="text-sm opacity-75">{showtime.movie.genre}</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-red-500" />
                      <p><strong>Theatre:</strong> {showtime.theatre.name}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-red-500" />
                      <p><strong>Date:</strong> {new Date(showtime.datetime).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-red-500" />
                      <p><strong>Time:</strong> {new Date(showtime.datetime).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-3xl font-bold mb-6">Select Your Seats</h2>
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
                  <SeatSelector
                    seats={seats}
                    onSelect={handleSeatSelection}
                    selectedSeats={selectedSeats}
                    onBookTickets={handleBookTickets}
                  />
                </div>
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Selected Seats</h3>
                  {selectedSeats.length > 0 ? (
                    <div className="space-y-2">
                      {selectedSeats.map(seat => (
                        <div key={seat.id} className="flex justify-between items-center">
                          <span>{seat.row}{seat.number} - {seat.type}</span>
                          <span>${seat.price.toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold">${selectedSeats.reduce((total, seat) => total + seat.price, 0).toFixed(2)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">No seats selected</p>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}