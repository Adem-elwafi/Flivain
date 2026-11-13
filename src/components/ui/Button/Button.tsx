import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isIconOnly?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isIconOnly = false,
  children,
  className = '',
  type = 'button',
  ...props
}) => {
  const variantClass = styles[variant] || styles.primary;
  const sizeClass = styles[size] || styles.md;
  const iconClass = isIconOnly ? styles.iconOnly : '';

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${sizeClass} ${iconClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
