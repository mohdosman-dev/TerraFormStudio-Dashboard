import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSettingsStore } from "../../../store/settingsStore";

const schema = z.object({
  defaultCurrency: z.enum(["USD", "EUR", "GBP", "AED"]),
});

type FormData = z.infer<typeof schema>;

const GeneralSettings: React.FC = () => {
  const { settings, updateSettings, isLoading } = useSettingsStore();

  const { handleSubmit, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      defaultCurrency: settings?.general.defaultCurrency || "USD",
    },
  });

  const currentCurrency = watch("defaultCurrency");

  const onSubmit = async (data: FormData) => {
    await updateSettings({ general: data });
  };

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "Pound Sterling" },
    { code: "AED", name: "UAE Dirham" },
  ] as const;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div>
        <h3 className="font-serif text-xl mb-2">General Defaults</h3>
        <p className="text-sm text-stone-500 leading-relaxed">
          Global settings for localization and marketplace presence.
        </p>
      </div>
      <div className="md:col-span-2 bg-[#f4f4f0] p-10 rounded-xl space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
              Default Currency
            </label>
            <div className="grid grid-cols-3 gap-4">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  onClick={() => setValue("defaultCurrency", currency.code)}
                  className={`p-4 text-center rounded-lg transition-colors ${
                    currentCurrency === currency.code
                      ? "bg-white border-b-2 border-[#6b5c46] shadow-sm"
                      : "bg-[#edeeea] hover:bg-[#e0e4de]"
                  }`}
                >
                  <span className="block text-lg font-bold">
                    {currency.code}
                  </span>
                  <span className="text-xs text-stone-500">
                    {currency.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#6b5c46] text-[#fff6ee] px-8 py-2 rounded-full font-bold text-sm hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save General Settings"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default GeneralSettings;
