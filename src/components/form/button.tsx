import classNames from 'classnames';
import React from 'react';

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classNames?: string;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

const Button = ({
  className,
  color = 'primary',
  disabled,
  loading,
  children,
  ...rest
}: FormButtonProps) => {
  return (
    <button
      className={`w-full ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <div
          className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
          role='status'
        >
          <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
            Loading...
          </span>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
