import { motion } from 'motion/react';

interface BrandMarkProps {
  size?: number;
  className?: string;
}

export function BrandMark({ size = 32, className = '' }: BrandMarkProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      whileHover={{ rotate: 12 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`shrink-0 ${className}`}
    >
      {/* Outer broken orbital circuit ring */}
      <motion.path
        d="M32 4C47.464 4 60 16.536 60 32C60 47.464 47.464 60 32 60C16.536 60 4 47.464 4 32C4 23.092 8.16 15.156 14.64 10.03"
        stroke="#111317"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0.2, opacity: 0.6 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Inner secondary circuit arc with terminal node */}
      <motion.path
        d="M11.5 32C11.5 20.678 20.678 11.5 32 11.5C38.68 11.5 44.614 14.696 48.356 19.64"
        stroke="#D97706"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0.2, opacity: 0.5 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      />
      <path
        d="M52.5 32C52.5 43.322 43.322 52.5 32 52.5C25.56 52.5 19.814 49.528 16.054 44.88"
        stroke="#111317"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="14.64" cy="10.03" r="2.5" fill="#D97706" />
      <circle cx="48.356" cy="19.64" r="2.2" fill="#D97706" />
      <circle cx="16.054" cy="44.88" r="2" fill="#111317" />

      {/* Geometric Bug / Beetle Core */}
      <path
        d="M28.5 21.5L26 17.5M35.5 21.5L38 17.5"
        stroke="#111317"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M26.5 24.5C26.5 21.739 28.962 19.5 32 19.5C35.038 19.5 37.5 21.739 37.5 24.5H26.5Z"
        fill="#111317"
      />
      <path
        d="M23.5 27.5C23.5 26.672 24.172 26 25 26H31V44.5C26.858 44.006 23.5 40.382 23.5 35.95V27.5Z"
        fill="#111317"
      />
      <path
        d="M40.5 27.5C40.5 26.672 39.828 26 39 26H33V44.5C37.142 44.006 40.5 40.382 40.5 35.95V27.5Z"
        fill="#111317"
      />
      <rect x="31" y="26" width="2" height="18.5" fill="#D97706" />

      {/* Six precision circuit legs */}
      <path
        d="M23.5 28.5H19L16.5 24.5M23.5 33.5H17.5M23.5 38.5H19L16.5 42.5"
        stroke="#111317"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.5 28.5H45L47.5 24.5M40.5 33.5H46.5M40.5 38.5H45L47.5 42.5"
        stroke="#111317"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

interface BrandLogoProps {
  markSize?: number;
  textClassName?: string;
}

export function BrandLogo({
  markSize = 28,
  textClassName = 'text-lg font-bold tracking-tight text-[#111317]',
}: BrandLogoProps) {
  return (
    <span className="group inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <BrandMark size={markSize} />
      <span className={`font-display ${textClassName}`}>BusyBug IT Solutions</span>
    </span>
  );
}
