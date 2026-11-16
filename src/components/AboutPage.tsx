import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import {
  COMPANY_MILESTONES,
  COMPANY_VALUES,
  HERO_IMAGE,
  OPEN_ROLES,
  TEAM_MEMBERS,
} from '../data/siteData';
import { BrandMark } from './BrandLogo';
import { CircuitBackdrop } from './CircuitBackdrop';
import { ResilientImage } from './ResilientImage';

interface AboutPageProps {
  onBackHome: () => void;
  onContactTeam: () => void;
  onApplyForRole: (roleTitle: string) => void;
}

export function AboutPage({ onBackHome, onContactTeam, onApplyForRole }: AboutPageProps) {
  return (
    <div className="bg-[#E8EDF4]">
      {/* About Us Hero & Editorial Overview */}
      <section className="relative overflow-hidden border-b border-[#C8D2E0] bg-[#E8EDF4] py-14 lg:py-20">
        <CircuitBackdrop variant="subtle" />
        <div className="relative z-10 mx-auto max-w-[1240px] px-6">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex min-h-[40px] items-center gap-2 text-xs font-semibold text-[#525866] hover:text-[#111317] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Overview</span>
          </button>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <div className="flex items-center gap-3">
                  <BrandMark size={36} />
                  <p className="text-xs font-medium tracking-wide text-[#B45309]">
                    About BusyBug IT Solutions
                  </p>
                </div>
                <h1
                  className="mt-4 font-display font-semibold tracking-tight text-[#111317] text-balance"
                  style={{ fontSize: 'clamp(2.15rem, 3.8vw, 3.35rem)', lineHeight: 1.1 }}
                >
                  Built by systems engineers who grew tired of preventable downtime.
                </h1>
                <p className="mt-6 text-base leading-relaxed text-[#525866]">
                  Founded in 2019, BusyBug IT Solutions exists to replace opaque IT outsourcing with
                  accountable systems architecture, disciplined cybersecurity, and engineering teams
                  that solve root causes instead of patching symptoms.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#E2E5E9] pt-6">
                <div>
                  <p className="font-mono text-2xl font-semibold text-[#111317] tabular-nums">
                    2019
                  </p>
                  <p className="text-xs text-[#525866]">Year founded</p>
                </div>
                <div className="h-8 w-px bg-[#E2E5E9]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-2xl font-semibold text-[#111317] tabular-nums">
                    42+
                  </p>
                  <p className="text-xs text-[#525866]">Production environments stewarded</p>
                </div>
                <div className="h-8 w-px bg-[#E2E5E9]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-2xl font-semibold text-[#111317] tabular-nums">
                    99.98%
                  </p>
                  <p className="text-xs text-[#525866]">24-month client uptime</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full overflow-hidden rounded-xl border border-[#E2E5E9] bg-white">
                <ResilientImage
                  src={HERO_IMAGE.src}
                  alt="BusyBug IT Solutions engineering team collaborating in studio"
                  aspectClassName="aspect-[16/9] lg:aspect-auto lg:h-full"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Split */}
      <section className="relative overflow-hidden border-b border-[#C8D2E0] bg-[#DEE6F0] py-16 lg:py-20">
        <CircuitBackdrop variant="subtle" />
        <div className="relative z-10 mx-auto max-w-[1240px] px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <article className="rounded-xl border border-[#C8D2E0] bg-white p-8 shadow-xs">
              <p className="font-mono text-xs font-medium text-[#B45309]">01 · Our Mission</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#111317]">
                Make enterprise-grade reliability practical for growing organizations.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#525866]">
                We design, secure, and operate cloud infrastructure, corporate networks, and custom
                software systems so leadership teams can ship product and serve customers without
                losing hours to recurring technical failures or unclear vendor handoffs.
              </p>
            </article>

            <article className="rounded-xl border border-[#C8D2E0] bg-white p-8 shadow-xs">
              <p className="font-mono text-xs font-medium text-[#B45309]">02 · Our Vision</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#111317]">
                Technology infrastructure that remains transparent, auditable, and client-owned.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#525866]">
                We envision a standard across IT consulting where every line of cloud spend is
                accounted for, every deployment is codified and reproducible, and businesses retain
                complete ownership of their architecture and security posture from day one.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Brief History & Milestones */}
      <section className="relative overflow-hidden border-b border-[#C8D2E0] bg-[#E8EDF4] py-16 lg:py-20">
        <CircuitBackdrop variant="subtle" />
        <div className="relative z-10 mx-auto max-w-[1240px] px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#9A4206]">
              03 · Company History
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#111317] text-balance">
              From incident triage to full-lifecycle IT stewardship.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#525866]">
              BusyBug IT Solutions began as a specialized debugging unit called in when production
              systems stalled. Over seven years, those engagements grew into long-term infrastructure
              partnerships.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_MILESTONES.map((milestone) => (
              <div
                key={milestone.year}
                className="rounded-xl border border-[#C8D2E0] bg-white p-6 shadow-xs"
              >
                <p className="font-mono text-xl font-semibold text-[#B45309] tabular-nums">
                  {milestone.year}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-[#111317]">
                  {milestone.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#525866]">
                  {milestone.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative overflow-hidden border-b border-[#C8D2E0] bg-[#DEE6F0] py-16 lg:py-20">
        <CircuitBackdrop variant="subtle" />
        <div className="relative z-10 mx-auto max-w-[1240px] px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#9A4206]">
              04 · Operating Values
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#111317] text-balance">
              Principles that govern every ticket, migration, and audit.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {COMPANY_VALUES.map((value) => (
              <div
                key={value.number}
                className="rounded-xl border border-[#C8D2E0] bg-white p-6 sm:p-8 shadow-xs"
              >
                <span className="font-mono text-xs font-medium text-[#B45309] tabular-nums">
                  {value.number}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-[#111317]">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#525866]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Engineering Team */}
      <section className="relative overflow-hidden border-b border-[#C8D2E0] bg-[#E8EDF4] py-16 lg:py-20">
        <CircuitBackdrop variant="subtle" />
        <div className="relative z-10 mx-auto max-w-[1240px] px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-wide text-[#9A4206]">
                05 · Leadership & Principal Engineers
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#111317] text-balance">
                Senior practitioners leading every client engagement.
              </h2>
            </div>

            <button
              type="button"
              onClick={onContactTeam}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#111317] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#262A33] self-start sm:self-auto whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
            >
              <span>Schedule Call With Leadership</span>
              <ArrowRight className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.id}
                className="flex flex-col justify-between rounded-xl border border-[#C8D2E0] bg-white p-6 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      aria-hidden="true"
                      className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#D4DCE8] bg-[#F1F5F9] font-display text-base font-bold text-[#111317]"
                    >
                      {member.initials}
                    </div>
                    <span className="font-mono text-xs text-[#525866] tabular-nums">
                      {member.tenure}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-[#111317]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#B45309]">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#525866]">{member.bio}</p>
                </div>

                <p className="mt-5 border-t border-[#F2F3F5] pt-3 text-xs text-[#525866]">
                  {member.focus}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers & Open Roles */}
      <section className="relative overflow-hidden border-b border-[#C8D2E0] bg-[#DEE6F0] py-16 lg:py-20">
        <CircuitBackdrop variant="subtle" />
        <div className="relative z-10 mx-auto max-w-[1240px] px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#9A4206]">
              06 · Careers at BusyBug
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#111317] text-balance">
              Join an engineering practice built on direct ownership.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#525866]">
              We hire practitioners who enjoy debugging root causes, automating repetitive manual
              work, and mentoring teammates without bureaucratic layers.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[#D4DCE8] rounded-xl border border-[#C8D2E0] bg-white shadow-xs">
            {OPEN_ROLES.map((role) => (
              <div
                key={role.id}
                className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#525866]">
                    <span className="font-semibold text-[#B45309]">{role.department}</span>
                    <span aria-hidden="true">·</span>
                    <span>{role.type}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-[#111317]">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#525866]">{role.summary}</p>
                  <p className="mt-3 font-mono text-xs text-[#374151]">{role.stack}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onApplyForRole(role.title)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#111317] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#262A33] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                  >
                    <span>Apply via Form</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                  </button>

                  <a
                    href={`mailto:busybugitsolutions@gmail.com?subject=${encodeURIComponent(
                      `Application: ${role.title}`
                    )}`}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#D4D8DF] bg-white px-4 py-2.5 text-xs font-semibold text-[#111317] transition-colors hover:border-[#111317] whitespace-nowrap"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#525866]" aria-hidden="true" />
                    <span>Email Resume</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
