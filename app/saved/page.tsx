// app/saved/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { CollegeCard } from '@/app/components/CollegeCard';
import { College } from '@/lib/types';
import Link from 'next/link';

export default function SavedPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchSavedColleges();
  }, [user, token]);

  const fetchSavedColleges = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/saved-colleges', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setColleges(data.map((sc: any) => sc.college));
      }
    } catch (error) {
      console.error('Error fetching saved colleges:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (collegeId: string) => {
    if (!token) return;
    try {
      await fetch('/api/saved-colleges', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ collegeId })
      });
      setColleges(colleges.filter((c) => c.id !== collegeId));
    } catch (error) {
      console.error('Error removing college:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Colleges</h1>
        <p className="text-gray-600">Your personal collection of colleges to explore</p>
      </div>

      {colleges.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                saved={true}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <Link
            href="/comparisons"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Compare Saved Colleges
          </Link>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No saved colleges yet</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Colleges
          </Link>
        </div>
      )}
    </div>
  );
}
