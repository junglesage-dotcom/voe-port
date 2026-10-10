import { useParams, Link } from 'react-router-dom';
import { store } from '../store';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const posts = store.getPublishedBlogPosts();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-4">Post Not Found</h1>
          <p className="text-muted-text mb-6">The blog post you're looking for doesn't exist or hasn't been published.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary-purple font-medium hover:text-deep-purple">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderBody = (body: string) => {
    return body.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="font-serif text-2xl font-bold text-charcoal mt-8 mb-4">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="font-serif text-xl font-semibold text-primary-purple mt-6 mb-3">{line.slice(4)}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-muted-text ml-4 mb-1">{line.slice(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      return <p key={i} className="text-muted-text leading-relaxed mb-3">{line}</p>;
    });
  };

  // Related posts
  const relatedPosts = posts
    .filter(p => p.id !== post.id && p.categories.some(c => post.categories.includes(c)))
    .slice(0, 3);

  return (
    <div className="animate-fade-in">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Back link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary-purple font-medium hover:text-deep-purple mb-8">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.categories.map((cat, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-light-lavender text-xs font-medium text-primary-purple">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-text">
            <span className="flex items-center gap-1"><User size={14} /> {post.authorName}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="rounded-2xl overflow-hidden mb-10 h-64 md:h-80">
            <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Body */}
        <div className="prose max-w-none">
          {renderBody(post.body)}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border-purple">
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={16} className="text-muted-text" />
              {post.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-light-lavender text-xs text-primary-purple">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-light-lavender/50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map(rp => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="block p-4 rounded-xl border border-border-purple bg-warm-white hover:shadow-md transition-all group">
                  <h3 className="font-serif text-base font-semibold text-charcoal group-hover:text-primary-purple transition-colors mb-1">{rp.title}</h3>
                  <p className="text-xs text-muted-text line-clamp-2">{rp.excerpt}</p>
                  <span className="text-xs text-secondary-purple mt-2 inline-block">{new Date(rp.publishDate).toLocaleDateString()}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
