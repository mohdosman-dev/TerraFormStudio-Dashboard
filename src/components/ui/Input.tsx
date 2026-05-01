import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = "text", ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="block font-label text-[11px] tracking-wider uppercase text-on-surface-variant"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full bg-surface-container-low border-0 border-b border-outline-variant/15 py-3 px-0 focus:ring-0 focus:border-primary transition-all duration-300 placeholder:text-on-surface-variant/30 text-on-surface",
              error && "border-error focus:border-error",
              className
            )}
            {...props}
          />
          <div 
            className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-primary scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left",
              error && "bg-error scale-x-100"
            )} 
          />
        </div>
        {error && (
          <p className="text-[10px] font-medium text-error animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-[10px] text-on-surface-variant/40 italic">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
