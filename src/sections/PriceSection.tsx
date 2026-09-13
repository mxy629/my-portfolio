import FadeIn from '../components/FadeIn';
import { useLang } from '../i18n/LanguageContext';

export default function PriceSection() {
  const { t } = useLang();

  return (
    <section
      id="price"
      className="relative z-0 w-full bg-white px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 md:px-10 md:pb-32 md:pt-20"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.price.heading}
      </FadeIn>

      <div className="mx-auto w-full max-w-5xl">
        {t.price.plans.map((plan, i) => (
          <FadeIn
            key={plan.number}
            delay={i * 0.1}
            y={30}
            className="flex flex-wrap items-start gap-5 py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12"
            style={{ borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="shrink-0 font-black leading-none text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {plan.number}
            </span>

            <div className="flex min-w-[220px] flex-1 flex-col gap-2 pt-1 sm:gap-3 md:pt-2">
              <h3
                className="font-medium uppercase leading-tight text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {plan.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
              >
                {plan.description}
              </p>
            </div>

            <div className="flex shrink-0 items-baseline gap-2 pt-1 md:pt-2">
              <span
                className="font-black leading-none text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1.25rem, 2.6vw, 2.4rem)' }}
              >
                {plan.price}
              </span>
              {plan.unit ? (
                <span
                  className="font-light uppercase tracking-wide text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.95rem)', opacity: 0.5 }}
                >
                  {plan.unit}
                </span>
              ) : null}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
