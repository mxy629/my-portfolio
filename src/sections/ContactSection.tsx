import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { useLang } from '../i18n/LanguageContext';

export default function ContactSection() {
  const { t } = useLang();

  return (
    <section
      id="contact"
      className="relative z-10 w-full bg-[#0C0C0C] px-5 pb-24 pt-10 sm:px-8 sm:pb-28 sm:pt-14 md:px-10 md:pb-36 md:pt-20"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.contact.heading}
      </FadeIn>

      <div className="mx-auto mt-12 flex w-full max-w-3xl flex-col items-center gap-10 sm:mt-16 sm:gap-12 md:mt-20 md:gap-14">
        <FadeIn delay={0.15} y={20}>
          <p
            className="max-w-[560px] text-center font-light leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.25rem)', opacity: 0.7 }}
          >
            {t.contact.body}
          </p>
        </FadeIn>

        {/* 邮箱来自环境变量，未配置时整块不渲染，避免出现空的 mailto 链接 */}
        {t.contact.email ? (
          <FadeIn delay={0.3} y={20}>
            <a
              href={`mailto:${t.contact.email}`}
              className="hero-heading block text-center font-medium uppercase leading-none tracking-widest transition-opacity duration-200 hover:opacity-70"
              style={{ fontSize: 'clamp(1.05rem, 3.2vw, 2.6rem)' }}
            >
              {t.contact.email}
            </a>
          </FadeIn>
        ) : null}

        <FadeIn delay={0.45} y={20}>
          <ContactButton label={t.cta.contact} />
        </FadeIn>
      </div>
    </section>
  );
}
