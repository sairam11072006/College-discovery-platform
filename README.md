# CollegeFind - College Discovery Platform

A production-grade Full Stack college discovery and comparison platform built with Next.js, React, TypeScript, PostgreSQL, and Prisma.

## 🎯 Features Implemented

### 1. **College Listing + Search** ✅
- Searchable college listings with advanced filters
- Filter by city, fees range, and minimum rating
- Pagination support
- Real-time search results

### 2. **College Detail Page** ✅
- Comprehensive college information
- Overview, courses, placements, and key metrics
- Save/unsave colleges feature
- Visual metrics and course listings

### 3. **Compare Colleges** ✅
- Side-by-side comparison for 2-5 colleges
- Compare metrics: fees, rating, placements, packages, cutoff, reviews, courses
- Visual comparison table
- Create/manage multiple comparisons

### 4. **Authentication + Saved Items** ✅
- User registration and login
- JWT-based authentication
- Save colleges for later
- Secure, user-scoped data access

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 with React 18
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **UI Components**: Lucide React icons
- **TypeScript**: Full type safety

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Language**: TypeScript
- **Authentication**: JWT tokens with bcryptjs

### Database
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Schema**: Users, Colleges, SavedColleges, Comparisons

### Design Principles
- ✅ **Modular Architecture**: Reusable components and utilities
- ✅ **Error Handling**: Comprehensive validation and error messages
- ✅ **Performance**: Optimized queries, pagination
- ✅ **Security**: Password hashing, JWT authentication, CORS
- ✅ **Scalability**: Database indexing, efficient queries
- ✅ **UX**: Responsive design, loading states, intuitive workflows

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- PostgreSQL database
- npm or yarn

### Local Development

1. **Clone and Install**
```bash
cd college-discovery
npm install
```

2. **Setup Environment**
```bash
cp .env.example .env
# Update DATABASE_URL and JWT_SECRET in .env
```

3. **Setup Database**
```bash
# Run migrations
npx prisma migrate dev --name init

# Seed colleges data
npx prisma db seed
```

4. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000`

### Test Accounts
- Demo account creation available at `/signup`
- All colleges pre-seeded in database

## 📋 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Colleges
- `GET /api/colleges` - List colleges with filters
- `GET /api/colleges/[id]` - Get college details

### Saved Colleges
- `GET /api/saved-colleges` - Get user's saved colleges
- `POST /api/saved-colleges` - Save a college
- `DELETE /api/saved-colleges` - Remove saved college

### Comparisons
- `GET /api/comparisons` - Get user's comparisons
- `POST /api/comparisons` - Create new comparison
- `PUT /api/comparisons` - Update comparison
- `DELETE /api/comparisons` - Delete comparison

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Select your GitHub repository
- Vercel will auto-detect Next.js

3. **Configure Environment**
- Add `DATABASE_URL` (PostgreSQL connection string)
- Add `JWT_SECRET` (secure random string)

4. **Database Setup**
- Use Neon, Supabase, or Railway for PostgreSQL
- Update DATABASE_URL with connection string
- Migrations run automatically on deployment

Example Neon setup:
```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

### Deploy to Railway/Render

1. **Create Database**
- Railway/Render can provision PostgreSQL

2. **Deploy Application**
- Connect GitHub repository
- Set environment variables
- Deploy

### Environment Variables Required

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secure-secret-key
NEXT_PUBLIC_API_URL=https://your-domain.com
```

## 📊 Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique user email
- `password`: Hashed password
- `name`: User's name

### Colleges Table
- `id`: Primary key
- `name`: College name (unique)
- `location`: Full location
- `city`: City name
- `state`: State name
- `fees`: Annual fees
- `rating`: College rating (0-5)
- `placements`: Placement percentage
- `avgPackage`: Average package in lakhs
- And more metrics...

### SavedColleges Table
- Links users to their saved colleges
- Unique constraint on `userId_collegeId`

### Comparisons Table
- `id`: Primary key
- `userId`: Foreign key to users
- `name`: Comparison name
- `colleges`: Array of college IDs

## 🎨 UI/UX Highlights

- **Responsive Design**: Works on desktop, tablet, mobile
- **Search & Filter UX**: Intuitive filtering with clear visual feedback
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Navigation**: Clear header with user context
- **Comparison Flow**: Simple multi-select for creating comparisons

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ User-scoped data access
- ✅ Input validation with Zod
- ✅ Protected API routes
- ✅ Secure token storage (localStorage)

## 📈 Performance Optimizations

- Database indexing on frequently queried fields
- Pagination to handle large datasets
- Efficient queries with Prisma
- Client-side state management
- Responsive image handling
- Code splitting with Next.js

## 🧪 Testing the Application

1. **Sign Up**: Create a new account
2. **Browse**: Search and filter colleges
3. **View Details**: Click any college to see full details
4. **Save**: Click heart icon to save colleges
5. **Compare**: Create comparisons from saved colleges
6. **Manage**: Edit/delete comparisons anytime

## 📚 Key Implementation Details

### Frontend Architecture
- **Context API** for global auth state
- **Custom hooks** for API calls
- **Reusable components** (CollegeCard, SearchFilters, etc.)
- **Client-side routing** with Next.js

### Backend Architecture
- **API Routes** for each resource
- **Middleware** for authentication
- **Validation** with Zod schema
- **Error handling** with proper HTTP codes

### Database Design
- **Normalized schema** to prevent data duplication
- **Indexes** on frequently queried columns
- **Foreign keys** for referential integrity
- **Unique constraints** to prevent duplicates

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check DATABASE_URL is correct
# Ensure PostgreSQL is running
npx prisma db push
```

### JWT Secret Not Set
```bash
# Generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Add to .env as JWT_SECRET
```

### Migration Issues
```bash
# Reset database (dev only)
npx prisma migrate reset
```

## 📝 Notes

- The application seeds 10 colleges on initial setup
- Colleges can be further customized in `prisma/seed.ts`
- All data is database-driven, no hardcoded values
- JWT tokens expire in 7 days
- All API responses include proper error messages

## 🤝 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, TailwindCSS |
| Backend | Node.js, TypeScript, Next.js API Routes |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT, bcryptjs |
| Validation | Zod |
| Icons | Lucide React |
| Deployment | Vercel, Railway, Render |

## 📦 Project Structure

```
college-discovery/
├── app/
│   ├── api/                    # API routes
│   ├── components/             # Reusable components
│   ├── context/               # React context
│   ├── colleges/              # College pages
│   ├── [auth pages]/          # Login, signup
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── lib/
│   ├── auth.ts               # Auth utilities
│   ├── types.ts              # TypeScript types
│   ├── validation.ts         # Zod schemas
│   └── prisma.ts             # Prisma client
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
└── package.json
```

---

**Built with ❤️ for college discovery and decision-making**
