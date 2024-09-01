'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import AdminTheatreForm from '@/components/AdminTheatreForm';

export default function AddTheatre() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (theatreData) => {
    try {
      const response = await fetch('/api/theatres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theatreData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || 'Failed to add theatre');
      }

      console.log('Theatre added:', result);
      router.push('/admin/theatres');
    } catch (err) {
      setError(err.message);
      console.error('Error adding theatre:', err);
    }
  };

  const handleCancel = () => {
    router.push('/admin/theatres');
  };

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Add New Theatre</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <AdminTheatreForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}