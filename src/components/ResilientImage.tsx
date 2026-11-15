import { useState } from 'react';
import { Server } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[4/3]',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#F2F3F5] border border-[#E2E5E9] p-6 text-center ${aspectClassName} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(217,119,6,0.12), transparent 45%), linear-gradient(to right, rgba(17,19,23,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,19,23,0.04) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-3 max-w-xs">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#D4D8DF] bg-white text-[#111317]">
            <Server className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="text-xs font-medium text-[#525866] leading-relaxed">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EFEFEF] ${aspectClassName} ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
