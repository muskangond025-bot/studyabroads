import React from 'react';

interface PolicySection {
    title: string;
    content: string[];
}

interface PolicyContentProps {
    sections: PolicySection[];
}

export const PolicyContent: React.FC<PolicyContentProps> = ({ sections }) => {
    return (
        <section className="policy-content-section">
            <div className="policy-container">
                {sections.map((section, index) => (
                    <div key={index} className="policy-section">
                        <h2 className="policy-section-title">{section.title}</h2>
                        {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="policy-paragraph">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                ))}
            </div>

            <style>{`
                .policy-content-section {
                    width: 100%;
                    padding: 80px 24px;
                    background: #fafafa;
                }

                .policy-container {
                    max-width: 900px;
                    margin: 0 auto;
                    background: white;
                    padding: 60px;
                    border-radius: 16px;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
                }

                .policy-section {
                    margin-bottom: 48px;
                }

                .policy-section:last-child {
                    margin-bottom: 0;
                }

                .policy-section-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: var(--color-maroon);
                    margin-bottom: 20px;
                    padding-bottom: 12px;
                    border-bottom: 2px solid var(--color-champagne);
                }

                .policy-paragraph {
                    font-size: 15px;
                    line-height: 1.8;
                    color: #444;
                    margin-bottom: 16px;
                }

                .policy-paragraph:last-child {
                    margin-bottom: 0;
                }

                .policy-paragraph strong {
                    color: var(--color-maroon);
                    font-weight: 700;
                }

                .policy-paragraph a {
                    color: var(--color-maroon);
                    text-decoration: underline;
                    transition: color 0.3s ease;
                }

                .policy-paragraph a:hover {
                    color: var(--color-light-red);
                }

                @media (max-width: 768px) {
                    .policy-content-section {
                        padding: 48px 20px;
                    }

                    .policy-container {
                        padding: 32px 24px;
                    }

                    .policy-section-title {
                        font-size: 20px;
                    }

                    .policy-paragraph {
                        font-size: 14px;
                    }
                }
            `}</style>
        </section>
    );
};
