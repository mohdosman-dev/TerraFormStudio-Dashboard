import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "../../utils/utils";

interface AlertProps {
  children: ReactNode;
  variant?: "error" | "success" | "info" | "warning";
  className?: string;
}

export const Alert = ({ children, variant = "error", className }: AlertProps) => {
  const variants = {
    error: "bg-error-container/20 text-error border-error/20",
    success: "bg-green-50 text-green-700 border-green-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
  };

  const icons = {
    error: <AlertCircle className="w-4 h-4" />,
    success: <CheckCircle2 className="w-4 h-4" />,
    info: <Info className="w-4 h-4" />,
    warning: <AlertCircle className="w-4 h-4" />,
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border text-xs font-medium animate-in fade-in slide-in-from-top-2 duration-500",
        variants[variant],
        className
      )}
    >
      <div className="mt-0.5 shrink-0">{icons[variant]}</div>
      <div className="flex-1 leading-relaxed">{children}</div>
    </div>
  );
};
