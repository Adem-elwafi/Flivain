import React from 'react';
import styles from './Container.module.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'standard' | 'hero' | 'narrow' | 'full';
  as?: React.ElementType;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'standard',
  as: Component = 'div',
  className = '',
  ...props
}) => {
  const sizeClass = styles[size] || styles.standard;
  return (
    <Component className={`${styles.container} ${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
};

export default Container;
