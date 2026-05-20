import React from 'react';
import { Header } from '../components/ui/header-2';
import { InnerHeroBanner } from '@/app/components/InnerHeroBanner';
import { MultiStepQuoteForm } from '@/app/components/MultiStepQuoteForm';
import { Footer } from '@/app/components/Footer';

export default function GetQuote() {
    return (
        <div className="w-full bg-cream min-h-screen">
            <Header />
            <div className="pt-24">
                <MultiStepQuoteForm />
            </div>
            <Footer />
        </div>
    );
}
