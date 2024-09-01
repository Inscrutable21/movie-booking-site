'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AdminDashboard from '@/components/AdminDashboard';
import AdminMovieForm from '@/components/AdminMovieForm';

export default function AddMovie() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (movieData) => {
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || 'Failed to add movie');
      }

      console.log('Movie added:', result);
      router.push('/admin/movies');
    } catch (err) {
      setError(err.message);
      console.error('Error adding movie:', err);
    }
  };

  const handleCancel = () => {
    router.push('/admin/movies');
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-8">
            <h1 className="text-3xl font-bold text-white">Add New Movie</h1>
            <p className="text-blue-200 mt-2">Fill in the details below to add a new movie to the database.</p>
          </div>
          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 mb-6"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </motion.div>
            )}
            <AdminMovieForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}