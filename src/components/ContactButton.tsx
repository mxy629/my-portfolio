import type { CSSProperties } from 'react';

export interface ContactButtonProps {
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export default function ContactButton({
  label = 'Contact Me',
  className = '',
  style,
}: ContactButtonProps) {
  return (
    <button
      type="button"
      className={[
        'shrink-0 whitespace-nowrap rounded-full text-xs font-medium uppercase tracking-widest text-white',
        'px-8 py-3 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base',
        'transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]',
        'cursor-pointer',
        className,
      ].join(' ')}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
        ...style,
      }}
    >
      {label}
    </button>
  );
}
