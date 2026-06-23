// lib/validation.ts
import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters')
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required')
});

export const CollegeFilterSchema = z.object({
  city: z.string().optional(),
  minFees: z.number().optional(),
  maxFees: z.number().optional(),
  minRating: z.number().optional(),
  search: z.string().optional(),
  page: z.number().default(1),
  limit: z.number().default(10)
});

export const ComparisonSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  colleges: z.array(z.string()).min(2, 'Select at least 2 colleges').max(5, 'Select at most 5 colleges')
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type CollegeFilterInput = z.infer<typeof CollegeFilterSchema>;
export type ComparisonInput = z.infer<typeof ComparisonSchema>;
