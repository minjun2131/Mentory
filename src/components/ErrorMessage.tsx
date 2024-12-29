import React from 'react';

const ErrorMessage = ({ children }: { children: string | undefined }) => {
  return <p className="text-red-500 text-sm mb-2 h-4">{children}</p>;
};

export default ErrorMessage;
