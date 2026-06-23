// app/components/CollegeCard.tsx
'use client';

import { College } from '@/lib/types';
import Link from 'next/link';
import { Heart, MapPin, Zap } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

interface CollegeCardProps {
  college: College;
  saved?: boolean;
  onSave?: (collegeId: string) => Promise<void>;
  onRemove?: (collegeId: string) => Promise<void>;
}

export function CollegeCard({ college, saved = false, onSave, onRemove }: CollegeCardProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to save colleges');
      return;
    }

    setIsSaving(true);
    try {
      if (saved && onRemove) {
        await onRemove(college.id);
      } else if (!saved && onSave) {
        await onSave(college.id);
      }
    } catch (error) {
      console.error('Error saving college:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Link href={`/colleges/${college.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">{college.name}</h3>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="ml-2"
          >
            <Heart
              size={20}
              className={saved ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}
            />
          </button>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin size={16} className="mr-1" />
          {college.city}, {college.state}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div>
            <p className="text-gray-600">Fees</p>
            <p className="font-semibold text-gray-900">₹{college.fees.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Rating</p>
            <p className="font-semibold text-gray-900">{college.rating}/5</p>
          </div>
          <div>
            <p className="text-gray-600">Placements</p>
            <p className="font-semibold text-gray-900">{college.placements}%</p>
          </div>
          <div>
            <p className="text-gray-600">Avg Package</p>
            <p className="font-semibold text-gray-900">₹{college.avgPackage}L</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{college.overview}</p>
      </div>
    </Link>
  );
}
