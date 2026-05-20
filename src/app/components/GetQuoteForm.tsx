import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Calendar, Mail, Phone, User, GraduationCap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const GetQuoteForm: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        targetIntake: '',
        targetDegree: '',
        gpa: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

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

            // Form animation
            gsap.from(formRef.current, {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: formRef.current,
                    start: 'top 80%',
                }
            });
        });

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        
        // Animate success message
        gsap.from('.success-message', {
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
        });

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                targetIntake: '',
                targetDegree: '',
                gpa: '',
                message: ''
            });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section ref={sectionRef} className="w-full py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 
                        ref={titleRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                        style={{ 
                            color: 'var(--color-maroon)',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Request Consultation
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
                        Connect with our elite university placement coordinators to receive a tailored admission roadmap.
                    </p>
                </div>

                {/* Form */}
                <form 
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="quote-form p-8 md:p-12 rounded-3xl"
                    style={{
                        background: 'linear-gradient(145deg, #ffffff 0%, #fefefe 100%)',
                        border: '2px solid rgba(128, 0, 32, 0.1)',
                        boxShadow: '0 20px 60px rgba(128, 0, 32, 0.08)'
                    }}
                >
                    {!submitted ? (
                        <div className="space-y-6">
                            {/* Name */}
                            <div className="form-group">
                                <label className="form-label">
                                    <User size={18} />
                                    <span>Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        <Mail size={18} />
                                        <span>Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <Phone size={18} />
                                        <span>Phone Number</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            {/* Target Degree & Target Intake */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        <GraduationCap size={18} />
                                        <span>Target Degree Level</span>
                                    </label>
                                    <select
                                        name="targetDegree"
                                        value={formData.targetDegree}
                                        onChange={handleChange}
                                        required
                                        className="form-input appearance-none bg-white"
                                    >
                                        <option value="">Select Degree...</option>
                                        <option value="undergraduate">Undergraduate (BA/BSc)</option>
                                        <option value="postgraduate">Postgraduate (MA/MSc/MBA)</option>
                                        <option value="doctorate">Doctorate (PhD/DBA)</option>
                                        <option value="other">Diplomas & Preparatory</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <Calendar size={18} />
                                        <span>Target Intake</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="targetIntake"
                                        value={formData.targetIntake}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="e.g. Fall 2026 / Spring 2027"
                                    />
                                </div>
                            </div>

                            {/* Current GPA / Score */}
                            <div className="form-group">
                                <label className="form-label">
                                    <Award size={18} />
                                    <span>Current GPA / Scores</span>
                                </label>
                                <input
                                    type="text"
                                    name="gpa"
                                    value={formData.gpa}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="e.g. 3.8 GPA or 85%"
                                />
                            </div>

                            {/* Message */}
                            <div className="form-group">
                                <label className="form-label">
                                    <Send size={18} />
                                    <span>Academic Goals & Details</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="form-input resize-none"
                                    placeholder="Briefly describe your academic background, target schools, and research interests..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="submit-button w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
                            >
                                <Send size={20} />
                                Submit Consultation Request
                            </button>
                        </div>
                    ) : (
                        <div className="success-message text-center py-12">
                            <div 
                                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-champagne) 0%, var(--color-maroon) 100%)',
                                }}
                            >
                                <Send size={32} className="text-white" />
                            </div>
                            <h3 
                                className="text-3xl font-bold mb-3"
                                style={{ color: 'var(--color-maroon)' }}
                            >
                                Consultation Requested!
                            </h3>
                            <p 
                                className="text-lg"
                                style={{ color: 'var(--color-charcoal)' }}
                            >
                                We'll evaluate your profile and contact you within 24 hours.
                            </p>
                        </div>
                    )}
                </form>
            </div>

            <style>{`
                .form-group {
                    position: relative;
                }

                .form-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--color-maroon);
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .form-input {
                    width: 100%;
                    padding: 14px 18px;
                    border-radius: 12px;
                    border: 2px solid rgba(128, 0, 32, 0.1);
                    background: white;
                    color: var(--color-charcoal);
                    font-size: 16px;
                    transition: all 0.3s ease;
                    outline: none;
                }

                .form-input:focus {
                    border-color: var(--color-champagne);
                    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
                }

                .form-input::placeholder {
                    color: rgba(0, 0, 0, 0.3);
                }

                .submit-button {
                    background: linear-gradient(135deg, var(--color-champagne) 0%, var(--color-maroon) 100%);
                    color: white;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
                }

                .submit-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
                }

                .submit-button:active {
                    transform: translateY(0);
                }
            `}</style>
        </section>
    );
};
