// app/components/Header.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { LogOut, User, BookOpen } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="text-blue-600" size={28} />
            <span className="text-xl font-bold text-gray-900">CollegeFind</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/saved"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Saved
                </Link>
                <Link
                  href="/comparisons"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Comparisons
                </Link>
                <div className="flex items-center gap-2 pl-4 border-l">
                  <User size={20} className="text-gray-600" />
                  <span className="text-gray-900 font-medium text-sm">{user.name}</span>
                  <button
                    onClick={logout}
                    className="ml-2 p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
