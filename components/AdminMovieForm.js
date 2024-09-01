'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AdminMovieForm({ onSubmit, initialData, onCancel }) {
  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    duration: '',
    description: '',
    poster: '',
    rating: '',
    trailerLink: ''
  })

  useEffect(() => {
    if (initialData) {
      setMovie(initialData)
    }
  }, [initialData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMovie(prev => ({ 
      ...prev, 
      [name]: name === 'duration' ? parseInt(value, 10) || '' : 
               name === 'rating' ? parseFloat(value) || '' : value 
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(movie)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-200">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-200">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movie.genre}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-200">Duration (minutes)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={movie.duration}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="poster" className="block text-sm font-medium text-gray-200">Poster URL</label>
          <input
            type="url"
            id="poster"
            name="poster"
            value={movie.poster}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-200">Rating (0-10)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={movie.rating}
            onChange={handleInputChange}
            min="0"
            max="10"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="trailerLink" className="block text-sm font-medium text-gray-200">Trailer Link</label>
          <input
            type="url"
            id="trailerLink"
            name="trailerLink"
            value={movie.trailerLink}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-200">Description</label>
        <textarea
          id="description"
          name="description"
          value={movie.description}
          onChange={handleInputChange}
          rows="4"
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          {initialData ? 'Update Movie' : 'Add Movie'}
        </motion.button>
      </div>
    </motion.form>
  )
}