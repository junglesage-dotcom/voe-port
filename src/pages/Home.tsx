import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code, Lightbulb } from 'lucide-react';
import { store } from '../store';

export default function Home() {
  const settings = store.getSettings();
  const expertise = store.getPublishedExpertise().filter(e => e.featured).slice(0, 3);
  const projects = store.getPublishedProjects().filter(p => p.featured).slice(0, 3);
  const research = store.getPublishedResearch().filter(r => r.featured).slice(0, 2);
  const blogPosts = store.getPublishedBlogPosts().filter(b => b.featured).slice(0, 2);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-light-lavender via-warm-white to-light-lavender">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-purple rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-purple rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-purple/10 text-primary-purple text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-purple animate-pulse"></span>
              Available for collaboration
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
              {settings.headline}
            </h1>
            <p className="text-lg md:text-xl text-muted-text leading-relaxed mb-8 max-w-2xl">
              {settings.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-purple text-warm-white rounded-lg font-medium hover:bg-deep-purple transition-colors shadow-sm"
              >
                View My Work
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-purple text-primary-purple rounded-lg font-medium hover:bg-primary-purple hover:text-warm-white transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Preview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">Areas of Expertise</h2>
            <p className="text-muted-text max-w-2xl mx-auto">Combining technical skills with research methodology to deliver impactful solutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertise.map(item => (
              <div key={item.id} className="p-6 rounded-xl border border-border-purple bg-warm-white hover:shadow-lg hover:border-secondary-purple transition-all group">
                <div className="w-12 h-12 rounded-lg bg-light-lavender flex items-center justify-center mb-4 group-hover:bg-primary-purple/10 transition-colors">
                  {item.icon === 'code' && <Code size={24} className="text-primary-purple" />}
                  {item.icon === 'microscope' && <BookOpen size={24} className="text-primary-purple" />}
                  {item.icon === 'target' && <Lightbulb size={24} className="text-primary-purple" />}
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{item.name}</h3>
                <p className="text-muted-text text-sm leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/expertise" className="inline-flex items-center gap-2 text-primary-purple font-medium hover:text-deep-purple transition-colors">
              Explore all expertise <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 bg-light-lavender/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">Featured Projects</h2>
            <p className="text-muted-text max-w-2xl mx-auto">Selected work demonstrating practical application of skills and research.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-warm-white rounded-xl overflow-hidden border border-border-purple hover:shadow-lg transition-all group">
                <div className="h-48 bg-gradient-to-br from-primary-purple/20 to-secondary-purple/20 flex items-center justify-center">
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <Code size={48} className="text-primary-purple/40" />
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-secondary-purple uppercase tracking-wider">{project.category}</span>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mt-1 mb-2 group-hover:text-primary-purple transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-text line-clamp-2">{project.summary}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary-purple font-medium hover:text-deep-purple transition-colors">
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Research & Blog */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Research */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-6">Recent Research</h2>
              <div className="space-y-4">
                {research.map(item => (
                  <div key={item.id} className="p-4 rounded-lg border border-border-purple hover:border-secondary-purple transition-colors">
                    <h3 className="font-serif text-base font-semibold text-charcoal mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-text line-clamp-2">{item.abstract}</p>
                    <span className="text-xs text-secondary-purple mt-2 inline-block">{item.venue}</span>
                  </div>
                ))}
              </div>
              <Link to="/research" className="inline-flex items-center gap-2 text-primary-purple font-medium mt-4 hover:text-deep-purple transition-colors">
                View all research <ArrowRight size={16} />
              </Link>
            </div>

            {/* Blog */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-6">Latest from the Blog</h2>
              <div className="space-y-4">
                {blogPosts.map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="block p-4 rounded-lg border border-border-purple hover:border-secondary-purple transition-colors">
                    <h3 className="font-serif text-base font-semibold text-charcoal mb-1 hover:text-primary-purple transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-text line-clamp-2">{post.excerpt}</p>
                    <span className="text-xs text-secondary-purple mt-2 inline-block">{new Date(post.publishDate).toLocaleDateString()}</span>
                  </Link>
                ))}
              </div>
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary-purple font-medium mt-4 hover:text-deep-purple transition-colors">
                Read all posts <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
