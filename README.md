# Notes Application

## Overview

**Notes Application** is a modern web app for creating and managing personal notes with secure user authentication. Sign up, log in, create notes, and access them anytime—all your data is stored securely in Supabase.

## Live Demo

🚀 **Deployed Application:** [https://noteappforschool.netlify.app]

## What It Does

- ✅ **User Registration** — Sign up with email and password
- ✅ **User Login/Logout** — Secure authentication with session persistence
- ✅ **Create Notes** — Add notes with title and content
- ✅ **View Notes** — See all your notes in a clean list
- ✅ **Delete Notes** — Remove notes you no longer need
- ✅ **Secure Storage** — Each user only sees their own notes (enforced by database security)

## Technologies Used

- **Frontend:** React 18 + Vite (modern, fast development)
- **Database & Authentication:** Supabase (PostgreSQL with built-in auth)
- **Styling:** Custom CSS
- **Deployment:** Netlify

## Project Structure

```
Notes-Application/
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main app component (auth + notes logic)
│   │   ├── main.jsx             # React entry point
│   │   ├── index.css            # Global styling
│   │   └── lib/
│   │       └── supabase.js      # Supabase client configuration
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite build configuration
│   ├── package.json             # Dependencies
│   ├── .env.example             # Environment variables template
│   └── .gitignore
├── supabase/
│   └── schema.sql               # Database schema and row-level security policies
├── .gitignore
└── README.md
```

## Database Schema

### Notes Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `user_id` | UUID | Foreign key linking to authenticated user |
| `title` | Text | Note title |
| `content` | Text | Note content |
| `created_at` | Timestamp | Automatically set when note is created |
| `updated_at` | Timestamp | Automatically updated on changes |

### Security

- **Row-Level Security (RLS)** ensures users can only view, edit, and delete their own notes
- Supabase Auth handles password hashing and session management
- API keys are stored in environment variables and never committed to git

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Missing Supabase environment variables" | Check that `frontend/.env` exists with both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` |
| "Failed to resolve import" | Run `npm install` in the `frontend/` directory |
| "Cannot POST /auth/login" | Ensure you've run `supabase/schema.sql` in Supabase SQL Editor |
| Notes not appearing | Log out and back in; verify you're authenticated |
| Netlify deploy fails | Check that base directory is `frontend` and environment variables are set |

## Future Enhancements

- [ ] Edit existing notes
- [ ] Password reset via email
- [ ] Note categories/tags
- [ ] Search functionality
- [ ] Dark mode
- [ ] Share notes with other users

## Support

- **Supabase Issues:** Check [Supabase Docs](https://supabase.com/docs)
- **Netlify Issues:** Check [Netlify Docs](https://docs.netlify.com/)
- **React/Vite Issues:** Check [Vite Docs](https://vitejs.dev)

---
🚀 Happy Note Taking!
