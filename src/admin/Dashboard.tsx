import { Link } from 'react-router-dom';
import { store } from '../store';
import { Code, Briefcase, BookOpen, Image, FileText, Mail, TrendingUp, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const expertise = store.getExpertise();
  const projects = store.getProjects();
  const research = store.getResearch();
  const media = store.getMedia();
  const blog = store.getBlogPosts();
  const submissions = store.getSubmissions();

  const stats = [
    { label: 'Expertise', icon: Code, total: expertise.length, published: expertise.filter(e => e.status === 'published').length, link: '/admin/expertise', color: 'bg-purple-100 text-primary-purple' },
    { label: 'Projects', icon: Briefcase, total: projects.length, published: projects.filter(p => p.status === 'published').length, link: '/admin/portfolio', color: 'bg-blue-100 text-blue-700' },
    { label: 'Research', icon: BookOpen, total: research.length, published: research.filter(r => r.status === 'published').length, link: '/admin/research', color: 'bg-green-100 text-green-700' },
    { label: 'Media', icon: Image, total: media.length, published: media.filter(m => m.status === 'published').length, link: '/admin/media', color: 'bg-amber-100 text-amber-700' },
    { label: 'Blog Posts', icon: FileText, total: blog.length, published: blog.filter(b => b.status === 'published').length, link: '/admin/blog', color: 'bg-rose-100 text-rose-700' },
    { label: 'Messages', icon: Mail, total: submissions.length, published: submissions.filter(s => !s.read).length, link: '/admin/messages', color: 'bg-teal-100 text-teal-700' },
  ];

  const recentSubmissions = submissions.slice(0, 5);
  const recentPosts = [...blog].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} to={stat.link} className="block p-5 rounded-xl border border-border-purple bg-warm-white hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <TrendingUp size={16} className="text-muted-text" />
              </div>
              <p className="text-2xl font-bold text-charcoal">{stat.total}</p>
              <p className="text-sm text-muted-text">{stat.label}</p>
              <p className="text-xs text-secondary-purple mt-1">{stat.published} published</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-xl border border-border-purple bg-warm-white">
        <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/expertise?action=new" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-purple text-warm-white text-sm font-medium hover:bg-deep-purple transition-colors">
            <Plus size={16} /> New Expertise
          </Link>
          <Link to="/admin/portfolio?action=new" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-light-lavender text-primary-purple text-sm font-medium hover:bg-primary-purple hover:text-warm-white transition-colors">
            <Plus size={16} /> New Project
          </Link>
          <Link to="/admin/blog?action=new" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-light-lavender text-primary-purple text-sm font-medium hover:bg-primary-purple hover:text-warm-white transition-colors">
            <Plus size={16} /> New Blog Post
          </Link>
          <Link to="/admin/research?action=new" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-light-lavender text-primary-purple text-sm font-medium hover:bg-primary-purple hover:text-warm-white transition-colors">
            <Plus size={16} /> New Research
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="p-6 rounded-xl border border-border-purple bg-warm-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold text-charcoal">Recent Messages</h2>
            <Link to="/admin/messages" className="text-sm text-primary-purple hover:text-deep-purple">View all</Link>
          </div>
          {recentSubmissions.length === 0 ? (
            <p className="text-sm text-muted-text">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map(sub => (
                <div key={sub.id} className="flex items-start gap-3 p-3 rounded-lg bg-light-lavender/30">
                  {!sub.read && <div className="w-2 h-2 rounded-full bg-primary-purple mt-2 shrink-0"></div>}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">{sub.name}</p>
                    <p className="text-xs text-muted-text truncate">{sub.message}</p>
                    <p className="text-xs text-secondary-purple mt-1">{new Date(sub.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Blog Posts */}
        <div className="p-6 rounded-xl border border-border-purple bg-warm-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold text-charcoal">Recent Posts</h2>
            <Link to="/admin/blog" className="text-sm text-primary-purple hover:text-deep-purple">View all</Link>
          </div>
          {recentPosts.length === 0 ? (
            <p className="text-sm text-muted-text">No blog posts yet.</p>
          ) : (
            <div className="space-y-3">
              {recentPosts.map(post => (
                <div key={post.id} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-light-lavender/30">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">{post.title}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                      post.status === 'published' ? 'bg-green-100 text-green-700' :
                      post.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-text shrink-0">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
