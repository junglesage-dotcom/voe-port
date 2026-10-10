import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { store } from '../store';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/expertise', label: 'Expertise' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/research', label: 'Research' },
  { path: '/media', label: 'Media' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const settings = store.getSettings();

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-border-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Monogram */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Home">
            <div className="w-10 h-10 rounded-lg bg-primary-purple flex items-center justify-center shadow-sm group-hover:bg-deep-purple transition-colors">
              <span className="text-warm-white font-serif font-bold text-sm tracking-wide">VOE</span>
            </div>
            <span className="hidden sm:block font-serif text-lg font-semibold text-charcoal">{settings.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-purple bg-light-lavender'
                    : 'text-muted-text hover:text-primary-purple hover:bg-light-lavender/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-muted-text hover:text-primary-purple hover:bg-light-lavender transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border-purple bg-warm-white" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-purple bg-light-lavender'
                    : 'text-muted-text hover:text-primary-purple hover:bg-light-lavender/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const settings = store.getSettings();

  return (
    <footer className="bg-deep-purple text-warm-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary-purple flex items-center justify-center">
                <span className="text-warm-white font-serif font-bold text-sm">VOE</span>
              </div>
              <span className="font-serif text-lg font-semibold">{settings.name}</span>
            </div>
            <p className="text-purple-200 text-sm leading-relaxed">{settings.headline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider mb-4 text-purple-200">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.slice(0, 6).map(link => (
                <Link key={link.path} to={link.path} className="text-sm text-purple-200 hover:text-warm-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider mb-4 text-purple-200">Connect</h3>
            <div className="space-y-2">
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="block text-sm text-purple-200 hover:text-warm-white transition-colors">
                  {settings.email}
                </a>
              )}
              {settings.socialLinks.map((link, i) => (
                <a key={i} href={link.url} className="block text-sm text-purple-200 hover:text-warm-white transition-colors" target="_blank" rel="noopener noreferrer">
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-purple-800 text-center text-sm text-purple-300">
          {settings.footerText}
        </div>
      </div>
    </footer>
  );
}
