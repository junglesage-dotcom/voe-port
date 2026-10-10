import { useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../store';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

export default function Portfolio() {
  const projects = store.getPublishedProjects();
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="animate-fade-in">
      <section className="bg-light-lavender/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Portfolio</h1>
          <p className="text-lg text-muted-text max-w-2xl">
            A selection of projects demonstrating my approach to solving real-world challenges through technology.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary-purple text-warm-white'
                    : 'bg-light-lavender text-muted-text hover:text-primary-purple hover:bg-light-lavender/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map(project => (
              <article key={project.id} className="rounded-2xl border border-border-purple bg-warm-white overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-56 bg-gradient-to-br from-primary-purple/10 to-secondary-purple/10 flex items-center justify-center relative">
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Tag size={48} className="text-primary-purple/30 mx-auto" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-warm-white/90 text-xs font-medium text-primary-purple backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-xl font-bold text-charcoal mb-2 group-hover:text-primary-purple transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-muted-text text-sm mb-4">{project.summary}</p>
                  
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Challenge</h3>
                    <p className="text-sm text-muted-text">{project.challenge}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Approach</h3>
                    <p className="text-sm text-muted-text">{project.approach}</p>
                  </div>

                  {project.outcomes && (
                    <div className="mb-4">
                      <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Outcomes</h3>
                      <p className="text-sm text-muted-text">{project.outcomes}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-light-lavender text-xs text-primary-purple font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border-purple">
                    <div className="flex items-center gap-2 text-xs text-muted-text">
                      <Calendar size={14} />
                      {project.projectDate}
                    </div>
                    {project.externalUrl && (
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary-purple hover:text-deep-purple transition-colors"
                      >
                        View Project <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-text">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
