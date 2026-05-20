import React from 'react';
import { Header } from '../components/ui/header-2';
import { InnerHeroBanner } from '@/app/components/InnerHeroBanner';
import { ContactInfoCards } from '@/app/components/ContactInfoCards';
import { EnquiryForm } from '@/app/components/EnquiryForm';
import { GoogleMap } from '@/app/components/GoogleMap';
import { SocialLinks } from '@/app/components/SocialLinks';
import { Footer } from '@/app/components/Footer';

export default function ContactUs() {
    return (
        <div className="w-full">
            <Header />
            <InnerHeroBanner 
                title="Global Coordinates"
                subtitle="Connect With Elite Advisors"
                description="Begin your selective global placement journey. Reach out to our advisors in London and Zurich to initiate your appraisal."
                backgroundImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2070"
            />
            <ContactInfoCards />
            <EnquiryForm />
            <GoogleMap />
            <SocialLinks />
            <Footer />
        </div>
    );
}
