import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

/** CJK ideographs, kana, CJK punctuation and full-width forms. */
const CJK = /[\u3000-\u303F\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/;

/**
 * Marks that must not start a line (、。，！？；：）」』】》…—).
 *
 * Splitting the paragraph into one inline-block per character — which the
 * per-character reveal requires — defeats the browser's CJK line-breaking
 * rules, so a closing mark can end up stranded at the start of a line. Gluing
 * each mark onto the glyph before it keeps the pair on one line.
 */
const NO_LINE_START = /[\u3001\u3002\uFF0C\uFF01\uFF1F\uFF1B\uFF1A\uFF09\u300D\u300F\u3011\u300B\u2026\u2014]/;

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* invisible placeholder keeps the line box / layout stable */}
      <span className="opacity-0" aria-hidden="true">
        {char}
      </span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
}

export interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Without motion, render the plain paragraph at full opacity — the
  // per-character reveal would otherwise leave text dimmed at 0.2.
  if (reducedMotion) {
    return (
      <p ref={ref} className={className} style={style}>
        {text}
      </p>
    );
  }

  const total = Math.max(text.length, 1);
  let cursor = 0;

  const groups = text.split(' ').map((word, wordIndex, all) => {
    const chars: { char: string; range: [number, number] }[] = [];

    for (const char of word) {
      const i = cursor++;
      const prev = chars[chars.length - 1];

      // Merge a line-ending mark into the preceding glyph so the two wrap
      // together instead of the mark being stranded at the start of a line.
      if (prev && NO_LINE_START.test(char)) {
        prev.char += char;
        prev.range = [prev.range[0], (i + 1) / total];
      } else {
        chars.push({ char, range: [i / total, (i + 1) / total] });
      }
    }

    // A space only needs its own slot between space-separated words.
    if (wordIndex < all.length - 1) {
      const i = cursor++;
      chars.push({ char: '\u00A0', range: [i / total, (i + 1) / total] as [number, number] });
    }

    // Latin words must stay atomic, but a CJK run has no spaces to break on,
    // so it has to be allowed to wrap between any two characters.
    return { key: wordIndex, breakable: CJK.test(word), chars };
  });

  return (
    <p ref={ref} className={className} style={style}>
      {groups.map((group) => (
        <span
          key={group.key}
          className={group.breakable ? undefined : 'inline-block whitespace-nowrap'}
        >
          {group.chars.map((item, i) => (
            <span key={i} className="inline-block">
              <Char char={item.char} progress={scrollYProgress} range={item.range} />
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}
