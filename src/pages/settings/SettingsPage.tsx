import React, { useEffect, useState } from "react";
import { useSettingsStore } from "../../store/settingsStore";
import GeneralSettings from "./components/GeneralSettings";
import PaymentSettings from "./components/PaymentSettings";
import DeliveryMethodsSettings from "./components/DeliveryMethodsSettings";
import LegalSettings from "./components/LegalSettings";
import CommunicationSettings from "./components/CommunicationSettings";

const tabs = [
  { id: "general", label: "General" },
  { id: "payments", label: "Payments" },
  { id: "delivery", label: "Delivery" },
  { id: "legal", label: "Legal" },
  { id: "communication", label: "Communication" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const { settings, fetchSettings, isLoading, error } = useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  if (isLoading && !settings) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b5c46]"></div>
      </div>
    );
  }

  return (
    <div className="px-12 py-10 max-w-5xl">
      {/* Header Section */}
      <div className="mb-12">
        <h2 className="font-serif text-4xl text-[#2f3430] mb-2">
          Studio Configuration
        </h2>
        <p className="text-stone-500 font-light">
          Fine-tune the operational essence of Terra Form Studio.
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 text-red-800 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex space-x-12 mb-12 border-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`transition-colors pb-2 text-sm tracking-widest uppercase ${
              activeTab === tab.id
                ? "text-[#6b5c46] font-semibold border-b-2 border-[#6b5c46]"
                : "text-stone-400 hover:text-[#2f3430]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content Container */}
      <div className="space-y-16">
        {settings && (
          <>
            {activeTab === "general" && <GeneralSettings />}
            {activeTab === "payments" && <PaymentSettings />}
            {activeTab === "delivery" && <DeliveryMethodsSettings />}
            {activeTab === "legal" && <LegalSettings />}
            {activeTab === "communication" && <CommunicationSettings />}
          </>
        )}
      </div>

      {/* Unsaved Changes Indicator (Mocked for now as we save per tab) */}
      <div className="sticky bottom-8 left-0 right-0 max-w-5xl mx-auto z-40 px-4 mt-12">
        <div className="bg-[#2f3430]/95 backdrop-blur-md rounded-full px-8 py-4 flex items-center justify-between shadow-2xl">
          <p className="text-on-primary font-medium text-sm">
            All configurations are{" "}
            <span className="italic font-serif">Cloud Synced</span>
          </p>
          <div className="flex space-x-6">
            <span className="text-stone-400 text-xs uppercase tracking-widest">
              Last updated:{" "}
              {settings
                ? new Date(settings.updatedAt).toLocaleTimeString()
                : "Never"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
