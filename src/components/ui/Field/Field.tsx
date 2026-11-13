import React, { useId } from 'react';
import styles from './Field.module.css';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({
  label,
  icon,
  error,
  helperText,
  className = '',
  id: customId,
  ...inputProps
}) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={`${styles.fieldWrapper} ${className}`.trim()}>
      <div className={styles.labelRow}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      </div>

      <div className={`${styles.inputControl} ${error ? styles.hasError : ''}`.trim()}>
        {icon && <span className={styles.iconSlot} aria-hidden="true">{icon}</span>}
        <input
          id={inputId}
          className={styles.input}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
      </div>

      {error && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className={styles.errorText} style={{ color: 'var(--color-text-secondary)' }}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Field;
