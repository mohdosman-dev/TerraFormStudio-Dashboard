import { ArrowRight } from "lucide-react";
import type { RecentOrder } from "../../../api/admin";

interface RecentOrdersTableProps {
  orders: RecentOrder[];
  formatCurrency: (amount: number) => string;
  getStatusColor: (status: string) => string;
}

export const RecentOrdersTable = ({
  orders,
  formatCurrency,
  getStatusColor,
}: RecentOrdersTableProps) => {
  return (
    <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-surface-container-low/50">
      <div className="p-8 border-b border-surface-container-low flex justify-between items-center">
        <h2 className="text-xl font-headline italic">Recent Orders</h2>
        <button className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all group">
          View all orders
          <ArrowRight className="w-4 h-4 transition-transform" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low/50">
            <tr>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-label text-on-surface-variant/50">
                Order ID
              </th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-label text-on-surface-variant/50">
                Artisan
              </th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-label text-on-surface-variant/50">
                Customer
              </th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-label text-on-surface-variant/50">
                Amount
              </th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-label text-on-surface-variant/50 text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {orders.map((order) => {
              const color = getStatusColor(order.status);
              return (
                <tr
                  key={order.id}
                  className="hover:bg-surface-container-low/20 transition-colors group cursor-pointer"
                >
                  <td className="px-8 py-5 text-sm font-medium text-on-background">
                    #{order.orderNumber}
                  </td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">
                    {order.artisanName}
                  </td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">
                    {order.customerName}
                  </td>
                  <td className="px-8 py-5 text-sm font-headline text-on-background">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-${color}-50 text-${color}-700`}
                    >
                      <span
                        className={`w-1 h-1 bg-${color}-700 rounded-full`}
                      ></span>
                      {order.status.replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-12 text-center text-on-surface-variant/40 font-body">
            No recent orders found in the archive.
          </div>
        )}
      </div>
    </section>
  );
};
