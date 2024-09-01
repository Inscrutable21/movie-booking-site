'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReservationDetailsPage({ params }) {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetchReservationDetails();
  }, [id]);

  const fetchReservationDetails = async () => {
    try {
      const response = await fetch(`/api/reservations/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reservation details');
      }
      const data = await response.json();
      setReservation(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update reservation status');
      }
      fetchReservationDetails();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );
  
  if (!reservation) return <div className="text-center">Reservation not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reservation Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4"><strong>ID:</strong> {reservation.id}</div>
        <div className="mb-4"><strong>User:</strong> {reservation.user.name}</div>
        <div className="mb-4"><strong>Movie:</strong> {reservation.showtime.movie.title}</div>
        <div className="mb-4"><strong>Theatre:</strong> {reservation.showtime.theatre.name}</div>
        <div className="mb-4"><strong>Date:</strong> {new Date(reservation.showtime.datetime).toLocaleString()}</div>
        <div className="mb-4"><strong>Status:</strong> {reservation.status}</div>
        <div className="mb-4"><strong>Total Amount:</strong> ${reservation.totalAmount.toFixed(2)}</div>
        <div className="mb-4">
          <strong>Seats:</strong>
          <ul className="list-disc list-inside">
            {reservation.seats.map((seat) => (
              <li key={seat.id}>{seat.row}{seat.number} - {seat.type}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4"><strong>Created At:</strong> {new Date(reservation.createdAt).toLocaleString()}</div>
        <div className="mb-4"><strong>Updated At:</strong> {new Date(reservation.updatedAt).toLocaleString()}</div>
      </div>
      <div className="flex space-x-4">
        <button 
          onClick={() => handleStatusChange('confirmed')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm
        </button>
        <button 
          onClick={() => handleStatusChange('cancelled')}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button 
          onClick={() => router.push('/admin/reservations')}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to List
        </button>
      </div>
    </div>
  );
}