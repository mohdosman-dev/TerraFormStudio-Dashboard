import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "error";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-primary text-on-primary hover:bg-primary-dim shadow-[0_8px_20px_-4px_rgba(107,92,70,0.2)]",
      secondary:
        "bg-secondary-container text-on-secondary-container hover:opacity-90",
      outline:
        "border border-outline-variant/30 text-on-surface hover:bg-surface-container-low",
      ghost:
        "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
      error: "bg-error-container text-on-error-container hover:opacity-90",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3.5 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative flex items-center justify-center rounded-xl font-medium tracking-wide transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin-slow" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";
