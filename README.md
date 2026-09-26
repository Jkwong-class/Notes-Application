# Notes Application

This project is a minimal Supabase-backed notes application with email/password authentication.

## Features
- User registration with email/password
- User login and logout
- Notes stored in a Supabase table
- Secure per-user data access using row-level security

## Tech stack
- React + Vite
- Supabase JavaScript SDK

## Setup

1. Create a Supabase project at https://supabase.com
2. In Supabase SQL editor, run the contents of `supabase/schema.sql`
3. Copy your project URL and anon key into `frontend/.env`
4. Install frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

## Environment variables
Create `frontend/.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Database schema
The schema creates a public notes table:
- `id` UUID primary key
- `user_id` user reference
- `title` text
- `content` text
- `created_at` timestamp
- `updated_at` timestamp

## Auth
Authentication is handled through Supabase Auth using email/password.
