import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EventTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export function EventTypeCard({ icon: Icon, title, description, gradient }: EventTypeCardProps) {
  return (
    <div className={`event-card ${gradient}`}>
      <Icon className="event-card-icon" size={48} strokeWidth={1.5} />
      <div className="event-card-content">
        <p className="event-card-title">{title}</p>
        <p className="event-card-description">{description}</p>
      </div>
    </div>
  );
}
