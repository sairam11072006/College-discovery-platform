// app/components/SearchFilters.tsx
'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CollegeFilters } from '@/lib/types';

interface SearchFiltersProps {
  onSearch: (filters: CollegeFilters) => void;
  isLoading?: boolean;
}

export function SearchFilters({ onSearch, isLoading }: SearchFiltersProps) {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [minFees, setMinFees] = useState('');
  const [maxFees, setMaxFees] = useState('');
  const [minRating, setMinRating] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      search: search || undefined,
      city: city || undefined,
      minFees: minFees ? parseInt(minFees) : undefined,
      maxFees: maxFees ? parseInt(maxFees) : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
      page: 1
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSearch}>
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Filter size={20} />
            Filters
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Min Fees (₹)"
              value={minFees}
              onChange={(e) => setMinFees(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max Fees (₹)"
              value={maxFees}
              onChange={(e) => setMaxFees(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Min Rating"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              step="0.1"
              min="0"
              max="5"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => {
                setCity('');
                setMinFees('');
                setMaxFees('');
                setMinRating('');
                setSearch('');
                onSearch({ page: 1 });
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
