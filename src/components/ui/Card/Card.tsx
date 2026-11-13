import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: 'none' | 'sm' | 'md' | 'card' | 'widget';
  padding?: 'sm' | 'md' | 'lg';
  isInteractive?: boolean;
  className?: string;
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 'card',
  padding = 'md',
  isInteractive = false,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const elevationMap: Record<string, string> = {
    none: styles.elevationNone,
    sm: styles.elevationSm,
    md: styles.elevationMd,
    card: styles.elevationCard,
    widget: styles.elevationWidget,
  };
  const paddingMap: Record<string, string> = {
    sm: styles.paddingSm,
    md: styles.paddingMd,
    lg: styles.paddingLg,
  };

  return (
    <Component
      className={`${styles.card} ${elevationMap[elevation] || styles.elevationCard} ${
        paddingMap[padding] || styles.paddingMd
      } ${isInteractive ? styles.interactive : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
