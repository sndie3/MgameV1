import { useMemo } from "react";

/**
 * ProviderLogosCarousel
 * ------------------------------------------------------------------
 * Renders provider logos as 3 vertical columns, each auto-scrolling
 * upward in an infinite loop. Pauses on hover per-column.
 * ------------------------------------------------------------------
 * USAGE:
 *
 *   <ProviderLogosCarousel providers={providers} />
 *
 * `providers` items need at least: { name: string; logo: string }
 * ------------------------------------------------------------------
 */

export interface Provider {
  name: string;
  logo: string;
}

interface ProviderLogosCarouselProps {
  providers: Provider[];
  /** Split the provider list across the 3 columns instead of repeating the full list in each. */
  splitColumns?: boolean;
  /** Seconds for one full loop per column (lower = faster). */
  speedSeconds?: number;
  /** Names that should render taller/wider, matching the original hover-scale sizing logic. */
  largeLogoNames?: string[];
  /** Fixed height of each column's viewport, in pixels. */
  columnHeight?: number;
}

const DEFAULT_LARGE_LOGOS = ["Pragmatic Play", "Victory Ark"];

function chunkIntoThree<T>(items: T[]): [T[], T[], T[]] {
  if (items.length === 0) return [[], [], []];
  const size = Math.ceil(items.length / 3);
  return [
    items.slice(0, size),
    items.slice(size, size * 2),
    items.slice(size * 2),
  ];
}

function MarqueeColumn({
  items,
  speedSeconds,
  largeLogoNames,
  columnHeight,
}: {
  items: Provider[];
  speedSeconds: number;
  largeLogoNames: string[];
  columnHeight: number;
}) {
  // Duplicate the column content so the upward loop is seamless —
  // as soon as the first copy scrolls fully out the top, the second
  // copy is already in position to continue without a visible jump.
  const looped = useMemo(() => [...items, ...items], [items]);

  if (items.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden group"
      style={{ height: columnHeight }}
    >
      {/* Edge fades so logos don't hard-clip at top/bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 z-10 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 z-10 bg-gradient-to-t from-black/40 to-transparent" />

      <div
        className="flex flex-col w-full items-center gap-y-8 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-up ${speedSeconds}s linear infinite`,
        }}
      >
        {looped.map((provider, i) => (
          <img
            key={`${provider.name}-${i}`}
            src={provider.logo}
            alt={provider.name}
            className={`object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:opacity-100 shrink-0 ${
              largeLogoNames.includes(provider.name) ? "h-16 md:h-20" : "h-8 md:h-10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProviderLogosCarousel({
  providers,
  splitColumns = true,
  speedSeconds = 35,
  largeLogoNames = DEFAULT_LARGE_LOGOS,
  columnHeight = 320,
}: ProviderLogosCarouselProps) {
  const [col1, col2, col3] = splitColumns
    ? chunkIntoThree(providers)
    : [providers, providers, providers];

  return (
    <div className="flex flex-row items-start justify-center gap-x-12 w-full">
      <style>{`
        @keyframes marquee-up {
          0%   { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee-up"] {
            animation: none !important;
          }
        }
      `}</style>

      <MarqueeColumn
        items={col1}
        speedSeconds={speedSeconds}
        largeLogoNames={largeLogoNames}
        columnHeight={columnHeight}
      />
      <MarqueeColumn
        items={col2}
        speedSeconds={speedSeconds}
        largeLogoNames={largeLogoNames}
        columnHeight={columnHeight}
      />
      <MarqueeColumn
        items={col3}
        speedSeconds={speedSeconds}
        largeLogoNames={largeLogoNames}
        columnHeight={columnHeight}
      />
    </div>
  );
}