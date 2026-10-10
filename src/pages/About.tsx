import { store } from '../store';
import { MapPin, Mail, GraduationCap, Briefcase } from 'lucide-react';

export default function About() {
  const settings = store.getSettings();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-light-lavender/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">About Me</h1>
            <p className="text-lg text-muted-text leading-relaxed">{settings.bio}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">Professional Background</h2>
                <div className="prose text-muted-text leading-relaxed">
                  <p>
                    I am a dedicated professional with a passion for leveraging technology and research to create meaningful impact. 
                    My work sits at the intersection of software development, academic research, and community engagement.
                  </p>
                  <p>
                    With a strong foundation in both technical and research methodologies, I approach every project with 
                    rigor, creativity, and a commitment to delivering solutions that address real-world challenges.
                  </p>
                  <p>
                    I believe in the power of technology to transform communities and am committed to ensuring that 
                    the solutions I build are accessible, sustainable, and genuinely beneficial to the people they serve.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">Interests & Focus Areas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Technology for Social Impact',
                    'Software Architecture',
                    'Research Methodology',
                    'Community Development',
                    'Data-Driven Decision Making',
                    'Open Source Contribution',
                  ].map((interest, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-light-lavender/50 border border-border-purple">
                      <div className="w-2 h-2 rounded-full bg-primary-purple"></div>
                      <span className="text-sm text-charcoal">{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border-purple bg-warm-white">
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Quick Info</h3>
                <div className="space-y-3">
                  {settings.location && (
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-primary-purple" />
                      <span className="text-sm text-muted-text">{settings.location}</span>
                    </div>
                  )}
                  {settings.email && (
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-primary-purple" />
                      <a href={`mailto:${settings.email}`} className="text-sm text-muted-text hover:text-primary-purple transition-colors">{settings.email}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <GraduationCap size={18} className="text-primary-purple" />
                    <span className="text-sm text-muted-text">Researcher & Developer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase size={18} className="text-primary-purple" />
                    <span className="text-sm text-muted-text">Open to Collaboration</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border-purple bg-warm-white">
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Connect</h3>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
