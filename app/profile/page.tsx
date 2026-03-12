"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import '@/app/globals.css';

export default function ProfilePage() {
  const { user, loading, fetchProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return null; // Handled by loading.tsx
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-luxe-gold transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-xl border border-luxe-gold/20 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-luxe-gold/10 to-amber-100/50 border-b border-luxe-gold/10 p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-luxe-gold/30 to-amber-300 rounded-full mx-auto mb-6 flex items-center justify-center">
              <User size={48} className="text-luxe-gold drop-shadow-sm" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-r from-luxe-black via-gray-800 to-slate-800 bg-clip-text text-transparent mb-2">
              {user.fullName}
            </h1>
            <p className="text-lg text-gray-600 font-medium">Welcome back!</p>
          </div>

          {/* Profile Info */}
          <div className="p-8 space-y-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 p-6 bg-gray-50/50 rounded-2xl border border-gray-200/50 hover:border-luxe-gold/30 transition-all group"
            >
              <Mail size={24} className="text-luxe-gold flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Email Address</p>
                <p className="text-xl font-semibold text-luxe-black truncate">{user.email}</p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4 border-t border-gray-100 flex gap-4"
            >
              <Link
                href="/profile/edit" // Future edit page
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-luxe-gold to-amber-500 hover:from-luxe-gold/90 hover:to-amber-400 text-white font-medium py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap"
              >
                <Edit3 size={20} />
                Edit Profile
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Element */}
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-luxe-gold/5 rounded-full blur-3xl -mr-36 -translate-y-1/2 hidden lg:block" />
      </div>
    </div>
  );
}

