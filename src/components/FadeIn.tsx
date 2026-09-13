import type { CSSProperties, ElementType, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const motionCache = new Map<string, ElementType>();

/** Build (and memoize) a motion component for a dynamic tag name. */
function getMotionComponent(tag: string): ElementType {
  const cached = motionCache.get(tag);
  if (cached) return cached;
  const created = motion.create(tag as never) as unknown as ElementType;
  motionCache.set(tag, created);
  return created;
}

export interface FadeInProps {
  children: ReactNode;
  /** Element type to render, e.g. "div" | "h1" | "p" | "nav". Defaults to "div". */
  as?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}

export default function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
}: FadeInProps) {
  const MotionTag = getMotionComponent(as);
  const reducedMotion = useReducedMotion();

  // With "reduce motion" on, skip the animation entirely and render the
  // element in its final state — never leave content stuck at opacity 0.
  const animationProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, x, y },
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, margin: '50px', amount: 0 },
        transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
      };

  return (
    <MotionTag className={className} style={style} {...animationProps}>
      {children}
    </MotionTag>
  );
}
