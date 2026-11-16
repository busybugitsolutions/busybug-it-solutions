import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../data/siteData';
import { CircuitBackdrop } from './CircuitBackdrop';
import { ResilientImage } from './ResilientImage';

interface CaseStudiesSectionProps {
  onRequestSimilarOutcome: (caseTitle: string) => void;
}

const EASE_PRECISION = [0.16, 1, 0.3, 1] as const;

export function CaseStudiesSection({ onRequestSimilarOutcome }: CaseStudiesSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(CASE_STUDIES[0].id);
  const activeCase = CASE_STUDIES.find((c) => c.id === selectedId) || CASE_STUDIES[0];

  return (
    <section
      id="case-studies"
      className="relative overflow-hidden border-b border-[#C8D2E0] bg-[#E8EDF4] py-20 lg:py-24"
    >
      <CircuitBackdrop variant="subtle" />
      <div className="relative z-10 mx-auto max-w-[1240px] px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#9A4206]">
              02 · Proof of Impact
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#111317] sm:text-4xl text-balance">
              Measurable reliability gains verified in production.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#525866]">
              Inspect how we resolve recurring downtime, compliance exposure, and cloud cost overruns
              with clear before-and-after architectural accountability.
            </p>
          </div>

          {/* Interactive Case Switcher */}
          <div
            role="tablist"
            aria-label="Select client case study"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-[#C8D2E0] bg-[#D7E0EC] p-1 self-start lg:self-auto"
          >
            {CASE_STUDIES.map((study) => {
              const isSelected = study.id === activeCase.id;
              return (
                <button
                  key={study.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(study.id)}
                  className={`relative min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
                    isSelected ? 'text-[#111317]' : 'text-[#525866] hover:text-[#111317]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="case-study-tab"
                      transition={{ duration: 0.18, ease: EASE_PRECISION }}
                      className="absolute inset-0 rounded-md bg-white shadow-xs"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{study.client}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Case Study Deep Dive */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: EASE_PRECISION }}
            className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch"
          >
            <div className="flex flex-col justify-between rounded-xl border border-[#C8D2E0] bg-white p-6 sm:p-8 shadow-xs lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#525866]">
                  <span className="font-medium text-[#111317]">{activeCase.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeCase.industry}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{activeCase.timeframe}</span>
                </div>

                <div className="mt-6 border-b border-[#E2E5E9] pb-6">
                  <p className="font-mono text-2xl font-semibold tracking-tight text-[#B45309] sm:text-3xl tabular-nums">
                    {activeCase.headlineMetric}
                  </p>
                  <p className="mt-1.5 text-sm text-[#525866]">{activeCase.metricContext}</p>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-[#111317] sm:text-2xl">
                    {activeCase.title}
                  </h3>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-[#525866]">
                      Initial Bottleneck
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#374151]">
                      {activeCase.before}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-[#525866]">
                      Architectural Change
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#374151]">
                      {activeCase.change}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-[#111317]">
                      Measured Business Outcome
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#111317]">
                      {activeCase.outcome}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[#E2E5E9] pt-6">
                <button
                  type="button"
                  onClick={() => onRequestSimilarOutcome(activeCase.title)}
                  className="group inline-flex min-h-[40px] items-center gap-2 text-sm font-semibold text-[#111317] hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                >
                  <span>Discuss a similar architecture engagement</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {/* Right Column: Editorial Image + Adjacent Attributable Testimonial */}
            <div className="flex flex-col justify-between gap-6 lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-[#C8D2E0] bg-white shadow-xs">
                <ResilientImage
                  src={activeCase.image}
                  alt={activeCase.imageAlt}
                  aspectClassName="aspect-[4/3]"
                />
              </div>

              <figure className="flex flex-1 flex-col justify-between rounded-xl border border-[#C8D2E0] bg-white p-6 sm:p-7 shadow-xs">
                <blockquote className="text-sm leading-relaxed text-[#111317]">
                  &ldquo;{activeCase.testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-[#F2F3F5] pt-4">
                  <p className="text-sm font-semibold text-[#111317]">
                    {activeCase.testimonial.author}
                  </p>
                  <p className="mt-0.5 text-xs text-[#525866]">
                    {activeCase.testimonial.role} · {activeCase.testimonial.organization}
                  </p>
                </figcaption>
              </figure>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
