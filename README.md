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

## Prerequisites

- Node.js 16 or later
- npm
- A Supabase account
- A Netlify account for deployment

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Jkwong-class/Notes-Application.git
cd Notes-Application
```

### 2. Create and configure a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Open the project's **SQL Editor**.
3. Create a new query.
4. Copy the contents of [`supabase/schema.sql`](supabase/schema.sql) into the query.
5. Click **Run**.

The SQL creates the `notes` table, enables row-level security, and adds policies that limit each user to their own notes.

### 3. Get the Supabase credentials

In the Supabase dashboard:

1. Open **Project Settings**.
2. Select **API** (or **Data API**, depending on the dashboard layout).
3. Copy the **Project URL**.
4. Copy the public **anon** key. Do not use or expose the `service_role` key in this frontend application.

### 4. Create the frontend environment file

From the repository root, run:

```bash
cp frontend/.env.example frontend/.env
```

On Windows PowerShell, use:

```powershell
Copy-Item frontend/.env.example frontend/.env
```

Open `frontend/.env` and add your values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Never commit `.env` to GitHub. The file is ignored by Git.

### 5. Install dependencies and run the app

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown in the terminal, usually [http://localhost:5173](http://localhost:5173).

To create a production build locally:

```bash
npm run build
npm run preview
```

## Deploying to Netlify

The easiest deployment method is connecting the GitHub repository to Netlify. Deploy after the project is finished so you stay within Netlify's free limits and avoid unnecessary deployments.

### 1. Create a Netlify site from GitHub

1. Sign in at [netlify.com](https://www.netlify.com/).
2. Select **Add new project** or **Add new site**.
3. Choose **Import an existing project** / **Deploy from Git**.
4. Select **GitHub** and authorize Netlify if requested.
5. Choose `Jkwong-class/Notes-Application`.

### 2. Configure the build settings

Use these settings:

| Setting | Value |
|---|---|
| Base directory | `frontend` |
| Build command | `npm run build` |
| Publish directory | `dist` |

Because the base directory is `frontend`, Netlify runs the build from that directory and publishes `frontend/dist`.

### 3. Add Supabase environment variables

Before deploying, open the site's **Project configuration** or **Site configuration** → **Environment variables** and add:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase public anon key |

Add the variables for the deployment context(s) Netlify uses, then save them. Do not add the Supabase `service_role` key.

### 4. Deploy

Click **Deploy**. Netlify installs the dependencies, runs `npm run build`, and publishes the `dist` folder. After the deploy finishes, open the Netlify-provided URL and test registration, login, and note creation.

The current deployed URL is:

[https://noteappforschool.netlify.app](https://noteappforschool.netlify.app)

If you change the Netlify site URL, update the **Live Application** link in this README.

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
