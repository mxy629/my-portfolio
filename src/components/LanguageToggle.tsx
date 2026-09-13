import { useLang } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/copy';

const OPTIONS: Array<{ value: Lang; label: string }> = [
  { value: 'zh', label: '中' },
  { value: 'en', label: 'EN' },
];

export interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language / 语言"
      className={[
        'flex shrink-0 items-center gap-0.5 rounded-full border border-[#D7E2EA]/30 p-0.5',
        className,
      ].join(' ')}
    >
      {OPTIONS.map((option) => {
        const active = option.value === lang;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={active}
            className={[
              'cursor-pointer rounded-full px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wider',
              'transition-colors duration-200 sm:px-2.5 sm:py-1 sm:text-xs',
              active
                ? 'bg-[#D7E2EA] text-[#0C0C0C]'
                : 'text-[#D7E2EA]/70 hover:text-[#D7E2EA]',
            ].join(' ')}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
