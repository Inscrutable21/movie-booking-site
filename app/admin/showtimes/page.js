'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminDashboard from '@/components/AdminDashboard';
import ShowtimeList from '@/components/ShowtimeList';

export default function AdminShowtimes() {
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    fetch('/api/showtimes')
      .then(res => res.json())
      .then(data => setShowtimes(data));
  }, []);

  const handleEdit = (showtime) => {
    window.location.href = `/admin/showtimes/${showtime.id}/edit`;
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this showtime?')) {
      const response = await fetch(`/api/showtimes/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setShowtimes(showtimes.filter(showtime => showtime.id !== id));
      }
    }
  };

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Admin - Showtimes</h1>
        <Link href="/admin/showtimes/add" className="bg-green-500 text-white px-4 py-2 rounded mb-6 inline-block">
          Add New Showtime
        </Link>
        <ShowtimeList 
          showtimes={showtimes} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          isAdminView={true} 
        />
      </div>
    </div>
  );
}