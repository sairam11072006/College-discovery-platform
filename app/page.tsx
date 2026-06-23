// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { SearchFilters } from './components/SearchFilters';
import { CollegeCard } from './components/CollegeCard';
import { useAuth } from './context/AuthContext';
import { College, CollegeFilters } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, pages: 0, current: 1, limit: 10 });
  const [currentFilters, setCurrentFilters] = useState<CollegeFilters>({});
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchColleges({ page: 1 });
    if (token) fetchSavedColleges();
  }, [token]);

  const fetchColleges = async (filters: CollegeFilters) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.city) params.append('city', filters.city);
      if (filters.minFees) params.append('minFees', filters.minFees.toString());
      if (filters.maxFees) params.append('maxFees', filters.maxFees.toString());
      if (filters.minRating) params.append('minRating', filters.minRating.toString());
      params.append('page', (filters.page || 1).toString());
      params.append('limit', '10');

      const res = await fetch(`/api/colleges?${params}`);
      const data = await res.json();
      setColleges(data.colleges);
      setPagination(data.pagination);
      setCurrentFilters(filters);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedColleges = async () => {
    try {
      const res = await fetch('/api/saved-colleges', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSavedColleges(data.map((sc: any) => sc.collegeId));
      }
    } catch (error) {
      console.error('Error fetching saved colleges:', error);
    }
  };

  const handleSave = async (collegeId: string) => {
    if (!token) return;
    try {
      await fetch('/api/saved-colleges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ collegeId })
      });
      setSavedColleges([...savedColleges, collegeId]);
    } catch (error) {
      console.error('Error saving college:', error);
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
      setSavedColleges(savedColleges.filter((id) => id !== collegeId));
    } catch (error) {
      console.error('Error removing college:', error);
    }
  };

  return (
    <div>
      <SearchFilters onSearch={fetchColleges} isLoading={isLoading} />

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading colleges...</p>
        </div>
      ) : colleges.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                saved={savedColleges.includes(college.id)}
                onSave={handleSave}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() =>
                  fetchColleges({ ...currentFilters, page: pagination.current - 1 })
                }
                disabled={pagination.current === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: pagination.pages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => fetchColleges({ ...currentFilters, page: i + 1 })}
                    className={`px-3 py-2 rounded-lg ${
                      pagination.current === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  fetchColleges({ ...currentFilters, page: pagination.current + 1 })
                }
                disabled={pagination.current === pagination.pages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No colleges found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
