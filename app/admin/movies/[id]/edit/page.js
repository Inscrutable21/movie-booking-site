'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import AdminMovieForm from '@/components/AdminMovieForm';

export default function EditMovie({ params }) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => setError('Failed to fetch movie'));
  }, [id]);

  const handleSubmit = async (movieData) => {
    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || 'Failed to update movie');
      }

      console.log('Movie updated:', result);
      router.push('/admin/movies');
    } catch (err) {
      setError(err.message);
      console.error('Error updating movie:', err);
    }
  };

  const handleCancel = () => {
    router.push('/admin/movies');
  };

  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Edit Movie: {movie.title}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <AdminMovieForm onSubmit={handleSubmit} initialData={movie} onCancel={handleCancel} />
      </div>
    </div>
  );
}