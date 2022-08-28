import React from 'react';

const Button = ({
  children,
  type = 'button',
  className = '',
  onSubmit = () => {},
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={`text-base text-white bg-blue-500 outline-none rounded-md w-[150px] px-3 py-2  ${className}`}
      onSubmit={onSubmit}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
