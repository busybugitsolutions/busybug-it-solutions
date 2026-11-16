import { type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { HERO_BASELINES, HERO_IMAGE } from '../data/siteData';
import { CircuitBackdrop } from './CircuitBackdrop';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

const EASE_PRECISION = [0.16, 1, 0.3, 1] as const;

export function HeroSection({ onPrimaryAction, onSecondaryAction }: HeroSectionProps) {
  const pointerX = useMotionValue(-320);
  const pointerY = useMotionValue(-320);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 28, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 28, mass: 0.5 });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left - 180);
    pointerY.set(event.clientY - rect.top - 180);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden border-b border-[#C8D2E0] bg-[#E8EDF4]"
    >
      <CircuitBackdrop variant="hero" pointerX={smoothX} pointerY={smoothY} />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-12 pb-14 lg:pt-20 lg:pb-16">
        {/* 2-Column Split with equal vertical stretch */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#525866]">
                Managed IT Systems · Cybersecurity · Cloud Engineering
              </p>

              <h1
                className="mt-5 font-display font-semibold tracking-tight text-[#111317] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.65rem)', lineHeight: 1.08 }}
              >
                Resilient IT infrastructure built to run without interruption.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#525866]">
                BusyBug IT Solutions designs, secures, and operates production cloud environments,
                workstation fleets, and enterprise networks for teams that cannot afford recurring
                outages or fragmented vendor support.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  className="group inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#111317] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#262A33] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                >
                  <span>Book Technical Audit</span>
                  <ArrowRight
                    className="h-4 w-4 text-[#F59E0B] transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  onClick={onSecondaryAction}
                  className="group inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[#111317] underline-offset-4 hover:underline whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
                >
                  <span>Explore Core Services</span>
                  <ArrowDownRight
                    className="h-4 w-4 text-[#525866] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Enterprise Compliance & Security Certification Seal */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18, ease: EASE_PRECISION }}
                aria-label="Security Certified: ISO/IEC 27001 and SOC 2 Type II aligned controls"
                className="group inline-flex items-center gap-3.5 rounded-lg border border-[#C8D2E0] bg-white px-4 py-3 shadow-xs transition-colors duration-150 hover:border-[#94A3B8]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#D4DCE8] bg-[#F1F5F9] transition-transform duration-200 group-hover:scale-105">
                  <svg
                    viewBox="0 0 32 32"
                    className="h-6 w-6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M16 3L5.5 7.2V15.1C5.5 21.8 10 27.6 16 29.5C22 27.6 26.5 21.8 26.5 15.1V7.2L16 3Z"
                      stroke="#111317"
                      strokeWidth="1.75"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 6.2L8.3 9.3V15.1C8.3 20.1 11.5 24.5 16 26.1C20.5 24.5 23.7 20.1 23.7 15.1V9.3L16 6.2Z"
                      stroke="#D97706"
                      strokeWidth="1.25"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.2 15.9L14.8 18.5L20 13.1"
                      stroke="#111317"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold tracking-tight text-[#111317]">
                      Security Certified
                    </span>
                    <span aria-hidden="true" className="text-[#C9CED6]">
                      ·
                    </span>
                    <span className="font-mono text-[11px] font-medium text-[#B45309] tabular-nums">
                      Audited Controls
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-[#525866] tabular-nums">
                    ISO/IEC 27001 · SOC 2 Type II · HIPAA Ready
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0.85, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_PRECISION }}
            className="lg:col-span-6"
          >
            <div className="h-full overflow-hidden rounded-xl border border-[#C8D2E0] bg-white shadow-xs">
              <ResilientImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                aspectClassName="aspect-[16/9] lg:aspect-auto lg:h-full"
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Operational Baselines Strip */}
        <div className="mt-12 grid grid-cols-1 border-t border-[#C8D2E0] pt-8 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HERO_BASELINES.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0.7, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: idx * 0.05, ease: EASE_PRECISION }}
              className="flex flex-col gap-1.5"
            >
              <span className="font-mono text-2xl font-medium tracking-tight text-[#111317] tabular-nums">
                {item.value}
              </span>
              <span className="text-sm leading-snug text-[#525866]">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
