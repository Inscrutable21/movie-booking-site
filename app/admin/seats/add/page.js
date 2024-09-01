'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import AdminSeatForm from '@/components/AdminSeatForm';

export default function AddSeat() {
  const router = useRouter();
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/theatres');
        if (!response.ok) {
          throw new Error('Failed to fetch theatres');
        }
        const data = await response.json();
        setTheatres(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, []);

  const handleSubmit = async (seatData) => {
    try {
      const response = await fetch('/api/seats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seatData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to add seats');
      }

      router.push('/admin/seats');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    router.push('/admin/seats');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Add New Seats</h1>
        <AdminSeatForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          theatres={theatres} 
        />
      </div>
    </div>
  );
}