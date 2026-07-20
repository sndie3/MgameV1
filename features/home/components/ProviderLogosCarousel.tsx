import { useEffect, useMemo, useRef } from "react";

export interface Provider {
  name: string;
  logo: string;
}

interface ProviderLogosCarouselProps {
  providers: Provider[];
  splitColumns?: boolean;
  speed?: number; // pixels per frame
  largeLogoNames?: string[];
  columnHeight?: number;
}

const DEFAULT_LARGE_LOGOS = ["Pragmatic Play", "Victory Ark"];

function chunkIntoThree<T>(items: T[]): [T[], T[], T[]] {
  if (!items.length) return [[], [], []];

  const size = Math.ceil(items.length / 3);

  return [
    items.slice(0, size),
    items.slice(size, size * 2),
    items.slice(size * 2),
  ];
}

function MarqueeColumn({
  items,
  speed,
  largeLogoNames,
  columnHeight,
  direction = "up",
}: {
  items: Provider[];
  speed: number;
  largeLogoNames: string[];
  columnHeight: number;
  direction?: "up" | "down";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstListRef = useRef<HTMLDivElement>(null);

  const y = useRef(0);
  const paused = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !firstListRef.current) return;

    const listHeight = firstListRef.current.offsetHeight;

    // Downward marquee starts with the second copy visible.
    if (direction === "down") {
      y.current = -listHeight;
      containerRef.current.style.transform = `translateY(${y.current}px)`;
    }

    let animationId: number;

    const animate = () => {
      if (!paused.current) {
        const listHeight = firstListRef.current!.offsetHeight;

        if (direction === "up") {
          y.current -= speed;

          if (Math.abs(y.current) >= listHeight) {
            y.current = 0;
          }
        } else {
          y.current += speed;

          if (y.current >= 0) {
            y.current = -listHeight;
          }
        }

        containerRef.current!.style.transform = `translateY(${y.current}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [speed, direction]);

  if (!items.length) return null;

  const renderList = (ref?: React.Ref<HTMLDivElement>) => (
    <div
      ref={ref}
      className="flex flex-col items-center gap-y-8 py-5"
    >
      {items.map((provider) => (
        <img
          key={provider.name}
          src={provider.logo}
          alt={provider.name}
          className={`object-contain shrink-0 opacity-90 transition-all duration-300 hover:scale-110 hover:opacity-100 ${largeLogoNames.includes(provider.name)
            ? "h-16 md:h-20"
            : "h-10 md:h-10"
            }`}
        />
      ))}
    </div>
  );

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: columnHeight }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/40 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent z-10" />

      <div ref={containerRef}>
        {renderList(firstListRef)}
        {renderList()}
      </div>
    </div>
  );
}

export default function ProviderLogosCarousel({
  providers,
  splitColumns = true,
  speed = 0.5, // pixels per frame
  largeLogoNames = DEFAULT_LARGE_LOGOS,
  columnHeight = 320,
}: ProviderLogosCarouselProps) {
  const [col1, col2, col3] = useMemo(
    () =>
      splitColumns
        ? chunkIntoThree(providers)
        : [providers, providers, providers],
    [providers, splitColumns]
  );

  return (
    <div className="flex justify-center items-start gap-12 w-full">
      <MarqueeColumn
        items={col1}
        speed={speed}
        direction="up"
        largeLogoNames={largeLogoNames}
        columnHeight={columnHeight}
      />

      <MarqueeColumn
        items={col2}
        speed={speed}
        direction="down"
        largeLogoNames={largeLogoNames}
        columnHeight={columnHeight}
      />

      <MarqueeColumn
        items={col3}
        speed={speed}
        direction="up"
        largeLogoNames={largeLogoNames}
        columnHeight={columnHeight}
      />
    </div>
  );
}