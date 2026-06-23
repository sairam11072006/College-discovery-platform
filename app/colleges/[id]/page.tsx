// app/colleges/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { College } from '@/lib/types';
import { ArrowLeft, Heart, MapPin, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [college, setCollege] = useState<College | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    fetchCollege();
    if (token) checkIfSaved();
  }, [params.id, token]);

  const fetchCollege = async () => {
    try {
      const res = await fetch(`/api/colleges/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setCollege(data);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching college:', error);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfSaved = async () => {
    try {
      const res = await fetch('/api/saved-colleges', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.some((sc: any) => sc.collegeId === params.id));
      }
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert('Please login to save colleges');
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        await fetch('/api/saved-colleges', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ collegeId: params.id })
        });
        setIsSaved(false);
      } else {
        await fetch('/api/saved-colleges', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ collegeId: params.id })
        });
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving college:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">College not found</p>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{college.name}</h1>
            <div className="flex items-center text-gray-600 gap-2">
              <MapPin size={20} />
              <span>
                {college.city}, {college.state}
              </span>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Heart
              size={24}
              className={isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pt-6 border-t">
          <div>
            <p className="text-gray-600 text-sm">Rating</p>
            <p className="text-2xl font-bold text-gray-900">{college.rating}/5</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Fees</p>
            <p className="text-2xl font-bold text-gray-900">₹{college.fees.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Placements</p>
            <p className="text-2xl font-bold text-gray-900">{college.placements}%</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Avg Package</p>
            <p className="text-2xl font-bold text-gray-900">₹{college.avgPackage}L</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t">
          <div>
            <p className="text-gray-600 text-sm mb-1">Cutoff Rank</p>
            <p className="text-xl font-semibold text-gray-900">{college.cutoff}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Reviews</p>
            <p className="text-xl font-semibold text-gray-900">{college.reviews}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{college.overview}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={24} />
              Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {college.courses.map((course, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <p className="text-gray-900 font-medium">{course}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Placement Rate</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${college.placements}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Total Courses</span>
                <p className="text-xl font-bold text-gray-900">{college.courses.length}</p>
              </div>
              <div className="pt-4 border-t">
                <Link
                  href="/comparisons"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Compare Colleges
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
