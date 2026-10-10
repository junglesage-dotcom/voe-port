import { useState } from 'react';
import { store } from '../store';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function Contact() {
  const settings = store.getSettings();
  const [form, setForm] = useState({ name: '', email: '', organization: '', projectType: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.length > 2000) errs.message = 'Message must be under 2000 characters';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');
    
    // Simulate submission (in production, this would be a server API call)
    setTimeout(() => {
      store.addSubmission({
        id: uuidv4(),
        name: form.name.trim(),
        email: form.email.trim(),
        organization: form.organization.trim(),
        projectType: form.projectType,
        message: form.message.trim(),
        createdAt: new Date().toISOString(),
        read: false,
      });
      setStatus('success');
      setForm({ name: '', email: '', organization: '', projectType: '', message: '' });
    }, 1000);
  };

  return (
    <div className="animate-fade-in">
      <section className="bg-light-lavender/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Contact</h1>
          <p className="text-lg text-muted-text max-w-2xl">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {status === 'success' ? (
                <div className="p-8 rounded-2xl border border-green-200 bg-green-50 text-center">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Message Sent!</h2>
                  <p className="text-muted-text mb-4">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2 rounded-lg bg-primary-purple text-warm-white font-medium hover:bg-deep-purple transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300' : 'border-border-purple'} bg-warm-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple transition-colors`}
                        placeholder="Your name"
                        maxLength={100}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300' : 'border-border-purple'} bg-warm-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple transition-colors`}
                        placeholder="your@email.com"
                        maxLength={200}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-charcoal mb-1">
                        Organization
                      </label>
                      <input
                        id="organization"
                        type="text"
                        value={form.organization}
                        onChange={e => setForm({ ...form, organization: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-purple bg-warm-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple transition-colors"
                        placeholder="Company or organization"
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-charcoal mb-1">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        value={form.projectType}
                        onChange={e => setForm({ ...form, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-purple bg-warm-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple transition-colors"
                      >
                        <option value="">Select a type</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Research Collaboration">Research Collaboration</option>
                        <option value="Consulting">Consulting</option>
                        <option value="Speaking/Workshop">Speaking / Workshop</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-300' : 'border-border-purple'} bg-warm-white focus:border-primary-purple focus:ring-1 focus:ring-primary-purple transition-colors resize-y`}
                      placeholder="Tell me about your project or inquiry..."
                      maxLength={2000}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                      <p className="text-xs text-muted-text ml-auto">{form.message.length}/2000</p>
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                      <AlertCircle size={16} className="text-red-500" />
                      <p className="text-sm text-red-700">Something went wrong. Please try again.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-purple text-warm-white rounded-lg font-medium hover:bg-deep-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>Sending...</>
                    ) : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border-purple bg-warm-white">
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  {settings.email && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-light-lavender flex items-center justify-center">
                        <Mail size={18} className="text-primary-purple" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-text">Email</p>
                        <a href={`mailto:${settings.email}`} className="text-sm text-charcoal hover:text-primary-purple transition-colors">{settings.email}</a>
                      </div>
                    </div>
                  )}
                  {settings.location && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-light-lavender flex items-center justify-center">
                        <MapPin size={18} className="text-primary-purple" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-text">Location</p>
                        <p className="text-sm text-charcoal">{settings.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border-purple bg-warm-white">
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Connect Online</h3>
                <div className="space-y-2">
                  {settings.socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 rounded-lg bg-light-lavender/50 text-sm text-charcoal hover:bg-light-lavender hover:text-primary-purple transition-colors"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-light-lavender/50 border border-border-purple">
                <p className="text-sm text-muted-text leading-relaxed">
                  I typically respond within 24-48 hours. For urgent matters, please indicate so in your message subject.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
