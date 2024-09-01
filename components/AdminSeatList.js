import Link from 'next/link';

export default function AdminSeatList({ seats, onDelete }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Theatre</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Row</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 divide-y divide-gray-200">
        {seats.map(seat => (
          <tr key={seat.id}>
            <td className="px-6 py-4 whitespace-nowrap">{seat.theatre.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{seat.row}</td>
            <td className="px-6 py-4 whitespace-nowrap">{seat.number}</td>
            <td className="px-6 py-4 whitespace-nowrap">{seat.type}</td>
            <td className="px-6 py-4 whitespace-nowrap">${seat.price.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{seat.isAvailable ? 'Yes' : 'No'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Link href={`/admin/seats/${seat.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                Edit
              </Link>
              <button onClick={() => onDelete(seat.id)} className="text-red-600 hover:text-red-900">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}