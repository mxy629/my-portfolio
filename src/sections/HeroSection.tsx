import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import Tilt3D from '../components/Tilt3D';
import ContactButton from '../components/ContactButton';
import LanguageToggle from '../components/LanguageToggle';
import { HERO_PORTRAIT } from '../content/assets';
import { useLang } from '../i18n/LanguageContext';
import type { Copy } from '../i18n/copy';

const NAV_ITEMS: Array<{ anchor: string; key: keyof Copy['nav'] }> = [
  { anchor: 'about', key: 'about' },
  { anchor: 'price', key: 'price' },
  { anchor: 'projects', key: 'projects' },
  { anchor: 'contact', key: 'contact' },
];

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative flex h-screen flex-col bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20 w-full">
        {/* The toggle is a distinct control, not a fifth nav item — give it a
            clear gap so it doesn't crowd the last link. */}
        <div className="flex w-full items-center gap-4 sm:gap-6 md:gap-8 px-6 pt-6 md:px-10 md:pt-8">
          <div className="flex flex-1 items-center justify-between text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:text-lg lg:text-[1.4rem]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.anchor}
                href={`#${item.anchor}`}
                className="transition-opacity duration-200 hover:opacity-70"
              >
                {t.nav[item.key]}
              </a>
            ))}
          </div>

          <LanguageToggle className="text-[#D7E2EA]" />
        </div>
      </FadeIn>

      {/* Hero heading. `overflow-x-clip` (not `overflow-hidden`) so the nowrap
          heading can't cause horizontal scroll while its glyph tops stay
          unclipped — `overflow-hidden` was slicing 20px off the CJK glyphs. */}
      <div className="relative w-full overflow-x-clip">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className={`hero-heading w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight ${t.hero.headingMargin} ${t.hero.headingSize}`}
        >
          {t.hero.heading}
        </FadeIn>
      </div>

      {/* Portrait. Widths carry a vh cap for the same reason the project cards
          do: the portrait is anchored to the bottom, so on a short-but-wide
          window a fixed px width made the head climb into the middle of the
          heading and bury it. The cap only bites on short viewports. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(280px,60vh)] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[min(360px,60vh)] sm:translate-y-0 md:w-[min(440px,60vh)] lg:w-[min(520px,60vh)]">
        <div className="pointer-events-auto">
          <FadeIn delay={0.6} y={30}>
            <Magnet
              padding={150}
              magnetStrength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              wrapperClassName="block w-full"
            >
              {/* Magnet translates towards the pointer; Tilt3D rotates towards
                  it. They sit on separate elements on purpose — both write to
                  `transform`, so nesting is what lets the two compose. */}
              <Tilt3D
                maxTilt={16}
                perspective={620}
                hoverScale={1.04}
                glareOpacity={0.4}
                glareSrc={HERO_PORTRAIT}
                className="block w-full"
              >
                <img
                  src={HERO_PORTRAIT}
                  alt={t.hero.portraitAlt}
                  draggable={false}
                  className="block w-full select-none"
                />
              </Tilt3D>
            </Magnet>
          </FadeIn>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 mt-auto flex w-full items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p
            className="font-light uppercase leading-snug tracking-wide text-[#D7E2EA]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {t.hero.tagline}
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton label={t.cta.contact} />
        </FadeIn>
      </div>
    </section>
  );
}
