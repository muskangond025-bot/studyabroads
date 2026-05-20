import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Heart, Briefcase, Cake, Sparkles, Music, Baby, GraduationCap, Users, Camera, Utensils, Palette, Volume2, Lightbulb, Gift, MessageSquare, Globe, Compass, ShieldCheck, Zap } from 'lucide-react';
import { EventHeroBanner } from '../components/EventHeroBanner';
import { EventOverview } from '../components/EventOverview';
import { ServicesIncluded } from '../components/ServicesIncluded';
import { EventGallery } from '../components/EventGallery';
import { PlanningProcessTimeline } from '../components/PlanningProcessTimeline';
import { GetQuoteForm } from '../components/GetQuoteForm';
import { FAQMini } from '../components/FAQMini';
import { EventTestimonials } from '../components/EventTestimonials';
import { CTAContact } from '../components/CTAContact';
import { Header } from '../components/ui/header-2';
import { Footer } from '../components/Footer';

// Destination data with all details
const eventData: Record<string, any> = {
    'uk': {
        id: 'uk',
        title: 'Study in the United Kingdom',
        subtitle: 'Heritage Learning & Prestigious Collegiate Academic Ecosystems',
        icon: GraduationCap,
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1080',
        description: 'The UK holds some of the world\'s oldest and most prestigious institutions, offering accelerated degree paths, world-class research labs, and unparalleled industry linkages.',
        highlights: [
            '3-Year Undergraduate & 1-Year Master\'s options',
            'Graduate Route: 2-year post-study work visa',
            'Home to Oxford, Cambridge, Imperial, and LSE',
            'Robust National Health Service (NHS) coverage',
            'Exceptional global employability rankings'
        ],
        stats: [
            { label: 'QS Top 100 Unis', value: '17' },
            { label: 'Visa Success', value: '98.9%' },
            { label: 'Post-Study Visa', value: '2 Years' },
            { label: 'Min. IELTS Score', value: '6.5' }
        ],
        services: [
            { icon: GraduationCap, title: 'UCAS Admissions Consulting', description: 'Expert guidance on UCAS undergraduate profiles, college selections, and master\'s proposals.' },
            { icon: Users, title: 'Student Visa Preparation', description: 'Meticulous prep for Student Visa portfolios, financial document checks, and mock interviews.' },
            { icon: Palette, title: 'Scholarship Sourcing', description: 'Assisting exceptional scholars in securing Chevening, Commonwealth, and institutional tuition waivers.' },
            { icon: Utensils, title: 'Accommodation Placement', description: 'Curating student housing options, from university halls of residence to secure private apartments.' },
            { icon: Lightbulb, title: 'Personal Statement Styling', description: 'Editorial review and styling of personal statements and Oxbridge academic samples.' },
            { icon: Gift, title: 'Pre-Departure Briefings', description: 'Comprehensive pre-departure strategy, flight coordinates, packing guides, and peer connections.' }
        ],
        galleryImages: [
            'https://images.unsplash.com/photo-1548625361-155de0cbb55a?w=800&q=80',
            'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
            'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?w=800&q=80',
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'
        ],
        timeline: [
            { number: '01', icon: MessageSquare, title: 'Profile Evaluation', description: 'Evaluate your transcripts, standardized scores, and academic goals to isolate target UK universities.' },
            { number: '02', icon: Lightbulb, title: 'Statement & Reference Grooming', description: 'Draft compelling UCAS personal statements and curate authoritative reference coordinates.' },
            { number: '03', icon: Users, title: 'Application Submission', description: 'Review, finalize, and submit UCAS portfolios and direct master\'s applications before deadlines.' },
            { number: '04', icon: Palette, title: 'Visa & Scholarship Management', description: 'Compile financial proof documents, secure the CAS letter, and file visa applications.' },
            { number: '05', icon: Sparkles, title: 'Pre-Departure Synchronization', description: 'Pack your bags and synchronize with alumni networks before flying out to your collegiate destination.' }
        ],
        faqs: [
            { 
                question: 'When should I begin the UK university application process?', 
                answer: 'We recommend starting 10-12 months prior to your intake. For Oxford, Cambridge, or medical programs, the UCAS deadline is mid-October, meaning early preparation is essential.' 
            },
            { 
                question: 'Can I work while studying in the UK?', 
                answer: 'Yes. Most student visa holders can work up to 20 hours per week during term time and full-time during official university vacations.' 
            },
            { 
                question: 'What is the Graduate Route work visa?', 
                answer: 'The Graduate Route allows international students who have successfully completed an undergraduate or master\'s degree to stay and work in the UK for up to 2 years (3 years for PhD graduates).' 
            }
        ],
        testimonials: [
            {
                name: 'Eleanor Vance',
                role: 'MSc Finance, LSE',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
                text: 'The essay review was extremely sharp and refined. I secured LSE with a partial merit scholarship!',
                rating: 5
            },
            {
                name: 'Liam Foster',
                role: 'BA Philosophy, Oxford',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
                text: 'Oxbridge mock interviews prepared me thoroughly for the rigorous admissions questions. Exceptional team!',
                rating: 5
            }
        ]
    },
    'us': {
        id: 'us',
        title: 'Study in the United States',
        subtitle: 'Ivy League Prestige & Cutting-Edge Technological Innovation',
        icon: Globe,
        image: 'https://images.unsplash.com/photo-1576085898323-f1e8c37e5f36?auto=format&fit=crop&q=80&w=1080',
        description: 'The US offers unparalleled collegiate diversity, massive research funding, and direct industry pipelines in Silicon Valley, Wall Street, and beyond.',
        highlights: [
            'Ivy League and Top 50 Global Institutions',
            'Up to 36 months STEM OPT extension',
            'Highly flexible curriculum with liberal arts choices',
            'Substantial financial aid and merit fellowships',
            'World leading technology hubs and research infrastructure'
        ],
        stats: [
            { label: 'QS Top 100 Unis', value: '27' },
            { label: 'Visa Success', value: '96.5%' },
            { label: 'STEM OPT Period', value: '3 Years' },
            { label: 'Avg. Scholarship', value: '$35K+' }
        ],
        services: [
            { icon: GraduationCap, title: 'Common App Consulting', description: 'Expert guidance on Common App essay prompts, college list styling, and supplementary questions.' },
            { icon: Users, title: 'F-1 Student Visa Prep', description: 'Comprehensive support with I-20 documentation, DS-160 filings, and mock visa officer interviews.' },
            { icon: Palette, title: 'Merit Scholarship Hunting', description: 'Securing need-based grants, institutional fellowships, and assistantship packages.' },
            { icon: Utensils, title: 'Campus Dorm Coordination', description: 'Selecting campus housing arrangements, meal plans, and roommate matchmaking.' },
            { icon: Lightbulb, title: 'SAT / ACT Prep Strategy', description: 'Targeted strategies to maximize scores for competitive, test-optional and test-required paths.' },
            { icon: Gift, title: 'Pre-Departure Briefings', description: 'Comprehensive insurance reviews, credit transfer checkups, and travel networks.' }
        ],
        galleryImages: [
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
            'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
            'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
            'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=800&q=80',
            'https://images.unsplash.com/photo-1544531516-a5e340cb224f?w=800&q=80'
        ],
        timeline: [
            { number: '01', icon: MessageSquare, title: 'Profile Diagnostics', description: 'Evaluate GPA, extracurricular records, and SAT targets to frame Early Action/Decision lists.' },
            { number: '02', icon: Lightbulb, title: 'Personal Statement Styling', description: 'Develop a highly distinctive Common App essay and refine specialized college supplements.' },
            { number: '03', icon: Users, title: 'Portfolio Submission', description: 'Perfect and submit application dossiers via Common App or Coalition before deadlines.' },
            { number: '04', icon: Palette, title: 'I-20 & Visa Interview Prep', description: 'Secure I-20 documents and perform intensive face-to-face mock interviews for the F-1 visa.' },
            { number: '05', icon: Sparkles, title: 'Pre-Arrival Orientation', description: 'Synchronize pre-arrival logistics and link with current scholars on US campuses.' }
        ],
        faqs: [
            { 
                question: 'What is the difference between Early Action (EA) and Early Decision (ED)?', 
                answer: 'Early Action is non-binding, allowing you to apply early and receive decisions by mid-December. Early Decision is binding, meaning you commit to matriculating if admitted.' 
            },
            { 
                question: 'Are US universities still test-optional?', 
                answer: 'While many universities remain test-optional, several top-tier schools have reinstated SAT/ACT requirements. High standardized test scores remain a massive asset.' 
            }
        ],
        testimonials: [
            {
                name: 'Aaron Miller',
                role: 'BSc Computer Science, Stanford',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
                text: 'The Common App supplement reviews were outstanding. They helped me frame my robotics projects beautifully!',
                rating: 5
            }
        ]
    },
    'canada': {
        id: 'canada',
        title: 'Study in Canada',
        subtitle: 'Pioneering Co-op Internships & High-Quality Living Standards',
        icon: Compass,
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=1080',
        description: 'Canada combines world-class academic rigour with massive co-op programs, a highly welcoming multicultural environment, and very robust post-study work and immigration pathways.',
        highlights: [
            'Integrated co-op programs with paid internships',
            'Post-Graduation Work Permit (PGWP) up to 3 years',
            'Top-tier research in AI, engineering, and forestry',
            'Pathways to Permanent Residency (PR)',
            'Extremely safe and affordable student cities'
        ],
        stats: [
            { label: 'QS Top 100 Unis', value: '3' },
            { label: 'Visa Success', value: '97.2%' },
            { label: 'PGWP Duration', value: '3 Years' },
            { label: 'Co-op Match Rate', value: '94%' }
        ],
        services: [
            { icon: GraduationCap, title: 'Admissions Consulting', description: 'Assisting in target lists for U of T, UBC, McGill, and Waterloo, optimizing profiles.' },
            { icon: Users, title: 'Study Permit Support', description: 'Navigating the IRCC portal, preparing GIC bank certificates, and SDS applications.' },
            { icon: Palette, title: 'Scholarship Matchmaking', description: 'Sourcing institutional merit entry scholarships and provincial research grants.' },
            { icon: Utensils, title: 'Off-Campus Housing Sourcing', description: 'Providing verified listings of private rentals, homestays, and student residences.' },
            { icon: Lightbulb, title: 'SOP Writing Seminars', description: 'Helping scholars style the Study Plan required by IRCC to ensure high study permit success.' },
            { icon: Gift, title: 'Pre-Departure Briefings', description: 'GIC coordinates, health insurance setups, and peer networks in major cities.' }
        ],
        galleryImages: [
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
            'https://images.unsplash.com/photo-1544531516-a5e340cb224f?w=800&q=80'
        ],
        timeline: [
            { number: '01', icon: MessageSquare, title: 'Pathway Identification', description: 'Match academic records with university programs offering strong co-op options.' },
            { number: '02', icon: Lightbulb, title: 'Dossier Assembly', description: 'Structure statements, recommendation coordinates, and required transcripts.' },
            { number: '03', icon: Users, title: 'OUAC & Direct Filings', description: 'Submit profiles via OUAC or university direct platforms before winter deadlines.' },
            { number: '04', icon: Palette, title: 'Study Permit Application', description: 'Establish the GIC deposit, organize financial proof portfolios, and submit SDS applications.' },
            { number: '05', icon: Sparkles, title: 'Immigration Checkup', description: 'Review port-of-entry requirements and fly to Canada for academic initiation.' }
        ],
        faqs: [
            { 
                question: 'What is the SDS visa pathway?', 
                answer: 'The Student Direct Stream (SDS) is an expedited study permit pathway for students from specific nations, requiring a GIC deposit and a 6.0 IELTS minimum.' 
            },
            { 
                question: 'How do co-op programs work in Canada?', 
                answer: 'Co-op programs alternate academic terms with full-time paid work terms in your field of study, providing incredible Canadian work experience.' 
            }
        ],
        testimonials: [
            {
                name: 'Chloe Tremblay',
                role: 'BSc Software Eng, Waterloo',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
                text: 'The GIC and SDS assistance was extremely clear and professional. My permit was approved in under 3 weeks!',
                rating: 5
            }
        ]
    },
    'australia': {
        id: 'australia',
        title: 'Study in Australia',
        subtitle: 'Global Employability Leaders & Scenic Academic Ecosystems',
        icon: Sparkles,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1080',
        description: 'Australia combines high-ranking universities with stellar post-study work opportunities, robust student rights, and an unmatched quality of life.',
        highlights: [
            'Top 20 global institutions (USyd, Melbourne, UNSW)',
            'Up to 4 years post-study work visa streams',
            'World-leading fields in engineering, business, and marine science',
            'Strong student welfare protection (ESOS Act)',
            'Beautiful campuses situated near vibrant student hubs'
        ],
        stats: [
            { label: 'QS Top 100 Unis', value: '9' },
            { label: 'Visa Success', value: '98.1%' },
            { label: 'Post-Study Visa', value: '4 Years' },
            { label: 'Employability Rank', value: '#1' }
        ],
        services: [
            { icon: GraduationCap, title: 'Admissions Consulting', description: 'Assisting in target lists for Go8 universities, streamlining credit pathways.' },
            { icon: Users, title: 'Subclass 500 Visa Prep', description: 'Meticulous support for GTE statements, health checkups, and OSHC compliance.' },
            { icon: Palette, title: 'Scholarship Matching', description: 'Sourcing Australia Awards fellowships and institutional waivers.' },
            { icon: Utensils, title: 'Homestay Coordination', description: 'Arranging secure housing in major student complexes and student shares.' },
            { icon: Lightbulb, title: 'GTE Statement Coaching', description: 'Drafting the mandatory Genuine Temporary Entrant statement to satisfy visa rules.' },
            { icon: Gift, title: 'Pre-Departure Briefings', description: 'OSHC health insurance setup, airport meetups, and local support networks.' }
        ],
        galleryImages: [
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'
        ],
        timeline: [
            { number: '01', icon: MessageSquare, title: 'Institution Sourcing', description: 'Review Go8 universities and check alignment with career outcomes.' },
            { number: '02', icon: Lightbulb, title: 'Dossier Building', description: 'Verify academic certifications, English results, and prepare GTE statements.' },
            { number: '03', icon: Users, title: 'Submission', description: 'Submit dossiers directly to universities to secure conditional/unconditional offers.' },
            { number: '04', icon: Palette, title: 'CoE & Visa Dispatch', description: 'Pay initial tuition deposits, secure the CoE code, and file Subclass 500 visas.' },
            { number: '05', icon: Sparkles, title: 'Southern Arrival', description: 'Undergo airport reception and orient with local student communities.' }
        ],
        faqs: [
            { 
                question: 'What is a CoE (Confirmation of Enrolment)?', 
                answer: 'A CoE is a document issued by Australian universities after you accept an offer and pay a tuition deposit, which is required to apply for a student visa.' 
            },
            { 
                question: 'What is the ESOS Act in Australia?', 
                answer: 'The Education Services for Overseas Students (ESOS) Act is a robust legal framework that protects international student rights and tuition payments.' 
            }
        ],
        testimonials: [
            {
                name: 'Jack Davies',
                role: 'BCom Marketing, USyd',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
                text: 'The GTE coaching was outstanding! They helped me frame my career intentions perfectly.',
                rating: 5
            }
        ]
    },
    'switzerland': {
        id: 'switzerland',
        title: 'Study in Switzerland',
        subtitle: 'Precision Engineering, Robotics & Elite Hospitality Academies',
        icon: Zap,
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1080',
        description: 'Switzerland is Europe’s premier technological power, offering extremely low public tuition fees, leading computer science research labs, and legendary luxury hospitality programs.',
        highlights: [
            'Home to ETH Zurich and EPFL (Top 10 Global)',
            'Extremely low public tuition fees (CHF 1,500/year)',
            'Legendary luxury hospitality academies (EHL, Glion)',
            'Highest PhD stipend rates in continental Europe',
            'Pioneering research in robotics, physics (CERN), and biotech'
        ],
        stats: [
            { label: 'QS Top 100 Unis', value: '3' },
            { label: 'Visa Success', value: '98.5%' },
            { label: 'Avg. Public Tuition', value: 'CHF 1.5K' },
            { label: 'Top Tech Rank', value: '#1 in Europe' }
        ],
        services: [
            { icon: GraduationCap, title: 'Admissions Consulting', description: 'Assisting with ETH Zurich, EPFL, and luxury hospitality application dossiers.' },
            { icon: Users, title: 'Swiss Cantonal Visa Prep', description: 'Navigating local cantonal immigration approvals and proof of financial means.' },
            { icon: Palette, title: 'Scholarship Sourcing', description: 'Applying for Swiss Government Excellence Scholarships and institutional fellowships.' },
            { icon: Utensils, title: 'Accommodation Assistance', description: 'Securing cantonal student student dorms or cooperative housing.' },
            { icon: Lightbulb, title: 'Research Proposal Styling', description: 'Mentoring graduate scholars on structuring physics, robotics, or computer science proposals.' },
            { icon: Gift, title: 'Pre-Departure Briefings', description: 'Swiss residency permit registration guidance, health insurance coordination, and travel advice.' }
        ],
        galleryImages: [
            'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80',
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80'
        ],
        timeline: [
            { number: '01', icon: MessageSquare, title: 'Lab Identification', description: 'For grad applicants, identify Swiss research labs and prospective academic advisors.' },
            { number: '02', icon: Lightbulb, title: 'Dossier Styling', description: 'Optimize CVs, academic transcripts, and draft precise scientific motivations.' },
            { number: '03', icon: Users, title: 'Swiss Portal Submission', description: 'File admissions documents via cantonal university portals before early spring deadlines.' },
            { number: '04', icon: Palette, title: 'Cantonal Visa Processing', description: 'Submit financial declarations to the Swiss embassy to initiate cantonal visa approval.' },
            { number: '05', icon: Sparkles, title: 'Alpine Settlement', description: 'Register with cantonal authorities upon arrival to secure your Swiss residency permit.' }
        ],
        faqs: [
            { 
                question: 'Why is public tuition so low in Switzerland?', 
                answer: 'Swiss public universities (like ETH Zurich) are heavily state-subsidized, meaning domestic and international students pay the same minimal administrative fees.' 
            },
            { 
                question: 'What is the Swiss cantonal visa system?', 
                answer: 'In Switzerland, visas are approved at the cantonal (provincial) level. We guide you through cantonal financial proof criteria to ensure rapid approvals.' 
            }
        ],
        testimonials: [
            {
                name: 'Matthias Keller',
                role: 'MSc Robotics, ETH Zurich',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
                text: 'The research proposal styling was incredibly professional. I secured my advisor and got accepted into the leading robotics lab!',
                rating: 5
            }
        ]
    },
    'singapore': {
        id: 'singapore',
        title: 'Study in Singapore',
        subtitle: 'Global Innovation Hubs & Prestigious East-West Bridges',
        icon: Briefcase,
        image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&q=80&w=1080',
        description: 'Singapore is Asia’s leading high-impact educational center, offering pioneering business strategy, engineering, and tech modules under massive governmental funding schemes.',
        highlights: [
            'Home to NUS and NTU (Top 15 Global)',
            'Highly competitive MOE Tuition Grants',
            'World leading corporate alliances and incubator hubs',
            'Very secure, state-of-the-art urban infrastructure',
            'East-West global academic programs'
        ],
        stats: [
            { label: 'QS Top 100 Unis', value: '2' },
            { label: 'Visa Success', value: '99.1%' },
            { label: 'MOE Grant Coverage', value: 'Up to 50%' },
            { label: 'Intl Student Ratio', value: '30%' }
        ],
        services: [
            { icon: GraduationCap, title: 'Admissions Advisory', description: 'Expert guidance on NUS/NTU entry standards and essay preparation.' },
            { icon: Users, title: 'Student Pass Processing', description: 'Navigating the ICA SOLAR portal and secure medical checkups.' },
            { icon: Palette, title: 'Tuition Grant Support', description: 'Applying for Singapore MOE tuition grants and accompanying bonds.' },
            { icon: Utensils, title: 'Condo & Dorm Placement', description: 'Coordinating on-campus residential colleges or private condominiums.' },
            { icon: Lightbulb, title: 'SOP & Resume Grooming', description: 'Tailoring academic profiles to fit Singapore\'s corporate integration goals.' },
            { icon: Gift, title: 'Pre-Departure Briefings', description: 'Singapore regulations compliance guidelines, flight coordinates, and housing arrangements.' }
        ],
        galleryImages: [
            'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=800&q=80',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'
        ],
        timeline: [
            { number: '01', icon: MessageSquare, title: 'Destination Diagnostics', description: 'Evaluate scores against highly selective Singapore university entry standards.' },
            { number: '02', icon: Lightbulb, title: 'Dossier Styling', description: 'Structure statements, academic letters of recommendation, and standard forms.' },
            { number: '03', icon: Users, title: 'Portal Submission', description: 'File admissions documents via Singapore university platforms before spring deadlines.' },
            { number: '04', icon: Palette, title: 'SOLAR Pass Processing', description: 'Register on the SOLAR database to secure in-principle approval (IPA) for the Student Pass.' },
            { number: '05', icon: Sparkles, title: 'Tropical Initiation', description: 'Complete immigration checks at ICA Singapore upon landing and settle on campus.' }
        ],
        faqs: [
            { 
                question: 'What is the Singapore MOE Tuition Grant?', 
                answer: 'The Ministry of Education (MOE) Tuition Grant covers a massive chunk of tuition fees in exchange for a commitment to work in a Singapore-registered company for 3 years post-graduation.' 
            },
            { 
                question: 'Is the Student Pass difficult to obtain?', 
                answer: 'No. The Singapore ICA SOLAR portal is highly streamlined, and visa approvals (via IPA letters) are typically granted within 10-15 working days.' 
            }
        ],
        testimonials: [
            {
                name: 'Kenneth Lim',
                role: 'MBA, NUS Business School',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
                text: 'The MOE grant application support was extremely precise. I got accepted and secured a 3-year local corporate placement bond!',
                rating: 5
            }
        ]
    },
    'germany': {
        id: 'germany',
        title: 'Study in Germany',
        subtitle: 'Tuition-Free State-of-the-Art Engineering & Technical Excellence',
        icon: ShieldCheck,
        image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1080',
        description: 'Germany combines elite engineering academies and public research universities with 100% tuition-free programs and direct links to global industrial giants.',
        highlights: [
            '100% Tuition-Free programs at world-leading public universities',
            'Direct career paths in German engineering, automotive, and tech giants',
            'Up to 18 months post-study work search visa',
            'Access to robust DAAD research fellowship grants',
            'High-quality, affordable student living standards'
        ],
        stats: [
            { label: 'QS Top 100 Unis', value: '4' },
            { label: 'Visa Success', value: '98.3%' },
            { label: 'Public Tuition', value: '€0 (Free)' },
            { label: 'Post-Study Visa', value: '18 Months' }
        ],
        services: [
            { icon: GraduationCap, title: 'Uni-Assist Admissions Consulting', description: 'Expert guidance navigating the Uni-Assist evaluation portal, German grade conversions (Bavarian Formula), and course criteria matching.' },
            { icon: Users, title: 'Blocked Account Setup Support', description: 'Assisting in setting up required blocked bank accounts (Sperrkonto) with authorized providers (Fintiba/Expatrio).' },
            { icon: Palette, title: 'DAAD Scholarship Match', description: 'Sourcing DAAD government fellowship funding and private foundation stipends.' },
            { icon: Utensils, title: 'Studentenwerk Housing Sourcing', description: 'Liaising with local Studentenwerk student accommodation unions to find cheap rooms.' },
            { icon: Lightbulb, title: 'Academic SOP Styling', description: 'Framing compelling scientific motivation statements tailored for German public university committees.' },
            { icon: Gift, title: 'Pre-Departure Briefings', description: 'Immigration guidelines, German statutory public health insurance registration, and peer networks.' }
        ],
        galleryImages: [
            'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80',
            'https://images.unsplash.com/photo-1544531516-a5e340cb224f?w=800&q=80'
        ],
        timeline: [
            { number: '01', icon: MessageSquare, title: 'Bavarian Score Diagnostics', description: 'Convert GPA scores into the German system and verify program module match requirements.' },
            { number: '02', icon: Lightbulb, title: 'Uni-Assist File Setup', description: 'Upload verified translation packages, transcripts, and motivational letters to the Uni-Assist portal.' },
            { number: '03', icon: Users, title: 'Sperrkonto Activation', description: 'Sperrkonto blocked bank account setup and deposit transfer matching standard visa living cost criteria.' },
            { number: '04', icon: Palette, title: 'Embassy Visa Filing', description: 'Book embassy slots, finalize local public health insurance coverage, and file national visa applications.' },
            { number: '05', icon: Sparkles, title: 'German Settle-In', description: 'Complete local city registration (Anmeldung) and university matriculation upon landing.' }
        ],
        faqs: [
            { 
                question: 'Are German public universities really free for international students?', 
                answer: 'Yes! International students pay zero tuition fees at German public universities (except in the state of Baden-Württemberg). There is only a small semester administrative fee of €150-€350.' 
            },
            { 
                question: 'What is a Blocked Account (Sperrkonto)?', 
                answer: 'A blocked account is a special bank account required by German immigration to prove you have sufficient funds to cover your living expenses for one year.' 
            }
        ],
        testimonials: [
            {
                name: 'Lucas Richter',
                role: 'MSc Automotive Engineering, TU Munich',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
                text: 'The Uni-Assist and Bavarian Formula translation support was impeccable. I got accepted into TU Munich with zero tuition!',
                rating: 5
            }
        ]
    },
    'netherlands': {
        id: 'netherlands',
        title: 'Study in the Netherlands',
        subtitle: 'English-Taught Elite Business Strategy & Academic Research Hubs',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1080',
        description: 'The Netherlands is continental Europe\'s top destination for English-taught degrees, offering exceptional business schools, world-leading research, and highly progressive work opportunities.',
        highlights: [
            'Massive array of 100% English-taught university courses',
            'Home to globally top-ranked research and applied universities',
            '1-year post-study "Orientation Year" (Zoekjaar) work permit',
            'Innovative, problem-based learning (PBL) systems',
            'Exceptional global transport networks and beautiful historic student cities'
        ],
        stats: [
            { label: 'QS Top 100 Unis', value: '7' },
            { label: 'Visa Success', value: '99.0%' },
            { label: 'Orientation Year', value: '1 Year' },
            { label: 'English Courses Ratio', value: '95%' }
        ],
        services: [
            { icon: GraduationCap, title: 'Studielink Portal Advisory', description: 'Expert guidance navigating the central Dutch Studielink university registration portal.' },
            { icon: Users, title: 'MVV Entry Visa Support', description: 'Assisting in rapid MVV entry visa and local residence permit (VVR) coordination.' },
            { icon: Palette, title: 'Orange Tulip Scholarship Sourcing', description: 'Securing OTS scholarships and university-specific merit fee waivers.' },
            { icon: Utensils, title: 'Student Housing Coordination', description: 'Coordinating with university housing partners to secure rooms early in a tight market.' },
            { icon: Lightbulb, title: 'Motivation Letter Styling', description: 'Polishing motivation essays and analytical CVs for selective program committees.' },
            { icon: Gift, title: 'Pre-Departure Briefings', description: 'Dutch municipal registration (BSN) guidance, student health insurance setup, and local travel cards.' }
        ],
        galleryImages: [
            'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
            'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80'
        ],
        timeline: [
            { number: '01', icon: MessageSquare, title: 'Studielink Diagnostics', description: 'Identify programs and map requirements on the Studielink national database.' },
            { number: '02', icon: Lightbulb, title: 'Dossier Preparation', description: 'Compile transcripts, recommendation letters, CVs, and write motivational essays.' },
            { number: '03', icon: Users, title: 'University Submission', description: 'Submit applications directly through Studielink and university portals before early deadlines.' },
            { number: '04', icon: Palette, title: 'MVV Visa Fast-Track', description: 'Coordinate with university immigration offices to secure MVV entry visas and residence permits.' },
            { number: '05', icon: Sparkles, title: 'Amsterdam Settle-In', description: 'Land, register at the local municipality to secure your BSN number, and settle on campus.' }
        ],
        faqs: [
            { 
                question: 'What is Problem-Based Learning (PBL) in the Netherlands?', 
                answer: 'PBL is an active learning system that places students in small tutorial groups to collaboratively solve real-world problems rather than sitting in large lecture halls.' 
            },
            { 
                question: 'What is the Orientation Year (Zoekjaar) work permit?', 
                answer: 'Zoekjaar is a 1-year residence permit that allows graduates of top Dutch (or global top-200) universities to stay and work in the Netherlands without a sponsor.' 
            }
        ],
        testimonials: [
            {
                name: 'Sophia de Jong',
                role: 'MSc International Business, RSM Rotterdam',
                image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&q=80',
                text: 'The RSM motivation letter styling was perfect. I got accepted and secured housing through the university very early!',
                rating: 5
            }
        ]
    }
};

export default function IndividualEvent() {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [eventId]);

    // Get event data or fallback to uk
    const event = eventData[eventId || 'uk'] || eventData['uk'];

    if (!event) {
        navigate('/events');
        return null;
    }

    return (
        <div className="w-full min-h-screen">
            <Header />
            
            <EventHeroBanner 
                title={event.title}
                subtitle={event.subtitle}
                image={event.image}
                icon={event.icon}
            />

            <EventOverview 
                description={event.description}
                highlights={event.highlights}
                stats={event.stats}
            />

            <ServicesIncluded services={event.services} />

            <EventGallery images={event.galleryImages} />

            <PlanningProcessTimeline steps={event.timeline} />

            <GetQuoteForm />

            <FAQMini faqs={event.faqs} />

            <EventTestimonials testimonials={event.testimonials} />

            <CTAContact />

            <Footer />
        </div>
    );
}
