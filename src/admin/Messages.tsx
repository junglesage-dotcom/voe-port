import { useState } from 'react';
import { store } from '../store';
import { Mail, MailOpen, Trash2, Eye } from 'lucide-react';

export default function AdminMessages() {
  const [submissions, setSubmissions] = useState(store.getSubmissions());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const refresh = () => setSubmissions(store.getSubmissions());

  const markRead = (id: string) => {
    store.markSubmissionRead(id);
    refresh();
  };

  const handleDelete = (id: string) => {
    store.deleteSubmission(id);
    refresh();
    setDeleteConfirm(null);
    if (selectedId === id) setSelectedId(null);
  };

  const selected = submissions.find(s => s.id === selectedId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-charcoal">Messages</h2>
        <p className="text-sm text-muted-text">{submissions.length} total • {submissions.filter(s => !s.read).length} unread</p>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-border-purple bg-warm-white">
          <Mail size={48} className="text-muted-text/30 mx-auto mb-4" />
          <p className="text-muted-text">No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="space-y-2">
            {submissions.map(sub => (
              <button
                key={sub.id}
                onClick={() => { setSelectedId(sub.id); if (!sub.read) markRead(sub.id); }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedId === sub.id ? 'border-primary-purple bg-light-lavender/50 shadow-sm' : 'border-border-purple bg-warm-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  {!sub.read ? (
                    <Mail size={18} className="text-primary-purple mt-0.5 shrink-0" />
                  ) : (
                    <MailOpen size={18} className="text-muted-text mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm truncate ${!sub.read ? 'font-semibold text-charcoal' : 'text-charcoal'}`}>{sub.name}</p>
                      <span className="text-xs text-muted-text shrink-0">{new Date(sub.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-muted-text truncate">{sub.email}</p>
                    <p className="text-sm text-muted-text truncate mt-1">{sub.message}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="rounded-xl border border-border-purple bg-warm-white p-6">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-charcoal">{selected.name}</h3>
                    <p className="text-sm text-muted-text">{selected.email}</p>
                    {selected.organization && <p className="text-sm text-muted-text">{selected.organization}</p>}
                  </div>
                  <div className="flex gap-1">
                    {deleteConfirm === selected.id ? (
                      <div className="flex gap-1">
                        <button onClick={() => handleDelete(selected.id)} className="px-2 py-1 rounded bg-red-100 text-red-600 text-xs font-medium">Delete</button>
                        <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 rounded bg-gray-100 text-xs">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(selected.id)} className="p-2 rounded-lg hover:bg-red-50 text-muted-text hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {selected.projectType && (
                  <div>
                    <span className="text-xs font-medium text-secondary-purple uppercase">Project Type</span>
                    <p className="text-sm text-charcoal">{selected.projectType}</p>
                  </div>
                )}

                <div>
                  <span className="text-xs font-medium text-secondary-purple uppercase">Message</span>
                  <p className="text-sm text-charcoal mt-1 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                </div>

                <div className="pt-4 border-t border-border-purple">
                  <span className="text-xs text-muted-text">Received: {new Date(selected.createdAt).toLocaleString()}</span>
                </div>

                <a
                  href={`mailto:${selected.email}?subject=Re: Your inquiry`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-purple text-warm-white text-sm font-medium hover:bg-deep-purple transition-colors"
                >
                  <Mail size={16} /> Reply via Email
                </a>
              </div>
            ) : (
              <div className="text-center py-12">
                <Eye size={32} className="text-muted-text/30 mx-auto mb-3" />
                <p className="text-muted-text text-sm">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
