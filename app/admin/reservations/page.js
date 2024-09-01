'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations');
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    router.push(`/admin/reservations/${id}`);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reservations</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Movie</th>
            <th className="py-2 px-4 border-b">Theatre</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Total Amount</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="py-2 px-4 border-b">{reservation.id}</td>
              <td className="py-2 px-4 border-b">{reservation.user.name}</td>
              <td className="py-2 px-4 border-b">{reservation.showtime.movie.title}</td>
              <td className="py-2 px-4 border-b">{reservation.showtime.theatre.name}</td>
              <td className="py-2 px-4 border-b">{new Date(reservation.showtime.datetime).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{reservation.status}</td>
              <td className="py-2 px-4 border-b">${reservation.totalAmount.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleViewDetails(reservation.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}