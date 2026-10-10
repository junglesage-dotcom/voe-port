import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import { store } from './store';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Expertise from './pages/Expertise';
import Portfolio from './pages/Portfolio';
import ResearchPage from './pages/Research';
import Media from './pages/Media';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';

// Admin
import AdminLogin from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/Dashboard';
import ContentManager from './admin/ContentManager';
import AdminMessages from './admin/Messages';
import AdminSettings from './admin/Settings';

// Auth Guard
function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (!store.isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

// Public Layout
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/expertise" element={<PublicLayout><Expertise /></PublicLayout>} />
        <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
        <Route path="/research" element={<PublicLayout><ResearchPage /></PublicLayout>} />
        <Route path="/media" element={<PublicLayout><Media /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="expertise" element={<ContentManager type="expertise" />} />
          <Route path="portfolio" element={<ContentManager type="portfolio" />} />
          <Route path="research" element={<ContentManager type="research" />} />
          <Route path="media" element={<ContentManager type="media" />} />
          <Route path="blog" element={<ContentManager type="blog" />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <PublicLayout>
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <h1 className="font-serif text-6xl font-bold text-primary-purple mb-4">404</h1>
                <p className="text-xl text-muted-text mb-6">Page not found</p>
                <a href="/" className="text-primary-purple font-medium hover:text-deep-purple">← Return Home</a>
              </div>
            </div>
          </PublicLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
