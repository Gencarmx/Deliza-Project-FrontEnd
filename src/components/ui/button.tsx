"use client";

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button
   */
  variant?: 'primary' | 'outline';
  /**
   * Size of the button
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Shape of the button (e.g., circle)
   */
  shape?: 'circle';
  /**
   * Additional CSS classes
   */
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  shape,
  children,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles =
    'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant styles
  const variantStyles: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  // Size styles
  const sizeStyles: Record<string, string> = {
    sm: shape === 'circle' ? 'p-2' : 'px-2 py-1 text-sm',
    md: shape === 'circle' ? 'p-3' : 'px-4 py-2 text-base',
    lg: shape === 'circle' ? 'p-4' : 'px-6 py-3 text-lg',
  };

  // Shape styles
  const shapeStyles = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  const combinedClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    shapeStyles,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
