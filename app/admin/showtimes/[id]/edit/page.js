'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import AdminShowtimeForm from '@/components/AdminShowtimeForm';

export default function EditShowtime({ params }) {
  const [showtime, setShowtime] = useState(null);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    Promise.all([
      fetch(`/api/showtimes/${id}`).then(res => res.json()),
      fetch('/api/movies').then(res => res.json()),
      fetch('/api/theatres').then(res => res.json())
    ]).then(([showtimeData, moviesData, theatresData]) => {
      setShowtime(showtimeData);
      setMovies(moviesData);
      setTheatres(theatresData);
    }).catch(err => setError('Failed to fetch data'));
  }, [id]);

  const handleSubmit = async (showtimeData) => {
    try {
      const response = await fetch(`/api/showtimes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(showtimeData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || 'Failed to update showtime');
      }

      console.log('Showtime updated:', result);
      router.push('/admin/showtimes');
    } catch (err) {
      setError(err.message);
      console.error('Error updating showtime:', err);
    }
  };

  const handleCancel = () => {
    router.push('/admin/showtimes');
  };

  if (error) return <div>Error: {error}</div>;
  if (!showtime) return <div>Loading...</div>;

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Edit Showtime</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <AdminShowtimeForm 
          onSubmit={handleSubmit} 
          initialData={showtime} 
          onCancel={handleCancel}
          movies={movies}
          theatres={theatres}
        />
      </div>
    </div>
  );
}