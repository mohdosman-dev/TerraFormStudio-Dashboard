import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Edit3,
  Palette,
  Library,
  Package,
  ReceiptText,
  Users,
  CircleDollarSign,
  Settings,
  Search,
  Bell,
  Settings2,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { cn } from "../../utils/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Edit3, label: "Homepage Editor", path: "/home-config" },
  { icon: Palette, label: "Artisans", path: "/artisans" },
  { icon: Library, label: "Collections", path: "/collections" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: ReceiptText, label: "Orders", path: "/orders" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: CircleDollarSign, label: "Transactions", path: "/transactions" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const AdminLayout = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* SideNavBar Shell */}
      <nav className="h-screen w-72 fixed left-0 top-0 overflow-y-auto flex flex-col bg-surface-container font-body text-sm tracking-wide z-50">
        <div className="px-8 py-10">
          <span className="font-headline text-2xl text-on-background">
            The Tactile Gallery
          </span>
          <p className="text-on-surface-variant mt-1">Curator Portal</p>
        </div>

        <div className="flex flex-col grow">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "flex items-center gap-4 px-8 py-3 transition-all duration-300 hover:bg-surface-variant/50 group active:scale-[0.98]",
                  isActive
                    ? "text-primary font-bold bg-background/50 rounded-l-full ml-4 pl-4"
                    : "text-on-surface-variant hover:text-primary",
                )
              }
            >
              <item.icon
                className="w-5 h-5 shrink-0"
                // strokeWidth={isActive ? 2.5 : 2}
              />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-8 mt-auto flex flex-col gap-4">
          <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
            View Live Gallery
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 text-on-surface-variant hover:text-error hover:bg-error-container/10 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-widest"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content Wrap */}
      <div className="flex-1 ml-72 flex flex-col min-w-0">
        {/* TopAppBar Shell */}
        <header className="sticky top-0 right-0 z-40 bg-background/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(47,52,48,0.04)] flex justify-between items-center px-10 h-20">
          <div className="flex items-center gap-6 w-1/2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40" />
              <input
                className="w-full bg-surface-container-low border-none rounded-full pl-12 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40"
                placeholder="Search orders, artisans..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-surface-container rounded-full transition-colors relative">
                <Bell className="w-5 h-5 text-primary" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <Settings2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            <div className="h-8 w-px bg-outline-variant/20 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-on-surface">
                  {user?.email
                    .split("@")[0]
                    .split(".")
                    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(" ") || "Elena Vance"}
                </p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">
                  {user?.roles?.includes("super_admin")
                    ? "Lead Curator"
                    : "Curator"}
                </p>
              </div>
              <img
                alt="Admin Avatar"
                className="w-10 h-10 rounded-full object-cover grayscale border border-outline-variant/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQHPEuO4SZeBWHzMJnyWyp2MKhSYMvDykz9sbIYBRWvh0a1szDp2aZzmZktoymwo3QT8nTvSHEre8gNhfeLHsxpF2mhAARpUSkfOXntduUykJnEr8JxWXv4YhLiQv3ykRS_qOC9DwbaDw-Czt6G_kJOYH7Qwz0E7be_wMRaqfnLvRGs1d2Wz3vC1nn5g_l1vBz-6uzzfcls9NuyGCz5YJj7ji_Ga2A_HVPR3ckWCUJKY2FcingPyIzNrEmSoiv78226Khc8-J_3DY"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-10 min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
