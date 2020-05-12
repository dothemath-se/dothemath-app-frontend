import React from 'react';
import styles from './Button.module.sass';
import cn from 'classnames';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  link?: boolean;
  disabled?: boolean;
}

export const Button = ({
  children,
  primary,
  link,
  disabled,
  onClick,
  className,
  ...rest
}: ButtonProps) => {
  const classes = cn(
    { [styles.button]: !link },
    { [styles.primary]: primary },
    { [styles.link]: link },
    { [styles.disabled]: disabled },
    className
  );

  return (
    <button
      className={classes}
      onClick={(e) => {
        if (!disabled && onClick) onClick(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
