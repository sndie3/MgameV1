import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * BurstEffect
 * ------------------------------------------------------------------
 * A generic, reusable "particle burst" effect. Give it a position
 * (either an element ref or explicit x/y coordinates) and an image,
 * and it will play a short burst of that image outward from that
 * point, then call onComplete.
 *
 * This component has NO knowledge of what triggered it — it doesn't
 * know about bets, wins, amounts, or game state. You control when it
 * fires from wherever you use it.
 *
 * ------------------------------------------------------------------
 * USAGE A — anchored to an element ref:
 *
 *   const btnRef = useRef<HTMLButtonElement>(null);
 *   const [burstKey, setBurstKey] = useState(0);
 *
 *   <button ref={btnRef} onClick={() => setBurstKey((k) => k + 1)}>
 *     Click me
 *   </button>
 *
 *   <BurstEffect
 *     triggerKey={burstKey}
 *     anchorRef={btnRef}
 *     imageSrc="/assets/icons/spark.png"
 *   />
 *
 * ------------------------------------------------------------------
 * USAGE B — anchored to explicit coordinates:
 *
 *   <BurstEffect
 *     triggerKey={burstKey}
 *     position={{ x: 200, y: 400 }}
 *     imageSrc="/assets/icons/spark.png"
 *     particleCount={24}
 *     onComplete={() => console.log("burst finished")}
 *   />
 * ------------------------------------------------------------------
 */

export interface BurstEffectProps {
  /**
   * Change this value (e.g. increment a counter) to fire a new burst.
   * The component watches for changes to this prop rather than exposing
   * an imperative "play()" method, so it stays a plain declarative component.
   */
  triggerKey: number | string;

  /** Anchor the burst to an element's center. Ignored if `position` is set. */
  anchorRef?: RefObject<HTMLElement | null>;

  /** Anchor the burst to explicit viewport coordinates. Takes priority over anchorRef. */
  position?: { x: number; y: number };

  /** Image(s) to use for particles. If an array, particles pick randomly from it. */
  imageSrc: string | string[];

  /** How many particles to spawn per burst. */
  particleCount?: number;

  /** Pixel size of each particle image. */
  particleSize?: number;

  /** How far particles travel, in pixels (randomized between 0.6x and 1x this value). */
  travelDistance?: number;

  /** Duration of the burst animation in ms. */
  durationMs?: number;

  /** z-index of the burst layer. */
  zIndex?: number;

  /** Called once the burst animation finishes. */
  onComplete?: () => void;
}

interface Particle {
  id: number;
  tx: number; // translate x, px
  ty: number; // translate y, px
  rotate: number; // deg
  scale: number;
  delay: number; // ms
  src: string;
}

function buildParticles(
  count: number,
  travelDistance: number,
  images: string[]
): Particle[] {
  return Array.from({ length: count }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = travelDistance * (0.6 + Math.random() * 0.4);
    return {
      id: i,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
      rotate: (Math.random() - 0.5) * 720,
      scale: 0.7 + Math.random() * 0.6,
      delay: Math.random() * 80,
      src: images[Math.floor(Math.random() * images.length)],
    };
  });
}

export default function BurstEffect({
  triggerKey,
  anchorRef,
  position,
  imageSrc,
  particleCount = 18,
  particleSize = 28,
  travelDistance = 120,
  durationMs = 700,
  zIndex = 60,
  onComplete,
}: BurstEffectProps) {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [active, setActive] = useState(false);
  const isFirstRender = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Skip firing on initial mount; only fire when triggerKey actually changes.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let resolvedOrigin: { x: number; y: number } | null = null;

    if (position) {
      resolvedOrigin = position;
    } else if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      resolvedOrigin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }

    if (!resolvedOrigin) return;

    const images = Array.isArray(imageSrc) ? imageSrc : [imageSrc];

    setOrigin(resolvedOrigin);
    setParticles(buildParticles(particleCount, travelDistance, images));
    setActive(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(false);
      onComplete?.();
    }, durationMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerKey]);

  if (!active || !origin) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: origin.y,
        left: origin.x,
        width: 0,
        height: 0,
        zIndex,
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <img
          key={p.id}
          src={p.src}
          alt=""
          style={
            {
              position: "absolute",
              top: 0,
              left: 0,
              width: particleSize,
              height: particleSize,
              transform: "translate(-50%, -50%)",
              opacity: 0,
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--rot": `${p.rotate}deg`,
              "--scale": p.scale,
              animation: `burst-particle-fly ${durationMs}ms ease-out ${p.delay}ms forwards`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Component-scoped keyframes. Injected once; harmless if duplicated. */}
      <style>{`
        @keyframes burst-particle-fly {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(0.3);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(var(--scale));
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          img[style*="burst-particle-fly"] {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}