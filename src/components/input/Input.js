import React from 'react';

function Input({
  className,
  type = 'text',
  placeholder = '',
  id = '',
  ...props
}) {
  return (
    <input
      className={`w-[500px] px-4 py-3 border-2 outline-none border-slate-200 focus:border-blue-500 ${
        className ? 'pr-9' : ''
      } `}
      type={type}
      id={id}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
