import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import { PROJECT_MEDIA } from '../content/assets';
import type { ProjectMedia } from '../content/assets';
import { useLang } from '../i18n/LanguageContext';
import type { ProjectCopy } from '../i18n/copy';

const CARD_RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

interface ProjectCardProps {
  project: ProjectCopy;
  media: ProjectMedia;
  index: number;
  total: number;
  progress: MotionValue<number>;
  detailAlt: string;
  heroAlt: string;
}

function ProjectCard({
  project,
  media,
  index,
  total,
  progress,
  detailAlt,
  heroAlt,
}: ProjectCardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className={`relative w-full max-w-6xl origin-top border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 ${CARD_RADIUS}`}
      >
        {/* Top row */}
        <div className="flex items-center">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </span>
              <span
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom row: 40 / 60 image grid.
            Grid (not flex) on purpose: with `h-full` inside an auto-height flex
            item the browser falls back to the tall image's intrinsic aspect
            ratio, which then drove the row height and pushed the card past its
            85vh sticky wrapper. Absolutising the tall image takes it out of
            flow, so the row height is set purely by the two capped images on
            the left. The vh terms keep the card inside the wrapper on
            short-but-wide viewports without disturbing the spec's vw curve. */}
        <div className="mt-6 grid grid-cols-[2fr_3fr] gap-3 sm:mt-8 sm:gap-4 md:gap-5">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            <img
              src={media.col1[0]}
              alt={`${project.name} — ${detailAlt} 1`}
              loading="lazy"
              draggable={false}
              className={`w-full select-none object-cover ${CARD_RADIUS}`}
              style={{ height: 'min(clamp(130px, 16vw, 230px), 20vh)' }}
            />
            <img
              src={media.col1[1]}
              alt={`${project.name} — ${detailAlt} 2`}
              loading="lazy"
              draggable={false}
              className={`w-full select-none object-cover ${CARD_RADIUS}`}
              style={{ height: 'min(clamp(160px, 22vw, 340px), 30vh)' }}
            />
          </div>

          <div className="relative">
            <img
              src={media.col2}
              alt={`${project.name} — ${heroAlt}`}
              loading="lazy"
              draggable={false}
              className={`absolute inset-0 h-full w-full select-none object-cover ${CARD_RADIUS}`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const projects = t.projects.items;
  const total = projects.length;

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 w-full rounded-t-[40px] bg-[#0C0C0C] px-5 pb-32 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.projects.heading}
      </FadeIn>

      <div ref={containerRef} className="relative mt-16 sm:mt-20 md:mt-28">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            media={PROJECT_MEDIA[index]}
            index={index}
            total={total}
            progress={scrollYProgress}
            detailAlt={t.projects.detailAlt}
            heroAlt={t.projects.heroAlt}
          />
        ))}
      </div>
    </section>
  );
}
