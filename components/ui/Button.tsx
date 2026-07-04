import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
;

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-red-800 hover:bg-red-700 text-white",
  secondary: "bg-[#1d1d1d] hover:bg-[#252525] text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-6 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        font-bahnschrift
        rounded-md
        font-semibold
        uppercase
        transition
        duration-200
        w-full
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}