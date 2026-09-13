import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

export interface Tilt3DProps {
  children: ReactNode;
  /** Peak rotation in degrees, reached at the edge of the activation zone. */
  maxTilt?: number;
  /** CSS perspective distance in px — smaller reads as more dramatic. */
  perspective?: number;
  /** Extra distance (px) around the element where the tilt still reacts. */
  padding?: number;
  /** Scale while the pointer is inside the activation zone. */
  hoverScale?: number;
  /**
   * Image used as an alpha mask for the glare layer. Pass the same transparent
   * PNG as the child: masking keeps the highlight on the artwork itself instead
   * of lighting up the empty corners of the image box.
   */
  glareSrc?: string;
  /** Peak opacity of the glare layer. */
  glareOpacity?: number;
  className?: string;
  style?: CSSProperties;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Pointer-driven 3D tilt.
 *
 * Rotates its child on the X/Y axes towards the cursor. Deliberately does *not*
 * translate — that is `Magnet`'s job, and keeping the two separate means they
 * compose (the portrait drifts towards the pointer and tilts at the same time)
 * instead of overwriting each other's `transform`.
 */
export default function Tilt3D({
  children,
  maxTilt = 13,
  perspective = 900,
  padding = 160,
  hoverScale = 1.03,
  glareSrc,
  glareOpacity = 0.32,
  className = '',
  style,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Normalised pointer offset from the element centre, -0.5 … 0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // 0 = idle, 1 = pointer inside the activation zone.
  const active = useMotionValue(0);

  const tiltSpring = { stiffness: 140, damping: 18, mass: 0.5 };
  const sx = useSpring(px, tiltSpring);
  const sy = useSpring(py, tiltSpring);
  const sActive = useSpring(active, { stiffness: 190, damping: 26 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const scale = useTransform(sActive, [0, 1], [1, hoverScale]);
  const glareAlpha = useTransform(sActive, [0, 1], [0, glareOpacity]);

  const glareX = useTransform(sx, [-0.5, 0.5], ['12%', '88%']);
  const glareY = useTransform(sy, [-0.5, 0.5], ['12%', '88%']);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.55), rgba(255,255,255,0) 58%)`;

  useEffect(() => {
    if (reducedMotion) {
      px.set(0);
      py.set(0);
      active.set(0);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const node = ref.current;
      if (!node) return;

      const { left, top, width, height, bottom } = node.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      // The portrait sits at the top of the page; once it has scrolled away
      // there is nothing to tilt, so stop doing work on every mouse move.
      if (bottom < 0 || top > window.innerHeight) {
        active.set(0);
        return;
      }

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // The activation zone has to reach the viewport edges, otherwise the tilt
      // only kicks in when the cursor is already over the element and the
      // effect reads as broken on a wide screen. Same reasoning as Magnet.
      const zoneX = Math.max(width / 2 + padding, window.innerWidth / 2);
      const zoneY = Math.max(height / 2 + padding, window.innerHeight / 2);

      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;

      px.set(clamp(dx / (zoneX * 2), -0.5, 0.5));
      py.set(clamp(dy / (zoneY * 2), -0.5, 0.5));
      active.set(1);
    };

    const handleMouseLeave = () => {
      px.set(0);
      py.set(0);
      active.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, padding, px, py, active]);

  // Respect the OS "reduce motion" setting: render the child untouched.
  if (reducedMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transformPerspective: perspective,
          rotateX,
          rotateY,
          scale,
          willChange: 'transform',
        }}
      >
        {children}

        {glareSrc ? (
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: glareAlpha,
              background: glareBackground,
              WebkitMaskImage: `url(${glareSrc})`,
              maskImage: `url(${glareSrc})`,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}
