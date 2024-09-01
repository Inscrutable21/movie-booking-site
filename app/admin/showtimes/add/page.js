'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import AdminShowtimeForm from '@/components/AdminShowtimeForm';

export default function AddShowtime() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
    fetch('/api/theatres')
      .then(res => res.json())
      .then(data => setTheatres(data));
  }, []);

  const handleSubmit = async (showtimeData) => {
    try {
      const response = await fetch('/api/showtimes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(showtimeData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || 'Failed to add showtime');
      }

      console.log('Showtime added:', result);
      router.push('/admin/showtimes');
    } catch (err) {
      setError(err.message);
      console.error('Error adding showtime:', err);
    }
  };

  const handleCancel = () => {
    router.push('/admin/showtimes');
  };

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Add New Showtime</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <AdminShowtimeForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
          movies={movies}
          theatres={theatres}
        />
      </div>
    </div>
  );
}