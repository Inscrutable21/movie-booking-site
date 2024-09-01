import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function PaymentForm({ totalAmount, onSubmit }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cardNumber, expiryDate, cvv, name });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Payment Details</h2>
      <div className="mb-4">
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name on Card</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>
      <div className="text-xl font-bold mb-6 text-white">Total Amount: ${totalAmount.toFixed(2)}</div>
      <motion.button
        type="submit"
        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 text-lg font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Pay Now
      </motion.button>
    </form>
  );
}