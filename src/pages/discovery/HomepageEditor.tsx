import React, { useEffect } from "react";
import { useDiscoveryStore } from "../../store/discoveryStore";
import HeroEditor from "./components/HeroEditor";
import ArtisanSpotlightEditor from "./components/ArtisanSpotlightEditor";
import CollectionVisibility from "./components/CollectionVisibility";
import NewArrivalsConfig from "./components/NewArrivalsConfig";

const HomepageEditor: React.FC = () => {
  const { config, fetchConfig, isLoading, error } = useDiscoveryStore();

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  if (isLoading && !config) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b5c46]"></div>
      </div>
    );
  }

  return (
    <div className="px-12 py-10 max-w-7xl mx-auto">
      <header className="mb-16">
        <h2 className="text-4xl font-serif italic text-[#6b5c46] mb-2">
          Homepage Configuration
        </h2>
        <p className="text-stone-500 opacity-70 tracking-wide font-light">
          Curate the tactile experience of your storefront.
        </p>
      </header>

      {error && (
        <div className="mb-8 p-4 bg-red-50 text-red-800 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-12 gap-10">
        {/* Section 1: Hero Section */}
        <div className="col-span-12 lg:col-span-8">
          <HeroEditor />
        </div>

        {/* Section 2: Artisan Spotlight */}
        <div className="col-span-12 lg:col-span-4">
          <ArtisanSpotlightEditor />
        </div>

        {/* Section 3: Featured Collections */}
        <div className="col-span-12">
          <CollectionVisibility />
        </div>

        {/* Section 4: New Arrivals Feed */}
        <div className="col-span-12">
          <NewArrivalsConfig />
        </div>
      </div>

      {/* Global Actions Footer */}
      <div className="fixed bottom-0 right-0 left-64 h-24 bg-white/90 backdrop-blur-xl z-40 px-12 flex items-center justify-end gap-6 border-t border-stone-100">
        <span className="text-stone-400 text-xs uppercase tracking-widest mr-auto">
          {config
            ? `Last updated: ${new Date(config.updatedAt).toLocaleTimeString()}`
            : ""}
        </span>
        <p className="text-green-800 font-medium text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Auto-synced to Gallery
        </p>
      </div>
    </div>
  );
};

export default HomepageEditor;
