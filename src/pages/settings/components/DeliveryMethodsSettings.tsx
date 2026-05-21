import React, { useState } from "react";
import { useSettingsStore } from "../../../store/settingsStore";
import type { DeliveryMethod } from "../../../api/settings";
import { Edit, Edit2Icon, PlusCircle, ShipIcon } from "lucide-react";

const emptyMethod = (): DeliveryMethod => ({
  id: crypto.randomUUID(),
  name: "",
  description: "",
  price: 0,
  currency: "AED",
  estimatedDays: "",
  isActive: true,
  isDefault: false,
});

const DeliveryMethodsSettings: React.FC = () => {
  const { settings, updateSettings } = useSettingsStore();
  const [methods, setMethods] = useState<DeliveryMethod[]>(() =>
    settings?.deliveryMethods?.length ? [...settings.deliveryMethods] : [],
  );
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = [...methods].sort(
    (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0),
  );

  const handleChange = (
    id: string,
    field: keyof DeliveryMethod,
    value: any,
  ) => {
    setMethods((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        if (field === "isDefault" && value === true) {
          return { ...m, isDefault: true };
        }
        return { ...m, [field]: value };
      }),
    );
    if (field === "isDefault" && value === true) {
      setMethods((prev) =>
        prev.map((m) => (m.id !== id ? { ...m, isDefault: false } : m)),
      );
    }
  };

  const handleSave = async () => {
    const cleaned = methods.filter((m) => m.name.trim());
    if (cleaned.length > 0 && !cleaned.some((m) => m.isDefault)) {
      cleaned[0].isDefault = true;
    }
    await updateSettings({ deliveryMethods: cleaned });
  };

  const handleAdd = () => {
    const m = emptyMethod();
    setMethods((prev) => [...prev, m]);
    setExpanded(m.id);
  };

  const handleRemove = (id: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
    if (expanded === id) setExpanded(null);
  };

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
      id="delivery-methods"
    >
      <div>
        <h3 className="font-serif text-xl mb-2">Delivery Methods</h3>
        <p className="text-sm text-stone-500 leading-relaxed">
          Manage logistical paths and shipping speeds for global delivery.
        </p>
      </div>
      <div className="md:col-span-2 space-y-4">
        {sorted.map((method) => (
          <div
            key={method.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-stone-200/50"
          >
            {expanded === method.id ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={method.name}
                      onChange={(e) =>
                        handleChange(method.id, "name", e.target.value)
                      }
                      className="w-full bg-stone-50 border-b border-stone-300 focus:border-[#6b5c46] outline-none px-3 py-2 text-sm"
                      placeholder="Standard Shipping"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      value={method.price}
                      onChange={(e) =>
                        handleChange(
                          method.id,
                          "price",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full bg-stone-50 border-b border-stone-300 focus:border-[#6b5c46] outline-none px-3 py-2 text-sm"
                      placeholder="12.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={method.description}
                    onChange={(e) =>
                      handleChange(method.id, "description", e.target.value)
                    }
                    className="w-full bg-stone-50 border-b border-stone-300 focus:border-[#6b5c46] outline-none px-3 py-2 text-sm"
                    placeholder="5-7 Business Days. Eco-conscious packaging."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
                      Estimated Delivery
                    </label>
                    <input
                      type="text"
                      value={method.estimatedDays}
                      onChange={(e) =>
                        handleChange(method.id, "estimatedDays", e.target.value)
                      }
                      className="w-full bg-stone-50 border-b border-stone-300 focus:border-[#6b5c46] outline-none px-3 py-2 text-sm"
                      placeholder="5-7 business days"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
                      Currency
                    </label>
                    <select
                      value={method.currency}
                      onChange={(e) =>
                        handleChange(method.id, "currency", e.target.value)
                      }
                      className="w-full bg-stone-50 border-b border-stone-300 focus:border-[#6b5c46] outline-none px-3 py-2 text-sm"
                    >
                      <option value="AED">AED</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={method.isActive}
                      onChange={(e) =>
                        handleChange(method.id, "isActive", e.target.checked)
                      }
                      className="w-4 h-4 text-[#6b5c46] focus:ring-[#6b5c46] border-stone-300"
                    />
                    <span className="text-xs font-medium">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="default_delivery"
                      checked={method.isDefault}
                      onChange={() =>
                        handleChange(method.id, "isDefault", true)
                      }
                      className="w-4 h-4 text-[#6b5c46] focus:ring-[#6b5c46]"
                    />
                    <span className="text-xs font-medium">Set as Default</span>
                  </label>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-100">
                  <button
                    onClick={() => handleRemove(method.id)}
                    className="text-red-600 font-bold text-xs uppercase tracking-widest hover:text-red-800"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => setExpanded(null)}
                    className="text-[#6b5c46] font-bold text-xs uppercase tracking-widest"
                  >
                    Collapse
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center">
                      <ShipIcon className="material-symbols-outlined text-[#6b5c46]" />
                    </div>
                    <div>
                      <p className="font-bold text-stone-800">{method.name}</p>
                      <p className="text-xs text-stone-500">
                        {method.description || "No description"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {method.isDefault && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                        Default
                      </span>
                    )}
                    <span className="text-sm font-semibold text-stone-700">
                      {method.currency} {method.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100">
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        method.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {method.isActive ? "Active" : "Disabled"}
                    </span>
                    <span className="text-xs text-stone-500">
                      {method.estimatedDays}
                    </span>
                  </div>
                  <button
                    onClick={() => setExpanded(method.id)}
                    className="text-[#6b5c46] font-bold text-xs uppercase tracking-widest flex items-center"
                  >
                    <Edit2Icon
                      className="material-symbols-outlined text-sm mr-1"
                      size={14}
                    />
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={handleAdd}
          className="w-full py-4 border-2 border-dashed border-stone-300 rounded-xl text-stone-500 hover:border-[#6b5c46] hover:text-[#6b5c46] transition-all flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
        >
          <PlusCircle className="material-symbols-outlined text-sm" />
          Add Delivery Method
        </button>
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="bg-[#6b5c46] text-on-primary px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Save Delivery Methods
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeliveryMethodsSettings;
