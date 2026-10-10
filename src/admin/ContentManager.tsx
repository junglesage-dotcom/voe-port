import { useState, useEffect } from 'react';
import { store } from '../store';
import { Expertise, PortfolioProject, Research, MediaItem, BlogPost } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';

type ContentType = 'expertise' | 'portfolio' | 'research' | 'media' | 'blog';

interface Props {
  type: ContentType;
}

export default function ContentManager({ type }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadItems();
  }, [type]);

  const loadItems = () => {
    switch (type) {
      case 'expertise': setItems(store.getExpertise()); break;
      case 'portfolio': setItems(store.getProjects()); break;
      case 'research': setItems(store.getResearch()); break;
      case 'media': setItems(store.getMedia()); break;
      case 'blog': setItems(store.getBlogPosts()); break;
    }
  };

  const saveItems = (newItems: any[]) => {
    switch (type) {
      case 'expertise': store.setExpertise(newItems); break;
      case 'portfolio': store.setProjects(newItems); break;
      case 'research': store.setResearch(newItems); break;
      case 'media': store.setMedia(newItems); break;
      case 'blog': store.setBlogPosts(newItems); break;
    }
    setItems(newItems);
  };

  const filteredItems = items
    .filter(item => {
      const matchesSearch = !searchQuery || 
        (item.title || item.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const createNew = () => {
    const now = new Date().toISOString();
    let newItem: any = {
      id: uuidv4(),
      status: 'draft',
      order: items.length + 1,
      featured: false,
      createdAt: now,
      updatedAt: now,
    };

    switch (type) {
      case 'expertise':
        newItem = { ...newItem, name: '', slug: '', summary: '', description: '', skills: [], icon: 'code' };
        break;
      case 'portfolio':
        newItem = { ...newItem, title: '', slug: '', category: '', summary: '', challenge: '', approach: '', outcomes: '', tools: [], coverImage: '', externalUrl: '', projectDate: '' };
        break;
      case 'research':
        newItem = { ...newItem, title: '', slug: '', abstract: '', description: '', authors: [], publicationDate: '', venue: '', doi: '', keywords: [], citationText: '', bibtex: '', externalUrl: '' };
        break;
      case 'media':
        newItem = { ...newItem, title: '', description: '', category: '', imageUrl: '', altText: '', date: now.split('T')[0], attribution: '' };
        break;
      case 'blog':
        newItem = { ...newItem, title: '', slug: '', excerpt: '', body: '', authorName: 'Vanessa Osarumen Ekhaese', featuredImage: '', featuredImageAlt: '', categories: [], tags: [], publishDate: now.split('T')[0], seoTitle: '', seoDescription: '' };
        break;
    }

    setEditingItem(newItem);
    setShowForm(true);
  };

  const handleSave = (item: any) => {
    item.updatedAt = new Date().toISOString();
    // Generate slug if needed
    if (!item.slug && (item.title || item.name)) {
      item.slug = (item.title || item.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    
    const existingIndex = items.findIndex(i => i.id === item.id);
    let newItems;
    if (existingIndex >= 0) {
      newItems = [...items];
      newItems[existingIndex] = item;
    } else {
      newItems = [...items, item];
    }
    saveItems(newItems);
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    const newItems = items.filter(i => i.id !== id);
    saveItems(newItems);
    setDeleteConfirm(null);
  };

  const toggleStatus = (id: string) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        const newStatus = item.status === 'published' ? 'draft' : 'published';
        return { ...item, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return item;
    });
    saveItems(newItems);
  };

  const typeLabels: Record<ContentType, string> = {
    expertise: 'Expertise',
    portfolio: 'Project',
    research: 'Research',
    media: 'Media Item',
    blog: 'Blog Post',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal">Manage {typeLabels[type]}</h2>
          <p className="text-sm text-muted-text">{items.length} total • {items.filter(i => i.status === 'published').length} published</p>
        </div>
        <button
          onClick={createNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-purple text-warm-white rounded-lg font-medium hover:bg-deep-purple transition-colors text-sm"
        >
          <Plus size={16} /> New {typeLabels[type]}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border-purple bg-warm-white text-sm focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border-purple bg-warm-white text-sm"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="unpublished">Unpublished</option>
        </select>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {filteredItems.map(item => (
          <div key={item.id} className="p-4 rounded-xl border border-border-purple bg-warm-white hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-charcoal truncate">{item.title || item.name}</h3>
                  <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium ${
                    item.status === 'published' ? 'bg-green-100 text-green-700' :
                    item.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status}
                  </span>
                  {item.featured && (
                    <span className="shrink-0 px-2 py-0.5 rounded bg-primary-purple/10 text-xs text-primary-purple">Featured</span>
                  )}
                </div>
                <p className="text-sm text-muted-text truncate">{item.summary || item.excerpt || item.abstract || item.description?.slice(0, 100)}</p>
                {item.slug && <p className="text-xs text-secondary-purple mt-1">/{item.slug}</p>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleStatus(item.id)}
                  className="p-2 rounded-lg hover:bg-light-lavender text-muted-text hover:text-primary-purple transition-colors"
                  title={item.status === 'published' ? 'Unpublish' : 'Publish'}
                >
                  {item.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => { setEditingItem(item); setShowForm(true); }}
                  className="p-2 rounded-lg hover:bg-light-lavender text-muted-text hover:text-primary-purple transition-colors"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                {deleteConfirm === item.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-red-100 text-red-600 text-xs font-medium">Delete</button>
                    <button onClick={() => setDeleteConfirm(null)} className="p-2 rounded-lg bg-gray-100 text-gray-600 text-xs">Cancel</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-muted-text hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 rounded-xl border border-border-purple bg-warm-white">
          <p className="text-muted-text">No items found.</p>
        </div>
      )}

      {/* Edit Form Modal */}
      {showForm && editingItem && (
        <ItemForm
          type={type}
          item={editingItem}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingItem(null); }}
        />
      )}
    </div>
  );
}

// Form Component
function ItemForm({ type, item, onSave, onCancel }: { type: ContentType; item: any; onSave: (item: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ ...item });

  const updateField = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value.split(',').map((s: string) => s.trim()).filter(Boolean) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-charcoal/50 p-4 overflow-y-auto">
      <div className="bg-warm-white rounded-2xl w-full max-w-2xl my-8 shadow-xl">
        <div className="p-6 border-b border-border-purple">
          <h3 className="font-serif text-xl font-bold text-charcoal">
            {item.createdAt === item.updatedAt ? 'Create' : 'Edit'} {type === 'expertise' ? (form.name || 'New Expertise') : (form.title || 'New Item')}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Common fields */}
          {(type === 'portfolio' || type === 'research' || type === 'blog' || type === 'media') && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Title *</label>
              <input type="text" value={form.title || ''} onChange={e => updateField('title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" required />
            </div>
          )}
          {type === 'expertise' && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Name *</label>
              <input type="text" value={form.name || ''} onChange={e => updateField('name', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" required />
            </div>
          )}

          {(type === 'portfolio' || type === 'research' || type === 'blog') && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Slug</label>
              <input type="text" value={form.slug || ''} onChange={e => updateField('slug', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" placeholder="auto-generated from title" />
            </div>
          )}

          {type === 'expertise' && (
            <>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Slug</label>
                <input type="text" value={form.slug || ''} onChange={e => updateField('slug', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" placeholder="auto-generated from name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Icon</label>
                <select value={form.icon || 'code'} onChange={e => updateField('icon', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple text-sm">
                  <option value="code">Code</option>
                  <option value="microscope">Research</option>
                  <option value="target">Target</option>
                  <option value="database">Database</option>
                  <option value="globe">Globe</option>
                  <option value="shield">Shield</option>
                </select>
              </div>
            </>
          )}

          {type === 'expertise' && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Summary</label>
              <input type="text" value={form.summary || ''} onChange={e => updateField('summary', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
            </div>
          )}

          {(type === 'portfolio' || type === 'blog') && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">{type === 'blog' ? 'Excerpt' : 'Summary'}</label>
              <textarea value={type === 'blog' ? (form.excerpt || '') : (form.summary || '')} onChange={e => updateField(type === 'blog' ? 'excerpt' : 'summary', e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y" />
            </div>
          )}

          {(type === 'expertise' || type === 'portfolio' || type === 'research' || type === 'media') && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Description</label>
              <textarea value={form.description || ''} onChange={e => updateField('description', e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y" />
            </div>
          )}

          {type === 'blog' && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Body (Markdown supported)</label>
              <textarea value={form.body || ''} onChange={e => updateField('body', e.target.value)} rows={10} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y font-mono" />
            </div>
          )}

          {type === 'research' && (
            <>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Abstract</label>
                <textarea value={form.abstract || ''} onChange={e => updateField('abstract', e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Venue</label>
                <input type="text" value={form.venue || ''} onChange={e => updateField('venue', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Publication Date</label>
                <input type="month" value={form.publicationDate || ''} onChange={e => updateField('publicationDate', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">DOI</label>
                <input type="text" value={form.doi || ''} onChange={e => updateField('doi', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Citation Text</label>
                <textarea value={form.citationText || ''} onChange={e => updateField('citationText', e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">BibTeX</label>
                <textarea value={form.bibtex || ''} onChange={e => updateField('bibtex', e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y font-mono" />
              </div>
            </>
          )}

          {type === 'portfolio' && (
            <>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Category</label>
                <input type="text" value={form.category || ''} onChange={e => updateField('category', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Challenge</label>
                <textarea value={form.challenge || ''} onChange={e => updateField('challenge', e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Approach</label>
                <textarea value={form.approach || ''} onChange={e => updateField('approach', e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Outcomes</label>
                <textarea value={form.outcomes || ''} onChange={e => updateField('outcomes', e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Project Date</label>
                <input type="month" value={form.projectDate || ''} onChange={e => updateField('projectDate', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">External URL</label>
                <input type="url" value={form.externalUrl || ''} onChange={e => updateField('externalUrl', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Cover Image URL</label>
                <input type="url" value={form.coverImage || ''} onChange={e => updateField('coverImage', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
            </>
          )}

          {type === 'media' && (
            <>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Category</label>
                <select value={form.category || ''} onChange={e => updateField('category', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple text-sm">
                  <option value="">Select category</option>
                  <option value="Presentations">Presentations</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Fieldwork">Fieldwork</option>
                  <option value="Training">Training</option>
                  <option value="Interviews">Interviews</option>
                  <option value="Press">Press</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Image URL</label>
                <input type="url" value={form.imageUrl || ''} onChange={e => updateField('imageUrl', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Alt Text</label>
                <input type="text" value={form.altText || ''} onChange={e => updateField('altText', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Date</label>
                <input type="date" value={form.date || ''} onChange={e => updateField('date', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple text-sm" />
              </div>
            </>
          )}

          {type === 'blog' && (
            <>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Author Name</label>
                <input type="text" value={form.authorName || ''} onChange={e => updateField('authorName', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Publish Date</label>
                <input type="date" value={form.publishDate || ''} onChange={e => updateField('publishDate', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Featured Image URL</label>
                <input type="url" value={form.featuredImage || ''} onChange={e => updateField('featuredImage', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
            </>
          )}

          {/* Array fields */}
          {type === 'expertise' && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Skills (comma-separated)</label>
              <input type="text" value={(form.skills || []).join(', ')} onChange={e => updateArrayField('skills', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
            </div>
          )}
          {type === 'portfolio' && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Tools (comma-separated)</label>
              <input type="text" value={(form.tools || []).join(', ')} onChange={e => updateArrayField('tools', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
            </div>
          )}
          {type === 'research' && (
            <>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Authors (comma-separated)</label>
                <input type="text" value={(form.authors || []).join(', ')} onChange={e => updateArrayField('authors', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Keywords (comma-separated)</label>
                <input type="text" value={(form.keywords || []).join(', ')} onChange={e => updateArrayField('keywords', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
            </>
          )}
          {type === 'blog' && (
            <>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Categories (comma-separated)</label>
                <input type="text" value={(form.categories || []).join(', ')} onChange={e => updateArrayField('categories', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Tags (comma-separated)</label>
                <input type="text" value={(form.tags || []).join(', ')} onChange={e => updateArrayField('tags', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              </div>
            </>
          )}

          {/* Common toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.featured || false} onChange={e => updateField('featured', e.target.checked)} className="rounded border-border-purple text-primary-purple focus:ring-primary-purple" />
              <span className="text-sm text-charcoal">Featured</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Status</label>
              <select value={form.status || 'draft'} onChange={e => updateField('status', e.target.value)} className="px-3 py-2 rounded-lg border border-border-purple text-sm">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Display Order</label>
            <input type="number" value={form.order || 0} onChange={e => updateField('order', parseInt(e.target.value) || 0)} className="w-24 px-3 py-2 rounded-lg border border-border-purple text-sm" />
          </div>
        </form>

        <div className="p-6 border-t border-border-purple flex items-center justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-border-purple text-muted-text hover:text-charcoal text-sm font-medium">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-primary-purple text-warm-white text-sm font-medium hover:bg-deep-purple transition-colors">Save</button>
        </div>
      </div>
    </div>
  );
}
