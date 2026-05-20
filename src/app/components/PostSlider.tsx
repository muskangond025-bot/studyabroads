import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Cpu } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import styles from './PostSlider.module.css';

interface Slide {
  id: number;
  backgroundImage: string;
  circleImage: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    backgroundImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
    circleImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=200&auto=format&fit=crop',
    title: 'Admissions Strategy',
    description: 'Personalized profile grooming, university selection lists, and elite Oxbridge and Ivy League strategy.'
  },
  {
    id: 2,
    backgroundImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop',
    circleImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=200&auto=format&fit=crop',
    title: 'Scholarship Hunting',
    description: 'Securing competitive merit fellowships, fully-funded research grants, and regional tuition waivers.'
  },
  {
    id: 3,
    backgroundImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
    circleImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
    title: 'Visa & Compliance',
    description: 'Meticulous immigration portfolio assembly, mock interviews, and student visa pathways.'
  },
  {
    id: 4,
    backgroundImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
    circleImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    title: 'Essay Styling',
    description: 'Mentoring scholars to frame highly unique research statements and compelling personal statements.'
  },
  {
    id: 5,
    backgroundImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop',
    circleImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    title: 'Standardized Prep',
    description: '1-on-1 prep strategy for SAT, GRE, IELTS, and TOEFL ensuring top percentile outcomes.'
  },
  {
    id: 6,
    backgroundImage: 'https://images.unsplash.com/photo-1521737711867-e3b904737573?q=80&w=600&auto=format&fit=crop',
    circleImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    title: 'Career Coaching',
    description: 'Post-study career mentoring, employer networking, and global recruitment pathways.'
  }
];

export function PostSlider() {
  const [slidePositions, setSlidePositions] = useState([1, 2, 3, 4, 5, 6]);

  const turnSlider = (direction: 'left' | 'right') => {
    setSlidePositions(prevPositions => {
      return prevPositions.map(position => {
        let newPosition;
        if (direction === 'left') {
          newPosition = position - 1;
          if (newPosition < 1) {
            newPosition = slides.length;
          }
        } else {
          newPosition = position + 1;
          if (newPosition > slides.length) {
            newPosition = 1;
          }
        }
        return newPosition;
      });
    });
  };

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.hudHeader}>
        <Cpu size={24} className={styles.hudIcon} />
      </div>

      <div className={styles.sliderContainer}>
        {slides.map((slide, index) => {
          const position = slidePositions[index];
          // Determine the position class from the module
          const positionClass = styles[`slide${position}`];

          return (
            <div
              key={slide.id}
              className={`${styles.slide} ${positionClass}`}
            >
              <div
                className={styles.slideInner}
                style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
              >
                <div className={styles.content}>
                  <ImageWithFallback
                    className={styles.circle}
                    src={slide.circleImage}
                    alt={slide.title}
                  />
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className={styles.buttonsContainer}>
          <button className={styles.arrow} onClick={() => turnSlider('left')}>
            <ChevronLeft size={28} />
          </button>
          <button className={styles.arrow} onClick={() => turnSlider('right')}>
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
