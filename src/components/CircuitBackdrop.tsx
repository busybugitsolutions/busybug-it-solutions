import { motion, type MotionValue } from 'motion/react';

interface CircuitBackdropProps {
  variant?: 'hero' | 'subtle';
  pointerX?: MotionValue<number>;
  pointerY?: MotionValue<number>;
}

export function CircuitBackdrop({
  variant = 'subtle',
  pointerX,
  pointerY,
}: CircuitBackdropProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Atmospheric Dual-Tone Gradient Wash (Cool Architectural Slate + Warm Amber Highlight) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === 'hero'
              ? 'radial-gradient(ellipse 70% 60% at 82% 16%, rgba(217,119,6,0.14), transparent 64%), radial-gradient(ellipse 65% 55% at 12% 84%, rgba(30,41,59,0.10), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(203,213,225,0.22) 100%)'
              : 'radial-gradient(ellipse 58% 55% at 88% 14%, rgba(217,119,6,0.09), transparent 65%), radial-gradient(ellipse 50% 50% at 10% 86%, rgba(30,41,59,0.08), transparent 64%)',
        }}
      />

      {/* Precision CAD Coordinate Grid & Engineering Dot Matrix */}
      <div
        className="absolute inset-0"
        style={
          variant === 'hero'
            ? {
                backgroundImage:
                  'linear-gradient(to right, rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(to right, rgba(15,23,42,0.065) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.065) 1px, transparent 1px)',
                backgroundSize: '192px 192px, 192px 192px, 48px 48px, 48px 48px',
              }
            : {
                backgroundImage:
                  'linear-gradient(to right, rgba(15,23,42,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.055) 1px, transparent 1px), radial-gradient(circle, rgba(15,23,42,0.18) 1px, transparent 1px)',
                backgroundSize: '128px 128px, 128px 128px, 32px 32px',
              }
        }
      />

      {/* GPU-Accelerated Pointer Spotlight (Hero Only) */}
      {variant === 'hero' && pointerX && pointerY && (
        <motion.div
          className="absolute top-0 left-0 h-[420px] w-[420px] rounded-full opacity-80"
          style={{
            x: pointerX,
            y: pointerY,
            background:
              'radial-gradient(circle, rgba(217,119,6,0.15) 0%, rgba(217,119,6,0.045) 45%, transparent 72%)',
          }}
        />
      )}

      {/* Signature BusyBug Orbital & Chamfered PCB Trace Layer */}
      {variant === 'hero' ? (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 760"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* Orbital Radar & Circuit Rings */}
          <circle
            cx="1140"
            cy="260"
            r="360"
            stroke="#0F172A"
            strokeOpacity="0.12"
            strokeWidth="1.15"
            strokeDasharray="10 14"
          />
          <circle
            cx="1140"
            cy="260"
            r="268"
            stroke="#D97706"
            strokeOpacity="0.24"
            strokeWidth="1.25"
          />
          <circle
            cx="1140"
            cy="260"
            r="176"
            stroke="#0F172A"
            strokeOpacity="0.09"
            strokeWidth="1"
            strokeDasharray="4 8"
          />

          {/* Top-Left 45-Degree Chamfered PCB Bus Traces */}
          <path
            d="M-20 118H108L158 168H310"
            stroke="#0F172A"
            strokeOpacity="0.16"
            strokeWidth="1.5"
          />
          <path
            d="M-20 138H96L146 188H264"
            stroke="#D97706"
            strokeOpacity="0.30"
            strokeWidth="1.5"
          />
          <path
            d="M-20 158H82L122 198H204"
            stroke="#0F172A"
            strokeOpacity="0.11"
            strokeWidth="1.2"
          />
          <circle cx="310" cy="168" r="3.5" fill="#0F172A" fillOpacity="0.28" />
          <circle cx="264" cy="188" r="3.5" fill="#D97706" fillOpacity="0.52" />
          <circle cx="204" cy="198" r="2.5" fill="#0F172A" fillOpacity="0.22" />

          {/* Calm Traveling Signal Pulse Along Upper PCB Bus */}
          <motion.path
            d="M-20 138H96L146 188H264"
            stroke="#D97706"
            strokeOpacity="0.78"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="28 360"
            initial={{ strokeDashoffset: 388 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'linear',
            }}
          />

          {/* Bottom-Right Architectural Trace Bus */}
          <path
            d="M1460 562H1276L1218 504H1046"
            stroke="#0F172A"
            strokeOpacity="0.16"
            strokeWidth="1.5"
          />
          <path
            d="M1460 584H1264L1206 526H1096"
            stroke="#D97706"
            strokeOpacity="0.28"
            strokeWidth="1.5"
          />
          <circle cx="1046" cy="504" r="3.5" fill="#0F172A" fillOpacity="0.28" />
          <circle cx="1096" cy="526" r="3.5" fill="#D97706" fillOpacity="0.52" />

          <motion.path
            d="M1460 584H1264L1206 526H1096"
            stroke="#D97706"
            strokeOpacity="0.72"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="32 390"
            initial={{ strokeDashoffset: 422 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 8,
              delay: 1.5,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: 'linear',
            }}
          />
        </svg>
      ) : (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* Architectural Corner PCB Trace Accents for Content Sections */}
          <path
            d="M1460 88H1308L1254 142H1134"
            stroke="#0F172A"
            strokeOpacity="0.14"
            strokeWidth="1.4"
          />
          <path
            d="M1460 106H1316L1266 156H1180"
            stroke="#D97706"
            strokeOpacity="0.24"
            strokeWidth="1.4"
          />
          <circle cx="1134" cy="142" r="3" fill="#0F172A" fillOpacity="0.26" />
          <circle cx="1180" cy="156" r="3" fill="#D97706" fillOpacity="0.48" />

          <motion.path
            d="M1460 106H1316L1266 156H1180"
            stroke="#D97706"
            strokeOpacity="0.65"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeDasharray="24 340"
            initial={{ strokeDashoffset: 364 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              repeatDelay: 3.5,
              ease: 'linear',
            }}
          />

          <path
            d="M-20 512H124L176 460H286"
            stroke="#0F172A"
            strokeOpacity="0.14"
            strokeWidth="1.4"
          />
          <path
            d="M-20 530H134L184 480H252"
            stroke="#D97706"
            strokeOpacity="0.22"
            strokeWidth="1.4"
          />
          <circle cx="286" cy="460" r="3" fill="#0F172A" fillOpacity="0.26" />
          <circle cx="252" cy="480" r="3" fill="#D97706" fillOpacity="0.45" />
        </svg>
      )}
    </div>
  );
}
