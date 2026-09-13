import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { copy } from './copy';
import type { Copy, Lang } from './copy';

const STORAGE_KEY = 'jack-lang';

interface LanguageValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  toggle: () => void;
  t: Copy;
}

const LanguageContext = createContext<LanguageValue | null>(null);

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'zh';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'zh' || stored === 'en') return stored;
  } catch {
    // localStorage unavailable (private mode / blocked) — fall through to default
  }
  return 'zh';
}

function persist(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore write failures; the toggle still works for this session
  }
}

export interface LanguageProviderProps {
  children: ReactNode;
  /** Override the detected default — used by SSR and the smoke test. */
  initialLang?: Lang;
}

export function LanguageProvider({ children, initialLang }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Lang>(() => initialLang ?? readInitialLang());

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persist(next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === 'zh' ? 'en' : 'zh';
      persist(next);
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = copy[lang].meta.title;
  }, [lang]);

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, toggle, t: copy[lang] }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
