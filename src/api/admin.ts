import api from './axios';

export interface DashboardStats {
  totalRevenue: number;
  activeArtisans: number;
  totalCollections: number;
  pendingOrders: number;
}

export interface ChartData {
  month: string;
  year: number;
  revenue: number;
}

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  artisanName: string;
  amount: number;
  status: string;
  placedAt: string;
}

export interface SpotlightArtisan {
  _id: string;
  displayName: string;
  specialty: string;
  bio?: string;
  profileImage?: string;
}

export interface DashboardOverviewResponse {
  stats: DashboardStats;
  revenueChart: ChartData[];
  spotlight: SpotlightArtisan | null;
  recentOrders: RecentOrder[];
}

export const adminApi = {
  getDashboardOverview: async (range: '6months' | '1year') => {
    const response = await api.get<DashboardOverviewResponse>(`/admin/dashboard/overview`, {
      params: { range }
    });
    return response.data;
  }
};
