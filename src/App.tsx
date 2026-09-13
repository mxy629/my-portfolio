import { LanguageProvider } from './i18n/LanguageContext';
import type { Lang } from './i18n/copy';
import Page from './Page';

export interface AppProps {
  /** Pin the initial language (SSR / tests). Omit to auto-detect. */
  initialLang?: Lang;
}

export default function App({ initialLang }: AppProps) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <Page />
    </LanguageProvider>
  );
}
