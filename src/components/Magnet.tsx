import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface MagnetProps {
  children: ReactNode;
  /** Distance (px) beyond the element's edge where the magnet starts reacting. */
  padding?: number;
  disabled?: boolean;
  /** Higher = weaker pull. */
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
  style?: CSSProperties;
}

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  style,
}: MagnetProps) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isDisabled = disabled || Boolean(reducedMotion);

  useEffect(() => {
    if (isDisabled) {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const node = magnetRef.current;
      if (!node) return;

      const { left, top, width, height } = node.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - event.clientX);
      const distY = Math.abs(centerY - event.clientY);

      // The activation zone must reach the viewport edges. With a fixed
      // element-box padding the zone is a band of constant width centred on the
      // element, so on a wide screen the outer thirds never triggered it and
      // the portrait appeared to only follow the cursor near the middle.
      const zoneX = Math.max(width / 2 + padding, window.innerWidth / 2);
      const zoneY = Math.max(height / 2 + padding, window.innerHeight / 2);

      const withinX = distX < zoneX;
      const withinY = distY < zoneY;

      if (withinX && withinY) {
        setIsActive(true);
        setPosition({
          x: (event.clientX - centerX) / magnetStrength,
          y: (event.clientY - centerY) / magnetStrength,
        });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, isDisabled, magnetStrength]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block', ...style }}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
