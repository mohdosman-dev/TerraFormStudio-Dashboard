import { Palette } from "lucide-react";
import type { SpotlightArtisan } from "../../../api/admin";

interface SpotlightCardProps {
  spotlight: SpotlightArtisan | null;
}

export const SpotlightCard = ({ spotlight }: SpotlightCardProps) => (
  <div className="bg-primary text-on-primary rounded-xl p-8 relative overflow-hidden group">
    <div className="relative z-10">
      <h2 className="text-xl font-headline italic mb-4">Artisan Spotlight</h2>
      {spotlight ? (
        <>
          <p className="text-on-primary/70 text-sm mb-8 leading-relaxed font-body">
            {spotlight.displayName}'s "{spotlight.specialty}" series has
            increased in demand this month.
          </p>
          <button className="bg-on-primary text-primary px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-xl transition-all active:scale-[0.98]">
            Review Collection
          </button>
        </>
      ) : (
        <p className="text-on-primary/70 text-sm mb-8 leading-relaxed font-body">
          Curating the next artisan spotlight. Stay tuned for new masteries.
        </p>
      )}
    </div>
    {/* Decorative element */}
    <div className="absolute -right-10 -bottom-10 opacity-20 group-hover:rotate-12 transition-transform duration-700">
      <Palette size={160} strokeWidth={1} />
    </div>
  </div>
);
