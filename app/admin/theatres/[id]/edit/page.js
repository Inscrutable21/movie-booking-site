'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import AdminTheatreForm from '@/components/AdminTheatreForm';


export default function EditTheatre({ params }) {
  const [theatre, setTheatre] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetch(`/api/theatres/${id}`)
      .then(res => res.json())
      .then(data => setTheatre(data))
      .catch(err => setError('Failed to fetch theatre'));
  }, [id]);

  const handleSubmit = async (theatreData) => {
    try {
      const response = await fetch(`/api/theatres/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theatreData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || 'Failed to update theatre');
      }

      console.log('Theatre updated:', result);
      router.push('/admin/theatres');
    } catch (err) {
      setError(err.message);
      console.error('Error updating theatre:', err);
    }
  };

  const handleCancel = () => {
    router.push('/admin/theatres');
  };

  if (error) return <div>Error: {error}</div>;
  if (!theatre) return <div>Loading...</div>;

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Edit Theatre: {theatre.name}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <AdminTheatreForm onSubmit={handleSubmit} initialData={theatre} onCancel={handleCancel} />
      </div>
    </div>
  );
}