import axios from "./axios";

export interface SystemSettings {
  general: {
    defaultCurrency: "USD" | "EUR" | "GBP" | "AED";
  };
  payments: {
    stripe: {
      isActive: boolean;
      connectedAccount: string;
    };
    paypal: {
      isActive: boolean;
      email?: string;
    };
    applePay: {
      isActive: boolean;
      isVerified: boolean;
    };
  };
  legal: {
    termsAndConditions: {
      content: string;
      lastUpdated: string;
    };
    privacyPolicy: {
      content: string;
      lastUpdated: string;
    };
  };
  communication: {
    emailTemplates: {
      orderConfirmation: {
        subject: string;
        body: string;
      };
      shippingUpdate: {
        subject: string;
        body: string;
      };
      welcomeEmail: {
        subject: string;
        body: string;
      };
    };
  };
  updatedAt: string;
}

export const settingsApi = {
  getSettings: async (): Promise<SystemSettings> => {
    const { data } = await axios.get("/admin/settings");
    return data;
  },
  updateSettings: async (
    settings: Partial<SystemSettings>,
  ): Promise<SystemSettings> => {
    const { data } = await axios.patch("/admin/settings", settings);
    return data;
  },
};
