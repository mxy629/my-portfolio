import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { MARQUEE_GIFS as GIFS } from '../content/assets';

const TILE_W = 420;
const TILE_H = 270;
const GAP = 12; // gap-3

const ROW_ONE = GIFS.slice(0, 11);
const ROW_TWO = GIFS.slice(11);

const triple = (list: string[]) => [...list, ...list, ...list];

/** Width of a single (non-tripled) set of tiles, including gaps. */
const setWidth = (list: string[]) => list.length * (TILE_W + GAP);

function MarqueeRow({
  images,
  direction,
  offset,
}: {
  images: string[];
  direction: 'right' | 'left';
  offset: number;
}) {
  const width = setWidth(images);
  const shift = offset - 200;
  // Anchor at -1 set width so the viewport is always covered while shifting.
  const translateX = direction === 'right' ? -width + shift : -width - shift;

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex"
        style={{
          gap: `${GAP}px`,
          transform: `translateX(${translateX}px)`,
          willChange: 'transform',
        }}
      >
        {triple(images).map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="shrink-0 overflow-hidden rounded-2xl bg-[#141414]"
            style={{ width: `${TILE_W}px`, height: `${TILE_H}px` }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              draggable={false}
              className="h-full w-full select-none object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Scroll-linked motion is exactly what "reduce motion" asks us to avoid:
    // park the rows at a fixed position instead of driving them from scroll.
    if (reducedMotion) {
      setOffset(0);
      return;
    }

    const handleScroll = () => {
      const node = sectionRef.current;
      if (!node) return;
      const sectionTop = node.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col" style={{ gap: `${GAP}px` }}>
        <MarqueeRow images={ROW_ONE} direction="right" offset={offset} />
        <MarqueeRow images={ROW_TWO} direction="left" offset={offset} />
      </div>
    </section>
  );
}
