import React from 'react';
import { Header } from '../components/ui/header-2';
import { InnerHeroBanner } from '@/app/components/InnerHeroBanner';
import { VenueCardsGrid } from '@/app/components/VenueCardsGrid';
import { CTASectionBookVenue } from '@/app/components/CTASectionBookVenue';
import { Footer } from '@/app/components/Footer';

export default function Venues() {
    return (
        <div className="w-full">
            <Header />
            <InnerHeroBanner 
                title="Elite Scholarships"
                subtitle="Funding Your Global Academic Journey"
                description="Discover highly-funded merit fellowships, fully-endowed research grants, and regional tuition waivers designed to unlock prestige studies with financial security."
                backgroundImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2070"
            />
            <VenueCardsGrid />
            <CTASectionBookVenue />
            <Footer />
        </div>
    );
}
