import React from 'react';
import { Header } from "../components/ui/header-2";
import { ThreeDHero } from "@/components/ThreeDHero";
import { EventTypeSection } from "@/app/components/EventTypeSection";
import { OurServices } from "@/app/components/OurServices";
import { FeaturedEvents } from "@/app/components/FeaturedEvents";
import { TextEffectSection } from "@/app/components/TextEffectSection";
import { ClientTestimonials } from "@/app/components/ClientTestimonials";
import { FAQMini } from "@/app/components/FAQMini";
import { CallToAction } from "@/app/components/CallToAction";
import { Footer } from "@/app/components/Footer";

export default function Home() {
    return (
        <div className="w-full">
            <Header />
            <ThreeDHero />
            <EventTypeSection />
            <OurServices />
            <FeaturedEvents />
            <TextEffectSection />
            <ClientTestimonials />
            <FAQMini />
            <CallToAction />
            <Footer />
        </div>
    );
}
