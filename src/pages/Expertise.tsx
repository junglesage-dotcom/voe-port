import { store } from '../store';
import { Code, BookOpen, Lightbulb, Database, Globe, Shield } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  code: <Code size={28} className="text-primary-purple" />,
  microscope: <BookOpen size={28} className="text-primary-purple" />,
  target: <Lightbulb size={28} className="text-primary-purple" />,
  database: <Database size={28} className="text-primary-purple" />,
  globe: <Globe size={28} className="text-primary-purple" />,
  shield: <Shield size={28} className="text-primary-purple" />,
};

export default function Expertise() {
  const expertise = store.getPublishedExpertise();

  return (
    <div className="animate-fade-in">
      <section className="bg-light-lavender/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Expertise</h1>
          <p className="text-lg text-muted-text max-w-2xl">
            A comprehensive overview of my professional capabilities, technical skills, and areas of specialization.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {expertise.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 rounded-2xl border border-border-purple bg-warm-white hover:shadow-md transition-shadow ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:col-span-1">
                  <div className="w-16 h-16 rounded-xl bg-light-lavender flex items-center justify-center mb-4">
                    {iconMap[item.icon] || <Code size={28} className="text-primary-purple" />}
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">{item.name}</h2>
                  <p className="text-muted-text">{item.summary}</p>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-muted-text leading-relaxed mb-6">{item.description}</p>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">Key Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-light-lavender text-primary-purple text-sm font-medium border border-border-purple"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {expertise.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-text">No expertise areas published yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
