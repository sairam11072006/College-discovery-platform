// app/components/CollegeComparison.tsx
'use client';

import { College } from '@/lib/types';
import { X } from 'lucide-react';

interface CollegeComparisonProps {
  colleges: College[];
  onRemove?: (collegeId: string) => void;
}

export function CollegeComparison({ colleges, onRemove }: CollegeComparisonProps) {
  if (colleges.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No colleges selected for comparison</p>
      </div>
    );
  }

  const metrics = [
    { label: 'Fees', key: 'fees', format: (v: any) => `₹${v.toLocaleString()}` },
    { label: 'Rating', key: 'rating', format: (v: any) => `${v}/5` },
    { label: 'Placements', key: 'placements', format: (v: any) => `${v}%` },
    { label: 'Avg Package', key: 'avgPackage', format: (v: any) => `₹${v}L` },
    { label: 'Cutoff', key: 'cutoff', format: (v: any) => `${v}` },
    { label: 'Reviews', key: 'reviews', format: (v: any) => `${v}` }
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-50">
              Metric
            </th>
            {colleges.map((college) => (
              <th key={college.id} className="px-6 py-4 text-left bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{college.name}</p>
                    <p className="text-sm text-gray-600">{college.city}</p>
                  </div>
                  {onRemove && (
                    <button
                      onClick={() => onRemove(college.id)}
                      className="ml-2 p-1 hover:bg-gray-200 rounded"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.key} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                {metric.label}
              </td>
              {colleges.map((college) => (
                <td key={college.id} className="px-6 py-4">
                  <p className="text-gray-900">
                    {metric.format((college as any)[metric.key])}
                  </p>
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">Courses</td>
            {colleges.map((college) => (
              <td key={college.id} className="px-6 py-4">
                <ul className="text-sm text-gray-600 space-y-1">
                  {college.courses.slice(0, 3).map((course, i) => (
                    <li key={i}>• {course}</li>
                  ))}
                  {college.courses.length > 3 && (
                    <li className="text-blue-600">+{college.courses.length - 3} more</li>
                  )}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
