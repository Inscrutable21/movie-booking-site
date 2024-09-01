'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import AdminSeatList from '@/components/AdminSeatList';

export default function AdminSeats() {
  const [seats, setSeats] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [theatresResponse, seatsResponse] = await Promise.all([
          fetch('/api/theatres'),
          fetch('/api/seats')
        ]);

        if (!theatresResponse.ok || !seatsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [theatresData, seatsData] = await Promise.all([
          theatresResponse.json(),
          seatsResponse.json()
        ]);

        setTheatres(theatresData);
        setSeats(seatsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this seat?')) {
      try {
        const response = await fetch(`/api/seats/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete seat');
        }
        setSeats(seats.filter(seat => seat.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredSeats = selectedTheatre
    ? seats.filter(seat => seat.theatre.id === selectedTheatre)
    : seats;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <AdminDashboard />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Admin - Seats</h1>
        <div className="mb-4">
          <label className="block mb-2">Filter by Theatre</label>
          <select
            value={selectedTheatre}
            onChange={(e) => setSelectedTheatre(e.target.value)}
            className="w-full md:w-1/3 p-2 border rounded"
          >
            <option value="">All Theatres</option>
            {theatres.map((theatre) => (
              <option key={theatre.id} value={theatre.id}>{theatre.name}</option>
            ))}
          </select>
        </div>
        <Link href="/admin/seats/add" className="bg-green-500 text-white px-4 py-2 rounded mb-6 inline-block">
          Add New Seats
        </Link>
        <AdminSeatList 
          seats={filteredSeats} 
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}