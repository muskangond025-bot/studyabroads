import React from 'react';
import { Header } from '../components/ui/header-2';
import { MinimalBanner } from '@/app/components/MinimalBanner';
import { PolicyContent } from '@/app/components/PolicyContent';
import { Footer } from '@/app/components/Footer';

export default function TermsOfService() {
    const sections = [
        {
            title: "Agreement to Terms",
            content: [
                "By accessing and using our event management services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the terms of this agreement, you are not authorized to use or access our services.",
                "These Terms of Service constitute a legally binding agreement made between you and our company concerning your access to and use of our event management services, website, and related services."
            ]
        },
        {
            title: "Use of Services",
            content: [
                "Our event management platform provides services for planning, organizing, and managing various types of events including weddings, corporate events, conferences, and other celebrations.",
                "You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services:",
                "• In any way that violates any applicable federal, state, local, or international law or regulation",
                "• To transmit, or procure the sending of, any advertising or promotional material without our prior written consent",
                "• To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity",
                "• To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the service"
            ]
        },
        {
            title: "Booking and Payment Terms",
            content: [
                "When you book an event through our platform, you agree to provide accurate and complete information. All bookings are subject to availability and confirmation.",
                "Payment terms vary depending on the type of event and services selected. Typically, a deposit is required at the time of booking, with the balance due according to the payment schedule outlined in your service agreement.",
                "All prices are subject to change without notice. However, we will honor the prices quoted at the time of your confirmed booking.",
                "Payment can be made through our accepted payment methods, which may include credit cards, debit cards, bank transfers, or other payment solutions. You are responsible for any fees your financial institution may charge."
            ]
        },
        {
            title: "Cancellation and Refund Policy",
            content: [
                "Cancellations must be made in writing to our customer service team. The refund amount depends on how far in advance you cancel:",
                "• Cancellations made 90+ days before the event: 75% refund of total payment",
                "• Cancellations made 60-89 days before the event: 50% refund of total payment",
                "• Cancellations made 30-59 days before the event: 25% refund of total payment",
                "• Cancellations made less than 30 days before the event: No refund",
                "Deposits are non-refundable in all circumstances. These terms may vary based on specific service agreements and should be reviewed carefully at the time of booking."
            ]
        },
        {
            title: "Event Changes and Modifications",
            content: [
                "We understand that event plans can change. You may request modifications to your event booking subject to availability and additional fees.",
                "Changes to event dates, venues, or services must be requested in writing at least 30 days before the scheduled event date. We will make reasonable efforts to accommodate your requests, but cannot guarantee availability.",
                "Any modifications that result in increased costs will require additional payment. If modifications reduce costs, we will issue a credit or partial refund according to our refund policy."
            ]
        },
        {
            title: "Liability and Insurance",
            content: [
                "While we strive to provide exceptional service, we cannot be held liable for circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, labor disputes, or vendor failures.",
                "We strongly recommend that clients obtain event insurance to protect against unforeseen circumstances. We can provide recommendations for event insurance providers upon request.",
                "Our maximum liability for any claim related to our services shall not exceed the total amount paid by you for the specific event in question.",
                "You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of our services or your violation of these terms."
            ]
        },
        {
            title: "Intellectual Property Rights",
            content: [
                "All content on our website and platform, including text, graphics, logos, images, and software, is the property of our company or its content suppliers and is protected by copyright and intellectual property laws.",
                "You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of our content without our express written permission.",
                "Any photographs or videos taken at your event may be used by us for promotional purposes unless you explicitly opt out in writing."
            ]
        },
        {
            title: "User Accounts",
            content: [
                "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password that you use to access the service.",
                "You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
                "We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion, including but not limited to situations where we believe there has been a violation of these Terms."
            ]
        },
        {
            title: "Third-Party Services",
            content: [
                "Our event management services may include arrangements with third-party vendors such as caterers, decorators, entertainers, and venue providers. While we carefully select our partners, we are not responsible for the quality or performance of third-party services.",
                "Any contracts or agreements you enter into with third-party vendors are between you and those vendors. We act as a facilitator but are not a party to those agreements.",
                "We do not endorse or assume responsibility for any third-party websites, products, or services that may be linked from our platform."
            ]
        },
        {
            title: "Dispute Resolution",
            content: [
                "Any disputes arising out of or relating to these Terms or our services shall first be attempted to be resolved through good faith negotiations between the parties.",
                "If negotiations fail, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in our primary business location unless otherwise agreed.",
                "You agree to waive your right to participate in a class action lawsuit or class-wide arbitration."
            ]
        },
        {
            title: "Limitation of Liability",
            content: [
                "In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
                "We do not warrant that the service will be uninterrupted, timely, secure, or error-free. We do not warrant that the results obtained from the use of the service will be accurate or reliable."
            ]
        },
        {
            title: "Changes to Terms",
            content: [
                "We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect.",
                "By continuing to access or use our service after revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service."
            ]
        },
        {
            title: "Governing Law",
            content: [
                "These Terms shall be governed and construed in accordance with the laws of the United States and the state in which our company is registered, without regard to its conflict of law provisions.",
                "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
            ]
        },
        {
            title: "Contact Information",
            content: [
                "If you have any questions about these Terms of Service, please contact us:",
                "• By visiting our Contact Us page",
                "• By email: legal@eventmanagement.com",
                "• By phone: +1 (555) 123-4567",
                "• By mail: Event Management Services, 123 Event Street, Suite 100, City, State 12345"
            ]
        }
    ];

    return (
        <div className="w-full">
            <Header />
            <MinimalBanner title="Terms of Service" lastUpdated="March 14, 2026" />
            <PolicyContent sections={sections} />
            <Footer />
        </div>
    );
}
