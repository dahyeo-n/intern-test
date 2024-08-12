import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonLinkProps } from '../types';

const ButtonLink: React.FC<ButtonLinkProps> = ({
  className = '',
  ...props
}) => {
  return (
    <Link
      className={`text-blue-400 font-semibold px-4 py-2 hover:bg-slate-50 rounded ${className}`}
      {...props}
    />
  );
};

export default ButtonLink;
