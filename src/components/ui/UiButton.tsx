import React from 'react';
import styles from './UiButton.module.scss';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  variant?:
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'white'
  | 'primary-outlined'
  | 'secondary-outlined'
  | 'primary-text'
  | 'dark'
  | 'dark-outlined'
  | 'icon'
  | 'danger';
  size?: Sizes;
  type?: 'submit' | 'button';
  ariaLabel?: string;
  textCasing?: 'uppercase' | 'lowercase' | 'capitalize';
  isSquare?: boolean;
  /** This prop decides if we want the button to fit the content or be full width */
  isFullWidth?: boolean;
  onClick?: () => void;
}

type Sizes = 'large' | 'md' | 's' | 'text';

export default function UiButton({
  children,
  onClick,
  ariaLabel,
  disabled = false,
  loading = false,
  textCasing = 'uppercase',
  variant = 'primary',
  type = 'submit',
  size = 'md',
  
}: Props) {
  return (
    <button
      className={`${styles.ui_button} ${styles[variant || 'primary']} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      aria-label={ariaLabel}
      style={{ textTransform: textCasing}}
    >
      {loading ? <span>Loading...</span> : children}
    </button>
  );
}