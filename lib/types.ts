// lib/types.ts
export interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  fees: number;
  rating: number;
  reviews: number;
  cutoff: number;
  courses: string[];
  placements: number;
  avgPackage: number;
  overview: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SavedCollege {
  id: string;
  userId: string;
  collegeId: string;
  college: College;
}

export interface Comparison {
  id: string;
  userId: string;
  name: string;
  colleges: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CollegeFilters {
  city?: string;
  minFees?: number;
  maxFees?: number;
  minRating?: number;
  search?: string;
  page?: number;
  limit?: number;
}
