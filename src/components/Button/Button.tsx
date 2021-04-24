import cn from 'classnames';
import React, { HTMLAttributes } from 'react';

import styles from './Button.module.sass';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  link?: boolean;
  disabled?: boolean;
}

export const Button = ({
  children,
  primary,
  link,
  disabled,
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

  if (link && disabled) throw Error('link buttons cannot be disabled');

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
