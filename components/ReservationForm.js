import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ReservationForm = ({ showtime, selectedSeat, userId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId,
          showtimeId: showtime.id, 
          seatRow: selectedSeat.row,
          seatNumber: selectedSeat.number
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

      const data = await response.json();
      router.push(`/booking/${showtime.movieId}/${showtime.theatreId}/${showtime.id}/confirmation?reservationId=${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Confirm Your Reservation</h3>
      <div>
        <p>Movie: {showtime.movie.title}</p>
        <p>Theatre: {showtime.theatre.name}</p>
        <p>Date: {new Date(showtime.datetime).toLocaleDateString()}</p>
        <p>Time: {new Date(showtime.datetime).toLocaleTimeString()}</p>
        <p>Selected Seat: Row {selectedSeat.row}, Number {selectedSeat.number}</p>
        <p>Price: ${selectedSeat.price.toFixed(2)}</p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button 
        type="submit" 
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Confirm Reservation'}
      </button>
    </form>
  );
};

export default ReservationForm;