import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Loader2 } from "lucide-react";
import type { ChartData } from "../../../api/admin";

interface RevenueChartProps {
  data: ChartData[];
  range: "6months" | "1year";
  onRangeChange: (range: "6months" | "1year") => void;
  isLoading: boolean;
  formatCurrency: (amount: number) => string;
}

export const RevenueChart = ({
  data,
  range,
  onRangeChange,
  isLoading,
  formatCurrency,
}: RevenueChartProps) => {
  return (
    <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-headline italic">Revenue Overview</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onRangeChange("6months")}
            className={`text-xs font-label px-4 py-2 rounded-full transition-colors ${
              range === "6months"
                ? "bg-surface-container text-on-surface-variant"
                : "hover:bg-surface-container text-on-surface-variant/40"
            }`}
          >
            Last 6 Months
          </button>
          <button
            onClick={() => onRangeChange("1year")}
            className={`text-xs font-label px-4 py-2 rounded-full transition-colors ${
              range === "1year"
                ? "bg-surface-container text-on-surface-variant"
                : "hover:bg-surface-container text-on-surface-variant/40"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="h-64 w-full relative">
        {isLoading && (
          <div className="absolute inset-0 bg-surface-container-lowest/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
            <Loader2 className="w-8 h-8 text-primary animate-spin-slow opacity-20" />
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#afb3ae", fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D8CDC1",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value) => [
                formatCurrency(value ? Number(value) : 0),
                "Revenue",
              ]}
            />
            <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === data.length - 1 ? "#6b5c46" : "#6b5c461a"}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
