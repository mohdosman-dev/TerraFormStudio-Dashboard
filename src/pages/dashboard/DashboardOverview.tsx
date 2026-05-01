import { useState, useEffect } from "react";
import {
  CircleDollarSign,
  Palette,
  Library,
  ReceiptText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useAdminStore } from "../../store/adminStore";
import { StatCard } from "./components/StatCard";
import { RevenueChart } from "./components/RevenueChart";
import { SpotlightCard } from "./components/SpotlightCard";
import { RecentOrdersTable } from "./components/RecentOrdersTable";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
    case 'delivered':
      return 'green';
    case 'pending_payment':
    case 'pending':
      return 'amber';
    case 'shipped':
      return 'blue';
    case 'cancelled':
      return 'red';
    default:
      return 'slate';
  }
};

export const DashboardOverview = () => {
  const { dashboardData: data, isLoading, error, fetchDashboardOverview } = useAdminStore();
  const user = useAuthStore((state) => state.user);
  const [range, setRange] = useState<'6months' | '1year'>('6months');

  const firstName = user?.email.split("@")[0].split(".")[0] || "Elena";
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);

  useEffect(() => {
    fetchDashboardOverview(range);
  }, [range, fetchDashboardOverview]);

  if (isLoading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin-slow opacity-20" />
        <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant/40 animate-pulse">
          Fetching Archive Data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="p-4 rounded-full bg-error/10 text-error">
          <AlertCircle size={48} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-headline italic">Something went wrong</h2>
          <p className="text-on-surface-variant/60 max-w-md">{error}</p>
        </div>
        <button 
          onClick={() => fetchDashboardOverview(range)}
          className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <section>
        <h1 className="text-4xl font-headline italic text-on-background mb-2">
          Welcome back, {formattedFirstName}.
        </h1>
        <p className="font-body text-on-surface-variant/60 max-w-2xl">
          The kiln is firing and the gallery is alive. Here is your overview for
          today,{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
          .
        </p>
      </section>

      {/* At a Glance Statistics (Bento Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={CircleDollarSign}
          label="Total Revenue"
          value={formatCurrency(data.stats.totalRevenue)}
          trend="+12.5%"
          trendType="positive"
          colorClass="bg-primary-container text-on-primary-container"
        />
        <StatCard
          icon={Palette}
          label="Active Artisans"
          value={data.stats.activeArtisans}
          trend="Stable"
          colorClass="bg-secondary-container text-on-secondary-container"
        />
        <StatCard
          icon={Library}
          label="Total Collections"
          value={data.stats.totalCollections}
          trend="+2 new"
          trendType="positive"
          colorClass="bg-tertiary-container text-on-tertiary-container"
        />
        <StatCard
          icon={ReceiptText}
          label="Pending Orders"
          value={data.stats.pendingOrders}
          trend={data.stats.pendingOrders > 10 ? "Action Req." : "Managed"}
          colorClass="bg-error-container/20 text-error"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RevenueChart
          data={data.revenueChart}
          range={range}
          onRangeChange={setRange}
          isLoading={isLoading}
          formatCurrency={formatCurrency}
        />
        <SpotlightCard spotlight={data.spotlight} />
      </div>

      <RecentOrdersTable
        orders={data.recentOrders}
        formatCurrency={formatCurrency}
        getStatusColor={getStatusColor}
      />

      {/* Aesthetic Footer Section */}
      <footer className="mt-24 pt-12 border-t border-surface-container-low flex flex-col md:flex-row justify-between items-center gap-8 text-on-surface-variant/40">
        <div className="flex items-center gap-2">
          <span className="font-headline italic text-lg text-on-surface-variant/20">
            Terra Form Studio
          </span>
          <span className="text-[10px] uppercase tracking-tighter">
            — Modern Ceramics Archive
          </span>
        </div>
        <div className="flex gap-12 text-[10px] uppercase tracking-widest font-label">
          <a className="hover:text-primary transition-colors" href="#">
            Internal Privacy Policy
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            API Documentation
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Support Portal
          </a>
        </div>
        <p className="text-[10px] tracking-tight">
          System Status:{" "}
          <span className="text-green-600 font-bold">
            ALL SYSTEMS OPERATIONAL
          </span>
        </p>
      </footer>
    </div>
  );
};
