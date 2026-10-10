import { useState } from 'react';
import { store } from '../store';
import { Image, Camera } from 'lucide-react';

export default function Media() {
  const media = store.getPublishedMedia();
  const categories = ['All', ...Array.from(new Set(media.map(m => m.category)))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof media[0] | null>(null);

  const filtered = activeCategory === 'All' ? media : media.filter(m => m.category === activeCategory);

  return (
    <div className="animate-fade-in">
      <section className="bg-light-lavender/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Media</h1>
          <p className="text-lg text-muted-text max-w-2xl">
            Photos, presentations, and visual documentation from events, workshops, and professional activities.
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

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="text-left rounded-xl border border-border-purple bg-warm-white overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="h-48 bg-gradient-to-br from-primary-purple/10 to-secondary-purple/10 flex items-center justify-center relative overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.altText || item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                  ) : (
                    <Camera size={48} className="text-primary-purple/30" />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-full bg-warm-white/90 text-xs font-medium text-primary-purple backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold text-charcoal group-hover:text-primary-purple transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-text mt-1 line-clamp-2">{item.description}</p>
                  <span className="text-xs text-secondary-purple mt-2 inline-block">{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Image size={48} className="text-muted-text/30 mx-auto mb-4" />
              <p className="text-muted-text">No media items in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 p-4"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          <div
            className="bg-warm-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-64 md:h-80 bg-gradient-to-br from-primary-purple/10 to-secondary-purple/10 flex items-center justify-center">
              {selectedItem.imageUrl ? (
                <img src={selectedItem.imageUrl} alt={selectedItem.altText || selectedItem.title} className="w-full h-full object-cover" />
              ) : (
                <Camera size={64} className="text-primary-purple/30" />
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-serif text-xl font-bold text-charcoal">{selectedItem.title}</h2>
                <span className="shrink-0 px-2 py-1 rounded-full bg-light-lavender text-xs font-medium text-primary-purple">
                  {selectedItem.category}
                </span>
              </div>
              <p className="text-muted-text mt-3">{selectedItem.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-text">
                <span>{new Date(selectedItem.date).toLocaleDateString()}</span>
                {selectedItem.attribution && <span>• {selectedItem.attribution}</span>}
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="mt-6 px-4 py-2 rounded-lg bg-light-lavender text-primary-purple font-medium hover:bg-primary-purple hover:text-warm-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
