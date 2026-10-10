import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { store } from '../store';
import {
  LayoutDashboard, Code, Briefcase, BookOpen, Image, FileText,
  Mail, Settings, LogOut, Menu, X, ChevronRight
} from 'lucide-react';

const adminLinks = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/expertise', label: 'Expertise', icon: Code },
  { path: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { path: '/admin/research', label: 'Research', icon: BookOpen },
  { path: '/admin/media', label: 'Media', icon: Image },
  { path: '/admin/blog', label: 'Blog', icon: FileText },
  { path: '/admin/messages', label: 'Messages', icon: Mail },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    store.setSession(null);
    navigate('/admin/login');
  };

  const unreadCount = store.getSubmissions().filter(s => !s.read).length;

  return (
    <div className="min-h-screen bg-light-lavender/30 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-deep-purple text-warm-white transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-purple-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary-purple flex items-center justify-center">
                <span className="text-warm-white font-serif font-bold text-sm">VOE</span>
              </div>
              <div>
                <p className="font-serif font-semibold text-sm">Admin Panel</p>
                <p className="text-xs text-purple-300">Content Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {adminLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-secondary-purple/30 text-warm-white'
                      : 'text-purple-200 hover:bg-purple-800/50 hover:text-warm-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                  {link.path === '/admin/messages' && unreadCount > 0 && (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-primary-purple text-xs">{unreadCount}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-purple-800">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-purple-200 hover:text-warm-white hover:bg-purple-800/50 transition-colors mb-1"
            >
              <ChevronRight size={16} /> View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-purple-200 hover:text-warm-white hover:bg-purple-800/50 transition-colors w-full"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-warm-white border-b border-border-purple px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-muted-text hover:text-primary-purple hover:bg-light-lavender"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-serif text-lg font-semibold text-charcoal">
            {adminLinks.find(l => location.pathname === l.path)?.label || 'Admin'}
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
