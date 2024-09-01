'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import AdminSeatForm from '@/components/AdminSeatForm';

export default function EditSeat({ params }) {
  const router = useRouter();
  const [seat, setSeat] = useState(null);
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    fetch(`/api/seats/${params.id}`)
      .then(res => res.json())
      .then(data => setSeat(data));

    fetch('/api/theatres')
      .then(res => res.json())
      .then(data => setTheatres(data));
  }, [params.id]);

  const handleSubmit = async (seatData) => {
    try {
      const response = await fetch(`/api/seats/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seatData)
      });

      if (response.ok) {
        router.push('/admin/seats');
      } else {
        console.error('Failed to update seat');
      }
    } catch (error) {
      console.error('Error updating seat:', error);
    }
  };

  if (!seat) return <div>Loading...</div>;

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Edit Seat</h1>
        <AdminSeatForm onSubmit={handleSubmit} initialData={seat} theatres={theatres} />
      </div>
    </div>
  );
}