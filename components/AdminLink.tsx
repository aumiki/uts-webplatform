"use client";

import Link from 'next/link';
import { Settings, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLink() {
  const { user } = useAuth();

  return (
    <Link 
      href="/products" 
      className="flex items-center gap-2 p-2 rounded-lg hover:bg-luxe-gold/10 transition-colors group relative"
      title="Admin Panel - Product Management"
    >
      <Package size={18} strokeWidth={2} className="group-hover:text-luxe-gold transition-colors flex-shrink-0" />
    </Link>
  );
}

