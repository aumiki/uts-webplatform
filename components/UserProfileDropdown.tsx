"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, User as UserIcon, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userFullName: string;
}

export default function UserProfileDropdown({ 
  isOpen, 
  onClose, 
  userFullName 
}: UserProfileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={dropdownRef}
          initial={{ opacity: 0, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-luxe-gold/30 rounded-2xl shadow-2xl py-4 px-5 z-[1000]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-luxe-gold/20 to-amber-200 rounded-xl flex items-center justify-center">
              <UserIcon size={20} className="text-luxe-gold" />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-luxe-black leading-tight">
                Hi, {userFullName.split(' ')[0]}
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Account
              </p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-3 py-3">
            <div className="flex items-center gap-3 p-3 -m-1 rounded-xl hover:bg-gray-50 transition-colors group cursor-default">
              <Mail size={16} className="text-gray-400 group-hover:text-luxe-gold flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 group-hover:text-gray-700">Email</p>
                <p className="font-medium text-sm text-luxe-black truncate">{userFullName}</p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              await logout();
              onClose();
            }}
            className="w-full flex items-center gap-3 text-left p-3 rounded-xl hover:bg-luxe-gold/10 group transition-all duration-200 text-sm font-medium"
          >
            <LogOut size={18} className="text-gray-500 group-hover:text-rose-500 flex-shrink-0" />
            Sign Out
          </motion.button>

          {/* Decorative line */}
          <div className="absolute -bottom-2 right-4 w-20 h-px bg-gradient-to-r from-transparent via-luxe-gold to-transparent" />
          
          <style jsx>{`
            .backdrop-blur-md {
              -webkit-backdrop-filter: blur(12px);
              backdrop-filter: blur(12px);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

