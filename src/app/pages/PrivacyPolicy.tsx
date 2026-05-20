import React from 'react';
import { Header } from '../components/ui/header-2';
import { MinimalBanner } from '@/app/components/MinimalBanner';
import { PolicyContent } from '@/app/components/PolicyContent';
import { Footer } from '@/app/components/Footer';

export default function PrivacyPolicy() {
    const sections = [
        {
            title: "Introduction",
            content: [
                "Welcome to our Privacy Policy. Your privacy is critically important to us. This Privacy Policy document contains types of information that is collected and recorded by our event management services and how we use it.",
                "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through our Contact page."
            ]
        },
        {
            title: "Information We Collect",
            content: [
                "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.",
                "When you register for an account or book an event, we may collect your name, email address, phone number, mailing address, and payment information. We also collect information about your event preferences, guest lists, and special requirements.",
                "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide."
            ]
        },
        {
            title: "How We Use Your Information",
            content: [
                "We use the information we collect in various ways, including to:",
                "• Provide, operate, and maintain our event management services",
                "• Improve, personalize, and expand our services",
                "• Understand and analyze how you use our services",
                "• Develop new products, services, features, and functionality",
                "• Communicate with you for customer service, updates, and promotional purposes",
                "• Process your transactions and manage your bookings",
                "• Send you emails and notifications related to your events",
                "• Find and prevent fraud and security issues"
            ]
        },
        {
            title: "Log Files and Cookies",
            content: [
                "Our website follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.",
                "Like many websites, we use 'cookies' to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service."
            ]
        },
        {
            title: "Third-Party Privacy Policies",
            content: [
                "Our Privacy Policy does not apply to other advertisers or websites. We may use third-party service providers to help us operate our business and the website or administer activities on our behalf, such as payment processing or email delivery.",
                "We advise you to consult the respective Privacy Policies of these third-party services for more detailed information. It may include their practices and instructions about how to opt-out of certain options."
            ]
        },
        {
            title: "Data Security",
            content: [
                "The security of your personal information is important to us. We use commercially acceptable means to protect your personal information, including SSL encryption for data transmission and secure servers for data storage.",
                "However, remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security."
            ]
        },
        {
            title: "Your Data Protection Rights",
            content: [
                "Depending on your location, you may have the following data protection rights:",
                "• The right to access – You have the right to request copies of your personal data.",
                "• The right to rectification – You have the right to request that we correct any information you believe is inaccurate or incomplete.",
                "• The right to erasure – You have the right to request that we erase your personal data, under certain conditions.",
                "• The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.",
                "• The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.",
                "• The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions."
            ]
        },
        {
            title: "Children's Privacy",
            content: [
                "Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions."
            ]
        },
        {
            title: "Changes to This Privacy Policy",
            content: [
                "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date at the top of this Privacy Policy.",
                "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page."
            ]
        },
        {
            title: "Contact Us",
            content: [
                "If you have any questions about this Privacy Policy, please contact us:",
                "• By visiting our Contact Us page",
                "• By email: privacy@eventmanagement.com",
                "• By phone: +1 (555) 123-4567"
            ]
        }
    ];

    return (
        <div className="w-full">
            <Header />
            <MinimalBanner title="Privacy Policy" lastUpdated="March 14, 2026" />
            <PolicyContent sections={sections} />
            <Footer />
        </div>
    );
}
