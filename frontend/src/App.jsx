import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const getSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setNotes([]);
      return;
    }

    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
        setStatusMessage('Unable to load notes.');
        return;
      }

      setNotes(data || []);
    };

    fetchNotes();
  }, [session]);

  const handleAuth = async (event) => {
    event.preventDefault();
    setStatusMessage('');

    try {
      if (authMode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) throw error;
        setStatusMessage('Registration successful. Check your email to confirm your account.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        setStatusMessage('Login successful.');
      }

      setEmail('');
      setPassword('');
    } catch (error) {
      setStatusMessage(error.message || 'Authentication failed.');
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setStatusMessage(error.message || 'Logout failed.');
      return;
    }

    setStatusMessage('Logged out successfully.');
  };

  const handleCreateNote = async (event) => {
    event.preventDefault();

    if (!session?.user) {
      setStatusMessage('Please log in before creating notes.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      setStatusMessage('Title and content are required.');
      return;
    }

    const { error } = await supabase.from('notes').insert([
      {
        user_id: session.user.id,
        title: title.trim(),
        content: content.trim()
      }
    ]);

    if (error) {
      setStatusMessage(error.message || 'Unable to create note.');
      return;
    }

    setTitle('');
    setContent('');
    setStatusMessage('Note created successfully.');

    const { data } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    setNotes(data || []);
  };

  const handleDeleteNote = async (noteId) => {
    const { error } = await supabase.from('notes').delete().eq('id', noteId);

    if (error) {
      setStatusMessage(error.message || 'Unable to delete note.');
      return;
    }

    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== noteId));
    setStatusMessage('Note deleted.');
  };

  if (loading) {
    return <div className="app-shell"><p>Loading...</p></div>;
  }

  return (
    <div className="app-shell">
      <div className="app-card">
        {session ? (
          <>
            <div className="header-row">
              <h1>My Notes</h1>
              <button className="secondary" onClick={handleLogout}>Logout</button>
            </div>
            <p className="user-label">Signed in as: {session.user.email}</p>

            <form className="note-form" onSubmit={handleCreateNote}>
              <input
                type="text"
                placeholder="Note title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <textarea
                rows="4"
                placeholder="Write your note"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
              <button type="submit">Add Note</button>
            </form>

            <div className="notes-list">
              {notes.length === 0 ? (
                <p>No notes yet. Create your first note.</p>
              ) : (
                notes.map((note) => (
                  <div className="note-item" key={note.id}>
                    <div>
                      <h3>{note.title}</h3>
                      <p>{note.content}</p>
                    </div>
                    <button className="danger" onClick={() => handleDeleteNote(note.id)}>Delete</button>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <>
            <h1>Notes App</h1>
            <div className="toggle-row">
              <button
                className={authMode === 'login' ? 'active' : ''}
                onClick={() => setAuthMode('login')}
                type="button"
              >
                Login
              </button>
              <button
                className={authMode === 'register' ? 'active' : ''}
                onClick={() => setAuthMode('register')}
                type="button"
              >
                Register
              </button>
            </div>

            <form className="auth-form" onSubmit={handleAuth}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength="6"
              />
              <button type="submit">
                {authMode === 'login' ? 'Login' : 'Register'}
              </button>
            </form>
          </>
        )}

        {statusMessage && <p className="status">{statusMessage}</p>}
      </div>
    </div>
  );
}

export default App;
