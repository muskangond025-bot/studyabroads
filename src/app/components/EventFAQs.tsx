import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
    question: string;
    answer: string;
}

interface EventFAQsProps {
    faqs: FAQ[];
}

export const EventFAQs: React.FC<EventFAQsProps> = ({ faqs }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const faqsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                }
            });

            // FAQs staggered animation
            const validFaqs = faqsRef.current.filter(faq => faq !== null);
            gsap.from(validFaqs, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });
        });

        return () => ctx.revert();
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section 
            ref={sectionRef}
            className="w-full py-20 md:py-32"
            style={{ backgroundColor: '#fafafa' }}
        >
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24">
                    <div className="flex justify-center mb-6">
                        <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-champagne) 0%, var(--color-maroon) 100%)',
                                boxShadow: '0 10px 30px rgba(212,175,55,0.3)'
                            }}
                        >
                            <HelpCircle size={28} className="text-white" />
                        </div>
                    </div>

                    <h2 
                        ref={titleRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                        style={{ 
                            color: 'var(--color-maroon)',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Frequently Asked Questions
                    </h2>

                    <div 
                        className="w-24 h-1 mx-auto mb-6"
                        style={{ backgroundColor: 'var(--color-champagne)' }}
                    />

                    <p 
                        className="text-lg md:text-xl max-w-2xl mx-auto"
                        style={{ 
                            color: 'var(--color-charcoal)',
                            lineHeight: '1.8'
                        }}
                    >
                        Find answers to common questions about our event planning services
                    </p>
                </div>

                {/* FAQs List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            ref={el => faqsRef.current[index] = el}
                            className="faq-item"
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: `2px solid ${openIndex === index ? 'var(--color-champagne)' : 'rgba(128, 0, 32, 0.08)'}`,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left transition-all"
                                style={{
                                    background: openIndex === index 
                                        ? 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(128,0,32,0.03) 100%)' 
                                        : 'transparent'
                                }}
                            >
                                <h3 
                                    className="text-lg md:text-xl font-bold flex-1"
                                    style={{ color: 'var(--color-maroon)' }}
                                >
                                    {faq.question}
                                </h3>

                                <div 
                                    className="faq-icon w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: openIndex === index 
                                            ? 'linear-gradient(135deg, var(--color-champagne) 0%, var(--color-maroon) 100%)'
                                            : 'rgba(128, 0, 32, 0.05)',
                                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <ChevronDown 
                                        size={20} 
                                        style={{ 
                                            color: openIndex === index ? 'white' : 'var(--color-maroon)'
                                        }} 
                                    />
                                </div>
                            </button>

                            {/* Answer */}
                            <div
                                className="faq-answer"
                                style={{
                                    maxHeight: openIndex === index ? '500px' : '0',
                                    opacity: openIndex === index ? 1 : 0,
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    overflow: 'hidden'
                                }}
                            >
                                <div 
                                    className="px-6 md:px-8 pb-6 md:pb-8 pt-2"
                                >
                                    <div 
                                        className="w-full h-px mb-6"
                                        style={{ 
                                            background: 'linear-gradient(90deg, transparent 0%, var(--color-champagne) 50%, transparent 100%)'
                                        }}
                                    />
                                    <p 
                                        className="text-base md:text-lg"
                                        style={{ 
                                            color: 'var(--color-charcoal)',
                                            lineHeight: '1.8',
                                            opacity: 0.85
                                        }}
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .faq-item:hover {
                    box-shadow: 0 10px 40px rgba(212, 175, 55, 0.15);
                    transform: translateY(-2px);
                }
            `}</style>
        </section>
    );
};
