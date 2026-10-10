import { useState } from 'react';
import { store } from '../store';
import { SiteSettings } from '../types';
import { Save, RotateCcw, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(store.getSettings());
  const [saved, setSaved] = useState(false);

  const updateField = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const links = [...settings.socialLinks];
    links[index] = { ...links[index], [field]: value };
    updateField('socialLinks', links);
  };

  const addSocialLink = () => {
    updateField('socialLinks', [...settings.socialLinks, { platform: '', url: '' }]);
  };

  const removeSocialLink = (index: number) => {
    updateField('socialLinks', settings.socialLinks.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    store.setSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Reset all site data to defaults? This cannot be undone.')) {
      store.resetAll();
      setSettings(store.getSettings());
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal">Site Settings</h2>
          <p className="text-sm text-muted-text">Configure your portfolio's identity and global settings</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-purple text-muted-text hover:text-red-500 hover:border-red-200 text-sm font-medium">
            <RotateCcw size={16} /> Reset All
          </button>
          <button onClick={handleSave} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-purple text-warm-white text-sm font-medium hover:bg-deep-purple transition-colors">
            {saved ? <CheckCircle size={16} /> : <Save size={16} />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Identity */}
      <section className="p-6 rounded-xl border border-border-purple bg-warm-white space-y-5">
        <h3 className="font-serif text-lg font-semibold text-charcoal">Identity</h3>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Full Name</label>
          <input type="text" value={settings.name} onChange={e => updateField('name', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Professional Headline</label>
          <input type="text" value={settings.headline} onChange={e => updateField('headline', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Bio / Introduction</label>
          <textarea value={settings.bio} onChange={e => updateField('bio', e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y" />
        </div>
      </section>

      {/* Contact */}
      <section className="p-6 rounded-xl border border-border-purple bg-warm-white space-y-5">
        <h3 className="font-serif text-lg font-semibold text-charcoal">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
            <input type="email" value={settings.email} onChange={e => updateField('email', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Phone</label>
            <input type="tel" value={settings.phone} onChange={e => updateField('phone', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Location</label>
          <input type="text" value={settings.location} onChange={e => updateField('location', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
        </div>
      </section>

      {/* Social Links */}
      <section className="p-6 rounded-xl border border-border-purple bg-warm-white space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold text-charcoal">Social Links</h3>
          <button onClick={addSocialLink} className="text-sm text-primary-purple font-medium hover:text-deep-purple">+ Add Link</button>
        </div>
        <div className="space-y-3">
          {settings.socialLinks.map((link, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input type="text" value={link.platform} onChange={e => updateSocialLink(i, 'platform', e.target.value)} placeholder="Platform" className="flex-1 px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              <input type="url" value={link.url} onChange={e => updateSocialLink(i, 'url', e.target.value)} placeholder="URL" className="flex-[2] px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
              <button onClick={() => removeSocialLink(i)} className="p-2 rounded-lg hover:bg-red-50 text-muted-text hover:text-red-500 text-sm">×</button>
            </div>
          ))}
        </div>
      </section>

      {/* SEO */}
      <section className="p-6 rounded-xl border border-border-purple bg-warm-white space-y-5">
        <h3 className="font-serif text-lg font-semibold text-charcoal">SEO & Footer</h3>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">SEO Title</label>
          <input type="text" value={settings.seoTitle} onChange={e => updateField('seoTitle', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">SEO Description</label>
          <textarea value={settings.seoDescription} onChange={e => updateField('seoDescription', e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Footer Text</label>
          <input type="text" value={settings.footerText} onChange={e => updateField('footerText', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-purple focus:border-primary-purple focus:ring-1 focus:ring-primary-purple text-sm" />
        </div>
      </section>
    </div>
  );
}
