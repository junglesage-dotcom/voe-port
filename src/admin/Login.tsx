import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';
import { Lock, AlertCircle } from 'lucide-react';

// Simple admin credentials (in production, this would be server-side)
// The password is hashed client-side for demo purposes
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = 'voe-admin-2024'; // In production: server-side bcrypt

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (locked) {
      setError('Too many attempts. Please wait before trying again.');
      return;
    }

    // Simple auth check (in production: server-side validation)
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD_HASH) {
      const session = { authenticated: true, expiresAt: Date.now() + 3600000 }; // 1 hour
      store.setSession(session);
      navigate('/admin/dashboard');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLocked(true);
        setError('Too many failed attempts. Please wait 30 seconds.');
        setTimeout(() => { setLocked(false); setAttempts(0); }, 30000);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-lavender/50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-primary-purple flex items-center justify-center mx-auto mb-4">
            <span className="text-warm-white font-serif font-bold text-xl">VOE</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Admin Dashboard</h1>
          <p className="text-muted-text text-sm mt-1">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-warm-white rounded-2xl border border-border-purple p-8 shadow-sm">
          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-charcoal mb-1">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border-purple bg-warm-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple transition-colors"
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border-purple bg-warm-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple transition-colors pr-10"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                />
                <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={locked}
              className="w-full px-6 py-3 bg-primary-purple text-warm-white rounded-lg font-medium hover:bg-deep-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {locked ? 'Locked' : 'Sign In'}
            </button>
          </div>

          <p className="text-xs text-muted-text text-center mt-6">
            Default credentials: admin / voe-admin-2024
          </p>
        </form>
      </div>
    </div>
  );
}
