'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function WelcomeMessage() {
  const { data: session } = useSession();

  return (
    <motion.div
      className="mb-8 text-center text-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {session ? (
        <p>Hello, <span className="font-bold">{session.user.name}</span>! Ready to immerse yourself in cinematic wonders?</p>
      ) : (
        <p>Please <a href="/login" className="text-purple-400 hover:underline">log in</a> to unlock the full movie-booking experience.</p>
      )}
    </motion.div>
  );
}