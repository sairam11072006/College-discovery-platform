// app/comparisons/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { College, Comparison } from '@/lib/types';
import { CollegeComparison } from '@/app/components/CollegeComparison';
import { Plus, Trash2 } from 'lucide-react';

export default function ComparisonsPage() {
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [comparisonName, setComparisonName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchComparisons();
    fetchAllColleges();
  }, [user, token]);

  const fetchComparisons = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/comparisons', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setComparisons(data);
      }
    } catch (error) {
      console.error('Error fetching comparisons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllColleges = async () => {
    try {
      const res = await fetch('/api/colleges?limit=1000');
      if (res.ok) {
        const data = await res.json();
        setColleges(data.colleges);
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const handleCreateComparison = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedColleges.length < 2) {
      alert('Select at least 2 colleges');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/comparisons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: comparisonName || `Comparison ${comparisons.length + 1}`,
          colleges: selectedColleges
        })
      });

      if (res.ok) {
        const data = await res.json();
        setComparisons([data, ...comparisons]);
        setSelectedColleges([]);
        setComparisonName('');
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating comparison:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteComparison = async (comparisonId: string) => {
    if (!confirm('Delete this comparison?')) return;

    try {
      await fetch('/api/comparisons', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: comparisonId })
      });
      setComparisons(comparisons.filter((c) => c.id !== comparisonId));
    } catch (error) {
      console.error('Error deleting comparison:', error);
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">College Comparisons</h1>
          <p className="text-gray-600">Compare colleges side-by-side</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          New Comparison
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create Comparison</h2>
          <form onSubmit={handleCreateComparison}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comparison Name (optional)
              </label>
              <input
                type="text"
                value={comparisonName}
                onChange={(e) => setComparisonName(e.target.value)}
                placeholder="e.g., Engineering Colleges"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Colleges (2-5)
              </label>
              <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg">
                {colleges.map((college) => (
                  <label
                    key={college.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedColleges.includes(college.id)}
                      onChange={(e) => {
                        if (e.target.checked && selectedColleges.length < 5) {
                          setSelectedColleges([...selectedColleges, college.id]);
                        } else if (!e.target.checked) {
                          setSelectedColleges(
                            selectedColleges.filter((id) => id !== college.id)
                          );
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{college.name}</p>
                      <p className="text-sm text-gray-600">{college.city}</p>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Selected: {selectedColleges.length}/5
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSaving || selectedColleges.length < 2}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {isSaving ? 'Creating...' : 'Create Comparison'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSelectedColleges([]);
                  setComparisonName('');
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-8">
        {comparisons.length > 0 ? (
          comparisons.map((comparison) => {
            const comparisonColleges = colleges.filter((c) =>
              comparison.colleges.includes(c.id)
            );
            return (
              <div key={comparison.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{comparison.name}</h2>
                  <button
                    onClick={() => handleDeleteComparison(comparison.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <CollegeComparison colleges={comparisonColleges} />
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No comparisons yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First Comparison
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
