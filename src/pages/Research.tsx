import { useState } from 'react';
import { store } from '../store';
import { Copy, ExternalLink, Calendar, BookOpen, Check } from 'lucide-react';

export default function ResearchPage() {
  const research = store.getPublishedResearch();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(`${id}-${type}`);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="animate-fade-in">
      <section className="bg-light-lavender/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Research</h1>
          <p className="text-lg text-muted-text max-w-2xl">
            Academic publications and research contributions exploring the intersection of technology, society, and development.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {research.map(item => (
              <article key={item.id} className="p-6 md:p-8 rounded-2xl border border-border-purple bg-warm-white hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-charcoal">{item.title}</h2>
                  {item.featured && (
                    <span className="shrink-0 px-2 py-1 rounded-full bg-primary-purple/10 text-xs font-medium text-primary-purple">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-text mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} />
                    <span>{item.venue}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{item.publicationDate}</span>
                  </div>
                  {item.doi && (
                    <span className="text-xs text-secondary-purple">DOI: {item.doi}</span>
                  )}
                </div>

                <p className="text-muted-text mb-4">{item.abstract}</p>

                {item.authors.length > 0 && (
                  <p className="text-sm text-muted-text mb-4">
                    <span className="font-medium text-charcoal">Authors:</span> {item.authors.join(', ')}
                  </p>
                )}

                {item.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-1 rounded-full bg-light-lavender text-xs text-primary-purple">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expandable details */}
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="text-sm text-primary-purple font-medium hover:text-deep-purple transition-colors mb-4"
                >
                  {expandedId === item.id ? 'Hide details' : 'Show details & citation'}
                </button>

                {expandedId === item.id && (
                  <div className="mt-4 pt-4 border-t border-border-purple space-y-4 animate-fade-in">
                    {item.description && (
                      <div>
                        <h3 className="text-sm font-semibold text-charcoal mb-2">Description</h3>
                        <p className="text-sm text-muted-text leading-relaxed">{item.description}</p>
                      </div>
                    )}

                    {item.citationText && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-semibold text-charcoal">Citation</h3>
                          <button
                            onClick={() => copyToClipboard(item.citationText, item.id, 'citation')}
                            className="inline-flex items-center gap-1 text-xs text-primary-purple hover:text-deep-purple transition-colors"
                          >
                            {copiedId === `${item.id}-citation` ? <Check size={12} /> : <Copy size={12} />}
                            {copiedId === `${item.id}-citation` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-sm text-muted-text bg-light-lavender/50 p-3 rounded-lg font-mono text-xs">
                          {item.citationText}
                        </p>
                      </div>
                    )}

                    {item.bibtex && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-semibold text-charcoal">BibTeX</h3>
                          <button
                            onClick={() => copyToClipboard(item.bibtex, item.id, 'bibtex')}
                            className="inline-flex items-center gap-1 text-xs text-primary-purple hover:text-deep-purple transition-colors"
                          >
                            {copiedId === `${item.id}-bibtex` ? <Check size={12} /> : <Copy size={12} />}
                            {copiedId === `${item.id}-bibtex` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="text-xs text-muted-text bg-light-lavender/50 p-3 rounded-lg overflow-x-auto">
                          {item.bibtex}
                        </pre>
                      </div>
                    )}

                    {item.externalUrl && (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary-purple hover:text-deep-purple transition-colors"
                      >
                        View Publication <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>

          {research.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-text">No research publications available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
