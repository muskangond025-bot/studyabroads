import React from 'react';
import { Header } from '../components/ui/header-2';
import { InnerHeroBanner } from '@/app/components/InnerHeroBanner';
import { EventCategoriesGrid } from '@/app/components/EventCategoriesGrid';
import { FeaturedEvents } from '@/app/components/FeaturedEvents';
import { OurPlanningProcessMini } from '@/app/components/OurPlanningProcessMini';
import { WhyChooseUsMini } from '@/app/components/WhyChooseUsMini';
import { ClientTestimonials } from '@/app/components/ClientTestimonials';
import { CTASectionBookEvent } from '@/app/components/CTASectionBookEvent';
import { Footer } from '@/app/components/Footer';

export default function EventTypes() {
    return (
        <div className="w-full">
            <Header />
            <InnerHeroBanner 
                title="Global Universities"
                subtitle="Discover Elite Academic Institutions"
                description="Browse premier study destinations, Ivy League networks, Oxbridge colleges, and leading public academies across the world's most prestigious learning hubs."
                backgroundImage="/global_universities_hero.png"/>
            <EventCategoriesGrid />
            <FeaturedEvents />
            <OurPlanningProcessMini />
            <WhyChooseUsMini />
            <ClientTestimonials />
            <CTASectionBookEvent />
            <Footer />
        </div>
    );
}
