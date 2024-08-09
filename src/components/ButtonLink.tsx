import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface ButtonLinkProps extends LinkProps {
  className?: string;
}

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
