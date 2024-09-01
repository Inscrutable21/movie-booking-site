// In your page component (e.g., booking/[movieId]/[theatreId]/[showtimeId]/page.js)
'use client'
import { useState, useEffect } from 'react';
import SeatSelector from '@/components/SeatSelector';

export default function BookingPage({ params }) {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/showtimes/${params.showtimeId}/seats`);
        if (!response.ok) throw new Error('Failed to fetch seats');
        const data = await response.json();
        setSeats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [params.showtimeId]);

  if (loading) return <div>Loading seats...</div>;
  if (error) return <div>Error: {error}</div>;

  return <SeatSelector seats={seats} onSelect={(selectedSeats) => console.log(selectedSeats)} />;
}