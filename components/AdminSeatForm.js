// components/AdminSeatForm.js
import React, { useState } from 'react';

const AdminSeatForm = ({ onSubmit, onCancel, theatres, initialData = {} }) => {
  const [formData, setFormData] = useState({
    theatreId: initialData.theatreId || '',
    standardRows: initialData.standardRows || 0,
    standardColumns: initialData.standardColumns || 0,
    premiumRows: initialData.premiumRows || 0,
    premiumColumns: initialData.premiumColumns || 0,
    vipRows: initialData.vipRows || 0,
    vipColumns: initialData.vipColumns || 0,
    standardPrice: initialData.standardPrice || '',
    premiumPrice: initialData.premiumPrice || '',
    vipPrice: initialData.vipPrice || '',
  });

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Theatre</label>
        <select
          name="theatreId"
          value={formData.theatreId}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-800"
          required
        >
          <option value="">Select a theatre</option>
          {theatres.map((theatre) => (
            <option key={theatre.id} value={theatre.id}>{theatre.name}</option>
          ))}
        </select>
      </div>
      
      {/* Standard Seats */}
      <div>
        <h3 className="font-bold">Standard Seats</h3>
        <div className="flex space-x-4">
          <div>
            <label className="block mb-2">Rows</label>
            <input
              type="number"
              name="standardRows"
              value={formData.standardRows}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Columns</label>
            <input
              type="number"
              name="standardColumns"
              value={formData.standardColumns}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="standardPrice"
              value={formData.standardPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              step="0.01"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Premium Seats */}
      <div>
        <h3 className="font-bold">Premium Seats</h3>
        <div className="flex space-x-4">
          <div>
            <label className="block mb-2">Rows</label>
            <input
              type="number"
              name="premiumRows"
              value={formData.premiumRows}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Columns</label>
            <input
              type="number"
              name="premiumColumns"
              value={formData.premiumColumns}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="premiumPrice"
              value={formData.premiumPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              step="0.01"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* VIP Seats */}
      <div>
        <h3 className="font-bold">VIP Seats</h3>
        <div className="flex space-x-4">
          <div>
            <label className="block mb-2">Rows</label>
            <input
              type="number"
              name="vipRows"
              value={formData.vipRows}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Columns</label>
            <input
              type="number"
              name="vipColumns"
              value={formData.vipColumns}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="vipPrice"
              value={formData.vipPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              step="0.01"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-gray-800 px-4 py-2 rounded">
          {initialData.id ? 'Update Seats' : 'Add Seats'}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminSeatForm;