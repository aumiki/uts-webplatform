'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 text-center">
        <AlertCircle size={64} className="text-rose-400 mx-auto mb-6" />
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-8 font-medium">
          Could not load your profile. Please try again.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full bg-luxe-gold hover:bg-amber-500 text-white font-medium py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Try Again
          </button>
          <Link
            href="/login"
            className="w-full block text-center text-gray-600 hover:text-luxe-gold font-medium py-3 px-6 rounded-2xl border-2 border-transparent hover:border-luxe-gold/50 transition-all duration-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

