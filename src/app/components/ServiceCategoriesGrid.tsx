import React from 'react';
import { Calendar, Users, Music, PartyPopper, Utensils, Sparkles } from 'lucide-react';

interface ServiceCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

export function ServiceCategoriesGrid() {
  const categories: ServiceCategory[] = [
    {
      icon: <Calendar size={32} />,
      title: 'Wedding Events',
      description: 'Elegant wedding planning and coordination for your special day',
      image: 'https://images.unsplash.com/photo-1767986012138-4893f40932d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjB2ZW51ZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzcyODgwMTEwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: <Users size={32} />,
      title: 'Corporate Events',
      description: 'Professional conferences, seminars, and team building activities',
      image: 'https://images.unsplash.com/photo-1764726354430-1b85fa37234f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBjb25mZXJlbmNlJTIwZXZlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyODgwMTEwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: <PartyPopper size={32} />,
      title: 'Private Parties',
      description: 'Birthday celebrations, anniversaries, and intimate gatherings',
      image: 'https://images.unsplash.com/photo-1772683530826-78f99de8fe53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwY2VsZWJyYXRpb24lMjBkZWNvcmF0aW9uc3xlbnwxfHx8fDE3NzI4ODAxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: <Music size={32} />,
      title: 'Entertainment',
      description: 'Concerts, live performances, and music festival organization',
      image: 'https://images.unsplash.com/photo-1670028514318-0ac718c0590d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBldmVudCUyMHN0YWdlfGVufDF8fHx8MTc3Mjg4MDExMXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: <Sparkles size={32} />,
      title: 'Gala & Fundraisers',
      description: 'Charity events, galas, and fundraising occasions',
      image: 'https://images.unsplash.com/photo-1770140304098-46700a5c45c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxhJTIwZGlubmVyJTIwbHV4dXJ5JTIwYmFucXVldHxlbnwxfHx8fDE3NzI4ODAxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: <Utensils size={32} />,
      title: 'Festivals & Outdoor',
      description: 'Large-scale outdoor events, festivals, and public gatherings',
      image: 'https://images.unsplash.com/photo-1761113495455-f49d6d00e773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZmVzdGl2YWwlMjBldmVudCUyMHN1bW1lcnxlbnwxfHx8fDE3NzI4ODAxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <section className="relative w-full py-20 px-4" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="mb-4"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--color-maroon)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '300',
              letterSpacing: '-0.02em'
            }}
          >
            Service Categories
          </h2>
          <div 
            className="w-32 h-1 mx-auto mb-6"
            style={{ backgroundColor: 'var(--color-champagne)' }}
          />
          <p 
            className="text-lg max-w-3xl mx-auto"
            style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}
          >
            Discover our comprehensive range of event planning services designed to make every occasion extraordinary
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              style={{ height: '400px' }}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(to top, rgba(128, 0, 32, 0.95) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)'
                }}
              />

              {/* Icon Circle */}
              <div 
                className="absolute top-6 left-6 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style={{
                  backgroundColor: 'var(--color-champagne)',
                  color: 'var(--color-maroon)'
                }}
              >
                {category.icon}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 
                  className="text-2xl mb-2 transition-transform duration-500 group-hover:translate-x-2"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: 'var(--color-champagne)',
                    fontWeight: '600'
                  }}
                >
                  {category.title}
                </h3>
                <p 
                  className="text-sm opacity-90 transition-all duration-500 group-hover:opacity-100"
                  style={{ lineHeight: '1.6' }}
                >
                  {category.description}
                </p>

                {/* Learn More Link */}
                <div 
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ color: 'var(--color-champagne)' }}
                >
                  Learn More
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>

              {/* Border Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  border: '2px solid var(--color-champagne)',
                  borderRadius: '0.75rem'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
