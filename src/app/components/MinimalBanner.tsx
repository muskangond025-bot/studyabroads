import React from 'react';

interface MinimalBannerProps {
    title: string;
    lastUpdated?: string;
}

export const MinimalBanner: React.FC<MinimalBannerProps> = ({ title, lastUpdated }) => {
    return (
        <section className="minimal-banner">
            <div className="minimal-banner-container">
                <h1 className="minimal-banner-title">{title}</h1>
                {lastUpdated && (
                    <p className="minimal-banner-updated">Last Updated: {lastUpdated}</p>
                )}
            </div>

            <style>{`
                .minimal-banner {
                    width: 100%;
                    padding: 80px 24px 40px;
                    background: linear-gradient(135deg, var(--color-maroon) 0%, #5a0016 100%);
                    position: relative;
                    overflow: hidden;
                }

                .minimal-banner::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 80% 50%, rgba(255, 107, 107, 0.08) 0%, transparent 50%);
                    pointer-events: none;
                }

                .minimal-banner-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    text-align: center;
                    position: relative;
                    z-index: 1;
                }

                .minimal-banner-title {
                    font-size: 42px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 12px;
                    letter-spacing: -0.5px;
                }

                .minimal-banner-updated {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 500;
                }

                @media (max-width: 768px) {
                    .minimal-banner {
                        padding: 60px 20px 32px;
                    }

                    .minimal-banner-title {
                        font-size: 32px;
                    }

                    .minimal-banner-updated {
                        font-size: 13px;
                    }
                }
            `}</style>
        </section>
    );
};
