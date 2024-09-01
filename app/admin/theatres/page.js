'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminDashboard from '@/components/AdminDashboard';
import TheatreList from '@/components/TheatreList';

export default function AdminTheatres() {
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    fetch('/api/theatres')
      .then(res => res.json())
      .then(data => setTheatres(data));
  }, []);

  const handleEdit = (theatre) => {
    window.location.href = `/admin/theatres/${theatre.id}/edit`;
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this theatre?')) {
      const response = await fetch(`/api/theatres/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setTheatres(theatres.filter(theatre => theatre.id !== id));
      }
    }
  };

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Admin - Theatres</h1>
        <Link href="/admin/theatres/add" className="bg-green-500 text-white px-4 py-2 rounded mb-6 inline-block">
          Add New Theatre
        </Link>
        <TheatreList 
          theatres={theatres} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          isAdminView={true} 
        />
      </div>
    </div>
  );
}