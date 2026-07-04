import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({ children, onClick, className, disabled }: ButtonProps) => {
  return (
    <button 
    className={"font-bahnschrift mt-6 w-full rounded-md bg-red-800 py-3 text-base font-semibold uppercase transition hover:bg-red-700 sm:text-lg cursor-pointer" + (className ? ` ${className}` : '')} 
    onClick={onClick} 
    disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;