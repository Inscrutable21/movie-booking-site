'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

export default function AdminTheatreForm({ onSubmit, initialData, onCancel }) {
  const [theatre, setTheatre] = useState({
    name: '',
    location: '',
    capacity: '',
    image: ''
  })

  useEffect(() => {
    if (initialData) {
      setTheatre(initialData)
    }
  }, [initialData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTheatre(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const submissionData = {
      ...theatre,
      capacity: parseInt(theatre.capacity, 10)
    }
    onSubmit(submissionData)
    if (!initialData) {
      setTheatre({ name: '', location: '', capacity: '', image: '' })
    }
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit} 
      className="bg-gray-900 text-white rounded-lg shadow-md p-6 mb-6"
    >
      <h2 className="text-2xl font-semibold mb-6 text-red-400">{initialData ? 'Edit Theatre' : 'Add New Theatre'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">Theatre Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={theatre.name}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={theatre.location}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={theatre.capacity}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={theatre.image}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
          />
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Image Preview</h3>
        {theatre.image ? (
          <img src={theatre.image} alt="Theatre preview" className="w-full h-48 object-cover rounded-md" />
        ) : (
          <div className="w-full h-48 bg-gray-800 rounded-md flex items-center justify-center">
            <Camera size={48} className="text-gray-600" />
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button" 
          onClick={onCancel} 
          className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
        >
          Cancel
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit" 
          className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
        >
          {initialData ? 'Update Theatre' : 'Add Theatre'}
        </motion.button>
      </div>
    </motion.form>
  )
}