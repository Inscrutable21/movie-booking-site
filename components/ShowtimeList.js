'use client'
import { useState } from 'react';

export default function ShowtimeList({ showtimes, onEdit, onDelete, isAdminView }) {
  const [filter, setFilter] = useState({ movie: '', theatre: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredShowtimes = showtimes.filter(showtime => 
    (filter.movie === '' || showtime.movie.title.toLowerCase().includes(filter.movie.toLowerCase())) &&
    (filter.theatre === '' || showtime.theatre.name.toLowerCase().includes(filter.theatre.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          name="movie"
          placeholder="Filter by movie"
          value={filter.movie}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          name="theatre"
          placeholder="Filter by theatre"
          value={filter.theatre}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Movie</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Theatre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
            {isAdminView && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-200">
          {filteredShowtimes.map((showtime) => (
            <tr key={showtime.id}>
              <td className="px-6 py-4 whitespace-nowrap">{showtime.movie.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{showtime.theatre.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(showtime.datetime).toLocaleString()}</td>
              {isAdminView && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => onEdit(showtime)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => onDelete(showtime.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
