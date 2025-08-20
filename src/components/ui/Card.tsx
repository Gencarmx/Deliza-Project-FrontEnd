"use client";

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * CSS classes to customize the Card
   */
  className?: string;
}

/**
 * A simple Card component with default styling.
 */
const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`bg-transparent  ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
