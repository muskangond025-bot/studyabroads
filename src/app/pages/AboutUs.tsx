import React from 'react';
import { Header } from "../components/ui/header-2";
import { StoryMissionVision } from "@/app/components/StoryMissionVision";
import { LuxuryGallerySection } from "@/app/components/LuxuryGallerySection";
import { AchievementsSection } from "@/app/components/AchievementsSection";
import { MeetTheTeamSection } from "@/app/components/MeetTheTeamSection";
import { WhyTrustUsSection } from "@/app/components/WhyTrustUsSection";
import { TestimonialsMiniSection } from "@/app/components/TestimonialsMiniSection";
import { CallToAction } from "@/app/components/CallToAction";
import { Footer } from "@/app/components/Footer";

export default function AboutUs() {
    return (
        <div className="w-full">
            <Header />
            <StoryMissionVision />
            <LuxuryGallerySection />
            <AchievementsSection />
            <MeetTheTeamSection />
            <WhyTrustUsSection />
            <TestimonialsMiniSection />
            <CallToAction />
            <Footer />
        </div>
    );
}
