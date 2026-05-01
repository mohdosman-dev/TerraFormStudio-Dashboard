import React from "react";
import { useDiscoveryStore } from "../../../store/discoveryStore";

const NewArrivalsConfig: React.FC = () => {
  const { config, updateSection, isLoading } = useDiscoveryStore();
  const productSection = config?.sections.find((s) => s.type === "product_row");

  const handleCountChange = async (delta: number) => {
    const currentCount = productSection?.productIds?.length || 0;
    const newCount = Math.max(1, currentCount + delta);
    // In a real app, you'd fetch the latest N products here
    // For now we just mock the update of the section metadata if stored
    await updateSection("product_row", { title: `New Arrivals (${newCount})` });
  };

  return (
    <section className="bg-background border border-stone-200/50 p-10 rounded">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <span className="w-8 h-px bg-[#6b5c46]"></span>
          <h3 className="font-['Manrope'] text-xs font-bold uppercase tracking-[0.2em] text-[#6b5c46]">
            New Arrivals Feed
          </h3>
        </div>
        <div className="flex flex-wrap gap-8 items-center">
          <div className="flex items-center gap-3">
            <label className="font-['Manrope'] text-[10px] uppercase tracking-widest text-stone-500">
              Display Count
            </label>
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded">
              <button
                onClick={() => handleCountChange(-1)}
                disabled={isLoading}
                className="text-[#6b5c46] font-bold"
              >
                -
              </button>
              <span className="font-serif text-sm px-2">
                {productSection?.productIds?.length || 0}
              </span>
              <button
                onClick={() => handleCountChange(1)}
                disabled={isLoading}
                className="text-[#6b5c46] font-bold"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-['Manrope'] text-[10px] uppercase tracking-widest text-stone-500">
              Sort By
            </label>
            <select className="bg-transparent border-none text-sm font-['Manrope'] text-[#2f3430] focus:ring-0 cursor-pointer">
              <option>Release Date (Newest)</option>
              <option>Curator's Choice</option>
              <option>Price (High to Low)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-surface-container-low rounded flex items-center justify-center border border-stone-200/20"
          >
            <span className="material-symbols-outlined text-stone-300 text-4xl">
              image
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsConfig;
