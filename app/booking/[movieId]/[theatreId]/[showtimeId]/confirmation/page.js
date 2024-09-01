// app/booking/[movieId]/[theatreId]/[showtimeId]/confirmation/page.js
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Calendar, User, Ticket } from 'lucide-react';

export default function ConfirmationPage({ params }) {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      router.push('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black text-white flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-red-500"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
          Payment Confirmation
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium mb-1 text-red-300">Card Number</label>
            <div className="relative">
              <CreditCard className="absolute top-3 left-3 text-red-400" size={20} />
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full pl-10 pr-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="expiryDate" className="block text-sm font-medium mb-1 text-red-300">Expiry Date</label>
              <div className="relative">
                <Calendar className="absolute top-3 left-3 text-red-400" size={20} />
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full pl-10 pr-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="cvv" className="block text-sm font-medium mb-1 text-red-300">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1 text-red-300">Name on Card</label>
            <div className="relative">
              <User className="absolute top-3 left-3 text-red-400" size={20} />
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={paymentDetails.nameOnCard}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:from-red-800 hover:to-red-600 transform hover:scale-105"
          >
            Confirm Payment
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: -90 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full relative overflow-hidden border border-red-500"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-700 to-red-500"></div>
              <Ticket className="text-red-500 w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Payment Successful!</h2>
              <p className="text-xl mb-4 text-gray-300">Your ticket has been booked.</p>
              <p className="text-lg text-gray-400">Redirecting to home page...</p>
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-700 to-red-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 10 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}