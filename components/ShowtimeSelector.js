'use client'
import { useState, useEffect } from 'react';

export default function ShowtimeSelector({ movieId, theatreId, onSelect }) {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState('');

  useEffect(() => {
    if (movieId && theatreId) {
      fetch(`/api/movies/${movieId}/theatres/${theatreId}/showtimes`)
        .then(res => res.json())
        .then(data => setShowtimes(data))
        .catch(error => console.error('Error fetching showtimes:', error));
    }
  }, [movieId, theatreId]);

  const handleShowtimeChange = (e) => {
    const showtimeId = e.target.value;
    setSelectedShowtime(showtimeId);
    onSelect(showtimeId);
  };

  return (
    <div className="mb-4">
      <label htmlFor="showtime" className="block text-sm font-medium text-gray-700 mb-2">
        Select Showtime
      </label>
      <select
        id="showtime"
        name="showtime"
        value={selectedShowtime}
        onChange={handleShowtimeChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Choose a showtime</option>
        {showtimes.map((showtime) => (
          <option key={showtime.id} value={showtime.id}>
            {new Date(showtime.datetime).toLocaleString()}
          </option>
        ))}
      </select>
    </div>
  );
}