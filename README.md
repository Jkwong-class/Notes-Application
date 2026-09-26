A modern, full-featured notes app built with React, Vite, and Supabase. Create, manage, and store your notes securely with email/password authentication.

## Features

✅ **User Authentication**
- Email and password registration
- Secure login and logout
- Session persistence

✅ **Notes Management**
- Create notes with title and content
- View all your notes
- Delete notes
- Real-time synchronization with database

✅ **Security**
- Row-level security (RLS) policies in Supabase
- Per-user data isolation
- Secure authentication via Supabase Auth

## Tech Stack

- **Frontend:** React 18 + Vite
- **Database & Auth:** Supabase
- **Styling:** Custom CSS

## Project Structure

```
Notes-Application/
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   ├── index.css            # Global styles
│   │   └── lib/
│   │       └── supabase.js      # Supabase client setup
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   ├── package.json             # Dependencies
│   ├── .env.example             # Environment variables template
│   └── .gitignore
├── supabase/
│   └── schema.sql               # Database schema and RLS policies
├── .gitignore
└── README.md
```

## Database Schema

### Notes Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key to auth.users |
| `title` | Text | Note title |
| `content` | Text | Note content |
| `created_at` | Timestamp | Creation time (auto-set) |
| `updated_at` | Timestamp | Last update time (auto-updated) |

## How It Works

### Authentication Flow
1. **Register**: User signs up with email/password → Supabase Auth creates account
2. **Login**: User enters credentials → Session is stored locally
3. **Logout**: User clicks logout → Session is cleared

### Notes Flow
1. **Create**: Authenticated user adds a note → Stored in `notes` table with their `user_id`
2. **View**: User sees only their notes (enforced by RLS policies)
3. **Delete**: User removes a note → Deleted from database

### Security
- Row-level security policies ensure users can only access their own notes
- Supabase handles password hashing and session management
- API keys are kept in environment variables (never committed to git)

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

To deploy this app:

1. **Frontend**: Deploy to Vercel, Netlify, or any static host
   - Connect your GitHub repo
   - Set environment variables in the platform's settings
   - Deploy with `npm run build`

2. **Backend**: Already hosted on Supabase (no action needed)

## Troubleshooting

**"Missing Supabase environment variables"**
- Ensure `frontend/.env` exists and has both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**"Failed to resolve import"**
- Run `npm install` in the `frontend/` directory

**"Authentication failed"**
- Check that you've run `supabase/schema.sql` in your Supabase SQL Editor
- Verify your Supabase credentials in `.env`

**"No notes appearing"**
- Log out and log back in
- Check that you're signed in (email should show at top)
- Create a new note and refresh

## License

This project is open source and available under the MIT License.

## Support

For issues with:
- **Supabase**: Check [Supabase Docs](https://supabase.com/docs)
- **React/Vite**: Check [Vite Docs](https://vitejs.dev)
- **This app**: Open an issue on GitHub

---

**Happy note-taking!** 📝
