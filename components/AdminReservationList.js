'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AdminReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchReservations();
  }, []);

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Movie</th>
            <th className="px-4 py-2">Theatre</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Seats</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="border-b border-gray-700">
              <td className="px-4 py-2">{reservation.id}</td>
              <td className="px-4 py-2">{reservation.user.name}</td>
              <td className="px-4 py-2">{reservation.showtime.movie.title}</td>
              <td className="px-4 py-2">{reservation.showtime.theatre.name}</td>
              <td className="px-4 py-2">{new Date(reservation.showtime.datetime).toLocaleString()}</td>
              <td className="px-4 py-2">{reservation.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}</td>
              <td className="px-4 py-2">{reservation.status}</td>
              <td className="px-4 py-2">
                <Link href={`/admin/reservations/${reservation.id}`} className="text-blue-400 hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReservationList;