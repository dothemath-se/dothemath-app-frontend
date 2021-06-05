import cn from 'classnames';
import React, { HTMLAttributes } from 'react';

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
    { 'button--button': !link },
    { 'button--primary': primary },
    { 'button--link': link },
    { 'button--disabled': disabled },
    className
  );

  if (link && disabled) throw Error('link buttons cannot be disabled');

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
