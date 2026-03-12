import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex items-center justify-center py-12 px-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-luxe-gold/30 to-amber-300 flex items-center justify-center mx-auto mb-8"
      >
        <User className="text-luxe-gold text-2xl drop-shadow-sm" />
      </motion.div>
      <p className="text-xl font-medium text-gray-600 text-center font-serif">Loading your profile...</p>
    </div>
  );
}

