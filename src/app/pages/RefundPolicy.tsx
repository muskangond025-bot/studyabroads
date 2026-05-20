import React from 'react';
import { Header } from '../components/ui/header-2';
import { MinimalBanner } from '@/app/components/MinimalBanner';
import { PolicyContent } from '@/app/components/PolicyContent';
import { Footer } from '@/app/components/Footer';

export default function RefundPolicy() {
    const sections = [
        {
            title: "Overview",
            content: [
                "This Refund Policy outlines the terms and conditions under which refunds are processed for our event management services. We strive to provide exceptional service, but we understand that sometimes circumstances change.",
                "Please read this policy carefully before making a booking. By booking our services, you acknowledge that you have read, understood, and agree to this Refund Policy."
            ]
        },
        {
            title: "Cancellation Timeline and Refunds",
            content: [
                "The amount of refund you receive depends on when you cancel your event booking relative to the scheduled event date:",
                "<strong>90+ Days Before Event:</strong> If you cancel your booking 90 or more days before the scheduled event date, you will receive a 75% refund of the total amount paid (excluding the initial deposit).",
                "<strong>60-89 Days Before Event:</strong> Cancellations made between 60 and 89 days before the event will receive a 50% refund of the total amount paid (excluding the initial deposit).",
                "<strong>30-59 Days Before Event:</strong> Cancellations made between 30 and 59 days before the event will receive a 25% refund of the total amount paid (excluding the initial deposit).",
                "<strong>Less Than 30 Days Before Event:</strong> Unfortunately, cancellations made less than 30 days before the event are not eligible for any refund, excluding the deposit."
            ]
        },
        {
            title: "Deposit Policy",
            content: [
                "All initial deposits paid at the time of booking are non-refundable under any circumstances. The deposit serves to secure your event date and covers initial planning and coordination costs.",
                "Deposit amounts vary depending on the type and scale of the event but typically range from 20% to 30% of the total estimated event cost.",
                "The deposit is applied toward your total event cost and will be reflected in your final invoice."
            ]
        },
        {
            title: "How to Request a Cancellation",
            content: [
                "All cancellation requests must be submitted in writing to ensure proper documentation. You can submit your cancellation request through:",
                "• Email to: cancellations@eventmanagement.com",
                "• Our online contact form with 'Cancellation Request' as the subject",
                "• Written letter sent to our business address",
                "Your cancellation request must include your full name, booking reference number, event date, and reason for cancellation. The cancellation is considered effective on the date we receive your written notice, not the date you send it."
            ]
        },
        {
            title: "Refund Processing Time",
            content: [
                "Once your cancellation request is approved, refunds will be processed within 10-15 business days. The refund will be issued to the original payment method used for the booking.",
                "Please note that depending on your financial institution, it may take an additional 5-10 business days for the refund to appear in your account.",
                "You will receive an email confirmation once your refund has been processed, including the refund amount and expected timeline for the funds to reach your account."
            ]
        },
        {
            title: "Event Postponement",
            content: [
                "If you need to postpone your event rather than cancel it entirely, we offer more flexible options:",
                "• Events can be rescheduled once without penalty if the new date is within 12 months of the original event date and is subject to availability.",
                "• A second rescheduling will incur a 10% rescheduling fee based on the total event cost.",
                "• All rescheduling requests must be made at least 45 days before the originally scheduled event date.",
                "• If the new event date requires additional services or has higher costs, you will be responsible for the difference in price."
            ]
        },
        {
            title: "Force Majeure and Emergency Situations",
            content: [
                "In cases of force majeure events (natural disasters, pandemics, government restrictions, etc.) that make it impossible or illegal to hold your event, special refund terms may apply.",
                "We will work with you to either reschedule your event at no additional cost or provide a refund according to the costs already incurred on your behalf.",
                "Documentation may be required to verify force majeure circumstances, such as government orders, weather reports, or health department notifications."
            ]
        },
        {
            title: "Partial Service Cancellations",
            content: [
                "If you wish to cancel specific services while keeping the main event booking:",
                "• Individual service cancellations made 60+ days before the event will receive a 50% refund for that specific service",
                "• Individual service cancellations made 30-59 days before the event will receive a 25% refund",
                "• Individual service cancellations made less than 30 days before the event are non-refundable",
                "This policy applies to add-on services such as upgraded catering, entertainment packages, or additional decoration services."
            ]
        },
        {
            title: "Vendor-Related Cancellations",
            content: [
                "If a third-party vendor (caterer, entertainer, decorator, etc.) cancels or fails to perform, we will make every effort to secure a replacement of equal or better quality at no additional cost to you.",
                "If we are unable to secure a suitable replacement and you choose to cancel that portion of the service, you will receive a full refund for that specific service component.",
                "We are not responsible for refunds or compensation beyond the cost of the specific service that was not delivered."
            ]
        },
        {
            title: "Company-Initiated Cancellations",
            content: [
                "In the rare event that we must cancel your event due to circumstances on our end, you will receive a full refund of all amounts paid, including the deposit.",
                "Additionally, we will work with you to either:",
                "• Reschedule your event at a mutually agreeable date with a 15% discount on total services",
                "• Provide recommendations for alternative event management services to ensure your event can still take place",
                "We are not liable for any consequential damages or additional costs you may incur due to a company-initiated cancellation."
            ]
        },
        {
            title: "No-Show Policy",
            content: [
                "If you or your guests fail to attend the scheduled event without prior cancellation, no refund will be provided. This includes situations where you simply change your mind or forget about the event.",
                "All vendor services, venue fees, and other costs incurred on your behalf are non-recoverable in no-show situations."
            ]
        },
        {
            title: "Modification of Services",
            content: [
                "Changes to event details (guest count, menu selections, decor preferences, etc.) may be made up to 14 days before the event date at no additional cost, subject to availability.",
                "If modifications result in lower costs, we will issue a credit to your account or apply it to outstanding balances. Refunds are not provided for cost-reducing modifications made after initial payment.",
                "If modifications result in higher costs, you will be invoiced for the difference."
            ]
        },
        {
            title: "Dispute Resolution",
            content: [
                "If you believe your refund was processed incorrectly or you disagree with our refund decision, please contact our customer service team within 30 days of the refund decision.",
                "We will review your case and respond within 10 business days. Our decision after review is final.",
                "All disputes must first go through our internal review process before seeking external resolution."
            ]
        },
        {
            title: "Special Circumstances",
            content: [
                "We understand that life can be unpredictable. In cases of serious illness, death in the family, or other genuine emergencies, please contact us directly to discuss your situation.",
                "While we cannot guarantee exceptions to this policy, we will review each case individually and make reasonable accommodations when possible.",
                "Documentation such as medical certificates, death certificates, or other official documents may be required to verify special circumstances."
            ]
        },
        {
            title: "Contact Us About Refunds",
            content: [
                "If you have questions about our Refund Policy or need to request a refund, please contact us:",
                "• Email: cancellations@eventmanagement.com or refunds@eventmanagement.com",
                "• Phone: +1 (555) 123-4567 (Monday-Friday, 9 AM - 6 PM)",
                "• Online: Submit a request through our Contact Us page",
                "• Mail: Event Management Services, Attn: Refunds Department, 123 Event Street, Suite 100, City, State 12345"
            ]
        }
    ];

    return (
        <div className="w-full">
            <Header />
            <MinimalBanner title="Refund Policy" lastUpdated="March 14, 2026" />
            <PolicyContent sections={sections} />
            <Footer />
        </div>
    );
}
