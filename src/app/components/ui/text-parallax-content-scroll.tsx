import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
}

interface StickyImageProps {
  imgUrl: string;
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
}

export const TextParallaxContentExample = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1767986012154-db9a321c8832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzM2NTc2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
        subheading="Elegance"
        heading="Unforgettable Weddings."
      >
        <ExampleContent 
          title="Dream Wedding Celebrations"
          description="Transform your special day into an extraordinary celebration with our premium wedding planning services. From intimate ceremonies to grand receptions, we craft every detail to perfection, ensuring your love story unfolds beautifully."
          buttonText="Explore Wedding Services"
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1762176263996-a0713a49ee4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMGNvbmZlcmVuY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzczNjU3NjkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
        subheading="Professional"
        heading="Corporate Excellence."
      >
        <ExampleContent 
          title="Corporate Event Management"
          description="Elevate your business gatherings with our sophisticated corporate event services. Whether it's a product launch, conference, or team building event, we deliver seamless execution that reflects your company's prestige and professionalism."
          buttonText="View Corporate Solutions"
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1763828028975-afa6ae9d04de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwY2VsZWJyYXRpb24lMjBlbGVnYW50fGVufDF8fHx8MTc3MzYzODQ5MXww&ixlib=rb-4.1.0&q=80&w=1080"
        subheading="Celebration"
        heading="Joyful Milestones."
      >
        <ExampleContent 
          title="Special Celebrations & Milestones"
          description="Mark life's precious moments with spectacular celebrations that your guests will remember forever. From birthday parties to anniversaries and social gatherings, we bring creativity, elegance, and joy to every occasion."
          buttonText="Plan Your Celebration"
        />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent: React.FC<TextParallaxContentProps> = ({ 
  imgUrl, 
  subheading, 
  heading, 
  children 
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage: React.FC<StickyImageProps> = ({ imgUrl }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          opacity,
          backgroundColor: 'rgba(128, 0, 32, 0.7)', // maroon overlay
        }}
      />
    </motion.div>
  );
};

const OverlayCopy: React.FC<OverlayCopyProps> = ({ subheading, heading }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p 
        className="mb-2 text-center text-xl md:mb-4 md:text-3xl uppercase tracking-wider"
        style={{ color: 'var(--color-champagne)' }}
      >
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

interface ExampleContentProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

const ExampleContent: React.FC<ExampleContentProps> = ({ 
  title = "Additional content explaining the above card here",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima maiores voluptate est ut saepe accusantium maxime doloremque nulla consectetur possimus.",
  buttonText = "Learn more"
}) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 
      className="col-span-1 text-3xl font-bold md:col-span-4"
      style={{ color: 'var(--color-maroon)' }}
    >
      {title}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p 
        className="mb-4 text-xl md:text-2xl"
        style={{ color: 'var(--color-black)' }}
      >
        {description}
      </p>
      <button 
        className="w-full md:w-fit px-9 py-4 text-xl text-white transition-all duration-300 hover:scale-105"
        style={{ 
          backgroundColor: 'var(--color-maroon)',
          border: '2px solid var(--color-champagne)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-champagne)';
          e.currentTarget.style.color = 'var(--color-black)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-maroon)';
          e.currentTarget.style.color = 'white';
        }}
      >
        {buttonText} <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);

export { TextParallaxContent, StickyImage, OverlayCopy, ExampleContent };
