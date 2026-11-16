import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { DELIVERY_PHASES } from '../data/siteData';
import { CircuitBackdrop } from './CircuitBackdrop';

type DisciplineOption =
  | 'Managed IT Services'
  | 'Cybersecurity'
  | 'Cloud Solutions'
  | 'IT Consulting';

type ScaleOption = '15–50 Seats' | '50–250 Seats' | '250+ Multi-Site';
type TimelineOption = 'Immediate Audit' | '30–60 Days' | 'Quarterly Roadmap';

interface EngagementEstimatorProps {
  onApplyScope: (scopeSummary: string) => void;
}

const DISCIPLINES: DisciplineOption[] = [
  'Managed IT Services',
  'Cybersecurity',
  'Cloud Solutions',
  'IT Consulting',
];

const SCALES: ScaleOption[] = ['15–50 Seats', '50–250 Seats', '250+ Multi-Site'];
const TIMELINES: TimelineOption[] = ['Immediate Audit', '30–60 Days', 'Quarterly Roadmap'];

export function EngagementEstimator({ onApplyScope }: EngagementEstimatorProps) {
  const [discipline, setDiscipline] = useState<DisciplineOption>('Managed IT Services');
  const [scale, setScale] = useState<ScaleOption>('50–250 Seats');
  const [timeline, setTimeline] = useState<TimelineOption>('30–60 Days');

  const recommendation = useMemo(() => {
    const squadMap: Record<DisciplineOption, string> = {
      'Managed IT Services': '1 Lead Reliability Engineer + 24/7 Escalation Desk',
      Cybersecurity: '1 Principal Security Architect + Compliance Automation Lead',
      'Cloud Solutions': '1 Principal Cloud Architect + 2 DevOps Infrastructure Engineers',
      'IT Consulting': '1 Fractional CTO / Principal Architect + FinOps Analyst',
    };

    const cadenceMap: Record<ScaleOption, string> = {
      '15–50 Seats': '2-week stabilization sprint, weekly milestone syncs',
      '50–250 Seats': '4-to-6-week phased rollout with parallel staging validation',
      '250+ Multi-Site': '8-to-12-week regional cutover with dedicated site playbooks',
    };

    const firstDeliverableMap: Record<TimelineOption, string> = {
      'Immediate Audit': 'Baseline risk, uptime, and spend diagnostic delivered in 5 business days',
      '30–60 Days': 'Full architectural blueprint and production rollout schedule in Week 2',
      'Quarterly Roadmap': 'Executive board brief, vendor consolidation plan, and 90-day milestones',
    };

    return {
      squad: squadMap[discipline],
      cadence: cadenceMap[scale],
      firstDeliverable: firstDeliverableMap[timeline],
    };
  }, [discipline, scale, timeline]);

  const handleCarryToForm = () => {
    const summary = `Scope Interest: ${discipline} (${scale}, Target: ${timeline}). Expected engagement model: ${recommendation.squad}.`;
    onApplyScope(summary);
  };

  return (
    <section
      id="engagement"
      className="relative overflow-hidden border-b border-[#C8D2E0] bg-[#DEE6F0] py-20 lg:py-24"
    >
      <CircuitBackdrop variant="subtle" />
      <div className="relative z-10 mx-auto max-w-[1240px] px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[#9A4206]">
            03 · Delivery & Scope
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#111317] sm:text-4xl text-balance">
            Predictable four-stage delivery with zero lock-in.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#525866]">
            Every project begins with verifiable diagnostics before writing infrastructure code or
            onboarding endpoints.
          </p>
        </div>

        {/* 4-Stage Methodology */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVERY_PHASES.map((phase) => (
            <motion.div
              key={phase.step}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between rounded-xl border border-[#C8D2E0] bg-white p-6 shadow-xs transition-colors duration-150 hover:border-[#94A3B8]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#525866]">
                  <span className="font-mono font-medium text-[#B45309] tabular-nums">
                    {phase.step}
                  </span>
                  <span className="font-mono tabular-nums">{phase.duration}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-[#111317]">
                  {phase.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#525866]">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Scope Readiness Configurator */}
        <div className="mt-12 rounded-xl border border-[#C8D2E0] bg-[#F4F7FB] p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-7">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-[#111317]">
                  Configure a Recommended Engagement Scope
                </h3>
                <p className="mt-1.5 text-sm text-[#525866]">
                  Select your priority focus, team footprint, and timeline to preview how BusyBug
                  structures engineering allocation.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-[#111317]">
                  Primary Focus
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {DISCIPLINES.map((item) => {
                    const active = discipline === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setDiscipline(item)}
                        className={`min-h-[40px] rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
                          active
                            ? 'border-[#111317] bg-[#111317] text-white'
                            : 'border-[#E2E5E9] bg-white text-[#374151] hover:border-[#C9CED6]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#111317]">
                    Environment Scale
                  </p>
                  <div className="mt-2.5 flex flex-col gap-2">
                    {SCALES.map((item) => {
                      const active = scale === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setScale(item)}
                          className={`min-h-[40px] rounded-lg border px-3.5 py-2 text-left text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
                            active
                              ? 'border-[#B45309] bg-white text-[#111317] ring-1 ring-[#B45309]'
                              : 'border-[#E2E5E9] bg-white text-[#525866] hover:border-[#C9CED6] hover:text-[#111317]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#111317]">
                    Target Window
                  </p>
                  <div className="mt-2.5 flex flex-col gap-2">
                    {TIMELINES.map((item) => {
                      const active = timeline === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setTimeline(item)}
                          className={`min-h-[40px] rounded-lg border px-3.5 py-2 text-left text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
                            active
                              ? 'border-[#B45309] bg-white text-[#111317] ring-1 ring-[#B45309]'
                              : 'border-[#E2E5E9] bg-white text-[#525866] hover:border-[#C9CED6] hover:text-[#111317]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Scope Preview Card */}
            <div className="flex flex-col justify-between rounded-xl border border-[#C8D2E0] bg-white p-6 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between border-b border-[#F2F3F5] pb-4 text-xs text-[#525866]">
                  <span className="font-semibold text-[#111317]">Recommended Structure</span>
                  <span className="font-mono text-[#B45309] tabular-nums">{scale}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.dl
                    key={`${discipline}-${scale}-${timeline}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-5 space-y-4"
                  >
                    <div>
                      <dt className="text-xs font-medium text-[#525866]">Engineering Pod</dt>
                      <dd className="mt-1 text-sm font-semibold text-[#111317]">
                        {recommendation.squad}
                      </dd>
                    </div>
                    <div className="border-t border-[#F2F3F5] pt-4">
                      <dt className="text-xs font-medium text-[#525866]">Execution Cadence</dt>
                      <dd className="mt-1 text-sm text-[#374151]">{recommendation.cadence}</dd>
                    </div>
                    <div className="border-t border-[#F2F3F5] pt-4">
                      <dt className="text-xs font-medium text-[#525866]">Initial Deliverable</dt>
                      <dd className="mt-1 text-sm text-[#374151]">
                        {recommendation.firstDeliverable}
                      </dd>
                    </div>
                  </motion.dl>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={handleCarryToForm}
                className="mt-7 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#111317] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#262A33] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
              >
                <span>Pre-Fill Contact Form With Scope</span>
                <ArrowRight className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
