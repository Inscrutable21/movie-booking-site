'use client'
import { useState, useEffect } from 'react';

export default function AdminShowtimeForm({ onSubmit, initialData, onCancel, movies, theatres }) {
  const [formData, setFormData] = useState({
    movieId: '',
    theatreId: '',
    datetime: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        movieId: initialData.movieId,
        theatreId: initialData.theatreId,
        datetime: new Date(initialData.datetime).toISOString().slice(0, 16),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="movieId" className="block text-sm font-medium text-gray-700">Movie</label>
        <select
          id="movieId"
          name="movieId"
          value={formData.movieId}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-800 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          required
        >
          <option value="">Select a movie</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>{movie.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="theatreId" className="block text-sm font-medium text-gray-700">Theatre</label>
        <select
          id="theatreId"
          name="theatreId"
          value={formData.theatreId}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-800 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          required
        >
          <option value="">Select a theatre</option>
          {theatres.map((theatre) => (
            <option key={theatre.id} value={theatre.id}>{theatre.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">Date and Time</label>
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          value={formData.datetime}
          onChange={handleChange}
          className="mt-1 block w-full border bg-gray-800 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Update Showtime' : 'Add Showtime'}
        </button>
      </div>
    </form>
  );
}