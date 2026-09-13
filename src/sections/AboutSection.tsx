import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import { ABOUT_DECOR as DECOR } from '../content/assets';
import { useLang } from '../i18n/LanguageContext';

export default function AboutSection() {
  const { t, lang } = useLang();

  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
    >
      {/* Decorative 3D objects */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"
      >
        <img src={DECOR.moon} alt="" draggable={false} className="w-full select-none" />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"
      >
        <img src={DECOR.object} alt="" draggable={false} className="w-full select-none" />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]"
      >
        <img src={DECOR.lego} alt="" draggable={false} className="w-full select-none" />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"
      >
        <img src={DECOR.group} alt="" draggable={false} className="w-full select-none" />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex w-full flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            {t.about.heading}
          </FadeIn>

          {/* key forces the per-character ranges to rebuild when the copy changes */}
          <AnimatedText
            key={lang}
            text={t.about.body}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.2} y={20}>
          <ContactButton label={t.cta.contact} />
        </FadeIn>
      </div>
    </section>
  );
}
