import React from 'react';
import { Header } from '../components/ui/header-2';
import { ServiceHeroBanner } from '@/app/components/ServiceHeroBanner';
import { PostSlider } from '@/app/components/PostSlider';
import ElegantCarousel from '@/app/components/ui/elegant-carousel';
import { WhyChooseServices } from '@/app/components/WhyChooseServices';
import { GetQuoteSection } from '@/app/components/GetQuoteSection';
import { FAQMini } from '@/app/components/FAQMini';
import { ClientTestimonials } from '@/app/components/ClientTestimonials';
import { CallToAction } from '@/app/components/CallToAction';
import { Footer } from '@/app/components/Footer';

export default function Services() {
  return (
    <div className="w-full">
      <Header />
      <ServiceHeroBanner />
      <PostSlider />
      <ElegantCarousel />
      <WhyChooseServices />
      <GetQuoteSection />
      <FAQMini />
      <ClientTestimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
