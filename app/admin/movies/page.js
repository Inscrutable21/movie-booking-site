'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminDashboard from '@/components/AdminDashboard';
import MovieList from '@/components/MovieList';

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const handleEdit = (movie) => {
    window.location.href = `/admin/movies/${movie.id}/edit`;
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      const response = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setMovies(movies.filter(movie => movie.id !== id));
      }
    }
  };

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Admin - Movies</h1>
        <Link href="/admin/movies/add" className="bg-green-500 text-white px-4 py-2 rounded mb-6 inline-block">
          Add New Movie
        </Link>
        <MovieList 
          movies={movies} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          isAdminView={true} 
        />
      </div>
    </div>
  );
}