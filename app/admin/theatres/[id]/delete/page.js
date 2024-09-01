'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';

export default function DeleteTheatre({ params }) {
  const router = useRouter();
  const { id } = params;
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/theatres/${id}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/admin/theatres');
      } else {
        throw new Error('Failed to delete theatre');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Delete Theatre</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p>Are you sure you want to delete this theatre?</p>
        <div className="mt-4">
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Yes, Delete</button>
          <button onClick={() => router.back()} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}