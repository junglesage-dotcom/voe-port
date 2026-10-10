import { useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../store';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = store.getPublishedBlogPosts();
  const allCategories = Array.from(new Set(posts.flatMap(p => p.categories)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = activeCategory ? posts.filter(p => p.categories.includes(activeCategory)) : posts;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="animate-fade-in">
      <section className="bg-light-lavender/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Blog</h1>
          <p className="text-lg text-muted-text max-w-2xl">
            Thoughts, insights, and reflections on technology, research, and building for impact.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          {allCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => { setActiveCategory(null); setPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !activeCategory ? 'bg-primary-purple text-warm-white' : 'bg-light-lavender text-muted-text hover:text-primary-purple'
                }`}
              >
                All
              </button>
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat ? 'bg-primary-purple text-warm-white' : 'bg-light-lavender text-muted-text hover:text-primary-purple'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Featured Post */}
          {paginated.length > 0 && page === 1 && !activeCategory && (
            <Link
              to={`/blog/${paginated[0].slug}`}
              className="block mb-10 rounded-2xl border border-border-purple bg-warm-white overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="h-56 bg-gradient-to-br from-primary-purple/10 to-secondary-purple/10 flex items-center justify-center">
                {paginated[0].featuredImage ? (
                  <img src={paginated[0].featuredImage} alt={paginated[0].featuredImageAlt || paginated[0].title} className="w-full h-full object-cover" />
                ) : (
                  <Tag size={48} className="text-primary-purple/30" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 rounded-full bg-primary-purple/10 text-xs font-medium text-primary-purple">Featured</span>
                  <span className="text-xs text-muted-text flex items-center gap-1"><Calendar size={12} />{new Date(paginated[0].publishDate).toLocaleDateString()}</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-charcoal group-hover:text-primary-purple transition-colors mb-2">{paginated[0].title}</h2>
                <p className="text-muted-text">{paginated[0].excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {paginated[0].categories.map((c, i) => (
                    <span key={i} className="text-xs text-secondary-purple">{c}</span>
                  ))}
                </div>
              </div>
            </Link>
          )}

          {/* Post List */}
          <div className="space-y-6">
            {(page === 1 && !activeCategory ? paginated.slice(1) : paginated).map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block p-6 rounded-xl border border-border-purple bg-warm-white hover:shadow-md hover:border-secondary-purple transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-muted-text flex items-center gap-1"><Calendar size={12} />{new Date(post.publishDate).toLocaleDateString()}</span>
                  {post.categories.map((c, i) => (
                    <span key={i} className="text-xs text-secondary-purple">• {c}</span>
                  ))}
                </div>
                <h2 className="font-serif text-lg font-bold text-charcoal group-hover:text-primary-purple transition-colors mb-2">{post.title}</h2>
                <p className="text-sm text-muted-text line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary-purple font-medium mt-3 group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-text">No blog posts available yet.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-light-lavender text-muted-text hover:text-primary-purple disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-muted-text">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-light-lavender text-muted-text hover:text-primary-purple disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
