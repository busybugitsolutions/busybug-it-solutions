import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES, type ServiceItem } from '../data/siteData';
import { CircuitBackdrop } from './CircuitBackdrop';
import { ResilientImage } from './ResilientImage';

type ServiceCategoryFilter = 'All' | ServiceItem['category'];

interface ServicesSectionProps {
  onSelectServiceForContact: (serviceTitle: string) => void;
}

const FILTER_OPTIONS: ServiceCategoryFilter[] = [
  'All',
  'Infrastructure',
  'Security',
  'Cloud',
  'Advisory',
];

const EASE_PRECISION = [0.16, 1, 0.3, 1] as const;

export function ServicesSection({ onSelectServiceForContact }: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ServiceCategoryFilter>('All');
  const [expandedServiceId, setExpandedServiceId] = useState<string>('managed-it');

  const filteredServices =
    activeFilter === 'All'
      ? SERVICES
      : SERVICES.filter((service) => service.category === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedServiceId((current) => (current === id ? '' : id));
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden border-b border-[#C8D2E0] bg-[#DEE6F0] py-20 lg:py-24"
    >
      <CircuitBackdrop variant="subtle" />
      <div className="relative z-10 mx-auto max-w-[1240px] px-6">
        {/* Section Header + Interactive Filter Bar */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#9A4206]">
              01 · Core Capabilities
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#111317] sm:text-4xl text-balance">
              Four engineering disciplines engineered to keep your business online.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#525866]">
              Every engagement pairs senior systems engineering with clear commercial outcomes—reducing
              incident frequency, closing compliance gaps, and eliminating wasted infrastructure spend.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter services by discipline"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-[#C8D2E0] bg-[#CFD8E5] p-1 self-start lg:self-auto"
          >
            {FILTER_OPTIONS.map((category) => {
              const isSelected = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(category)}
                  className={`relative min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
                    isSelected ? 'text-[#111317]' : 'text-[#525866] hover:text-[#111317]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="service-filter-pill"
                      transition={{ duration: 0.18, ease: EASE_PRECISION }}
                      className="absolute inset-0 rounded-md bg-white shadow-xs"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const isWide = service.span === 'wide' && activeFilter === 'All';
            const isExpanded = expandedServiceId === service.id;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0.9, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18, ease: EASE_PRECISION }}
                className={`group relative flex flex-col justify-between rounded-xl border border-[#C8D2E0] bg-white p-6 sm:p-8 shadow-xs transition-colors duration-150 hover:border-[#94A3B8] ${
                  isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                {/* Precision CAD Corner Reticles on Hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2.5 left-2.5 h-2.5 w-2.5 border-t border-l border-[#D97706] opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 bottom-2.5 h-2.5 w-2.5 border-r border-b border-[#D97706] opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                />

                <div>
                  {/* Quiet text metadata row (no pills) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#525866]">
                    <div className="flex items-center gap-2 font-mono tabular-nums">
                      <span className="font-medium text-[#B45309]">{service.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.category}</span>
                    </div>
                    <span className="font-mono text-xs text-[#525866] tabular-nums">
                      {service.typicalTimeline}
                    </span>
                  </div>

                  {/* Content layout: split if image exists on wide card */}
                  <div
                    className={`mt-5 ${
                      service.image && isWide
                        ? 'grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start'
                        : ''
                    }`}
                  >
                    <div className={service.image && isWide ? 'md:col-span-7' : ''}>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-[#111317]">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#525866]">
                        {service.summary}
                      </p>

                      <div className="mt-6 border-t border-[#E2E5E9] pt-5">
                        <h4 className="text-xs font-semibold tracking-wide text-[#111317]">
                          Business Benefits
                        </h4>
                        <ul className="mt-3 space-y-2.5">
                          {service.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="flex items-start gap-2.5 text-sm leading-snug text-[#374151]"
                            >
                              <span
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#D97706]"
                                aria-hidden="true"
                              />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {service.image && isWide && (
                      <div className="md:col-span-5 overflow-hidden rounded-lg border border-[#E2E5E9] bg-white">
                        <ResilientImage
                          src={service.image}
                          alt={service.imageAlt || service.title}
                          aspectClassName="aspect-[4/3]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Interactive Deliverables Disclosure & Service Request Action */}
                <div className="mt-6 border-t border-[#E2E5E9] pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => toggleExpand(service.id)}
                      aria-expanded={isExpanded}
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-[#111317] hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                    >
                      <span>{isExpanded ? 'Hide Technical Deliverables' : 'Inspect Deliverables & SLA'}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectServiceForContact(service.title)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#D4D8DF] bg-white px-4 py-2 text-xs font-semibold text-[#111317] transition-colors hover:border-[#111317] hover:bg-[#111317] hover:text-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                    >
                      <span>Inquire About {service.category}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16, ease: EASE_PRECISION }}
                        className="mt-5 rounded-lg border border-[#D8E0EB] bg-[#F4F7FB] p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F2F3F5] pb-3">
                          <span className="text-xs font-semibold text-[#111317]">
                            Included Engineering Deliverables
                          </span>
                          <span className="font-mono text-xs text-[#B45309] tabular-nums">
                            {service.slaTarget}
                          </span>
                        </div>
                        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {service.deliverables.map((item, idx) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-xs leading-relaxed text-[#525866]"
                            >
                              <span className="font-mono text-[#111317] tabular-nums">
                                0{idx + 1}.
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
