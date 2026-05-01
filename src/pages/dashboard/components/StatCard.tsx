import type { LucideIcon } from "lucide-react";
import { cn } from "../../../utils/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendType?: "positive" | "negative";
  colorClass: string;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  trendType,
  colorClass,
}: StatCardProps) => (
  <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-b-2 border-transparent hover:border-primary/20 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={cn("p-3 rounded-lg", colorClass)}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span
          className={cn(
            "text-xs font-label font-bold px-2 py-1 rounded-full",
            trendType === "positive"
              ? "bg-green-50 text-green-600"
              : "text-on-surface-variant/40",
          )}
        >
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-on-surface-variant/60 text-sm font-label uppercase tracking-widest mb-1">
      {label}
    </h3>
    <p className="text-3xl font-headline text-on-background">{value}</p>
  </div>
);
