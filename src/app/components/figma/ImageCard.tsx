import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import styles from './ImageCard.module.css';

export default function ImageCard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111] p-10">
      <div className={styles.container}>
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1725060555163-c1fd4f569925?q=80&w=2574&auto=format&fit=crop"
          alt="Reveal Animation"
          width={400}
          height={600}
          className="object-cover"
        />
      </div>
    </div>
  );
}
