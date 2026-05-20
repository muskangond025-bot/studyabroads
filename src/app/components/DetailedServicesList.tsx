import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
}

export function DetailedServicesList() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const services: Service[] = [
    {
      title: 'Full Event Planning & Coordination',
      description: 'Comprehensive end-to-end event management from concept to execution, ensuring every detail is perfectly orchestrated.',
      features: [
        'Initial consultation and vision development',
        'Budget planning and management',
        'Timeline creation and milestone tracking',
        'Vendor coordination and management',
        'On-site event coordination and supervision',
        'Post-event wrap-up and reporting'
      ],
      image: 'https://images.unsplash.com/photo-1712903276040-c99b32a057eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHBsYW5uaW5nJTIwY29vcmRpbmF0aW9uJTIwdGVhbXxlbnwxfHx8fDE3NzI4NDU3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Venue Selection & Design',
      description: 'Expert guidance in finding and transforming the perfect space for your event with stunning decor and ambiance.',
      features: [
        'Venue scouting and site visits',
        'Space planning and layout design',
        'Decor concept development',
        'Floral arrangements and centerpieces',
        'Lighting design and installation',
        'Custom signage and branding'
      ],
      image: 'https://images.unsplash.com/photo-1738669469714-56aace3182a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW51ZSUyMHNldHVwJTIwZGVjb3JhdGlvbiUyMGVsZWdhbnR8ZW58MXx8fHwxNzcyODgwMTM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Catering & Menu Planning',
      description: 'Exquisite culinary experiences tailored to your tastes, dietary requirements, and event theme.',
      features: [
        'Custom menu development',
        'Tasting sessions',
        'Dietary accommodation (vegan, gluten-free, etc.)',
        'Beverage selection and bar services',
        'Service staff coordination',
        'Presentation and plating design'
      ],
      image: 'https://images.unsplash.com/photo-1771154139725-f2b0b4891430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBzZXJ2aWNlJTIwYnVmZmV0fGVufDF8fHx8MTc3Mjg4MDEzN3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Audio Visual & Production',
      description: 'State-of-the-art technical solutions for flawless presentations, entertainment, and multimedia experiences.',
      features: [
        'Sound system setup and operation',
        'Professional lighting design',
        'Video projection and screens',
        'Stage design and construction',
        'Live streaming capabilities',
        'Technical staff and support'
      ],
      image: 'https://images.unsplash.com/photo-1766310549203-7e8a8a90151f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpbyUyMHZpc3VhbCUyMGVxdWlwbWVudCUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzcyODgwMTM3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Photography & Videography',
      description: 'Professional documentation of your event to preserve every precious moment for years to come.',
      features: [
        'Professional photography services',
        'Cinematic videography',
        'Drone footage (where permitted)',
        'Photo booth setup',
        'Same-day highlight videos',
        'Post-production editing and delivery'
      ],
      image: 'https://images.unsplash.com/photo-1769230385107-bc6eaa7a123e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHBob3RvZ3JhcGh5JTIwdmlkZW9ncmFwaHklMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyODgwMTM3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Guest Management & Logistics',
      description: 'Seamless coordination of guest experiences, from invitations to transportation and accommodations.',
      features: [
        'RSVP tracking and management',
        'Digital and printed invitations',
        'Guest transportation coordination',
        'Hotel accommodation blocks',
        'Check-in and registration services',
        'VIP guest coordination'
      ],
      image: 'https://images.unsplash.com/photo-1771281551036-6155d008b800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHRyYW5zcG9ydGF0aW9uJTIwbG9naXN0aWNzJTIwZ3Vlc3RzfGVufDF8fHx8MTc3Mjg4MDEzOHww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <section 
      className="relative w-full py-20 px-4"
      style={{ backgroundColor: 'var(--color-off-white)' }}
    >
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
            Detailed Services
          </h2>
          <div 
            className="w-32 h-1 mx-auto mb-6"
            style={{ backgroundColor: 'var(--color-champagne)' }}
          />
          <p 
            className="text-lg max-w-3xl mx-auto"
            style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}
          >
            Explore our full range of professional services, each designed to ensure your event exceeds expectations
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500"
              style={{
                border: expandedIndex === index ? '2px solid var(--color-champagne)' : '2px solid transparent'
              }}
            >
              {/* Service Header - Clickable */}
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full text-left transition-all duration-300 hover:bg-opacity-50"
              >
                <div className="flex items-center gap-6 p-6">
                  {/* Image Thumbnail */}
                  <div 
                    className="relative flex-shrink-0 rounded-lg overflow-hidden"
                    style={{ width: '120px', height: '120px' }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(128, 0, 32, 0.3) 100%)'
                      }}
                    />
                  </div>

                  {/* Title and Description */}
                  <div className="flex-1">
                    <h3 
                      className="text-2xl mb-2"
                      style={{ 
                        fontFamily: "'Cormorant Garamond', serif",
                        color: 'var(--color-maroon)',
                        fontWeight: '600'
                      }}
                    >
                      {service.title}
                    </h3>
                    <p style={{ color: 'var(--color-charcoal)', opacity: 0.8 }}>
                      {service.description}
                    </p>
                  </div>

                  {/* Expand Icon */}
                  <div 
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{
                      transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: expandedIndex === index ? 'var(--color-champagne)' : 'var(--color-off-white)',
                        color: expandedIndex === index ? 'var(--color-maroon)' : 'var(--color-charcoal)'
                      }}
                    >
                      ▼
                    </div>
                  </div>
                </div>
              </button>

              {/* Expandable Content */}
              <div
                className="overflow-hidden transition-all duration-500"
                style={{
                  maxHeight: expandedIndex === index ? '500px' : '0px',
                  opacity: expandedIndex === index ? 1 : 0
                }}
              >
                <div 
                  className="px-6 pb-6 pt-2"
                  style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}
                >
                  <h4 
                    className="text-lg mb-4"
                    style={{ 
                      color: 'var(--color-maroon)',
                      fontWeight: '600'
                    }}
                  >
                    What's Included:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <div 
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{ backgroundColor: 'var(--color-champagne)' }}
                        >
                          <Check size={14} style={{ color: 'var(--color-maroon)' }} />
                        </div>
                        <span style={{ color: 'var(--color-charcoal)' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
