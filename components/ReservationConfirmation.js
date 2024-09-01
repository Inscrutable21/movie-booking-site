import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ReservationConfirmation = ({ reservationId }) => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`/api/reservations/${reservationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reservation');
        }
        const data = await response.json();
        setReservation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (reservationId) {
      fetchReservation();
    }
  }, [reservationId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!reservation) return <p>No reservation found</p>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Reservation Confirmed!</h2>
      <p className="text-lg mb-2">Reservation ID: {reservation.id}</p>
      <p>Movie: {reservation.showtime.movie.title}</p>
      <p>Theatre: {reservation.showtime.theatre.name}</p>
      <p>Date: {new Date(reservation.showtime.datetime).toLocaleDateString()}</p>
      <p>Time: {new Date(reservation.showtime.datetime).toLocaleTimeString()}</p>
      <p>Seats: {reservation.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}</p>
      <p className="mt-4 font-semibold">Total Price: ${reservation.totalPrice.toFixed(2)}</p>
      <p className="mt-4 text-sm text-gray-400">Please arrive at least 15 minutes before the show starts. Enjoy your movie!</p>
    </motion.div>
  );
};

export default ReservationConfirmation;